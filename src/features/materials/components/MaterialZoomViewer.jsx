import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/components/ui/card";
import { Button } from "@/shared/components/ui/button";
import { Badge } from "@/shared/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/shared/components/ui/tabs";
import { 
  ZoomIn, 
  ZoomOut, 
  Maximize2, 
  Minimize2,
  Move,
  RotateCw,
  Grid3x3,
  Eye
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function MaterialZoomViewer({ materials, selectedMaterials }) {
  const [selectedMaterial, setSelectedMaterial] = useState(null);
  const [zoom, setZoom] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [compareMode, setCompareMode] = useState(false);
  const [compareWith, setCompareWith] = useState(null);

  const handleMouseDown = (e) => {
    setIsDragging(true);
    setDragStart({ x: e.clientX - position.x, y: e.clientY - position.y });
  };

  const handleMouseMove = (e) => {
    if (isDragging) {
      setPosition({
        x: e.clientX - dragStart.x,
        y: e.clientY - dragStart.y
      });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const resetView = () => {
    setZoom(1);
    setPosition({ x: 0, y: 0 });
  };

  const categoryGroups = materials?.reduce((acc, material) => {
    const cat = material.category;
    if (!acc[cat]) acc[cat] = [];
    acc[cat].push(material);
    return acc;
  }, {}) || {};

  const MaterialCard = ({ material, onClick, isSelected }) => (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={() => onClick(material)}
      className={`cursor-pointer rounded-xl overflow-hidden border-2 transition-all ${
        isSelected 
          ? "border-purple-500 shadow-xl" 
          : "border-gray-200 hover:border-purple-300"
      }`}
    >
      {material.image_url ? (
        <img
          src={material.image_url}
          alt={material.name}
          className="w-full h-32 object-cover"
        />
      ) : (
        <div className="w-full h-32 bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center">
          <Grid3x3 className="w-12 h-12 text-gray-400" />
        </div>
      )}
      <div className="p-3">
        <h4 className="font-semibold text-sm text-gray-900 mb-1">{material.name}</h4>
        <p className="text-xs text-gray-600">{material.manufacturer}</p>
        {material.color && (
          <p className="text-xs text-gray-500 mt-1">Color: {material.color}</p>
        )}
      </div>
    </motion.div>
  );

  return (
    <Card className="border-none shadow-xl">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Eye className="w-5 h-5 text-purple-600" />
          Material Texture Viewer
        </CardTitle>
        <p className="text-sm text-gray-600 mt-2">
          Zoom and inspect material samples up close
        </p>
      </CardHeader>
      <CardContent className="space-y-4">
        <Tabs defaultValue="all" className="space-y-4">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="pool_finish">Finishes</TabsTrigger>
            <TabsTrigger value="waterline_tile">Tiles</TabsTrigger>
            <TabsTrigger value="coping">Coping</TabsTrigger>
          </TabsList>

          {Object.keys(categoryGroups).map((category) => (
            <TabsContent key={category} value={category}>
              <div className="grid grid-cols-3 md:grid-cols-4 gap-4">
                {categoryGroups[category].map((material) => (
                  <MaterialCard
                    key={material.id}
                    material={material}
                    onClick={setSelectedMaterial}
                    isSelected={selectedMaterial?.id === material.id}
                  />
                ))}
              </div>
            </TabsContent>
          ))}

          <TabsContent value="all">
            <div className="grid grid-cols-3 md:grid-cols-4 gap-4">
              {materials?.map((material) => (
                <MaterialCard
                  key={material.id}
                  material={material}
                  onClick={setSelectedMaterial}
                  isSelected={selectedMaterial?.id === material.id}
                />
              ))}
            </div>
          </TabsContent>
        </Tabs>

        {/* Zoom Viewer */}
        <AnimatePresence>
          {selectedMaterial && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="fixed inset-0 z-50 bg-black/95 flex flex-col"
            >
              {/* Header */}
              <div className="bg-black/80 backdrop-blur-sm p-4 border-b border-white/20">
                <div className="max-w-7xl mx-auto flex items-center justify-between">
                  <div>
                    <h3 className="text-xl font-bold text-white">{selectedMaterial.name}</h3>
                    <p className="text-sm text-gray-400">
                      {selectedMaterial.manufacturer} • {selectedMaterial.color}
                    </p>
                  </div>
                  <Button
                    onClick={() => {
                      setSelectedMaterial(null);
                      resetView();
                    }}
                    variant="outline"
                    className="bg-white/10 border-white/30 text-white hover:bg-white/20"
                  >
                    Close
                  </Button>
                </div>
              </div>

              {/* Controls */}
              <div className="bg-black/80 backdrop-blur-sm p-4 border-b border-white/20">
                <div className="max-w-7xl mx-auto flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Button
                      onClick={() => setZoom(Math.min(zoom + 0.5, 5))}
                      size="sm"
                      variant="outline"
                      className="bg-white/10 border-white/30 text-white hover:bg-white/20"
                    >
                      <ZoomIn className="w-4 h-4" />
                    </Button>
                    <Button
                      onClick={() => setZoom(Math.max(zoom - 0.5, 0.5))}
                      size="sm"
                      variant="outline"
                      className="bg-white/10 border-white/30 text-white hover:bg-white/20"
                    >
                      <ZoomOut className="w-4 h-4" />
                    </Button>
                    <Button
                      onClick={resetView}
                      size="sm"
                      variant="outline"
                      className="bg-white/10 border-white/30 text-white hover:bg-white/20"
                    >
                      <RotateCw className="w-4 h-4 mr-2" />
                      Reset
                    </Button>
                    <Badge className="bg-white/20 text-white ml-4">
                      Zoom: {Math.round(zoom * 100)}%
                    </Badge>
                  </div>

                  <div className="flex items-center gap-2">
                    <Button
                      onClick={() => setCompareMode(!compareMode)}
                      size="sm"
                      variant={compareMode ? "default" : "outline"}
                      className={compareMode ? "" : "bg-white/10 border-white/30 text-white hover:bg-white/20"}
                    >
                      <Grid3x3 className="w-4 h-4 mr-2" />
                      Compare Mode
                    </Button>
                  </div>
                </div>
              </div>

              {/* Image Viewer */}
              <div 
                className="flex-1 overflow-hidden relative cursor-move"
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
                onMouseLeave={handleMouseUp}
              >
                <div className="absolute inset-0 flex items-center justify-center">
                  {compareMode && compareWith ? (
                    <div className="flex gap-4 h-full w-full p-8">
                      <div className="flex-1 flex items-center justify-center">
                        <img
                          src={selectedMaterial.image_url}
                          alt={selectedMaterial.name}
                          style={{
                            transform: `scale(${zoom}) translate(${position.x}px, ${position.y}px)`,
                            transition: isDragging ? 'none' : 'transform 0.2s'
                          }}
                          className="max-w-full max-h-full object-contain"
                        />
                      </div>
                      <div className="w-px bg-white/30" />
                      <div className="flex-1 flex items-center justify-center">
                        <img
                          src={compareWith.image_url}
                          alt={compareWith.name}
                          style={{
                            transform: `scale(${zoom}) translate(${position.x}px, ${position.y}px)`,
                            transition: isDragging ? 'none' : 'transform 0.2s'
                          }}
                          className="max-w-full max-h-full object-contain"
                        />
                      </div>
                    </div>
                  ) : (
                    <img
                      src={selectedMaterial.image_url}
                      alt={selectedMaterial.name}
                      style={{
                        transform: `scale(${zoom}) translate(${position.x}px, ${position.y}px)`,
                        transition: isDragging ? 'none' : 'transform 0.2s'
                      }}
                      className="max-w-full max-h-full object-contain"
                    />
                  )}
                </div>

                {/* Drag hint */}
                {zoom > 1 && !isDragging && (
                  <div className="absolute bottom-8 left-1/2 -translate-x-1/2 bg-black/80 text-white px-4 py-2 rounded-full text-sm flex items-center gap-2">
                    <Move className="w-4 h-4" />
                    Drag to pan
                  </div>
                )}
              </div>

              {/* Material Info Footer */}
              <div className="bg-black/80 backdrop-blur-sm p-6 border-t border-white/20">
                <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-6 text-white">
                  <div>
                    <p className="text-xs text-gray-400 mb-1">Description</p>
                    <p className="text-sm">{selectedMaterial.description || "No description available"}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-400 mb-1">Specifications</p>
                    <p className="text-sm">{selectedMaterial.finish || "Standard finish"}</p>
                    {selectedMaterial.specifications && (
                      <p className="text-xs text-gray-400 mt-2">
                        {JSON.stringify(selectedMaterial.specifications)}
                      </p>
                    )}
                  </div>
                  <div>
                    <p className="text-xs text-gray-400 mb-1">Availability</p>
                    <p className="text-sm">{selectedMaterial.lead_time || "In stock"}</p>
                    {selectedMaterial.is_timeless_standard && (
                      <Badge className="bg-cyan-600 mt-2">Timeless Standard</Badge>
                    )}
                    {selectedMaterial.is_premium && (
                      <Badge className="bg-purple-600 mt-2">Premium</Badge>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </CardContent>
    </Card>
  );
}