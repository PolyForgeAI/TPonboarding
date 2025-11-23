import React from "react";
import { Card, CardContent } from "@/shared/components/ui/card";
import { Badge } from "@/shared/components/ui/badge";
import { CheckCircle, Home, Plus, Wrench } from "lucide-react";
import { cn } from "@/shared/lib/utils";

const PROJECT_TYPES = [
  {
    id: "new_construction",
    name: "New Pool Construction",
    description: "Building a brand new pool from scratch (no existing pool)",
    icon: <Home className="w-8 h-8" />,
    examples: ["Empty backyard", "New home", "Never had a pool before"],
    color: "from-blue-500 to-cyan-500"
  },
  {
    id: "addition",
    name: "Addition / Expansion",
    description: "Adding features to an existing pool (spa, water features, outdoor kitchen, etc.)",
    icon: <Plus className="w-8 h-8" />,
    examples: ["Add spa to existing pool", "Add outdoor kitchen", "Add fire features"],
    color: "from-green-500 to-emerald-500"
  },
  {
    id: "remodel",
    name: "Pool Remodel / Renovation",
    description: "Updating, renovating, or completely transforming an existing pool",
    icon: <Wrench className="w-8 h-8" />,
    examples: ["Dated pool needs updating", "Change pool shape", "New finish/tile/coping"],
    color: "from-purple-500 to-pink-500"
  }
];

export default function StepProjectType({ data, updateData }) {
  const selectedType = data.project_type;

  const handleSelect = (typeId) => {
    updateData({ 
      project_type: typeId,
      // Reset remodel-specific data if switching away from remodel
      ...(typeId !== "remodel" && typeId !== "addition" ? { existing_assets: null } : {})
    });
  };

  return (
    <div className="space-y-8">
      <div>
        <h3 className="text-3xl font-bold text-gray-900 mb-3">What Type of Project Is This?</h3>
        <p className="text-gray-600 text-lg">
          This helps us ask the right questions and understand what you already have (if anything).
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {PROJECT_TYPES.map((type) => (
          <Card
            key={type.id}
            className={cn(
              "cursor-pointer transition-all duration-300 hover:shadow-xl relative overflow-hidden",
              selectedType === type.id && "ring-4 ring-cyan-500 shadow-xl"
            )}
            onClick={() => handleSelect(type.id)}
          >
            {/* Selection Indicator */}
            {selectedType === type.id && (
              <div className="absolute top-4 right-4 z-10">
                <div className="bg-cyan-600 rounded-full p-2 shadow-lg">
                  <CheckCircle className="w-6 h-6 text-white" />
                </div>
              </div>
            )}

            <CardContent className="p-6">
              {/* Icon with Gradient */}
              <div className={`inline-flex p-4 rounded-2xl bg-gradient-to-r ${type.color} text-white mb-4`}>
                {type.icon}
              </div>

              <h4 className="text-xl font-bold text-slate-900 mb-2">{type.name}</h4>
              <p className="text-sm text-slate-600 mb-4">{type.description}</p>

              {/* Examples */}
              <div className="space-y-2">
                <p className="text-xs font-semibold text-slate-700">Examples:</p>
                <ul className="space-y-1">
                  {type.examples.map((example, idx) => (
                    <li key={idx} className="text-xs text-slate-600 flex items-start gap-2">
                      <span className="text-cyan-600">•</span>
                      <span>{example}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* What Happens Next */}
      {selectedType && (
        <div className="p-6 glass rounded-2xl border-2 border-green-300/50">
          <h4 className="font-bold text-green-900 mb-3">What Happens Next:</h4>
          {selectedType === "new_construction" && (
            <ul className="space-y-2 text-sm text-slate-700">
              <li className="flex items-start gap-2">
                <span className="text-green-600">1.</span>
                <span>We'll ask about your property, vision, and desired features</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-600">2.</span>
                <span>You'll upload photos of your backyard (guided process)</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-600">3.</span>
                <span>We'll generate 3 custom design concepts for your empty space</span>
              </li>
            </ul>
          )}
          {selectedType === "addition" && (
            <ul className="space-y-2 text-sm text-slate-700">
              <li className="flex items-start gap-2">
                <span className="text-green-600">1.</span>
                <span>We'll inventory what you currently have in your backyard</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-600">2.</span>
                <span>You'll tell us what features you want to add</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-600">3.</span>
                <span>You'll upload photos showing your existing pool and yard</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-600">4.</span>
                <span>We'll generate concepts showing how new features integrate with existing</span>
              </li>
            </ul>
          )}
          {selectedType === "remodel" && (
            <ul className="space-y-2 text-sm text-slate-700">
              <li className="flex items-start gap-2">
                <span className="text-purple-600">1.</span>
                <span>We'll inventory everything you currently have (pool, deck, equipment, etc.)</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-purple-600">2.</span>
                <span>For each item, you'll tell us: Keep, Modify, Rebuild, or Remove</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-purple-600">3.</span>
                <span>You'll explain WHY you want changes (helps us design better solutions)</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-purple-600">4.</span>
                <span>You'll upload comprehensive photos of everything (we'll guide you)</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-purple-600">5.</span>
                <span>We'll generate transformation concepts showing before/after</span>
              </li>
            </ul>
          )}
        </div>
      )}
    </div>
  );
}