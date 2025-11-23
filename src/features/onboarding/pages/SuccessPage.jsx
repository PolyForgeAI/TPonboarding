import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { Button } from "@/shared/components/ui/button";
import { Card, CardContent } from "@/shared/components/ui/card";
import { motion } from "framer-motion";
import { CheckCircle, ArrowRight, Heart, Calendar, Phone } from "lucide-react";
import { BRANDING } from "@/shared/components/branding/Constants";

export default function Success() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50 py-12 px-6">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center justify-center w-32 h-32 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-full shadow-2xl mb-6">
            <CheckCircle className="w-20 h-20 text-white" />
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-slate-900 mb-4 tracking-tight">
            Thank You!
          </h1>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            We've received your project details and really appreciate you taking the time to share your vision with us.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Card className="shadow-2xl border-none mb-8">
            <CardContent className="p-8">
              <div className="flex items-start gap-4 mb-6">
                <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-full flex items-center justify-center">
                  <Heart className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-slate-900 mb-3">What Happens Next</h3>
                  <p className="text-slate-700 text-lg mb-4">
                    Our team will review your information and reach out within 1-2 business days to discuss your project and see if we're a good fit to work together.
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                <NextStepItem
                  icon={<Calendar className="w-5 h-5" />}
                  title="We'll Review Your Info"
                  description="Our team will carefully review your vision, property details, and preferences."
                  timeframe="1 Business Day"
                />
                <NextStepItem
                  icon={<Phone className="w-5 h-5" />}
                  title="We'll Reach Out"
                  description="We'll call or email within 1-2 business days to discuss your project and answer any questions."
                  timeframe="1-2 Business Days"
                />
                <NextStepItem
                  icon={<Heart className="w-5 h-5" />}
                  title="No Pressure"
                  description="This is just a conversation. There's no obligation to move forward unless we're both excited."
                  timeframe="Always"
                />
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="p-8 bg-white rounded-2xl shadow-2xl mb-8 text-center"
        >
          <h3 className="text-2xl font-bold text-slate-900 mb-3">Questions in the Meantime?</h3>
          <p className="text-slate-700 mb-4">
            Feel free to reach out anytime. We're here to help.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center text-slate-600">
            <a href={`tel:${BRANDING.company_phone}`} className="hover:text-cyan-600 transition-colors">
              📞 {BRANDING.company_phone}
            </a>
            <span className="hidden sm:inline">•</span>
            <a href={`mailto:${BRANDING.company_email}`} className="hover:text-cyan-600 transition-colors">
              ✉️ {BRANDING.company_email}
            </a>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="flex justify-center"
        >
          <Button
            size="lg"
            onClick={() => navigate("/")}
            variant="outline"
            className="px-12 py-6 text-lg rounded-full border-2"
          >
            Return Home
            <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
        </motion.div>
      </div>
    </div>
  );
}

function NextStepItem({ icon, title, description, timeframe }) {
  return (
    <div className="flex items-start gap-4 p-4 bg-slate-50 rounded-xl">
      <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-full flex items-center justify-center text-white">
        {icon}
      </div>
      <div className="flex-1">
        <div className="flex items-center justify-between mb-1">
          <h4 className="font-bold text-slate-900">{title}</h4>
          <span className="text-xs text-slate-500 font-medium">{timeframe}</span>
        </div>
        <p className="text-sm text-slate-600">{description}</p>
      </div>
    </div>
  );
}