import React, { useState } from "react";
import { Card, CardContent } from "@/shared/components/ui/card";
import { Badge } from "@/shared/components/ui/badge";
import { CheckCircle, Info } from "lucide-react";
import { cn } from "@/shared/lib/utils";

// Timeless Pools actual coping offerings
const COPING_OPTIONS = [
  {
    id: "natural_stone_slab",
    name: "Natural Stone Slab",
    size: "12\" × 24\"",
    description: "Premium natural stone, top-shelf installation",
    pros: ["Luxurious appearance", "Natural variation", "Cool to touch"],
    cons: ["Higher cost", "Requires sealing"],
    // Replace with your actual portfolio photo
    image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800",
    price_indicator: "$$$",
    timeless_standard: true
  },
  {
    id: "porcelain_better_set",
    name: "Porcelain Coping (Better Set)",
    size: "12\" × 24\"",
    description: "Better-set porcelain for durability and precision",
    pros: ["Durable", "Consistent color", "Low maintenance"],
    cons: ["Can get hot in sun"],
    image: "https://images.unsplash.com/photo-1600607687644-c7171b42498f?w=800",
    price_indicator: "$$",
    timeless_standard: true
  },
  {
    id: "porcelain_paper",
    name: "Porcelain Coping (Paper)",
    size: "12\" × 24\"",
    description: "Paper-set porcelain, cost-effective option",
    pros: ["Budget-friendly", "Good durability", "Modern look"],
    cons: ["May show seams more than better-set"],
    image: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=800",
    price_indicator: "$$"
  },
  {
    id: "flagstone",
    name: "Flagstone Coping",
    size: "Natural/Irregular",
    description: "Natural flagstone for organic, rustic aesthetic",
    pros: ["Unique appearance", "Non-slip", "Blends with landscaping"],
    cons: ["Irregular edges", "Requires more maintenance"],
    image: "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=800",
    price_indicator: "$$"
  },
  {
    id: "pacific_stone_precast",
    name: "Pacific Stone Precast",
    size: "WC-104 Trestles",
    description: "Pacific Stone precast coping, light sand finish",
    pros: ["Consistent quality", "Fast installation", "Proven durability"],
    cons: ["Limited color options"],
    image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800",
    price_indicator: "$$",
    timeless_standard: true
  }
];

export default function VisualCopingSelector({ selectedCoping, onSelect, decisionMaker = null }) {
  const [viewMode, setViewMode] = useState("grid"); // grid or detail

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h4 className="font-semibold text-slate-900">
            Select Your Preferred Coping Style
            {decisionMaker && <span className="text-cyan-600 ml-2">({decisionMaker})</span>}
          </h4>
          <p className="text-sm text-slate-600 mt-1">
            Coping is the edge cap around your pool. It affects both aesthetics and comfort.
          </p>
        </div>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {COPING_OPTIONS.map((option) => (
          <CopingCard
            key={option.id}
            option={option}
            isSelected={selectedCoping === option.id}
            onSelect={() => onSelect(option.id)}
          />
        ))}
      </div>

      {/* Installation Note */}
      <div className="p-4 bg-blue-50 rounded-lg border-2 border-blue-200 flex items-start gap-3">
        <Info className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
        <div className="text-sm text-blue-900">
          <strong>Timeless Pools Installation Standard:</strong> All coping is installed using Laticrete 3701 mortar 
          and properly waterproofed with Hydroban. We don't cut corners on installation quality.
        </div>
      </div>
    </div>
  );
}

function CopingCard({ option, isSelected, onSelect }) {
  const [showDetails, setShowDetails] = useState(false);

  return (
    <Card 
      className={cn(
        "cursor-pointer transition-all duration-300 hover:shadow-xl relative overflow-hidden",
        isSelected && "ring-4 ring-cyan-500 shadow-xl"
      )}
      onClick={onSelect}
    >
      {/* Image */}
      <div className="relative h-48 overflow-hidden">
        <img 
          src={option.image} 
          alt={option.name}
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
        />
        
        {/* Overlay with selection indicator */}
        {isSelected && (
          <div className="absolute inset-0 bg-cyan-600/20 flex items-center justify-center">
            <div className="bg-cyan-600 rounded-full p-3 shadow-lg">
              <CheckCircle className="w-8 h-8 text-white" />
            </div>
          </div>
        )}

        {/* Badges */}
        <div className="absolute top-2 right-2 flex flex-col gap-1">
          {option.timeless_standard && (
            <Badge className="bg-green-600 text-white text-xs">Timeless Standard</Badge>
          )}
          <Badge variant="outline" className="bg-white/90 text-xs">{option.price_indicator}</Badge>
        </div>
      </div>

      <CardContent className="p-4">
        <h5 className="font-bold text-slate-900 mb-1">{option.name}</h5>
        <p className="text-xs text-slate-600 mb-2">{option.size}</p>
        <p className="text-sm text-slate-700 mb-3">{option.description}</p>

        {/* Quick Pros/Cons */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            setShowDetails(!showDetails);
          }}
          className="text-xs text-cyan-600 hover:underline"
        >
          {showDetails ? "Hide" : "Show"} details
        </button>

        {showDetails && (
          <div className="mt-3 space-y-2 text-xs">
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
        )}
      </CardContent>
    </Card>
  );
}