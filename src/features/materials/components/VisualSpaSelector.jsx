import React from "react";
import { Card, CardContent } from "@/shared/components/ui/card";
import { Badge } from "@/shared/components/ui/badge";
import { CheckCircle } from "lucide-react";
import { cn } from "@/shared/lib/utils";

const SPA_OPTIONS = [
  {
    id: "attached_spillover",
    name: "Attached Spillover Spa",
    description: "Spa sits at pool level, water spills into pool",
    pros: ["Integrated look", "Warm water flows to pool", "Efficient heating"],
    cons: ["Cools pool water slightly"],
    image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800",
    popular: true
  },
  {
    id: "elevated_spillover",
    name: "Elevated Spillover Spa",
    description: "Spa raised 12-18 inches, dramatic waterfall effect",
    pros: ["Stunning visual", "Spa feels separate", "Great seating"],
    cons: ["Higher cost", "More complex plumbing"],
    image: "https://images.unsplash.com/photo-1566737236500-c8ac43014a67?w=800",
    timeless_specialty: true
  },
  {
    id: "detached_spa",
    name: "Detached Spa",
    description: "Separate spa, independent temperature control",
    pros: ["Complete temperature independence", "Different styles possible"],
    cons: ["Less integrated look", "Higher equipment cost"],
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800"
  },
  {
    id: "inpool_seating",
    name: "In-Pool Spa Seating",
    description: "Jets integrated into pool bench/ledge",
    pros: ["Lower cost", "Space efficient", "Easy access"],
    cons: ["Not as hot as separate spa", "Limited jet options"],
    image: "https://images.unsplash.com/photo-1600607687644-c7171b42498f?w=800"
  },
  {
    id: "no_spa",
    name: "No Spa",
    description: "Pool only, no hot tub feature",
    pros: ["Lower cost", "More pool space", "Simpler maintenance"],
    cons: ["No hot tub enjoyment"],
    image: "https://images.unsplash.com/photo-1519046904884-53103b34b206?w=800"
  }
];

export default function VisualSpaSelector({ selectedSpa, onSelect, decisionMaker = null }) {
  return (
    <div className="space-y-4">
      <div>
        <h4 className="font-semibold text-slate-900">
          Spa / Hot Tub Integration
          {decisionMaker && <span className="text-cyan-600 ml-2">({decisionMaker})</span>}
        </h4>
        <p className="text-sm text-slate-600 mt-1">
          How do you want spa functionality integrated with your pool?
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {SPA_OPTIONS.map((option) => (
          <SpaCard
            key={option.id}
            option={option}
            isSelected={selectedSpa === option.id}
            onSelect={() => onSelect(option.id)}
          />
        ))}
      </div>
    </div>
  );
}

function SpaCard({ option, isSelected, onSelect }) {
  return (
    <Card 
      className={cn(
        "cursor-pointer transition-all duration-300 hover:shadow-xl relative overflow-hidden",
        isSelected && "ring-4 ring-cyan-500 shadow-xl"
      )}
      onClick={onSelect}
    >
      <div className="relative h-40 overflow-hidden">
        <img 
          src={option.image} 
          alt={option.name}
          className="w-full h-full object-cover"
        />
        
        {isSelected && (
          <div className="absolute inset-0 bg-cyan-600/20 flex items-center justify-center">
            <div className="bg-cyan-600 rounded-full p-3 shadow-lg">
              <CheckCircle className="w-8 h-8 text-white" />
            </div>
          </div>
        )}

        <div className="absolute top-2 right-2 flex flex-col gap-1">
          {option.timeless_specialty && (
            <Badge className="bg-purple-600 text-white text-xs">Timeless Specialty</Badge>
          )}
          {option.popular && (
            <Badge className="bg-blue-600 text-white text-xs">Most Popular</Badge>
          )}
        </div>
      </div>

      <CardContent className="p-4">
        <h5 className="font-bold text-slate-900 mb-2">{option.name}</h5>
        <p className="text-xs text-slate-700 mb-3">{option.description}</p>
        
        <div className="space-y-1 text-xs">
          <div>
            <strong className="text-green-700">Pros:</strong>
            <ul className="list-disc list-inside text-slate-600 ml-2">
              {option.pros.map((pro, idx) => <li key={idx}>{pro}</li>)}
            </ul>
          </div>
          <div>
            <strong className="text-amber-700">Cons:</strong>
            <ul className="list-disc list-inside text-slate-600 ml-2">
              {option.cons.map((con, idx) => <li key={idx}>{con}</li>)}
            </ul>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}