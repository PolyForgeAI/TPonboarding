import React, { useEffect, useState } from "react";
import { Label } from "@/shared/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/shared/components/ui/radio-group";
import { Textarea } from "@/shared/components/ui/textarea";
import { Input } from "@/shared/components/ui/input";
import { DollarSign, Calendar, MessageSquare, HelpCircle } from "lucide-react";

const BUDGET_RANGES = [
  "$50,000 - $75,000",
  "$75,000 - $100,000",
  "$100,000 - $150,000",
  "$150,000 - $200,000",
  "$200,000 - $300,000",
  "$300,000 - $400,000",
  "$400,000 - $500,000",
  "$500,000+",
  "Not sure yet",
];

const TIMELINES = [
  "As soon as possible",
  "Within 3 months",
  "3-6 months",
  "Just exploring options",
];

export default function StepInvestment({ data, updateData }) {
  const [consents, setConsents] = useState({
    property_research: true,
    customer_research: false,
    inspiration_photos: true,
    data_accuracy: false,
  });

  useEffect(() => {
    if (!data.budget_range) {
      updateData({
        budget_range: "",
        timeline: "",
        additional_notes: "",
        consents: consents,
      });
    }
  }, []);

  const updateConsents = (newConsents) => {
    setConsents(newConsents);
    updateData({ consents: newConsents });
  };

  return (
    <div className="space-y-8">
      {/* Hero Image */}
      <div className="relative h-48 rounded-2xl overflow-hidden mb-4">
        <img
          src="https://timelesspools.us/wp-content/uploads/2025/03/1920-AB-10.jpg"
          alt="Investment in quality craftsmanship"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/70 to-transparent flex items-end p-6">
          <h3 className="text-3xl font-bold text-white">Let's Talk Investment</h3>
        </div>
      </div>

      <div className="bg-teal-50 border-l-4 border-teal-700 p-6 rounded-lg">
        <p className="text-gray-700 text-lg leading-relaxed">
          Understanding your investment range helps our design team prioritize features and materials that matter most to you.
          This ensures we create solutions that work beautifully within your budget—or transparently explain why certain elements
          may require adjustments. Think of this as a conversation starter, not a commitment.
        </p>
      </div>

      {/* Budget */}
      <div className="space-y-4">
        <Label className="text-xl font-semibold flex items-center gap-2 text-gray-900">
          <DollarSign className="w-5 h-5 text-teal-700" />
          Investment Budget
        </Label>
        <select
          value={data.budget_range || ""}
          onChange={(e) => updateData({ budget_range: e.target.value })}
          className="w-full h-14 text-lg border-2 border-gray-300 rounded-md px-3 focus:border-teal-700 transition-all bg-white"
        >
          <option value="" disabled>Select your investment range</option>
          {BUDGET_RANGES.map((range) => (
            <option key={range} value={range}>
              {range}
            </option>
          ))}
        </select>
      </div>

      {/* Budget Questions */}
      <div className="space-y-3">
        <Label htmlFor="budget_questions" className="text-base font-semibold flex items-center gap-2 text-gray-900">
          <HelpCircle className="w-5 h-5 text-teal-700" />
          Questions About Budget or Pricing?
        </Label>
        <Textarea
          id="budget_questions"
          placeholder="Any questions about budget, financing, or what's included in different price ranges?"
          value={data.budget_questions || ""}
          onChange={(e) => updateData({ budget_questions: e.target.value })}
          className="min-h-[100px] text-base"
        />
      </div>

      {/* Financing */}
      <div className="space-y-4">
        <Label className="text-xl font-semibold flex items-center gap-2 text-gray-900">
          Would you like to explore financing options?
        </Label>
        <RadioGroup
          value={data.financing_interest || ""}
          onValueChange={(value) => updateData({ financing_interest: value })}
          className="space-y-2"
        >
          <div className="flex items-center space-x-3 p-4 rounded-xl border-2 border-gray-200 hover:border-teal-700 hover:bg-teal-50 transition-all">
            <RadioGroupItem value="yes" id="financing-yes" />
            <Label htmlFor="financing-yes" className="flex-1 cursor-pointer font-medium">
              Yes, I'd like to learn about financing
            </Label>
          </div>
          <div className="flex items-center space-x-3 p-4 rounded-xl border-2 border-gray-200 hover:border-teal-700 hover:bg-teal-50 transition-all">
            <RadioGroupItem value="no" id="financing-no" />
            <Label htmlFor="financing-no" className="flex-1 cursor-pointer font-medium">
              No, I'm planning to pay directly
            </Label>
          </div>
        </RadioGroup>
      </div>

      {/* Timeline */}
      <div className="space-y-4">
        <Label className="text-xl font-semibold flex items-center gap-2 text-gray-900">
          <Calendar className="w-5 h-5 text-teal-700" />
          Desired Timeline
        </Label>
        <RadioGroup
          value={data.timeline || ""}
          onValueChange={(value) => updateData({ timeline: value })}
          className="space-y-2"
        >
          {TIMELINES.map((timeline) => (
            <div
              key={timeline}
              className="flex items-center space-x-3 p-4 rounded-xl border-2 border-gray-200 hover:border-teal-700 hover:bg-teal-50 transition-all"
            >
              <RadioGroupItem value={timeline} id={timeline} />
              <Label htmlFor={timeline} className="flex-1 cursor-pointer font-medium">
                {timeline}
              </Label>
            </div>
          ))}
        </RadioGroup>
      </div>

      {/* Additional Notes */}
      <div className="space-y-3">
        <Label htmlFor="notes" className="text-base font-semibold flex items-center gap-2 text-gray-900">
          <MessageSquare className="w-5 h-5 text-teal-700" />
          What else can you share that helps us help you?
        </Label>
        <Textarea
          id="notes"
          placeholder="Any concerns, priorities, or context that will help us design the perfect space for you..."
          value={data.additional_notes || ""}
          onChange={(e) => updateData({ additional_notes: e.target.value })}
          className="min-h-[120px] text-base"
        />
      </div>

      <div className="relative h-32 rounded-xl overflow-hidden">
        <img
          src="https://timelesspools.us/wp-content/uploads/2024/08/E-14.jpg"
          alt="Quality investment"
          className="w-full h-full object-cover opacity-80"
        />
      </div>
    </div>
  );
}