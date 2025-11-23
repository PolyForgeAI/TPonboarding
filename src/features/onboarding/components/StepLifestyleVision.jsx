import React, { useEffect } from "react";
import { Textarea } from "@/shared/components/ui/textarea";
import { Label } from "@/shared/components/ui/label";
import { Checkbox } from "@/shared/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/shared/components/ui/radio-group";
import { Lightbulb, Users, Baby, Dog, PartyPopper, Waves } from "lucide-react";

const PRIMARY_USES = [
  "Exercise & Fitness",
  "Family Time",
  "Entertaining Guests",
  "Relaxation & Spa",
  "Kids Play Area",
  "Lap Swimming",
];

export default function StepLifestyleVision({ data, updateData }) {
  useEffect(() => {
    if (!data.pool_vision) {
      updateData({
        pool_vision: "",
        primary_use: [],
        household_size: "",
        has_children: false,
        has_pets: false,
        entertainment_frequency: "",
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
      {/* Hero Image */}
      <div className="relative h-48 rounded-2xl overflow-hidden mb-6">
        <img 
          src="https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1200&q=80" 
          alt="Luxury pool lifestyle"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/70 to-transparent flex items-end p-6">
          <h3 className="text-3xl font-bold text-white">Lifestyle, Vision & Usage</h3>
        </div>
      </div>

      <p className="text-gray-600 text-lg">
        Help us understand how you live and what you envision for your outdoor retreat.
      </p>

      {/* Vision */}
      <div className="space-y-4">
        <Label htmlFor="vision" className="text-xl font-semibold flex items-center gap-2 text-gray-900">
          <Lightbulb className="w-5 h-5 text-teal-700" />
          Your Dream Outdoor Space
        </Label>
        <Textarea
          id="vision"
          placeholder="Describe your vision... What does your perfect outdoor oasis look like? How does it make you feel? What activities do you imagine happening here?"
          value={data.pool_vision || ""}
          onChange={(e) => updateData({ pool_vision: e.target.value })}
          className="min-h-[180px] text-base"
        />
        <p className="text-sm text-gray-500">Paint us a picture with your words - there are no wrong answers.</p>
      </div>

      {/* Primary Uses */}
      <div className="space-y-4">
        <Label className="text-xl font-semibold flex items-center gap-2 text-gray-900">
          <Waves className="w-5 h-5 text-teal-700" />
          Primary Uses (Select all that apply)
        </Label>
        <div className="grid md:grid-cols-2 gap-3">
          {PRIMARY_USES.map((use) => (
            <div
              key={use}
              onClick={() => toggleUse(use)}
              className={`flex items-center space-x-3 p-4 rounded-xl border-2 cursor-pointer transition-all ${
                (data.primary_use || []).includes(use)
                  ? "border-teal-700 bg-teal-50"
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

      {/* Lifestyle Section */}
      <div className="space-y-6 border-t pt-8">
        <h4 className="text-xl font-semibold text-gray-900">Your Lifestyle</h4>

        {/* Household Size */}
        <div className="space-y-3">
          <Label className="text-base font-medium flex items-center gap-2">
            <Users className="w-5 h-5 text-teal-700" />
            Household Size
          </Label>
          <RadioGroup
            value={data.household_size || ""}
            onValueChange={(value) => updateData({ household_size: value })}
            className="grid md:grid-cols-3 gap-3"
          >
            {["1-2 people", "3-4 people", "5+ people"].map((size) => (
              <div key={size} className="relative">
                <RadioGroupItem value={size} id={size} className="sr-only peer" />
                <Label
                  htmlFor={size}
                  className="flex items-center justify-center p-4 rounded-xl border-2 border-gray-200 cursor-pointer peer-data-[state=checked]:border-teal-700 peer-data-[state=checked]:bg-teal-50 hover:border-gray-300 transition-all font-medium"
                >
                  {size}
                </Label>
              </div>
            ))}
          </RadioGroup>
        </div>

        {/* Children & Pets */}
        <div className="space-y-3">
          <Label className="text-base font-medium">Family Members</Label>
          <div className="grid md:grid-cols-2 gap-3">
            <div
              onClick={() => updateData({ has_children: !data.has_children })}
              className={`flex items-center space-x-3 p-4 rounded-xl border-2 cursor-pointer transition-all ${
                data.has_children
                  ? "border-teal-700 bg-teal-50"
                  : "border-gray-200 hover:border-gray-300"
              }`}
            >
              <Checkbox
                checked={data.has_children || false}
                onCheckedChange={(checked) => updateData({ has_children: checked })}
              />
              <Baby className="w-5 h-5 text-teal-700" />
              <span className="font-medium">We have children</span>
            </div>

            <div
              onClick={() => updateData({ has_pets: !data.has_pets })}
              className={`flex items-center space-x-3 p-4 rounded-xl border-2 cursor-pointer transition-all ${
                data.has_pets
                  ? "border-teal-700 bg-teal-50"
                  : "border-gray-200 hover:border-gray-300"
              }`}
            >
              <Checkbox
                checked={data.has_pets || false}
                onCheckedChange={(checked) => updateData({ has_pets: checked })}
              />
              <Dog className="w-5 h-5 text-teal-700" />
              <span className="font-medium">We have pets</span>
            </div>
          </div>
        </div>

        {/* Entertainment */}
        <div className="space-y-3">
          <Label className="text-base font-medium flex items-center gap-2">
            <PartyPopper className="w-5 h-5 text-teal-700" />
            How often do you entertain?
          </Label>
          <RadioGroup
            value={data.entertainment_frequency || ""}
            onValueChange={(value) => updateData({ entertainment_frequency: value })}
          >
            {["Weekly or more", "Monthly", "A few times a year", "Rarely"].map((freq) => (
              <div key={freq} className="flex items-center space-x-3 p-4 rounded-xl border-2 border-gray-200 hover:border-teal-700 hover:bg-teal-50 transition-all">
                <RadioGroupItem value={freq} id={freq} />
                <Label htmlFor={freq} className="flex-1 cursor-pointer font-medium">
                  {freq}
                </Label>
              </div>
            ))}
          </RadioGroup>
        </div>
      </div>

      <div className="relative h-32 rounded-xl overflow-hidden">
        <img 
          src="https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?w=1200&q=80" 
          alt="Family enjoying pool"
          className="w-full h-full object-cover opacity-80"
        />
      </div>
    </div>
  );
}