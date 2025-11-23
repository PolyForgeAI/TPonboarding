import React, { useState, useEffect, useMemo } from "react";
import { supabase } from "@/shared/lib/supabaseClient";
import { useNavigate, useSearchParams } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/shared/components/ui/button";
import { Progress } from "@/shared/components/ui/progress";
import { ArrowLeft, ArrowRight, Loader2, Hand, Users, Lightbulb, CheckSquare, Image, Palette, DollarSign, Sparkles, Check } from "lucide-react";
import Layout from "@/shared/components/layout/Layout";

import StepExpectations from "../components/StepExpectations";
import StepGetToKnowYou from "../components/StepGetToKnowYou";
import StepLifestyleVision from "../components/StepLifestyleVision";
import StepFeaturesOutcomes from "../components/StepFeaturesOutcomes";
import StepInspiration from "../components/StepInspiration";
import StepMaterials from "../components/StepMaterials";
import StepInvestment from "../components/StepInvestment";

const STEPS = [
  { id: 1, title: "Welcome", component: StepExpectations, icon: Hand },
  { id: 2, title: "Get to Know You", component: StepGetToKnowYou, icon: Users },
  { id: 3, title: "Lifestyle & Vision", component: StepLifestyleVision, icon: Sparkles },
  { id: 4, title: "Features & Outcomes", component: StepFeaturesOutcomes, icon: CheckSquare },
  { id: 5, title: "Inspiration", component: StepInspiration, icon: Lightbulb },
  { id: 6, title: "Materials & Equipment", component: StepMaterials, icon: Palette },
  { id: 7, title: "Investment", component: StepInvestment, icon: DollarSign },
];

import { useToast } from "@/shared/components/ui/use-toast";

