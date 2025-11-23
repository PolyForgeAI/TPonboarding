import React, { useState } from "react";
import MaterialLibrary from "../components/MaterialLibrary";
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/components/ui/card";
import { Button } from "@/shared/components/ui/button";
import { Badge } from "@/shared/components/ui/badge";
import { ShoppingCart, Trash2, Sparkles } from "lucide-react";

export default function MaterialSelector() {
  const [selectedMaterials, setSelectedMaterials] = useState({});

  const getTotalSelections = () => {
    return Object.values(selectedMaterials).reduce((total, category) => {
      return total + (category?.length || 0);
    }, 0);
  };

  const clearCategory = (category) => {
    setSelectedMaterials(prev => ({
      ...prev,
      [category]: []
    }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Material Selector</h1>
          <p className="text-gray-600">Choose from Timeless Pools' curated material library</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Material Library */}
          <div className="lg:col-span-2">
            <MaterialLibrary
              selectedMaterials={selectedMaterials}
              onSelectionChange={setSelectedMaterials}
            />
          </div>

          {/* Selection Summary */}
          <div>
            <Card className="sticky top-6 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <ShoppingCart className="w-5 h-5" />
                  Your Selections
                </CardTitle>
                <p className="text-sm text-gray-600">
                  {getTotalSelections()} items selected
                </p>
              </CardHeader>
              <CardContent className="space-y-4">
                {Object.entries(selectedMaterials).map(([category, materials]) => (
                  materials?.length > 0 && (
                    <div key={category} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <h4 className="font-semibold text-sm text-gray-900">
                          {category.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
                        </h4>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => clearCategory(category)}
                        >
                          <Trash2 className="w-3 h-3" />
                        </Button>
                      </div>
                      {materials.map((material) => (
                        <div key={material.id} className="p-2 bg-gray-50 rounded-lg">
                          <p className="text-sm font-medium text-gray-900">{material.name}</p>
                          {material.color && (
                            <Badge variant="outline" className="text-xs mt-1">
                              {material.color}
                            </Badge>
                          )}
                        </div>
                      ))}
                    </div>
                  )
                ))}

                {getTotalSelections() === 0 && (
                  <p className="text-sm text-gray-500 text-center py-8">
                    No materials selected yet. Browse the library to add materials.
                  </p>
                )}

                {getTotalSelections() > 0 && (
                  <div className="pt-4 border-t">
                    <Button className="w-full bg-gradient-to-r from-cyan-600 to-blue-600">
                      <Sparkles className="w-4 h-4 mr-2" />
                      Get AI Recommendations
                    </Button>
                    <p className="text-xs text-gray-500 text-center mt-2">
                      Our AI will suggest complementary materials
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}