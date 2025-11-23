import React, { useState } from "react";
import { Card, CardContent } from "@/shared/components/ui/card";
import { Badge } from "@/shared/components/ui/badge";
import { CheckCircle, Info, Droplets } from "lucide-react";
import { cn } from "@/shared/lib/utils";

// Pebble Tec finishes - showing water color results
const FINISH_OPTIONS = [
  {
    id: "pebble_sheen_tahoe_blue",
    name: "Pebble Sheen - Tahoe Blue",
    brand: "Pebble Tec",
    type: "Pebble Sheen",
    water_color: "Deep Caribbean Blue",
    description: "Rich, deep blue water color - our most popular",
    pros: ["Stunning blue water", "Reflects sky beautifully", "Premium look"],
    cons: ["Shows calcium deposits more than darker colors"],
    image: "https://images.unsplash.com/photo-1566737236500-c8ac43014a67?w=800",
    price_indicator: "$$$",
    timeless_standard: true,
    popular: true
  },
  {
    id: "pebble_sheen_blue_granite",
    name: "Pebble Sheen - Blue Granite",
    brand: "Pebble Tec",
    type: "Pebble Sheen",
    water_color: "Tropical Aqua Blue",
    description: "Lighter, tropical resort-style water",
    pros: ["Tropical feel", "Bright, inviting", "Resort aesthetic"],
    cons: ["Less dramatic than deeper blues"],
    image: "https://images.unsplash.com/photo-1519046904884-53103b34b206?w=800",
    price_indicator: "$$$",
    timeless_standard: true
  },
  {
    id: "pebble_sheen_aqua_blue",
    name: "Pebble Sheen - Aqua Blue",
    brand: "Pebble Tec",
    type: "Pebble Sheen",
    water_color: "Crystal Clear Aqua",
    description: "Classic aqua, versatile with any design",
    pros: ["Timeless color", "Works with any style", "Safe choice"],
    cons: ["Common (many pools have this)"],
    image: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=800",
    price_indicator: "$$$",
    popular: true
  },
  {
    id: "pebble_sheen_beach_sand",
    name: "Pebble Sheen - Beach Sand",
    brand: "Pebble Tec",
    type: "Pebble Sheen",
    water_color: "Natural Turquoise",
    description: "Natural beach look, great for tropical themes",
    pros: ["Beach resort feel", "Unique look", "Hides debris well"],
    cons: ["Water appears lighter/greener"],
    image: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800",
    price_indicator: "$$$"
  },
  {
    id: "pebble_sheen_black_pearl",
    name: "Pebble Sheen - Black Pearl",
    brand: "Pebble Tec",
    type: "Pebble Sheen",
    water_color: "Dark Slate Blue/Black",
    description: "Ultra-modern, dramatic, infinity pool aesthetic",
    pros: ["Modern/contemporary", "Hides calcium", "Dramatic effect"],
    cons: ["Shows debris more", "Can look cold in winter"],
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800",
    price_indicator: "$$$"
  },
  {
    id: "white_plaster",
    name: "White Plaster",
    brand: "Standard",
    type: "Plaster",
    water_color: "Classic Light Blue",
    description: "Traditional pool finish, budget-friendly",
    pros: ["Most affordable", "Classic look", "Bright water"],
    cons: ["Less durable", "Requires more maintenance", "Stains easier"],
    image: "https://images.unsplash.com/photo-1600607687644-c7171b42498f?w=800",
    price_indicator: "$"
  }
];

export default function VisualFinishSelector({ selectedFinish, onSelect, decisionMaker = null }) {
  return (
    <div className="space-y-4">
      <div>
        <h4 className="font-semibold text-slate-900 flex items-center gap-2">
          <Droplets className="w-5 h-5 text-cyan-600" />
          Select Your Pool Finish
          {decisionMaker && <span className="text-cyan-600 ml-2">({decisionMaker})</span>}
        </h4>
        <p className="text-sm text-slate-600 mt-1">
          Pool finish determines your water color. This is the most important aesthetic decision.
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {FINISH_OPTIONS.map((option) => (
          <FinishCard
            key={option.id}
            option={option}
            isSelected={selectedFinish === option.id}
            onSelect={() => onSelect(option.id)}
          />
        ))}
      </div>

      {/* Important Notes */}
      <div className="space-y-3">
        <div className="p-4 bg-blue-50 rounded-lg border-2 border-blue-200 flex items-start gap-3">
          <Info className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
          <div className="text-sm text-blue-900">
            <strong>Water Color Science:</strong> The finish color + depth + lighting creates the water color you see. 
            Same finish looks different in 3ft vs 8ft depth. We'll show you samples during consultation.
          </div>
        </div>

        <div className="p-4 bg-purple-50 rounded-lg border-2 border-purple-200 flex items-start gap-3">
          <Info className="w-5 h-5 text-purple-600 flex-shrink-0 mt-0.5" />
          <div className="text-sm text-purple-900">
            <strong>Timeless Standard:</strong> We exclusively use Pebble Tec Pebble Sheen or white plaster. 
            No cheap alternatives. Pebble Sheen lasts 15-20 years vs 7-10 for plaster.
          </div>
        </div>
      </div>
    </div>
  );
}

function FinishCard({ option, isSelected, onSelect }) {
  const [showDetails, setShowDetails] = useState(false);

  return (
    <Card 
      className={cn(
        "cursor-pointer transition-all duration-300 hover:shadow-xl relative overflow-hidden",
        isSelected && "ring-4 ring-cyan-500 shadow-xl"
      )}
      onClick={onSelect}
    >
      {/* Water Color Preview Image */}
      <div className="relative h-48 overflow-hidden">
        <img 
          src={option.image} 
          alt={option.name}
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
        />
        
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
          {option.popular && (
            <Badge className="bg-blue-600 text-white text-xs">Most Popular</Badge>
          )}
          <Badge variant="outline" className="bg-white/90 text-xs">{option.price_indicator}</Badge>
        </div>

        {/* Brand/Type Badge */}
        <div className="absolute top-2 left-2">
          <Badge className="bg-purple-600">{option.type}</Badge>
        </div>

        {/* Water Color Label */}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-3">
          <p className="text-white text-xs font-medium">Water Color:</p>
          <p className="text-white text-sm font-bold">{option.water_color}</p>
        </div>
      </div>

      <CardContent className="p-4">
        <h5 className="font-bold text-slate-900 mb-1">{option.name}</h5>
        <p className="text-xs text-slate-600 mb-2">{option.brand}</p>
        <p className="text-sm text-slate-700 mb-3">{option.description}</p>

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