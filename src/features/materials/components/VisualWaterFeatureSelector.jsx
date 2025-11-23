import React from "react";
import { Card, CardContent } from "@/shared/components/ui/card";
import { Badge } from "@/shared/components/ui/badge";
import { Checkbox } from "@/shared/components/ui/checkbox";
import { cn } from "@/shared/lib/utils";

const WATER_FEATURES = [
  {
    id: "sheer_descent",
    name: "Sheer Descent Waterfall",
    style: "Modern",
    description: "Smooth sheet of water, contemporary look",
    image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800",
    timeless_specialty: true,
    popular: true
  },
  {
    id: "rock_waterfall",
    name: "Rock Waterfall",
    style: "Natural",
    description: "Natural stone waterfall, tropical/rustic feel",
    image: "https://images.unsplash.com/photo-1519046904884-53103b34b206?w=800",
    popular: true
  },
  {
    id: "scuppers",
    name: "Scuppers",
    style: "Modern",
    description: "Water jets from wall, architectural",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800",
    timeless_specialty: true
  },
  {
    id: "deck_jets",
    name: "Deck Jets / Laminars",
    style: "Playful",
    description: "Arching water streams, great for kids",
    image: "https://images.unsplash.com/photo-1566737236500-c8ac43014a67?w=800"
  },
  {
    id: "rain_curtain",
    name: "Rain Curtain",
    style: "Modern",
    description: "Gentle rain effect, soothing sound",
    image: "https://images.unsplash.com/photo-1600607687644-c7171b42498f?w=800"
  },
  {
    id: "bubblers",
    name: "Bubblers",
    style: "Playful",
    description: "Water bubbles up from tanning ledge",
    image: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=800"
  }
];

export default function VisualWaterFeatureSelector({ selectedFeatures = [], onSelect, decisionMaker = null }) {
  const toggleFeature = (featureId) => {
    if (selectedFeatures.includes(featureId)) {
      onSelect(selectedFeatures.filter(id => id !== featureId));
    } else {
      onSelect([...selectedFeatures, featureId]);
    }
  };

  return (
    <div className="space-y-4">
      <div>
        <h4 className="font-semibold text-slate-900">
          Water Features
          {decisionMaker && <span className="text-cyan-600 ml-2">({decisionMaker})</span>}
        </h4>
        <p className="text-sm text-slate-600 mt-1">
          Select all water features you'd like (can choose multiple)
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {WATER_FEATURES.map((feature) => (
          <WaterFeatureCard
            key={feature.id}
            feature={feature}
            isSelected={selectedFeatures.includes(feature.id)}
            onToggle={() => toggleFeature(feature.id)}
          />
        ))}
      </div>
    </div>
  );
}

function WaterFeatureCard({ feature, isSelected, onToggle }) {
  return (
    <Card 
      className={cn(
        "cursor-pointer transition-all duration-300 hover:shadow-xl relative overflow-hidden",
        isSelected && "ring-4 ring-cyan-500 shadow-xl"
      )}
      onClick={onToggle}
    >
      <div className="relative h-40 overflow-hidden">
        <img 
          src={feature.image} 
          alt={feature.name}
          className="w-full h-full object-cover"
        />
        
        {isSelected && (
          <div className="absolute inset-0 bg-cyan-600/20" />
        )}

        <div className="absolute top-2 left-2">
          <Checkbox 
            checked={isSelected}
            className="w-6 h-6 bg-white border-2"
            onClick={(e) => e.stopPropagation()}
          />
        </div>

        <div className="absolute top-2 right-2 flex flex-col gap-1">
          {feature.timeless_specialty && (
            <Badge className="bg-purple-600 text-white text-xs">Timeless Specialty</Badge>
          )}
          {feature.popular && (
            <Badge className="bg-blue-600 text-white text-xs">Popular</Badge>
          )}
        </div>

        <div className="absolute bottom-2 left-2">
          <Badge variant="outline" className="bg-white/90">{feature.style}</Badge>
        </div>
      </div>

      <CardContent className="p-4">
        <h5 className="font-bold text-slate-900 mb-1">{feature.name}</h5>
        <p className="text-xs text-slate-600">{feature.description}</p>
      </CardContent>
    </Card>
  );
}