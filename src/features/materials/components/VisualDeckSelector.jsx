import React, { useState } from "react";
import { Card, CardContent } from "@/shared/components/ui/card";
import { Badge } from "@/shared/components/ui/badge";
import { CheckCircle, Info, TrendingUp } from "lucide-react";
import { cn } from "@/shared/lib/utils";

const DECK_OPTIONS = [
  {
    id: "arterra_porcelain",
    name: "Arterra Porcelain Pavers (MSI)",
    type: "Porcelain Paver",
    description: "Premium porcelain, superior performance in all climates",
    pros: ["Handles earth movement (CA)", "Freeze-thaw resistant (UT)", "Won't fade or crack", "Modern aesthetic", "Extremely durable"],
    cons: ["Can get hot in direct sun", "Higher initial investment"],
    image: "https://images.unsplash.com/photo-1600607687644-c7171b42498f?w=800",
    price_indicator: "$$$",
    timeless_recommended: true,
    timeless_standard: true,
    popular: true
  },
  {
    id: "belgard_concrete",
    name: "Belgard Concrete Pavers",
    type: "Concrete Paver",
    description: "Quality concrete pavers, versatile and proven",
    pros: ["Handles expansive soil", "Good for freeze-thaw", "Many patterns/colors", "Easier to repair", "Good value"],
    cons: ["Can fade over time", "Not as premium as porcelain", "May shift in extreme conditions"],
    image: "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=800",
    price_indicator: "$$",
    timeless_standard: true
  },
  {
    id: "travertine",
    name: "Travertine Natural Stone",
    type: "Natural Stone",
    description: "Classic luxury, cool to touch, timeless beauty",
    pros: ["Cool underfoot", "Luxury appearance", "Natural variation", "Increases home value"],
    cons: ["Higher cost", "Requires sealing", "Can be slippery when wet", "Less ideal for freeze-thaw"],
    image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800",
    price_indicator: "$$$$",
    best_for: "Southern California, warm climates"
  },
  {
    id: "flagstone",
    name: "Flagstone Natural Stone",
    type: "Natural Stone",
    description: "Rustic natural look with irregular shapes",
    pros: ["Unique character", "Natural beauty", "Non-slip texture", "Works with organic designs"],
    cons: ["Irregular surface", "Difficult for furniture", "Not ideal for freeze-thaw", "Higher cost"],
    image: "https://images.unsplash.com/photo-1566737236500-c8ac43014a67?w=800",
    price_indicator: "$$$",
    best_for: "Warm climates, natural/rustic designs"
  }
];

export default function VisualDeckSelector({ selectedDeck, onSelect, decisionMaker = null }) {
  return (
    <div className="space-y-4">
      <div>
        <h4 className="font-semibold text-slate-900">
          Select Your Deck Material
          {decisionMaker && <span className="text-cyan-600 ml-2">({decisionMaker})</span>}
        </h4>
        <p className="text-sm text-slate-600 mt-1">
          Deck material affects durability, comfort, and performance. We strongly recommend pavers.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        {DECK_OPTIONS.map((option) => (
          <DeckCard
            key={option.id}
            option={option}
            isSelected={selectedDeck === option.id}
            onSelect={() => onSelect(option.id)}
          />
        ))}
      </div>

      {/* Timeless Recommendation */}
      <div className="p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg border-2 border-purple-300 flex items-start gap-3">
        <TrendingUp className="w-5 h-5 text-purple-600 flex-shrink-0 mt-0.5" />
        <div className="text-sm text-purple-900">
          <strong>Timeless Pools Recommendation:</strong> We strongly recommend porcelain pavers (first choice) 
          or concrete pavers (good value). Pavers handle earth movement in Southern California and freeze-thaw 
          cycles in Utah far better than solid concrete decks.
        </div>
      </div>

      {/* Climate Considerations */}
      <div className="grid md:grid-cols-2 gap-4">
        <div className="p-4 bg-orange-50 rounded-lg border-2 border-orange-200">
          <h5 className="font-semibold text-orange-900 mb-2 text-sm">🌊 Southern California</h5>
          <p className="text-xs text-orange-800">
            Expansive soil movement is common. Pavers flex and adjust independently, preventing cracks. 
            Solid concrete decks often crack within 3-5 years.
          </p>
        </div>
        <div className="p-4 bg-blue-50 rounded-lg border-2 border-blue-200">
          <h5 className="font-semibold text-blue-900 mb-2 text-sm">❄️ Northern Utah</h5>
          <p className="text-xs text-blue-800">
            Freeze-thaw cycles destroy solid concrete. Pavers handle expansion/contraction without cracking. 
            Individual pavers can be replaced if damaged.
          </p>
        </div>
      </div>

      {/* Heat Warning */}
      <div className="p-4 bg-amber-50 rounded-lg border-2 border-amber-200 flex items-start gap-3">
        <Info className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
        <div className="text-sm text-amber-900">
          <strong>Heat Consideration:</strong> In direct sun, dark colors get HOT. Travertine and light-colored 
          porcelain stay coolest. We'll help you choose colors based on sun exposure and barefoot use.
        </div>
      </div>
    </div>
  );
}

function DeckCard({ option, isSelected, onSelect }) {
  const [showDetails, setShowDetails] = useState(false);

  return (
    <Card 
      className={cn(
        "cursor-pointer transition-all duration-300 hover:shadow-xl relative overflow-hidden",
        isSelected && "ring-4 ring-cyan-500 shadow-xl"
      )}
      onClick={onSelect}
    >
      <div className="relative h-56 overflow-hidden">
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

        <div className="absolute top-2 right-2 flex flex-col gap-1">
          {option.timeless_recommended && (
            <Badge className="bg-gradient-to-r from-purple-600 to-pink-600 text-white text-xs animate-pulse">
              ⭐ Highly Recommended
            </Badge>
          )}
          {option.timeless_standard && (
            <Badge className="bg-green-600 text-white text-xs">Timeless Standard</Badge>
          )}
          {option.popular && (
            <Badge className="bg-blue-600 text-white text-xs">Most Popular</Badge>
          )}
          <Badge variant="outline" className="bg-white/90 text-xs">{option.price_indicator}</Badge>
        </div>

        <div className="absolute top-2 left-2">
          <Badge className="bg-slate-800 text-white">{option.type}</Badge>
        </div>

        {option.best_for && (
          <div className="absolute bottom-2 left-2 right-2">
            <Badge variant="outline" className="bg-white/90 text-xs w-full">
              {option.best_for}
            </Badge>
          </div>
        )}
      </div>

      <CardContent className="p-4">
        <h5 className="font-bold text-slate-900 mb-1">{option.name}</h5>
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