export default function Onboarding() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [searchParams] = useSearchParams();
  const accessCode = searchParams.get("code");

  const [currentStep, setCurrentStep] = useState(1);
  const [submissionId, setSubmissionId] = useState(null);
  const [formData, setFormData] = useState({});
  const [isProcessing, setIsProcessing] = useState(false);
  const [isLoadingExisting, setIsLoadingExisting] = useState(false);
  const [visitedSteps, setVisitedSteps] = useState(new Set([1]));

  useEffect(() => {
    if (accessCode) {
      loadExistingSubmission();
    } else {
      initializeSubmission();
    }
  }, []);

  // Helper to map flat form data to Schema structure
  const prepareSubmissionPayload = (data) => {
    return {
      // Core Fields
      status: data.status || 'in_progress',
      current_step: data.current_step,
      contact_name: data.contact_name,
      contact_email: data.contact_email,
      contact_phone: data.contact_phone,
      property_address: data.property_address,
      property_city: data.property_city,
      property_state: data.property_state,
      property_zip: data.property_zip,
      pool_vision: data.pool_vision,
      budget_range: data.budget_range,
      timeline: data.timeline,
      household_size: data.household_size,
      has_children: data.has_children,
      has_pets: data.has_pets,
      entertainment_frequency: data.entertainment_frequency,
      additional_notes: data.additional_notes,

      // JSONB Fields
      property_data: {
        project_type: data.project_type,
        decision_maker_count: data.decision_maker_count,
        decision_makers: data.decision_makers,
        ...data.property_data // preserve existing
      },
      usage_intent: {
        primary_use: data.primary_use,
        desired_outcomes: data.desired_outcomes,
        features_by_person: data.features_by_person,
        ...data.usage_intent
      },
      financial_breakdown: {
        budget_questions: data.budget_questions,
        financing_interest: data.financing_interest,
        ...data.financial_breakdown
      },
      desired_features: data.desired_features, // JSONB
      must_haves: data.must_haves, // JSONB
      nice_to_haves: data.nice_to_haves, // JSONB
      inspiration_images: data.inspiration_images, // JSONB
      material_selections: data.material_selections, // JSONB
      consents: data.consents, // JSONB
    };
  };

  const loadExistingSubmission = async () => {
    setIsLoadingExisting(true);
    try {
      const { data: submission, error } = await supabase
        .from('OnboardingSubmission')
        .select('*')
        .eq('access_code', accessCode)
        .single();

      if (submission) {
        setSubmissionId(submission.id);

        // Unpack JSONB fields back to flat state
        const flatData = {
          ...submission,
          // Unpack property_data
          project_type: submission.property_data?.project_type,
          decision_maker_count: submission.property_data?.decision_maker_count,
          decision_makers: submission.property_data?.decision_makers,

          // Unpack usage_intent
          primary_use: submission.usage_intent?.primary_use || [],
          desired_outcomes: submission.usage_intent?.desired_outcomes,
          features_by_person: submission.usage_intent?.features_by_person,

          // Unpack financial_breakdown
          budget_questions: submission.financial_breakdown?.budget_questions,
          financing_interest: submission.financial_breakdown?.financing_interest,
        };

        setFormData(flatData);
        setCurrentStep(submission.current_step || 1);
      } else {
        initializeSubmission();
      }
    } catch (error) {
      console.error("Error loading submission:", error);
      initializeSubmission();
    }
    setIsLoadingExisting(false);
  };

  const initializeSubmission = async () => {
    // Generate a short 8-char code
    const newAccessCode = Math.random().toString(36).substring(2, 10).toUpperCase();

    const initialData = {
      status: "in_progress",
      current_step: 1,
      access_code: newAccessCode
    };

    const payload = prepareSubmissionPayload(initialData);

    const { data: submission, error } = await supabase
      .from('OnboardingSubmission')
      .insert([payload])
      .select()
      .single();

    if (submission) {
      setSubmissionId(submission.id);
      setFormData(initialData);
      // Update URL with access code without reloading
      const newUrl = new URL(window.location);
      newUrl.searchParams.set('code', newAccessCode);
      window.history.pushState({}, '', newUrl);
    } else if (error) {
      console.error("Error initializing submission:", error);
      toast({
        title: "Error starting session",
        description: "Could not create a new submission. Please try again.",
        variant: "destructive",
      });
    }
  };

  const updateFormData = (stepData) => {
    setFormData(prev => ({ ...prev, ...stepData }));
  };

  const handleNext = async () => {
    if (currentStep < STEPS.length) {
      const nextStep = currentStep + 1;
      setCurrentStep(nextStep);
      setVisitedSteps(prev => new Set([...prev, nextStep]));

      if (submissionId) {
        try {
          const payload = prepareSubmissionPayload({
            ...formData,
            current_step: nextStep
          });

          const { error } = await supabase
            .from('OnboardingSubmission')
            .update(payload)
            .eq('id', submissionId);

          if (error) throw error;
        } catch (error) {
          console.error("Error saving progress:", error);
          toast({
            title: "Error saving progress",
            description: "Your changes might not be saved. Please check your connection.",
            variant: "destructive",
          });
        }
      }
    } else {
      await handleSubmit();
    }
  };

  const handleStepClick = async (stepId) => {
    if (visitedSteps.has(stepId)) {
      setCurrentStep(stepId);
      setVisitedSteps(prev => new Set([...prev, stepId]));

      if (submissionId) {
        try {
          const payload = prepareSubmissionPayload({
            ...formData,
            current_step: stepId
          });

          const { error } = await supabase
            .from('OnboardingSubmission')
            .update(payload)
            .eq('id', submissionId);

          if (error) throw error;
        } catch (error) {
          console.error("Error saving progress:", error);
          toast({
            title: "Error saving progress",
            description: "Your changes might not be saved. Please check your connection.",
            variant: "destructive",
          });
        }
      }
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = async () => {
    setIsProcessing(true);

    try {
      const payload = prepareSubmissionPayload({
        ...formData,
        status: "completed"
      });

      const { error } = await supabase
        .from('OnboardingSubmission')
        .update(payload)
        .eq('id', submissionId);

      if (error) throw error;

      navigate(createPageUrl("Success"));
    } catch (error) {
      console.error("Error submitting:", error);
      toast({
        title: "Submission failed",
        description: "There was a problem submitting your information. Please try again.",
        variant: "destructive",
      });
    }

    setIsProcessing(false);
  };

  const CurrentStepComponent = STEPS[currentStep - 1]?.component;
  const progress = (currentStep / STEPS.length) * 100;

  if (!submissionId || isLoadingExisting) {
    return (
      <Layout className="flex items-center justify-center">
        <Loader2 className="w-12 h-12 animate-spin text-primary" />
      </Layout>
    );
  }

  if (!CurrentStepComponent) {
    return (
      <Layout className="flex items-center justify-center">
        <Loader2 className="w-12 h-12 animate-spin text-primary" />
      </Layout>
    );
  }

  // Special case for Step 1 (Welcome) to take full width/height without standard UI chrome
  if (currentStep === 1) {
    return (
      <Layout>
        <CurrentStepComponent
          updateData={updateFormData}
          onNext={handleNext}
        />
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="max-w-5xl mx-auto px-6 py-8 w-full">
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-serif font-bold text-foreground">
              Step {currentStep} <span className="text-muted-foreground font-sans font-normal text-lg">/ {STEPS.length}</span>
            </h2>
            <span className="text-sm font-medium text-primary uppercase tracking-wider">
              {STEPS[currentStep - 1].title}
            </span>
          </div>
          <Progress value={progress} className="h-2 bg-secondary/20" indicatorClassName="bg-primary" />

          <div className="flex justify-between mt-8 overflow-x-auto pb-4 gap-4 no-scrollbar">
            {STEPS.map((step) => {
              const StepIcon = step.icon;
              const isVisited = visitedSteps.has(step.id);
              const isCurrent = step.id === currentStep;

              return (
                <button
                  key={step.id}
                  onClick={() => handleStepClick(step.id)}
                  className={`flex flex-col items-center group min-w-[80px] transition-all ${isVisited ? "opacity-100 cursor-pointer" : "opacity-40 cursor-not-allowed"
                    }`}
                  disabled={!isVisited}
                >
                  <div
                    className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300 relative mb-3 ${isVisited && !isCurrent
                      ? "bg-secondary/20 text-secondary group-hover:bg-secondary/30"
                      : isCurrent
                        ? "bg-primary text-primary-foreground shadow-lg shadow-primary/25 scale-110"
                        : "bg-muted text-muted-foreground"
                      }`}
                  >
                    <StepIcon className="w-5 h-5" />
                    {isVisited && !isCurrent && (
                      <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-background flex items-center justify-center">
                        <Check className="w-2 h-2 text-white" />
                      </div>
                    )}
                  </div>
                  <span className={`text-xs font-medium text-center hidden md:block max-w-[80px] ${isCurrent ? "text-primary" : "text-muted-foreground"}`}>{step.title}</span>
                </button>
              );
            })}
          </div>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, y: 20, filter: 'blur(10px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            exit={{ opacity: 0, y: -20, filter: 'blur(10px)' }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="bg-card/40 backdrop-blur-xl border border-white/5 rounded-3xl shadow-2xl p-8 md:p-12 mb-8 relative overflow-hidden"
          >
            {/* Subtle inner glow */}
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary/50 to-transparent opacity-50" />

            <CurrentStepComponent
              data={formData}
              updateData={updateFormData}
            />
          </motion.div>
        </AnimatePresence>

        <div className="flex justify-between items-center pt-4">
          <Button
            variant="ghost"
            size="lg"
            onClick={handleBack}
            disabled={currentStep === 1 || isProcessing}
            className="rounded-full px-8 text-muted-foreground hover:text-foreground hover:bg-white/5"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back
          </Button>

          <Button
            size="lg"
            onClick={handleNext}
            disabled={isProcessing}
            className="bg-primary text-primary-foreground hover:bg-primary/90 px-10 py-6 rounded-full shadow-lg shadow-primary/20 text-lg font-medium transition-all hover:scale-105 active:scale-95"
          >
            {isProcessing ? (
              <Loader2 className="w-5 h-5 mr-2 animate-spin" />
            ) : currentStep === STEPS.length ? (
              "Complete Submission"
            ) : (
              <>
                Continue
                <ArrowRight className="w-5 h-5 ml-2" />
              </>
            )}
          </Button>
        </div>
      </div>
    </Layout>
  );
}