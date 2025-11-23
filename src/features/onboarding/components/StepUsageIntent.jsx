import React, { useEffect } from "react";
import { Label } from "@/shared/components/ui/label";
import { Checkbox } from "@/shared/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/shared/components/ui/radio-group";
import { Snowflake, Moon, Users, Leaf, Sun } from "lucide-react";

export default function StepUsageIntent({ data, updateData }) {
  useEffect(() => {
    if (!data.usage_intent) {
      updateData({
        usage_intent: {
          winter_use: false,
          primary_nighttime_use: false,
          entertaining_guests_count: "",
          elderly_accessibility: false,
          pet_friendly: false,
          exercise_lap_swimming: false,
          children_play_area: false,
          landscaping_preference: "",
          lighting_importance: "",
        },
      });
    }
  }, []);

  const updateUsageIntent = (key, value) => {
    updateData({
      usage_intent: {
        ...(data.usage_intent || {}),
        [key]: value,
      },
    });
  };

  const usageIntent = data.usage_intent || {};

  return (
    <div className="space-y-8">
      <div>
        <h3 className="text-3xl font-bold text-gray-900 mb-3">How You'll Use Your Space</h3>
        <p className="text-gray-600 text-lg">
          Understanding your intended use helps us design for functionality and experience.
        </p>
      </div>

      <div className="space-y-8">
        {/* Usage Scenarios */}
        <div className="space-y-4">
          <Label className="text-lg font-semibold text-gray-900">Primary Usage Scenarios</Label>
          
          <div
            onClick={() => updateUsageIntent("winter_use", !usageIntent.winter_use)}
            className={`flex items-center space-x-3 p-4 rounded-xl border-2 cursor-pointer transition-all ${
              usageIntent.winter_use
                ? "border-blue-500 bg-blue-50"
                : "border-gray-200 hover:border-gray-300"
            }`}
          >
            <Checkbox
              checked={usageIntent.winter_use || false}
              onCheckedChange={(checked) => updateUsageIntent("winter_use", checked)}
            />
            <Snowflake className="w-5 h-5 text-blue-600" />
            <div className="flex-1">
              <span className="font-medium">Winter Use Anticipated</span>
              <p className="text-sm text-gray-600">Pool will be used during colder months</p>
            </div>
          </div>

          <div
            onClick={() => updateUsageIntent("primary_nighttime_use", !usageIntent.primary_nighttime_use)}
            className={`flex items-center space-x-3 p-4 rounded-xl border-2 cursor-pointer transition-all ${
              usageIntent.primary_nighttime_use
                ? "border-purple-500 bg-purple-50"
                : "border-gray-200 hover:border-gray-300"
            }`}
          >
            <Checkbox
              checked={usageIntent.primary_nighttime_use || false}
              onCheckedChange={(checked) => updateUsageIntent("primary_nighttime_use", checked)}
            />
            <Moon className="w-5 h-5 text-purple-600" />
            <div className="flex-1">
              <span className="font-medium">Primary Nighttime Use</span>
              <p className="text-sm text-gray-600">Most usage will be after sunset</p>
            </div>
          </div>

          <div
            onClick={() => updateUsageIntent("exercise_lap_swimming", !usageIntent.exercise_lap_swimming)}
            className={`flex items-center space-x-3 p-4 rounded-xl border-2 cursor-pointer transition-all ${
              usageIntent.exercise_lap_swimming
                ? "border-green-500 bg-green-50"
                : "border-gray-200 hover:border-gray-300"
            }`}
          >
            <Checkbox
              checked={usageIntent.exercise_lap_swimming || false}
              onCheckedChange={(checked) => updateUsageIntent("exercise_lap_swimming", checked)}
            />
            <span className="text-xl">🏊‍♂️</span>
            <div className="flex-1">
              <span className="font-medium">Exercise / Lap Swimming</span>
              <p className="text-sm text-gray-600">Pool will be used for fitness and training</p>
            </div>
          </div>
        </div>

        {/* Entertaining */}
        <div className="space-y-4">
          <Label className="text-base font-medium flex items-center gap-2">
            <Users className="w-5 h-5 text-cyan-600" />
            Entertaining Guests
          </Label>
          <p className="text-sm text-gray-600">How many guests do you typically entertain?</p>
          <RadioGroup
            value={usageIntent.entertaining_guests_count || ""}
            onValueChange={(value) => updateUsageIntent("entertaining_guests_count", value)}
          >
            {[
              "Just family (5-8 people)",
              "Small gatherings (8-15 people)",
              "Medium events (15-30 people)",
              "Large parties (30+ people)",
              "Rarely entertain",
            ].map((option) => (
              <div
                key={option}
                className="flex items-center space-x-3 p-4 rounded-xl border-2 border-gray-200 hover:border-cyan-300 transition-all"
              >
                <RadioGroupItem value={option} id={option} />
                <Label htmlFor={option} className="flex-1 cursor-pointer font-medium">
                  {option}
                </Label>
              </div>
            ))}
          </RadioGroup>
        </div>

        {/* Accessibility & Special Needs */}
        <div className="space-y-4">
          <Label className="text-lg font-semibold text-gray-900">Accessibility & Special Considerations</Label>
          
          <div
            onClick={() => updateUsageIntent("children_play_area", !usageIntent.children_play_area)}
            className={`flex items-center space-x-3 p-4 rounded-xl border-2 cursor-pointer transition-all ${
              usageIntent.children_play_area
                ? "border-yellow-500 bg-yellow-50"
                : "border-gray-200 hover:border-gray-300"
            }`}
          >
            <Checkbox
              checked={usageIntent.children_play_area || false}
              onCheckedChange={(checked) => updateUsageIntent("children_play_area", checked)}
            />
            <span className="text-xl">👶</span>
            <div className="flex-1">
              <span className="font-medium">Children's Play Area Needed</span>
              <p className="text-sm text-gray-600">Dedicated shallow area for kids</p>
            </div>
          </div>

          <div
            onClick={() => updateUsageIntent("elderly_accessibility", !usageIntent.elderly_accessibility)}
            className={`flex items-center space-x-3 p-4 rounded-xl border-2 cursor-pointer transition-all ${
              usageIntent.elderly_accessibility
                ? "border-indigo-500 bg-indigo-50"
                : "border-gray-200 hover:border-gray-300"
            }`}
          >
            <Checkbox
              checked={usageIntent.elderly_accessibility || false}
              onCheckedChange={(checked) => updateUsageIntent("elderly_accessibility", checked)}
            />
            <span className="text-xl">🦽</span>
            <div className="flex-1">
              <span className="font-medium">Elderly Accessibility Considerations</span>
              <p className="text-sm text-gray-600">Easy entry/exit, handrails, gentle slopes</p>
            </div>
          </div>

          <div
            onClick={() => updateUsageIntent("pet_friendly", !usageIntent.pet_friendly)}
            className={`flex items-center space-x-3 p-4 rounded-xl border-2 cursor-pointer transition-all ${
              usageIntent.pet_friendly
                ? "border-pink-500 bg-pink-50"
                : "border-gray-200 hover:border-gray-300"
            }`}
          >
            <Checkbox
              checked={usageIntent.pet_friendly || false}
              onCheckedChange={(checked) => updateUsageIntent("pet_friendly", checked)}
            />
            <span className="text-xl">🐕</span>
            <div className="flex-1">
              <span className="font-medium">Pet-Friendly Features</span>
              <p className="text-sm text-gray-600">Dog ramp, pet washing station, durable surfaces</p>
            </div>
          </div>
        </div>

        {/* Landscaping & Ambiance */}
        <div className="space-y-4">
          <Label className="text-base font-medium flex items-center gap-2">
            <Leaf className="w-5 h-5 text-green-600" />
            Landscaping Preferences
          </Label>
          <RadioGroup
            value={usageIntent.landscaping_preference || ""}
            onValueChange={(value) => updateUsageIntent("landscaping_preference", value)}
          >
            {[
              "Tropical lush plantings",
              "Mediterranean/Tuscan style",
              "Modern minimalist (clean lines, less plants)",
              "Native/drought-tolerant (sustainable)",
              "Classic formal gardens",
            ].map((option) => (
              <div
                key={option}
                className="flex items-center space-x-3 p-4 rounded-xl border-2 border-gray-200 hover:border-green-300 transition-all"
              >
                <RadioGroupItem value={option} id={option} />
                <Label htmlFor={option} className="flex-1 cursor-pointer font-medium">
                  {option}
                </Label>
              </div>
            ))}
          </RadioGroup>
        </div>

        {/* Lighting Importance */}
        <div className="space-y-4">
          <Label className="text-base font-medium flex items-center gap-2">
            <Sun className="w-5 h-5 text-yellow-600" />
            Lighting Importance
          </Label>
          <p className="text-sm text-gray-600">
            Timeless Pools specializes in advanced lighting with 7-15 Jandy Infinite Watercolor lights. How important is lighting control to you?
          </p>
          <RadioGroup
            value={usageIntent.lighting_importance || ""}
            onValueChange={(value) => updateUsageIntent("lighting_importance", value)}
          >
            {[
              "Critical - I want full color control and scenes",
              "Very Important - Multiple lights and zones",
              "Moderate - Standard pool lighting is fine",
            ].map((option) => (
              <div
                key={option}
                className="flex items-center space-x-3 p-4 rounded-xl border-2 border-gray-200 hover:border-yellow-300 transition-all"
              >
                <RadioGroupItem value={option} id={option} />
                <Label htmlFor={option} className="flex-1 cursor-pointer font-medium">
                  {option}
                </Label>
              </div>
            ))}
          </RadioGroup>
        </div>
      </div>
    </div>
  );
}