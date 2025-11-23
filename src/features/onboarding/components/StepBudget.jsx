import React, { useEffect, useState } from "react";
import { Label } from "@/shared/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/shared/components/ui/radio-group";
import { Textarea } from "@/shared/components/ui/textarea";
import { DollarSign, Calendar, MessageSquare } from "lucide-react";
import ConsentCheckboxes from "./ConsentCheckboxes";

const BUDGET_RANGES = [
  "$50,000 - $75,000",
  "$75,000 - $100,000",
  "$100,000 - $150,000",
  "$150,000 - $200,000",
  "$200,000 - $300,000",
  "$300,000+",
  "Not sure yet",
];

const TIMELINES = [
  "As soon as possible",
  "Within 3 months",
  "3-6 months",
  "6-12 months",
  "Just exploring options",
];

export default function StepBudget({ data, updateData }) {
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
      <div>
        <h3 className="text-3xl font-bold text-gray-900 mb-3">Budget & Timeline</h3>
        <p className="text-gray-600 text-lg">
          Help us create options that align with your investment preferences.
        </p>
      </div>

      <div className="space-y-8">
        {/* Budget */}
        <div className="space-y-4">
          <Label className="text-base font-medium flex items-center gap-2">
            <DollarSign className="w-5 h-5 text-cyan-600" />
            Investment Budget
          </Label>
          <RadioGroup
            value={data.budget_range || ""}
            onValueChange={(value) => updateData({ budget_range: value })}
          >
            {BUDGET_RANGES.map((range) => (
              <div
                key={range}
                className="flex items-center space-x-3 p-4 rounded-xl border-2 border-gray-200 hover:border-cyan-300 transition-all"
              >
                <RadioGroupItem value={range} id={range} />
                <Label htmlFor={range} className="flex-1 cursor-pointer font-medium">
                  {range}
                </Label>
              </div>
            ))}
          </RadioGroup>
        </div>

        {/* Timeline */}
        <div className="space-y-4">
          <Label className="text-base font-medium flex items-center gap-2">
            <Calendar className="w-5 h-5 text-cyan-600" />
            Desired Timeline
          </Label>
          <RadioGroup
            value={data.timeline || ""}
            onValueChange={(value) => updateData({ timeline: value })}
          >
            {TIMELINES.map((timeline) => (
              <div
                key={timeline}
                className="flex items-center space-x-3 p-4 rounded-xl border-2 border-gray-200 hover:border-cyan-300 transition-all"
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
        <div className="space-y-2">
          <Label htmlFor="notes" className="text-base font-medium flex items-center gap-2">
            <MessageSquare className="w-5 h-5 text-cyan-600" />
            Anything Else We Should Know?
          </Label>
          <Textarea
            id="notes"
            placeholder="Any specific concerns, questions, or additional information..."
            value={data.additional_notes || ""}
            onChange={(e) => updateData({ additional_notes: e.target.value })}
            className="min-h-[120px] text-base"
          />
        </div>

        {/* Consent Checkboxes */}
        <ConsentCheckboxes consents={consents} updateConsents={updateConsents} />

        <div className="bg-gradient-to-r from-cyan-50 to-blue-50 border border-cyan-200 rounded-xl p-6">
          <h4 className="font-bold text-lg text-gray-900 mb-2">What Happens Next?</h4>
          <ul className="space-y-2 text-sm text-gray-700">
            <li className="flex items-start gap-2">
              <span className="text-cyan-600 font-bold">1.</span>
              <span>We'll research property details using public records and GIS data</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-cyan-600 font-bold">2.</span>
              <span>Generate 3 custom design concepts using Timeless Pools methodology</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-cyan-600 font-bold">3.</span>
              <span>Create comprehensive 50-100 page Genesis Project Dossier</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-cyan-600 font-bold">4.</span>
              <span>Contact you within 48 hours to discuss your concepts</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}