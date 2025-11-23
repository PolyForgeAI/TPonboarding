import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { DndContext, closestCenter, KeyboardSensor, PointerSensor, useSensor, useSensors } from "@dnd-kit/core";
import { arrayMove, SortableContext, sortableKeyboardCoordinates, verticalListSortingStrategy, useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/shared/components/ui/accordion";
import { Button } from "@/shared/components/ui/button";
import { ScrollArea } from "@/shared/components/ui/scroll-area";
import { GripVertical, X, Info } from "lucide-react";
import FeatureCard from "./FeatureCard";

// Feature Categories and Data
const FEATURE_CATEGORIES = [
  {
    id: "water",
    title: "Water Features",
    features: [
      { id: "sheer_descent", label: "Sheer Descent", description: "Elegant glass-like sheet of water." },
      { id: "deck_jets", label: "Deck Jets", description: "Playful arcs of water from the deck." },
      { id: "laminars", label: "Laminars", description: "Illuminated, tubular arcs of water." },
      { id: "scuppers", label: "Scuppers", description: "Modern metal or stone water spouts." },
      { id: "grotto", label: "Grotto / Waterfall", description: "Natural rock formation with cascading water." },
    ]
  },
  {
    id: "fire",
    title: "Fire Elements",
    features: [
      { id: "fire_bowls", label: "Fire Bowls", description: "Dramatic bowls of fire, often on pillars." },
      { id: "fire_pit", label: "Fire Pit", description: "Gathering spot for warmth and conversation." },
      { id: "linear_fireplace", label: "Linear Fireplace", description: "Modern, sleek fire feature wall." },
    ]
  },
  {
    id: "wellness",
    title: "Wellness & Spa",
    features: [
      { id: "spa", label: "Attached Spa", description: "Therapeutic hot tub integrated with pool." },
      { id: "cold_plunge", label: "Cold Plunge", description: "Invigorating cold water therapy." },
      { id: "swim_jet", label: "Swim Jet System", description: "Current for endless swimming." },
    ]
  },
  {
    id: "lighting",
    title: "Lighting & Ambiance",
    features: [
      { id: "led_color", label: "Color LED Lighting", description: "Mood lighting with customizable colors." },
      { id: "landscape_lights", label: "Landscape Lighting", description: "Highlighting surrounding plants and paths." },
    ]
  },
  {
    id: "automation",
    title: "Smart Automation",
    features: [
      { id: "app_control", label: "App Control", description: "Manage pool from your phone." },
      { id: "auto_cover", label: "Automatic Cover", description: "Safety and energy efficiency at a touch." },
      { id: "auto_cleaner", label: "In-Floor Cleaning", description: "Self-cleaning system for low maintenance." },
    ]
  }
];

// Sortable Item Component
function SortableItem({ id, label, onRemove }) {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div ref={setNodeRef} style={style} className="flex items-center gap-3 bg-card border border-white/10 p-3 rounded-lg mb-2 group shadow-sm hover:shadow-md transition-all">
      <div {...attributes} {...listeners} className="cursor-grab active:cursor-grabbing text-muted-foreground hover:text-primary p-1">
        <GripVertical className="w-5 h-5" />
      </div>
      <span className="flex-1 font-medium text-foreground">{label}</span>
      <button onClick={() => onRemove(id)} className="text-muted-foreground hover:text-destructive p-1 opacity-0 group-hover:opacity-100 transition-opacity">
        <X className="w-4 h-4" />
      </button>
    </div>
  );
}

