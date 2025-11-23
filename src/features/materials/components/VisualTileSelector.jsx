import React, { useState } from "react";
import { Card, CardContent } from "@/shared/components/ui/card";
import { Badge } from "@/shared/components/ui/badge";
import { CheckCircle, Info } from "lucide-react";
import { cn } from "@/shared/lib/utils";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/shared/components/ui/tabs";

// Timeless Pools actual tile offerings
const TILE_OPTIONS = {
  glass: [
    {
      id: "glass_1x1",
      name: "Glass Mosaic 1\" × 1\"",
      type: "Glass",
      size: "1\" × 1\"",
      description: "Classic glass mosaic, timeless look with shimmer",
      pros: ["Reflects light beautifully", "Premium appearance", "Wide color range"],
      cons: ["Higher cost", "Shows calcium deposits more"],
      image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800",
      price_indicator: "$$$",
      popular: true
    },
    {
      id: "glass_1x2",
      name: "Glass Tile 1\" × 2\"",
      type: "Glass",
      size: "1\" × 2\"",
      description: "Elongated glass tile for modern linear look",
      pros: ["Contemporary style", "Less grout lines", "Elegant shimmer"],
      cons: ["Requires precise installation"],
      image: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=800",
      price_indicator: "$$$"
    },
    {
      id: "glass_3x12",
      name: "Glass Plank 3\" × 12\"",
      type: "Glass",
      size: "3\" × 12\"",
      description: "Large format glass for dramatic effect",
      pros: ["Bold statement", "Minimal grout", "Modern aesthetic"],
      cons: ["Premium pricing", "Limited color options"],
      image: "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=800",
      price_indicator: "$$$$"
    }
  ],
  porcelain: [
    {
      id: "porcelain_1x1",
      name: "Porcelain Mosaic 1\" × 1\"",
      type: "Porcelain",
      size: "1\" × 1\"",
      description: "Durable porcelain mosaic, cost-effective",
      pros: ["Budget-friendly", "Low maintenance", "Resists calcium"],
      cons: ["Less shimmer than glass"],
      image: "https://images.unsplash.com/photo-1600607687644-c7171b42498f?w=800",
      price_indicator: "$$",
      timeless_standard: true
    },
    {
      id: "porcelain_2x3",
      name: "Porcelain Tile 2\" × 3\"",
      type: "Porcelain",
      size: "2\" × 3\"",
      description: "Medium format porcelain, great balance",
      pros: ["Versatile sizing", "Durable", "Good value"],
      cons: ["Less dramatic than large format"],
      image: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=800",
      price_indicator: "$$",
      popular: true
    },
    {
      id: "porcelain_3x12",
      name: "Porcelain Plank 3\" × 12\"",
      type: "Porcelain",
      size: "3\" × 12\"",
      description: "Large format porcelain for sleek look",
      pros: ["Modern linear design", "Less grout to maintain", "Durable"],
      cons: ["Requires expert installation"],
      image: "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=800",
      price_indicator: "$$$"
    }
  ]
};

export default function VisualTileSelector({ selectedTile, onSelect, decisionMaker = null }) {
  const [activeTab, setActiveTab] = useState("glass");

  return (
    <div className="space-y-4">
      <div>
        <h4 className="font-semibold text-slate-900">
          Select Your Waterline Tile
          {decisionMaker && <span className="text-cyan-600 ml-2">({decisionMaker})</span>}
        </h4>
        <p className="text-sm text-slate-600 mt-1">
          Waterline tile protects the pool finish and adds a design accent at the water surface.
        </p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="glass">Glass Tile</TabsTrigger>
          <TabsTrigger value="porcelain">Porcelain Tile</TabsTrigger>
        </TabsList>

        <TabsContent value="glass" className="mt-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {TILE_OPTIONS.glass.map((option) => (
              <TileCard
                key={option.id}
                option={option}
                isSelected={selectedTile === option.id}
                onSelect={() => onSelect(option.id)}
              />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="porcelain" className="mt-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {TILE_OPTIONS.porcelain.map((option) => (
              <TileCard
                key={option.id}
                option={option}
                isSelected={selectedTile === option.id}
                onSelect={() => onSelect(option.id)}
              />
            ))}
          </div>
        </TabsContent>
      </Tabs>

      {/* Material Balance Note */}
      <div className="p-4 bg-blue-50 rounded-lg border-2 border-blue-200 flex items-start gap-3">
        <Info className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
        <div className="text-sm text-blue-900">
          <strong>Glass vs Porcelain:</strong> We install equal amounts of both. Glass offers more shimmer and light reflection, 
          while porcelain is more budget-friendly and resists calcium deposits better. Both are set with Laticrete 3701 and Hydroban waterproofing.
        </div>
      </div>
    </div>
  );
}

function TileCard({ option, isSelected, onSelect }) {
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
            <Badge className="bg-blue-600 text-white text-xs">Popular Choice</Badge>
          )}
          <Badge variant="outline" className="bg-white/90 text-xs">{option.price_indicator}</Badge>
        </div>

        {/* Type Badge */}
        <div className="absolute top-2 left-2">
          <Badge className={option.type === "Glass" ? "bg-purple-600" : "bg-amber-600"}>
            {option.type}
          </Badge>
        </div>
      </div>

      <CardContent className="p-4">
        <h5 className="font-bold text-slate-900 mb-1">{option.name}</h5>
        <p className="text-xs text-slate-600 mb-2">{option.size}</p>
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