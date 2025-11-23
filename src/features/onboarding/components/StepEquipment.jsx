import React, { useEffect } from "react";
import { Label } from "@/shared/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/shared/components/ui/radio-group";
import { Settings, Zap, Thermometer, Waves } from "lucide-react";

export default function StepEquipment({ data, updateData }) {
  useEffect(() => {
    if (!data.equipment_preferences) {
      updateData({
        equipment_preferences: {
          sanitizing_system: "",
          heater_type: "",
          automation_level: "",
          pump_preference: "",
        },
      });
    }
  }, []);

  const updateEquipment = (key, value) => {
    updateData({
      equipment_preferences: {
        ...(data.equipment_preferences || {}),
        [key]: value,
      },
    });
  };

  const equipment = data.equipment_preferences || {};

  return (
    <div className="space-y-8">
      <div>
        <h3 className="text-3xl font-bold text-gray-900 mb-3">Equipment Preferences</h3>
        <p className="text-gray-600 text-lg">
          Timeless Pools uses premium Jandy/Fluidra equipment as our standard. Help us understand your preferences.
        </p>
      </div>

      <div className="space-y-8">
        {/* Sanitizing System */}
        <div className="space-y-4">
          <Label className="text-base font-medium flex items-center gap-2">
            <Waves className="w-5 h-5 text-blue-600" />
            Sanitizing System
          </Label>
          <p className="text-sm text-gray-600">
            We recommend AOP (Advanced Oxidation Process) systems for reduced maintenance and no salt corrosion.
          </p>
          <RadioGroup
            value={equipment.sanitizing_system || ""}
            onValueChange={(value) => updateEquipment("sanitizing_system", value)}
          >
            {[
              { value: "AOP (Recommended)", desc: "Hydroxyl radicals eliminate contaminants, minimal chemicals" },
              { value: "UV + Ozone", desc: "Ultraviolet light + ozone generation, very effective" },
              { value: "Ozone Only", desc: "Ozone gas injection, good supplemental sanitizer" },
              { value: "Standard Chlorine", desc: "Traditional chlorine tabs/liquid only" },
              { value: "Not Sure", desc: "Help me decide based on my needs" },
            ].map((option) => (
              <div
                key={option.value}
                className="flex items-start space-x-3 p-4 rounded-xl border-2 border-gray-200 hover:border-blue-300 transition-all"
              >
                <RadioGroupItem value={option.value} id={option.value} className="mt-1" />
                <Label htmlFor={option.value} className="flex-1 cursor-pointer">
                  <div className="font-medium">{option.value}</div>
                  <div className="text-sm text-gray-600">{option.desc}</div>
                </Label>
              </div>
            ))}
          </RadioGroup>
        </div>

        {/* Heater Type */}
        <div className="space-y-4">
          <Label className="text-base font-medium flex items-center gap-2">
            <Thermometer className="w-5 h-5 text-orange-600" />
            Heater Type
          </Label>
          <RadioGroup
            value={equipment.heater_type || ""}
            onValueChange={(value) => updateEquipment("heater_type", value)}
          >
            {[
              { value: "Jandy Pro Series Heat Pump", desc: "Energy efficient, best for mild climates, lower operating cost" },
              { value: "Jandy LXi Gas Heater", desc: "Rapid heating, best for quick temp changes or cold climates" },
              { value: "Hybrid (Heat Pump + Gas)", desc: "Efficiency + speed, best of both worlds (premium option)" },
              { value: "No Heating", desc: "I don't plan to heat the pool" },
              { value: "Not Sure", desc: "Help me decide" },
            ].map((option) => (
              <div
                key={option.value}
                className="flex items-start space-x-3 p-4 rounded-xl border-2 border-gray-200 hover:border-orange-300 transition-all"
              >
                <RadioGroupItem value={option.value} id={option.value} className="mt-1" />
                <Label htmlFor={option.value} className="flex-1 cursor-pointer">
                  <div className="font-medium">{option.value}</div>
                  <div className="text-sm text-gray-600">{option.desc}</div>
                </Label>
              </div>
            ))}
          </RadioGroup>
        </div>

        {/* Automation Level */}
        <div className="space-y-4">
          <Label className="text-base font-medium flex items-center gap-2">
            <Settings className="w-5 h-5 text-purple-600" />
            Automation & Control
          </Label>
          <RadioGroup
            value={equipment.automation_level || ""}
            onValueChange={(value) => updateEquipment("automation_level", value)}
          >
            {[
              { value: "Jandy iAquaLink (Premium)", desc: "Full smartphone control, schedules, remote access, voice control" },
              { value: "Jandy AquaLink (Standard)", desc: "Touchscreen control, basic automation, local access" },
              { value: "Basic Manual Controls", desc: "Simple on/off switches, no automation" },
              { value: "Not Sure", desc: "Help me understand options" },
            ].map((option) => (
              <div
                key={option.value}
                className="flex items-start space-x-3 p-4 rounded-xl border-2 border-gray-200 hover:border-purple-300 transition-all"
              >
                <RadioGroupItem value={option.value} id={option.value} className="mt-1" />
                <Label htmlFor={option.value} className="flex-1 cursor-pointer">
                  <div className="font-medium">{option.value}</div>
                  <div className="text-sm text-gray-600">{option.desc}</div>
                </Label>
              </div>
            ))}
          </RadioGroup>
        </div>

        {/* Pump */}
        <div className="space-y-4">
          <Label className="text-base font-medium flex items-center gap-2">
            <Zap className="w-5 h-5 text-green-600" />
            Pump Type
          </Label>
          <RadioGroup
            value={equipment.pump_preference || ""}
            onValueChange={(value) => updateEquipment("pump_preference", value)}
          >
            {[
              { value: "Jandy Variable Speed (Recommended)", desc: "Energy efficient, quieter, saves $50-100/month on electric" },
              { value: "Standard Single Speed", desc: "Traditional, less expensive upfront but higher operating cost" },
              { value: "Not Sure", desc: "Help me decide" },
            ].map((option) => (
              <div
                key={option.value}
                className="flex items-start space-x-3 p-4 rounded-xl border-2 border-gray-200 hover:border-green-300 transition-all"
              >
                <RadioGroupItem value={option.value} id={option.value} className="mt-1" />
                <Label htmlFor={option.value} className="flex-1 cursor-pointer">
                  <div className="font-medium">{option.value}</div>
                  <div className="text-sm text-gray-600">{option.desc}</div>
                </Label>
              </div>
            ))}
          </RadioGroup>
        </div>

        <div className="bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200 rounded-xl p-6">
          <h4 className="font-bold text-lg text-gray-900 mb-2">Timeless Pools Equipment Standard</h4>
          <p className="text-sm text-gray-700">
            All Timeless Pools projects use premium Jandy/Fluidra equipment as our baseline. We only install equipment we trust and service ourselves. Your selections help us configure the optimal system for your specific needs and budget.
          </p>
        </div>
      </div>
    </div>
  );
}