import React, { useEffect } from "react";
import { Textarea } from "@/shared/components/ui/textarea";
import { Label } from "@/shared/components/ui/label";
import { Checkbox } from "@/shared/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/shared/components/ui/select";
import { Input } from "@/shared/components/ui/input";
import { Lightbulb, Users, Baby, Dog, PartyPopper, Waves } from "lucide-react";

const PRIMARY_USES = [
  "Exercise & Fitness",
  "Family Time",
  "Entertaining Guests",
  "Relaxation & Spa",
  "Kids Play Area",
  "Lap Swimming",
];

const ENTERTAINMENT_FREQUENCIES = [
  "Weekly or more",
  "Monthly",
  "A few times a year",
  "Rarely"
];

const AGE_RANGES = [
  "0-5 years",
  "6-12 years",
  "13-17 years",
  "18+ years"
];

export default function StepLifestyleVision({ data, updateData }) {
  const decisionMakerCount = parseInt(data.decision_maker_count || "1");

  useEffect(() => {
    if (!data.pool_vision) {
      updateData({
        pool_vision: "",
        primary_use_person1: [],
        primary_use_person2: [],
        household_size: "",
        has_children: false,
        children_ages: [],
        has_pets: false,
        entertainment_frequency: "",
      });
    }
  }, []);

  const toggleUsePerson1 = (use) => {
    const currentUses = data.primary_use_person1 || [];
    if (currentUses.includes(use)) {
      updateData({ primary_use_person1: currentUses.filter(u => u !== use) });
    } else {
      updateData({ primary_use_person1: [...currentUses, use] });
    }
  };

  const toggleUsePerson2 = (use) => {
    const currentUses = data.primary_use_person2 || [];
    if (currentUses.includes(use)) {
      updateData({ primary_use_person2: currentUses.filter(u => u !== use) });
    } else {
      updateData({ primary_use_person2: [...currentUses, use] });
    }
  };

  const toggleAgeRange = (range) => {
    const currentAges = data.children_ages || [];
    if (currentAges.includes(range)) {
      updateData({ children_ages: currentAges.filter(a => a !== range) });
    } else {
      updateData({ children_ages: [...currentAges, range] });
    }
  };

  const person1Name = data.decision_makers?.[0]?.first_name || "Person 1";
  const person2Name = data.decision_makers?.[1]?.first_name || "Person 2";

  return (
    <div className="space-y-6">
      {/* Hero Image - Reduced margin */}
      <div className="relative h-48 rounded-2xl overflow-hidden mb-4">
        <img
          src="https://timelesspools.us/wp-content/uploads/2025/03/Geometric-Pool-with-Spa.jpg"
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
      <div className="space-y-3">
        <Label htmlFor="vision" className="text-xl font-semibold flex items-center gap-2 text-gray-900">
          <Lightbulb className="w-5 h-5 text-teal-700" />
          Your Dream Outdoor Space
        </Label>
        <Textarea
          id="vision"
          placeholder="Describe your vision... What does your perfect outdoor oasis look like? How does it make you feel? What activities do you imagine happening here?"
          value={data.pool_vision || ""}
          onChange={(e) => updateData({ pool_vision: e.target.value })}
          className="min-h-[140px] text-base"
        />
        <p className="text-sm text-gray-500">Paint us a picture with your words - there are no wrong answers.</p>
      </div>

      {/* Primary Uses - Per Person */}
      <div className="space-y-4">
        <Label className="text-xl font-semibold flex items-center gap-2 text-gray-900">
          <Waves className="w-5 h-5 text-teal-700" />
          Primary Uses
        </Label>
        <p className="text-sm text-gray-600">Select all that apply for each person</p>

        {/* Person 1 */}
        <div className="space-y-3">
          <h5 className="font-semibold text-gray-900">{person1Name}</h5>
          <div className="grid md:grid-cols-2 gap-3">
            {PRIMARY_USES.map((use) => (
              <div
                key={`p1-${use}`}
                onClick={() => toggleUsePerson1(use)}
                className={`flex items-center space-x-3 p-3 rounded-xl border-2 cursor-pointer transition-all ${(data.primary_use_person1 || []).includes(use)
                    ? "border-teal-700 bg-teal-50"
                    : "border-gray-200 hover:border-gray-300"
                  }`}
              >
                <Checkbox
                  checked={(data.primary_use_person1 || []).includes(use)}
                  onCheckedChange={() => toggleUsePerson1(use)}
                />
                <span className="font-medium text-sm">{use}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Person 2 (if applicable) */}
        {decisionMakerCount === 2 && (
          <div className="space-y-3">
            <h5 className="font-semibold text-gray-900">{person2Name}</h5>
            <div className="grid md:grid-cols-2 gap-3">
              {PRIMARY_USES.map((use) => (
                <div
                  key={`p2-${use}`}
                  onClick={() => toggleUsePerson2(use)}
                  className={`flex items-center space-x-3 p-3 rounded-xl border-2 cursor-pointer transition-all ${(data.primary_use_person2 || []).includes(use)
                      ? "border-teal-700 bg-teal-50"
                      : "border-gray-200 hover:border-gray-300"
                    }`}
                >
                  <Checkbox
                    checked={(data.primary_use_person2 || []).includes(use)}
                    onCheckedChange={() => toggleUsePerson2(use)}
                  />
                  <span className="font-medium text-sm">{use}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Lifestyle Section */}
      <div className="space-y-6 border-t pt-6">
        <h4 className="text-xl font-semibold text-gray-900">Your Lifestyle</h4>

        {/* Household Size & Family Members Combined */}
        <div className="grid md:grid-cols-2 gap-6">
          {/* Household Size */}
          <div className="space-y-3">
            <Label className="text-base font-medium flex items-center gap-2">
              <Users className="w-5 h-5 text-teal-700" />
              Household Size
            </Label>
            <Select
              value={data.household_size || ""}
              onValueChange={(value) => updateData({ household_size: value })}
            >
              <SelectTrigger className="h-12">
                <SelectValue placeholder="Select household size" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1-2 people">1-2 people</SelectItem>
                <SelectItem value="3-4 people">3-4 people</SelectItem>
                <SelectItem value="5+ people">5+ people</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Family Members */}
          <div className="space-y-3">
            <Label className="text-base font-medium">Family Members</Label>
            <div className="flex gap-3">
              <div
                onClick={() => updateData({ has_children: !data.has_children })}
                className={`flex-1 flex items-center justify-center space-x-2 p-3 rounded-xl border-2 cursor-pointer transition-all ${data.has_children
                    ? "border-teal-700 bg-teal-50"
                    : "border-gray-200 hover:border-gray-300"
                  }`}
              >
                <Checkbox
                  checked={data.has_children || false}
                  onCheckedChange={(checked) => updateData({ has_children: checked })}
                />
                <Baby className="w-5 h-5 text-teal-700" />
                <span className="font-medium text-sm">Children</span>
              </div>

              <div
                onClick={() => updateData({ has_pets: !data.has_pets })}
                className={`flex-1 flex items-center justify-center space-x-2 p-3 rounded-xl border-2 cursor-pointer transition-all ${data.has_pets
                    ? "border-teal-700 bg-teal-50"
                    : "border-gray-200 hover:border-gray-300"
                  }`}
              >
                <Checkbox
                  checked={data.has_pets || false}
                  onCheckedChange={(checked) => updateData({ has_pets: checked })}
                />
                <Dog className="w-5 h-5 text-teal-700" />
                <span className="font-medium text-sm">Pets</span>
              </div>
            </div>
          </div>
        </div>

        {/* Children Age Ranges (if has_children) */}
        {data.has_children && (
          <div className="space-y-3 p-4 bg-teal-50 rounded-xl border-2 border-teal-200">
            <Label className="text-base font-medium">Children's Age Ranges</Label>
            <p className="text-sm text-teal-900">Select all that apply</p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {AGE_RANGES.map((range) => (
                <div
                  key={range}
                  onClick={() => toggleAgeRange(range)}
                  className={`flex items-center space-x-2 p-3 rounded-lg border-2 cursor-pointer transition-all ${(data.children_ages || []).includes(range)
                      ? "border-teal-700 bg-white"
                      : "border-teal-300 hover:border-teal-500 bg-white"
                    }`}
                >
                  <Checkbox
                    checked={(data.children_ages || []).includes(range)}
                    onCheckedChange={() => toggleAgeRange(range)}
                  />
                  <span className="font-medium text-sm">{range}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Entertainment - Compact Side-by-Side */}
        <div className="space-y-3">
          <Label className="text-base font-medium flex items-center gap-2">
            <PartyPopper className="w-5 h-5 text-teal-700" />
            How often do you entertain?
          </Label>
          <Select
            value={data.entertainment_frequency || ""}
            onValueChange={(value) => updateData({ entertainment_frequency: value })}
          >
            <SelectTrigger className="h-12">
              <SelectValue placeholder="Select frequency" />
            </SelectTrigger>
            <SelectContent>
              {ENTERTAINMENT_FREQUENCIES.map((freq) => (
                <SelectItem key={freq} value={freq}>{freq}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="relative h-32 rounded-xl overflow-hidden">
        <img
          src="https://timelesspools.us/wp-content/uploads/2024/06/H-27.jpg"
          alt="Family enjoying pool"
          className="w-full h-full object-cover opacity-80"
        />
      </div>
    </div>
  );
}