import React, { useEffect } from "react";
import { Input } from "@/shared/components/ui/input";
import { Label } from "@/shared/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/shared/components/ui/radio-group";
import { Users, User, UserPlus } from "lucide-react";

export default function StepDecisionMakers({ data, updateData }) {
  useEffect(() => {
    if (!data.decision_makers) {
      updateData({
        decision_makers_count: "1",
        decision_makers: [
          { name: "", email: "", phone: "", role: "Primary Owner" }
        ]
      });
    }
  }, []);

  const handleCountChange = (count) => {
    const numCount = parseInt(count);
    const currentMakers = data.decision_makers || [];
    
    let newMakers = [...currentMakers];
    
    if (numCount > currentMakers.length) {
      // Add new decision makers
      while (newMakers.length < numCount) {
        const role = newMakers.length === 0 ? "Primary Owner" : 
                     newMakers.length === 1 ? "Spouse/Partner" : 
                     "Family Member";
        newMakers.push({ name: "", email: "", phone: "", role });
      }
    } else if (numCount < currentMakers.length) {
      // Remove excess decision makers
      newMakers = newMakers.slice(0, numCount);
    }
    
    updateData({
      decision_makers_count: count,
      decision_makers: newMakers
    });
  };

  const handleMakerChange = (index, field, value) => {
    const newMakers = [...(data.decision_makers || [])];
    newMakers[index] = { ...newMakers[index], [field]: value };
    updateData({ decision_makers: newMakers });
  };

  const count = parseInt(data.decision_makers_count || "1");

  return (
    <div className="space-y-8">
      <div className="text-center mb-8">
        <h3 className="text-3xl font-bold text-gray-900 mb-3">Who's Involved in This Decision?</h3>
        <p className="text-lg text-gray-600">
          Let us know who will be making decisions about this project so we can address everyone's needs.
        </p>
      </div>

      {/* Select Number of Decision Makers */}
      <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl p-6 border-2 border-blue-200">
        <Label className="text-lg font-semibold text-gray-900 mb-4 block">
          How many people will be making decisions?
        </Label>
        <RadioGroup value={data.decision_makers_count || "1"} onValueChange={handleCountChange}>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="relative">
              <RadioGroupItem value="1" id="count-1" className="peer sr-only" />
              <label
                htmlFor="count-1"
                className="flex flex-col items-center justify-center p-6 bg-white border-2 border-gray-300 rounded-xl cursor-pointer hover:border-teal-500 peer-checked:border-teal-600 peer-checked:bg-teal-50 transition-all"
              >
                <User className="w-12 h-12 text-teal-600 mb-2" />
                <span className="font-semibold text-gray-900">Just Me</span>
                <span className="text-sm text-gray-600">Single decision maker</span>
              </label>
            </div>

            <div className="relative">
              <RadioGroupItem value="2" id="count-2" className="peer sr-only" />
              <label
                htmlFor="count-2"
                className="flex flex-col items-center justify-center p-6 bg-white border-2 border-gray-300 rounded-xl cursor-pointer hover:border-teal-500 peer-checked:border-teal-600 peer-checked:bg-teal-50 transition-all"
              >
                <Users className="w-12 h-12 text-teal-600 mb-2" />
                <span className="font-semibold text-gray-900">Two People</span>
                <span className="text-sm text-gray-600">Couple or partners</span>
              </label>
            </div>

            <div className="relative">
              <RadioGroupItem value="3" id="count-3" className="peer sr-only" />
              <label
                htmlFor="count-3"
                className="flex flex-col items-center justify-center p-6 bg-white border-2 border-gray-300 rounded-xl cursor-pointer hover:border-teal-500 peer-checked:border-teal-600 peer-checked:bg-teal-50 transition-all"
              >
                <UserPlus className="w-12 h-12 text-teal-600 mb-2" />
                <span className="font-semibold text-gray-900">Three People</span>
                <span className="text-sm text-gray-600">Family or group</span>
              </label>
            </div>
          </div>
        </RadioGroup>
      </div>

      {/* Decision Maker Forms */}
      <div className="space-y-6">
        {data.decision_makers && data.decision_makers.slice(0, count).map((maker, index) => (
          <div key={index} className="bg-white rounded-2xl p-6 border-2 border-gray-200 shadow-sm">
            <h4 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <div className="w-8 h-8 bg-teal-600 text-white rounded-full flex items-center justify-center font-bold">
                {index + 1}
              </div>
              {maker.role}
            </h4>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label className="text-gray-700 mb-2 block">Name *</Label>
                <Input
                  placeholder="Full Name"
                  value={maker.name || ""}
                  onChange={(e) => handleMakerChange(index, "name", e.target.value)}
                  className="h-12"
                />
              </div>

              <div>
                <Label className="text-gray-700 mb-2 block">Email *</Label>
                <Input
                  type="email"
                  placeholder="email@example.com"
                  value={maker.email || ""}
                  onChange={(e) => handleMakerChange(index, "email", e.target.value)}
                  className="h-12"
                />
              </div>

              <div>
                <Label className="text-gray-700 mb-2 block">Phone</Label>
                <Input
                  type="tel"
                  placeholder="(555) 123-4567"
                  value={maker.phone || ""}
                  onChange={(e) => handleMakerChange(index, "phone", e.target.value)}
                  className="h-12"
                />
              </div>

              <div>
                <Label className="text-gray-700 mb-2 block">Role/Relationship</Label>
                <Input
                  placeholder="e.g., Homeowner, Spouse, Parent"
                  value={maker.role || ""}
                  onChange={(e) => handleMakerChange(index, "role", e.target.value)}
                  className="h-12"
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-blue-50 border-2 border-blue-200 rounded-xl p-4 text-sm text-blue-900">
        <p className="font-semibold mb-1">Why we ask:</p>
        <p>We want to make sure everyone involved has their preferences heard and their questions answered. This helps us create a design that works for your entire household.</p>
      </div>
    </div>
  );
}