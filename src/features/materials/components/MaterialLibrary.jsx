import React, { useState } from "react";
import { base44 } from "@/api/base44Client";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/components/ui/card";
import { Input } from "@/shared/components/ui/input";
import { Badge } from "@/shared/components/ui/badge";
import { Button } from "@/shared/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/shared/components/ui/tabs";
import { Search, Filter, Palette, CheckCircle } from "lucide-react";

const CATEGORIES = [
  { key: "pool_finish", name: "Pool Finishes", icon: "🏊" },
  { key: "waterline_tile", name: "Tile", icon: "🎨" },
  { key: "coping", name: "Coping", icon: "🧱" },
  { key: "pavers", name: "Pavers", icon: "🔲" },
  { key: "turf", name: "Turf", icon: "🌿" },
  { key: "stone_veneer", name: "Veneers", icon: "🪨" },
  { key: "countertop_slab", name: "Slabs", icon: "💎" },
  { key: "bbq_equipment", name: "BBQ Equipment", icon: "🍖" },
  { key: "lighting", name: "Lighting", icon: "💡" },
  { key: "setting_material", name: "Setting Materials", icon: "🔧" },
];

export default function MaterialLibrary({ selectedMaterials, onSelectionChange }) {
  const [selectedCategory, setSelectedCategory] = useState("pool_finish");
  const [searchTerm, setSearchTerm] = useState("");
  
  const { data: materials, isLoading } = useQuery({
    queryKey: ['materials', selectedCategory],
    queryFn: async () => {
      const results = await base44.entities.Material.filter(
        { category: selectedCategory },
        'sort_order',
        100
      );
      return results || [];
    },
    initialData: [],
  });

  const filteredMaterials = materials.filter(m =>
    m.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    m.manufacturer?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    m.color?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const toggleSelection = (material) => {
    const current = selectedMaterials || {};
    const categorySelections = current[selectedCategory] || [];
    
    const isSelected = categorySelections.some(m => m.id === material.id);
    
    if (isSelected) {
      onSelectionChange({
        ...current,
        [selectedCategory]: categorySelections.filter(m => m.id !== material.id)
      });
    } else {
      onSelectionChange({
        ...current,
        [selectedCategory]: [...categorySelections, material]
      });
    }
  };

  const isSelected = (material) => {
    const categorySelections = selectedMaterials?.[selectedCategory] || [];
    return categorySelections.some(m => m.id === material.id);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
          <Palette className="w-7 h-7 text-cyan-600" />
          Material Library
        </h2>
        <div className="flex items-center gap-2">
          <Search className="w-4 h-4 text-gray-400" />
          <Input
            placeholder="Search materials..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-64"
          />
        </div>
      </div>

      <Tabs value={selectedCategory} onValueChange={setSelectedCategory}>
        <TabsList className="grid grid-cols-5 lg:grid-cols-10">
          {CATEGORIES.map((cat) => (
            <TabsTrigger key={cat.key} value={cat.key} className="flex flex-col items-center py-2">
              <span className="text-xl mb-1">{cat.icon}</span>
              <span className="text-xs hidden lg:block">{cat.name}</span>
            </TabsTrigger>
          ))}
        </TabsList>

        {CATEGORIES.map((cat) => (
          <TabsContent key={cat.key} value={cat.key} className="space-y-4">
            <div className="flex items-center justify-between mb-4">
              <p className="text-sm text-gray-600">
                {filteredMaterials.length} {cat.name} available
              </p>
              {selectedMaterials?.[cat.key]?.length > 0 && (
                <Badge className="bg-cyan-100 text-cyan-800">
                  {selectedMaterials[cat.key].length} selected
                </Badge>
              )}
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredMaterials.map((material) => (
                <MaterialCard
                  key={material.id}
                  material={material}
                  isSelected={isSelected(material)}
                  onToggle={() => toggleSelection(material)}
                />
              ))}
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}

function MaterialCard({ material, isSelected, onToggle }) {
  return (
    <Card
      className={`cursor-pointer transition-all hover:shadow-lg ${
        isSelected ? "border-2 border-cyan-600 bg-cyan-50" : "border border-gray-200 hover:border-gray-300"
      }`}
      onClick={onToggle}
    >
      <CardContent className="p-4">
        <div className="flex items-start justify-between mb-3">
          <div className="flex-1">
            <h4 className="font-semibold text-gray-900 mb-1">{material.name}</h4>
            <p className="text-xs text-gray-600">{material.manufacturer}</p>
            {material.color && (
              <Badge variant="outline" className="text-xs mt-1">
                {material.color}
              </Badge>
            )}
          </div>
          {isSelected && (
            <CheckCircle className="w-6 h-6 text-cyan-600 flex-shrink-0" />
          )}
        </div>
        
        {material.image_url && (
          <img
            src={material.image_url}
            alt={material.name}
            className="w-full h-32 object-cover rounded-lg mb-3"
            loading="lazy"
          />
        )}
        
        {material.description && (
          <p className="text-sm text-gray-600 mb-3 line-clamp-2">{material.description}</p>
        )}
        
        <div className="flex flex-wrap items-center gap-2">
          {material.is_premium && (
            <Badge className="bg-amber-100 text-amber-800 text-xs">Premium</Badge>
          )}
          {material.is_timeless_standard && (
            <Badge className="bg-cyan-100 text-cyan-800 text-xs">Timeless Standard</Badge>
          )}
        </div>
      </CardContent>
    </Card>
  );
}