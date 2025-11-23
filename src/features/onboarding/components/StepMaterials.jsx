import React, { useState, useEffect } from "react";
import { supabase } from "@/shared/lib/supabaseClient";
import { motion } from "framer-motion";
import { Loader2, Check, Info } from "lucide-react";
import { ScrollArea } from "@/shared/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/shared/components/ui/tabs";
import { cn } from "@/shared/lib/utils";

export default function StepMaterials({ data, updateData }) {
  const [materials, setMaterials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selections, setSelections] = useState(data.material_selections || {});

  useEffect(() => {
    fetchMaterials();
  }, []);

  useEffect(() => {
    updateData({ material_selections: selections });
  }, [selections]);

  const fetchMaterials = async () => {
    try {
      const { data, error } = await supabase
        .from('Material')
        .select('*')
        .eq('is_active', true)
        .order('sort_order', { ascending: true });

      if (error) throw error;
      setMaterials(data);
    } catch (error) {
      console.error("Error fetching materials:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSelect = (category, item) => {
    setSelections(prev => ({
      ...prev,
      [category]: item
    }));
  };

  const categories = [
    { id: 'pool_finish', label: 'Pool Finish' },
    { id: 'waterline_tile', label: 'Waterline Tile' },
    { id: 'coping', label: 'Coping' },
    { id: 'deck_material', label: 'Decking' },
    { id: 'equipment', label: 'Equipment' }
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center h-[400px]">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col">
      {/* Hero Image */}
      <div className="relative h-48 rounded-2xl overflow-hidden mb-6">
        <img
          src="https://timelesspools.us/wp-content/uploads/2024/08/K-3.jpg"
          alt="Pool materials and finishes"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/70 to-transparent flex items-end p-6">
          <h3 className="text-3xl font-bold text-white">Material Selection</h3>
        </div>
      </div>

      <div className="mb-6">
        <p className="text-muted-foreground">Curate the textures and colors for your oasis.</p>
      </div>

      <Tabs defaultValue="pool_finish" className="flex-1 flex flex-col">
        <TabsList className="bg-secondary/20 p-1 rounded-xl mb-6 flex-wrap h-auto justify-start gap-2">
          {categories.map(cat => (
            <TabsTrigger
              key={cat.id}
              value={cat.id}
              className="rounded-lg data-[state=active]:bg-primary data-[state=active]:text-primary-foreground font-medium px-4 py-2"
            >
              {cat.label}
            </TabsTrigger>
          ))}
        </TabsList>

        {categories.map(cat => {
          const categoryMaterials = materials.filter(m => m.category === cat.id);

          return (
            <TabsContent key={cat.id} value={cat.id} className="flex-1 mt-0">
              <ScrollArea className="h-[450px] pr-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {categoryMaterials.map((item) => {
                    const isSelected = selections[cat.id]?.id === item.id;

                    return (
                      <motion.button
                        key={item.id}
                        whileHover={{ y: -4 }}
                        onClick={() => handleSelect(cat.id, item)}
                        className={cn(
                          "relative group overflow-hidden rounded-xl border text-left transition-all duration-300 h-full flex flex-col",
                          isSelected
                            ? "border-primary ring-2 ring-primary/50 shadow-xl shadow-primary/10"
                            : "border-white/10 hover:border-white/20 hover:shadow-lg"
                        )}
                      >
                        {/* Image Area */}
                        <div className="relative h-48 w-full overflow-hidden bg-black/20">
                          <img
                            src={item.image_url}
                            alt={item.name}
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-80" />

                          {/* Brand Badge */}
                          <div className="absolute top-3 left-3 bg-black/60 backdrop-blur-md px-2 py-1 rounded text-xs font-medium text-white border border-white/10">
                            {item.brand}
                          </div>

                          {/* Selection Indicator */}
                          {isSelected && (
                            <div className="absolute top-3 right-3 bg-primary text-primary-foreground w-6 h-6 rounded-full flex items-center justify-center shadow-lg">
                              <Check className="w-4 h-4" />
                            </div>
                          )}
                        </div>

                        {/* Content Area */}
                        <div className="p-4 bg-card/40 backdrop-blur-sm flex-1 flex flex-col">
                          <h4 className="font-serif font-bold text-lg text-foreground mb-1">{item.name}</h4>
                          <p className="text-xs text-primary font-medium mb-2 uppercase tracking-wide">{item.color_name || item.product_line}</p>
                          <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3 mb-4 flex-1">
                            {item.description}
                          </p>

                          {item.is_recommended && (
                            <div className="flex items-center gap-1.5 text-xs text-amber-400 font-medium mt-auto">
                              <Info className="w-3 h-3" />
                              Designer Recommended
                            </div>
                          )}
                        </div>
                      </motion.button>
                    );
                  })}
                </div>
                {categoryMaterials.length === 0 && (
                  <div className="flex flex-col items-center justify-center h-40 text-muted-foreground">
                    <p>No materials found for this category.</p>
                  </div>
                )}
              </ScrollArea>
            </TabsContent>
          );
        })}
      </Tabs>
    </div>
  );
}