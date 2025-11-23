import React, { useEffect } from "react";
import { Textarea } from "@/shared/components/ui/textarea";
import { Label } from "@/shared/components/ui/label";
import { Checkbox } from "@/shared/components/ui/checkbox";
import { Lightbulb, Sparkles } from "lucide-react";

const PRIMARY_USES = [
  "Exercise & Fitness",
  "Family Time",
  "Entertaining Guests",
  "Relaxation & Spa",
  "Kids Play Area",
  "Lap Swimming",
];

export default function StepVision({ data, updateData }) {
  useEffect(() => {
    if (!data.pool_vision) {
      updateData({
        pool_vision: "",
        primary_use: [],
      });
    }
  }, []);

  const toggleUse = (use) => {
    const currentUses = data.primary_use || [];
    if (currentUses.includes(use)) {
      updateData({ primary_use: currentUses.filter(u => u !== use) });
    } else {
      updateData({ primary_use: [...currentUses, use] });
    }
  };

  return (
    <div className="space-y-8">
      <div>
        <h3 className="text-3xl font-bold text-gray-900 mb-3">Your Vision</h3>
        <p className="text-gray-600 text-lg">
          Help us understand what you're dreaming of. There are no wrong answers!
        </p>
      </div>

      <div className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="vision" className="text-base font-medium flex items-center gap-2">
            <Lightbulb className="w-4 h-4 text-cyan-600" />
            Describe Your Dream Pool & Outdoor Space
          </Label>
          <Textarea
            id="vision"
            placeholder="I envision a resort-style pool with a waterfall feature, surrounded by tropical landscaping. I want it to feel like a vacation retreat where we can relax after work and entertain on weekends..."
            value={data.pool_vision || ""}
            onChange={(e) => updateData({ pool_vision: e.target.value })}
            className="min-h-[180px] text-base"
          />
          <p className="text-sm text-gray-500">Be as detailed as you'd like - this helps us create something truly unique for you.</p>
        </div>

        <div className="space-y-4">
          <Label className="text-base font-medium flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-cyan-600" />
            Primary Uses (Select all that apply)
          </Label>
          <div className="grid md:grid-cols-2 gap-4">
            {PRIMARY_USES.map((use) => (
              <div
                key={use}
                onClick={() => toggleUse(use)}
                className={`flex items-center space-x-3 p-4 rounded-xl border-2 cursor-pointer transition-all ${
                  (data.primary_use || []).includes(use)
                    ? "border-cyan-600 bg-cyan-50"
                    : "border-gray-200 hover:border-gray-300"
                }`}
              >
                <Checkbox
                  checked={(data.primary_use || []).includes(use)}
                  onCheckedChange={() => toggleUse(use)}
                />
                <span className="font-medium">{use}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}