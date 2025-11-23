import React, { useEffect } from "react";
import { Label } from "@/shared/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/shared/components/ui/radio-group";
import { Checkbox } from "@/shared/components/ui/checkbox";
import { Users, Baby, Dog, PartyPopper } from "lucide-react";

export default function StepLifestyle({ data, updateData }) {
  useEffect(() => {
    if (!data.household_size) {
      updateData({
        household_size: "",
        has_children: false,
        has_pets: false,
        entertainment_frequency: "",
      });
    }
  }, []);

  return (
    <div className="space-y-8">
      <div>
        <h3 className="text-3xl font-bold text-gray-900 mb-3">Your Lifestyle</h3>
        <p className="text-gray-600 text-lg">
          Understanding how you live helps us design the perfect space for you.
        </p>
      </div>

      <div className="space-y-8">
        {/* Household Size */}
        <div className="space-y-4">
          <Label className="text-base font-medium flex items-center gap-2">
            <Users className="w-5 h-5 text-cyan-600" />
            Household Size
          </Label>
          <RadioGroup
            value={data.household_size || ""}
            onValueChange={(value) => updateData({ household_size: value })}
          >
            {["1-2 people", "3-4 people", "5+ people"].map((size) => (
              <div key={size} className="flex items-center space-x-3 p-4 rounded-xl border-2 border-gray-200 hover:border-cyan-300 transition-all">
                <RadioGroupItem value={size} id={size} />
                <Label htmlFor={size} className="flex-1 cursor-pointer font-medium">
                  {size}
                </Label>
              </div>
            ))}
          </RadioGroup>
        </div>

        {/* Children & Pets */}
        <div className="space-y-4">
          <Label className="text-base font-medium">Family Members</Label>
          <div className="space-y-3">
            <div
              onClick={() => updateData({ has_children: !data.has_children })}
              className={`flex items-center space-x-3 p-4 rounded-xl border-2 cursor-pointer transition-all ${
                data.has_children
                  ? "border-cyan-600 bg-cyan-50"
                  : "border-gray-200 hover:border-gray-300"
              }`}
            >
              <Checkbox
                checked={data.has_children || false}
                onCheckedChange={(checked) => updateData({ has_children: checked })}
              />
              <Baby className="w-5 h-5 text-cyan-600" />
              <span className="font-medium">We have children</span>
            </div>

            <div
              onClick={() => updateData({ has_pets: !data.has_pets })}
              className={`flex items-center space-x-3 p-4 rounded-xl border-2 cursor-pointer transition-all ${
                data.has_pets
                  ? "border-cyan-600 bg-cyan-50"
                  : "border-gray-200 hover:border-gray-300"
              }`}
            >
              <Checkbox
                checked={data.has_pets || false}
                onCheckedChange={(checked) => updateData({ has_pets: checked })}
              />
              <Dog className="w-5 h-5 text-cyan-600" />
              <span className="font-medium">We have pets</span>
            </div>
          </div>
        </div>

        {/* Entertainment */}
        <div className="space-y-4">
          <Label className="text-base font-medium flex items-center gap-2">
            <PartyPopper className="w-5 h-5 text-cyan-600" />
            How often do you entertain guests?
          </Label>
          <RadioGroup
            value={data.entertainment_frequency || ""}
            onValueChange={(value) => updateData({ entertainment_frequency: value })}
          >
            {[
              "Weekly or more",
              "Monthly",
              "A few times a year",
              "Rarely",
            ].map((freq) => (
              <div key={freq} className="flex items-center space-x-3 p-4 rounded-xl border-2 border-gray-200 hover:border-cyan-300 transition-all">
                <RadioGroupItem value={freq} id={freq} />
                <Label htmlFor={freq} className="flex-1 cursor-pointer font-medium">
                  {freq}
                </Label>
              </div>
            ))}
          </RadioGroup>
        </div>

        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
          <p className="text-sm text-blue-900">
            <strong>Privacy & Research:</strong> We'll research publicly available information to better 
            understand your interests and preferences. This helps us create a truly personalized design.
          </p>
        </div>
      </div>
    </div>
  );
}