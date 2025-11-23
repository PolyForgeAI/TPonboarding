import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { base44 } from "@/api/base44Client";
import { Card, CardContent } from "@/shared/components/ui/card";
import { Badge } from "@/shared/components/ui/badge";
import { Checkbox } from "@/shared/components/ui/checkbox";
import { CheckCircle, Info, TrendingUp, Loader2 } from "lucide-react";
import { cn } from "@/shared/lib/utils";
import MaterialUploadAndSearch from "./MaterialUploadAndSearch";

export default function UniversalMaterialSelector({
  category,
  selectedItems,
  onSelect,
  multiSelect = false,
  decisionMaker = null,
  title,
  description,
  icon,
  showUpload = true
}) {
  const { data: materials = [], isLoading } = useQuery({
    queryKey: ['materials', category],
    queryFn: async () => {
      const all = await base44.entities.Material.filter(
        { category, is_active: true },
        'sort_order',
        50
      );
      return all;
    },
    initialData: [],
  });

  const handleSelect = (materialId) => {
    if (multiSelect) {
      if (selectedItems?.includes(materialId)) {
        onSelect(selectedItems.filter(id => id !== materialId));
      } else {
        onSelect([...(selectedItems || []), materialId]);
      }
    } else {
      onSelect(materialId);
    }
  };

  const handleCustomMaterialSelected = (product) => {
    // User could save custom material or just note it
    console.log("Custom material selected:", product);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="w-8 h-8 animate-spin text-cyan-600" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Upload and Search Section */}
      {showUpload && (
        <MaterialUploadAndSearch
          category={category}
          onMaterialSelected={handleCustomMaterialSelected}
        />
      )}

      {/* Standard Material Selection */}
      <div>
        <div className="mb-4">
          <h4 className="font-semibold text-slate-900 flex items-center gap-2">
            {icon}
            {title}
            {decisionMaker && <span className="text-cyan-600 ml-2">({decisionMaker})</span>}
          </h4>
          {description && (
            <p className="text-sm text-slate-600 mt-1">{description}</p>
          )}
        </div>

        {materials.length === 0 ? (
          <div className="text-center py-12 text-slate-500">
            <p>No materials configured yet.</p>
            <p className="text-sm mt-2">Contact your administrator to add materials.</p>
          </div>
        ) : (
          <>
            <div className={cn(
              "grid gap-4",
              materials.length >= 6 ? "md:grid-cols-2 lg:grid-cols-3" : 
              materials.length >= 4 ? "md:grid-cols-2" : 
              "md:grid-cols-2"
            )}>
              {materials.map((material) => (
                <MaterialCard
                  key={material.id}
                  material={material}
                  isSelected={
                    multiSelect 
                      ? selectedItems?.includes(material.id)
                      : selectedItems === material.id
                  }
                  onSelect={() => handleSelect(material.id)}
                  multiSelect={multiSelect}
                />
              ))}
            </div>

            {/* Show recommended materials note */}
            {materials.some(m => m.is_recommended) && (
              <div className="mt-6 p-4 bg-purple-50 rounded-lg border-2 border-purple-300 flex items-start gap-3">
                <TrendingUp className="w-5 h-5 text-purple-600 flex-shrink-0 mt-0.5" />
                <div className="text-sm text-purple-900">
                  <strong>Recommended by us:</strong> Materials marked with "Highly Recommended" are our top choices 
                  based on performance, durability, and customer satisfaction.
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

function MaterialCard({ material, isSelected, onSelect, multiSelect }) {
  const [showDetails, setShowDetails] = useState(false);

  return (
    <Card 
      className={cn(
        "cursor-pointer transition-all duration-300 hover:shadow-xl relative overflow-hidden",
        isSelected && "ring-4 ring-cyan-500 shadow-xl"
      )}
      onClick={onSelect}
    >
      <div className="relative h-48 overflow-hidden">
        {material.image_url ? (
          <img 
            src={material.image_url} 
            alt={material.name}
            className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
          />
        ) : (
          <div className="w-full h-full bg-slate-200 flex items-center justify-center">
            <span className="text-slate-400 text-sm">No image</span>
          </div>
        )}
        
        {isSelected && !multiSelect && (
          <div className="absolute inset-0 bg-cyan-600/20 flex items-center justify-center">
            <div className="bg-cyan-600 rounded-full p-3 shadow-lg">
              <CheckCircle className="w-8 h-8 text-white" />
            </div>
          </div>
        )}

        {multiSelect && (
          <div className="absolute top-2 left-2">
            <Checkbox 
              checked={isSelected}
              className="w-6 h-6 bg-white border-2"
              onClick={(e) => e.stopPropagation()}
            />
          </div>
        )}

        <div className="absolute top-2 right-2 flex flex-col gap-1">
          {material.is_recommended && (
            <Badge className="bg-gradient-to-r from-purple-600 to-pink-600 text-white text-xs animate-pulse">
              ⭐ Recommended
            </Badge>
          )}
          {material.is_standard && (
            <Badge className="bg-green-600 text-white text-xs">Standard</Badge>
          )}
          {material.is_popular && (
            <Badge className="bg-blue-600 text-white text-xs">Popular</Badge>
          )}
          {material.price_indicator && (
            <Badge variant="outline" className="bg-white/90 text-xs">{material.price_indicator}</Badge>
          )}
        </div>

        {material.style && (
          <div className="absolute bottom-2 left-2">
            <Badge variant="outline" className="bg-white/90">{material.style}</Badge>
          </div>
        )}

        {material.water_color && (
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-3">
            <p className="text-white text-xs font-medium">Water Color:</p>
            <p className="text-white text-sm font-bold">{material.water_color}</p>
          </div>
        )}
      </div>

      <CardContent className="p-4">
        <h5 className="font-bold text-slate-900 mb-1">{material.name}</h5>
        {material.brand && (
          <p className="text-xs text-cyan-600 font-semibold mb-1">{material.brand}</p>
        )}
        {material.manufacturer && material.manufacturer !== material.brand && (
          <p className="text-xs text-slate-500 mb-2">{material.manufacturer}</p>
        )}
        <p className="text-sm text-slate-700 mb-3">{material.description}</p>

        {(material.pros?.length > 0 || material.cons?.length > 0) && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              setShowDetails(!showDetails);
            }}
            className="text-xs text-cyan-600 hover:underline"
          >
            {showDetails ? "Hide" : "Show"} details
          </button>
        )}

        {showDetails && (
          <div className="mt-3 space-y-2 text-xs">
            {material.pros?.length > 0 && (
              <div>
                <strong className="text-green-700">Pros:</strong>
                <ul className="list-disc list-inside text-slate-600 ml-2">
                  {material.pros.map((pro, idx) => <li key={idx}>{pro}</li>)}
                </ul>
              </div>
            )}
            {material.cons?.length > 0 && (
              <div>
                <strong className="text-amber-700">Cons:</strong>
                <ul className="list-disc list-inside text-slate-600 ml-2">
                  {material.cons.map((con, idx) => <li key={idx}>{con}</li>)}
                </ul>
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}