export default function StepFeaturesOutcomes({ data, updateData }) {
  const [selectedFeatures, setSelectedFeatures] = useState(data.desired_features || []);
  const [mustHaves, setMustHaves] = useState(data.must_haves || []);
  const [niceToHaves, setNiceToHaves] = useState(data.nice_to_haves || []);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  useEffect(() => {
    // Sync local state to parent on change
    updateData({
      desired_features: selectedFeatures,
      must_haves: mustHaves,
      nice_to_haves: niceToHaves
    });
  }, [selectedFeatures, mustHaves, niceToHaves]);

  const toggleFeature = (featureId) => {
    if (selectedFeatures.includes(featureId)) {
      // Remove
      setSelectedFeatures(prev => prev.filter(id => id !== featureId));
      setMustHaves(prev => prev.filter(id => id !== featureId));
      setNiceToHaves(prev => prev.filter(id => id !== featureId));
    } else {
      // Add (default to Nice to Have initially, or just selected list)
      setSelectedFeatures(prev => [...prev, featureId]);
      // We can add to 'mustHaves' by default or let user drag it there. 
      // Let's add to 'mustHaves' for now so it appears in the list to be sorted.
      setMustHaves(prev => [...prev, featureId]);
    }
  };

  const handleDragEnd = (event) => {
    const { active, over } = event;

    if (active.id !== over.id) {
      setMustHaves((items) => {
        const oldIndex = items.indexOf(active.id);
        const newIndex = items.indexOf(over.id);
        return arrayMove(items, oldIndex, newIndex);
      });
    }
  };

  // Helper to get label
  const getFeatureLabel = (id) => {
    for (const cat of FEATURE_CATEGORIES) {
      const found = cat.features.find(f => f.id === id);
      if (found) return found.label;
    }
    return id;
  };

  return (
    <div className="flex flex-col lg:flex-row gap-8 h-full min-h-[600px]">
      {/* Left: Browse & Select */}
      <div className="flex-1 flex flex-col">
        {/* Hero Image */}
        <div className="relative h-48 rounded-2xl overflow-hidden mb-6">
          <img
            src="https://timelesspools.us/wp-content/uploads/2024/08/I-10.jpg"
            alt="Luxury pool features"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/70 to-transparent flex items-end p-6">
            <h3 className="text-3xl font-bold text-white">Features & Outcomes</h3>
          </div>
        </div>

        <div className="mb-6">
          <h2 className="text-3xl font-serif font-bold text-foreground mb-2">Explore Features</h2>
          <p className="text-muted-foreground">Select the elements that spark your interest.</p>
        </div>

        <ScrollArea className="flex-1 pr-4 h-[500px]">
          <Accordion type="single" collapsible className="w-full space-y-4" defaultValue="water">
            {FEATURE_CATEGORIES.map((category) => (
              <AccordionItem key={category.id} value={category.id} className="border border-white/10 rounded-xl bg-card/30 px-4">
                <AccordionTrigger className="hover:no-underline py-4">
                  <span className="text-lg font-medium text-foreground">{category.title}</span>
                </AccordionTrigger>
                <AccordionContent className="pb-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                    {category.features.map((feature) => (
                      <FeatureCard
                        key={feature.id}
                        feature={feature}
                        isSelected={selectedFeatures.includes(feature.id)}
                        onToggle={toggleFeature}
                      />
                    ))}
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </ScrollArea>
      </div>

      {/* Right: Priority Deck */}
      <div className="w-full lg:w-[400px] bg-card/50 border border-white/10 rounded-2xl p-6 flex flex-col">
        <div className="mb-6">
          <h3 className="text-xl font-serif font-bold text-primary flex items-center gap-2">
            <Info className="w-5 h-5" />
            Your Priority Deck
          </h3>
          <p className="text-sm text-muted-foreground mt-1">
            Drag to rank your "Must Haves". Top items get priority in design.
          </p>
        </div>

        {mustHaves.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center text-center p-8 border-2 border-dashed border-white/10 rounded-xl">
            <p className="text-muted-foreground">Select features from the left to start building your vision.</p>
          </div>
        ) : (
          <ScrollArea className="flex-1 pr-2">
            <DndContext
              sensors={sensors}
              collisionDetection={closestCenter}
              onDragEnd={handleDragEnd}
            >
              <SortableContext
                items={mustHaves}
                strategy={verticalListSortingStrategy}
              >
                {mustHaves.map((id) => (
                  <SortableItem
                    key={id}
                    id={id}
                    label={getFeatureLabel(id)}
                    onRemove={(id) => toggleFeature(id)}
                  />
                ))}
              </SortableContext>
            </DndContext>
          </ScrollArea>
        )}

        <div className="mt-4 pt-4 border-t border-white/10">
          <div className="flex justify-between text-sm text-muted-foreground">
            <span>Selected: {selectedFeatures.length}</span>
            <span>Priority Items: {mustHaves.length}</span>
          </div>
        </div>
      </div>
    </div>
  );
}