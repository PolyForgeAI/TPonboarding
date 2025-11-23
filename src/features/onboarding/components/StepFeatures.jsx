import React from "react";
import { Badge } from "@/shared/components/ui/badge";
import { Card, CardContent } from "@/shared/components/ui/card";
import { Waves, Flame, Sofa, Sparkles, CheckCircle } from "lucide-react";

// Feature definitions with icons
const WATER_FEATURES = [
  { name: "Sheer Descent Waterfall", icon: "💦", category: "water", modern: true },
  { name: "Rock Waterfall", icon: "🪨", category: "water", natural: true },
  { name: "Deck Jets / Laminars", icon: "⛲", category: "water", playful: true },
  { name: "Scuppers", icon: "💧", category: "water", modern: true },
  { name: "Rain Curtain", icon: "🌧️", category: "water", modern: true },
  { name: "Bubblers", icon: "🫧", category: "water", playful: true },
];

const FIRE_FEATURES = [
  { name: "Fire Bowls", icon: "🔥", category: "fire", modern: true },
  { name: "Fire Pit", icon: "🪵", category: "fire", entertainment: true },
  { name: "Fire & Water Bowls", icon: "💧🔥", category: "fire", luxury: true },
  { name: "Fireplace", icon: "🏛️", category: "fire", cozy: true },
];

const OUTDOOR_LIVING = [
  { name: "Covered Pergola/Pavilion", icon: "🏛️", category: "living", shade: true },
  { name: "Outdoor Kitchen/BBQ", icon: "🍖", category: "living", entertainment: true },
  { name: "Bar Seating", icon: "🍹", category: "living", entertainment: true },
  { name: "Outdoor Shower", icon: "🚿", category: "living", convenience: true },
  { name: "Cabana/Changing Room", icon: "🏠", category: "living", luxury: true },
];

const CORE_FEATURES = [
  { name: "Spa / Hot Tub", icon: "♨️", category: "core", popular: true },
  { name: "Beach Entry", icon: "🏖️", category: "core", family: true },
  { name: "Tanning Ledge / Baja Shelf", icon: "☀️", category: "core", popular: true },
  { name: "Swim-Up Bar", icon: "🍸", category: "core", luxury: true },
  { name: "Infinity/Vanishing Edge", icon: "🌊", category: "core", luxury: true },
  { name: "Swim Jet System", icon: "🏊", category: "core", fitness: true },
];

const STYLE_PREFERENCES = [
  "Modern/Contemporary",
  "Natural/Organic",
  "Tropical Resort",
  "Mediterranean",
  "Desert Modern",
  "Traditional/Classic",
];

export default function StepFeatures({ data, updateData }) {
  const decisionMakers = data.decision_makers || [];
  const hasMultipleDecisionMakers = decisionMakers.length > 1;

  React.useEffect(() => {
    if (!data.must_haves) updateData({ must_haves: [] });
    if (!data.nice_to_haves) updateData({ nice_to_haves: [] });
    if (!data.style_preferences) updateData({ style_preferences: [] });
    if (hasMultipleDecisionMakers && !data.features_by_person) {
      updateData({ features_by_person: {} });
    }
  }, []);

  const toggleFeature = (feature, isMustHave, personName = null) => {
    if (hasMultipleDecisionMakers && personName) {
      // Track per person
      const personFeatures = data.features_by_person || {};
      const currentPerson = personFeatures[personName] || { must_haves: [], nice_to_haves: [] };
      
      if (isMustHave) {
        const mustHaves = currentPerson.must_haves.includes(feature)
          ? currentPerson.must_haves.filter(f => f !== feature)
          : [...currentPerson.must_haves, feature];
        
        // Remove from nice_to_haves if adding to must_haves
        const niceToHaves = mustHaves.includes(feature)
          ? currentPerson.nice_to_haves.filter(f => f !== feature)
          : currentPerson.nice_to_haves;
        
        updateData({
          features_by_person: {
            ...personFeatures,
            [personName]: { must_haves: mustHaves, nice_to_haves: niceToHaves }
          }
        });
      } else {
        const niceToHaves = currentPerson.nice_to_haves.includes(feature)
          ? currentPerson.nice_to_haves.filter(f => f !== feature)
          : [...currentPerson.nice_to_haves, feature];
        
        updateData({
          features_by_person: {
            ...personFeatures,
            [personName]: { ...currentPerson, nice_to_haves: niceToHaves }
          }
        });
      }
    } else {
      // Single decision maker
      if (isMustHave) {
        const mustHaves = data.must_haves.includes(feature)
          ? data.must_haves.filter(f => f !== feature)
          : [...data.must_haves, feature];
        
        const niceToHaves = mustHaves.includes(feature)
          ? data.nice_to_haves.filter(f => f !== feature)
          : data.nice_to_haves;
        
        updateData({ must_haves: mustHaves, nice_to_haves: niceToHaves });
      } else {
        const niceToHaves = data.nice_to_haves.includes(feature)
          ? data.nice_to_haves.filter(f => f !== feature)
          : [...data.nice_to_haves, feature];
        
        updateData({ nice_to_haves: niceToHaves });
      }
    }
  };

  const toggleStyle = (style) => {
    const styles = data.style_preferences || [];
    const updated = styles.includes(style)
      ? styles.filter(s => s !== style)
      : [...styles, style];
    updateData({ style_preferences: updated });
  };

  return (
    <div className="space-y-8">
      <div>
        <h3 className="text-3xl font-bold text-gray-900 mb-3">Features & Style</h3>
        <p className="text-gray-600 text-lg">
          Select features you want. Separate "must-haves" from "nice-to-haves" to help us prioritize.
        </p>
      </div>

      {!hasMultipleDecisionMakers ? (
        <SingleDecisionMakerFeatures
          data={data}
          toggleFeature={toggleFeature}
          toggleStyle={toggleStyle}
        />
      ) : (
        <MultiDecisionMakerFeatures
          decisionMakers={decisionMakers}
          data={data}
          toggleFeature={toggleFeature}
          toggleStyle={toggleStyle}
        />
      )}
    </div>
  );
}

function SingleDecisionMakerFeatures({ data, toggleFeature, toggleStyle }) {
  return (
    <>
      <FeatureCategory
        title="Water Features"
        icon={<Waves className="w-6 h-6 text-cyan-600" />}
        features={WATER_FEATURES}
        mustHaves={data.must_haves || []}
        niceToHaves={data.nice_to_haves || []}
        onToggle={toggleFeature}
      />

      <FeatureCategory
        title="Fire Features"
        icon={<Flame className="w-6 h-6 text-orange-600" />}
        features={FIRE_FEATURES}
        mustHaves={data.must_haves || []}
        niceToHaves={data.nice_to_haves || []}
        onToggle={toggleFeature}
      />

      <FeatureCategory
        title="Outdoor Living"
        icon={<Sofa className="w-6 h-6 text-green-600" />}
        features={OUTDOOR_LIVING}
        mustHaves={data.must_haves || []}
        niceToHaves={data.nice_to_haves || []}
        onToggle={toggleFeature}
      />

      <FeatureCategory
        title="Core Pool Features"
        icon={<Sparkles className="w-6 h-6 text-purple-600" />}
        features={CORE_FEATURES}
        mustHaves={data.must_haves || []}
        niceToHaves={data.nice_to_haves || []}
        onToggle={toggleFeature}
      />

      <StyleSelector
        styles={STYLE_PREFERENCES}
        selectedStyles={data.style_preferences || []}
        onToggle={toggleStyle}
      />
    </>
  );
}

function MultiDecisionMakerFeatures({ decisionMakers, data, toggleFeature, toggleStyle }) {
  return (
    <div className="space-y-6">
      {decisionMakers.map((maker, idx) => {
        const personFeatures = data.features_by_person?.[maker.name] || { must_haves: [], nice_to_haves: [] };
        
        return (
          <div key={idx} className="p-6 glass rounded-2xl border-2 border-purple-300/50">
            <h4 className="text-xl font-bold text-purple-900 mb-4">
              {maker.name}'s Feature Preferences
            </h4>
            
            <div className="space-y-6">
              <FeatureCategory
                title="Water Features"
                icon={<Waves className="w-5 h-5 text-cyan-600" />}
                features={WATER_FEATURES}
                mustHaves={personFeatures.must_haves}
                niceToHaves={personFeatures.nice_to_haves}
                onToggle={(feature, isMustHave) => toggleFeature(feature, isMustHave, maker.name)}
              />

              <FeatureCategory
                title="Fire Features"
                icon={<Flame className="w-5 h-5 text-orange-600" />}
                features={FIRE_FEATURES}
                mustHaves={personFeatures.must_haves}
                niceToHaves={personFeatures.nice_to_haves}
                onToggle={(feature, isMustHave) => toggleFeature(feature, isMustHave, maker.name)}
              />

              <FeatureCategory
                title="Outdoor Living"
                icon={<Sofa className="w-5 h-5 text-green-600" />}
                features={OUTDOOR_LIVING}
                mustHaves={personFeatures.must_haves}
                niceToHaves={personFeatures.nice_to_haves}
                onToggle={(feature, isMustHave) => toggleFeature(feature, isMustHave, maker.name)}
              />

              <FeatureCategory
                title="Core Pool Features"
                icon={<Sparkles className="w-5 h-5 text-purple-600" />}
                features={CORE_FEATURES}
                mustHaves={personFeatures.must_haves}
                niceToHaves={personFeatures.nice_to_haves}
                onToggle={(feature, isMustHave) => toggleFeature(feature, isMustHave, maker.name)}
              />
            </div>
          </div>
        );
      })}

      <StyleSelector
        styles={STYLE_PREFERENCES}
        selectedStyles={data.style_preferences || []}
        onToggle={toggleStyle}
      />
    </div>
  );
}

function FeatureCategory({ title, icon, features, mustHaves, niceToHaves, onToggle }) {
  return (
    <div>
      <h4 className="font-semibold text-slate-900 mb-3 flex items-center gap-2">
        {icon}
        {title}
      </h4>
      <div className="grid grid-cols-1 gap-2">
        {features.map((feature) => (
          <FeatureItem
            key={feature.name}
            feature={feature}
            isMustHave={mustHaves.includes(feature.name)}
            isNiceToHave={niceToHaves.includes(feature.name)}
            onToggle={onToggle}
          />
        ))}
      </div>
    </div>
  );
}

function FeatureItem({ feature, isMustHave, isNiceToHave, onToggle }) {
  return (
    <Card className="cursor-pointer hover:shadow-md transition-all">
      <CardContent className="p-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-2xl">{feature.icon}</span>
            <span className="text-sm font-medium text-slate-900">{feature.name}</span>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => onToggle(feature.name, true)}
              className={`px-3 py-1 rounded-lg text-xs font-medium transition-all ${
                isMustHave
                  ? "bg-amber-600 text-white"
                  : "bg-amber-100 text-amber-700 hover:bg-amber-200"
              }`}
            >
              {isMustHave && <CheckCircle className="w-3 h-3 inline mr-1" />}
              Must Have
            </button>
            <button
              onClick={() => onToggle(feature.name, false)}
              disabled={isMustHave}
              className={`px-3 py-1 rounded-lg text-xs font-medium transition-all ${
                isNiceToHave
                  ? "bg-blue-600 text-white"
                  : isMustHave
                  ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                  : "bg-blue-100 text-blue-700 hover:bg-blue-200"
              }`}
            >
              {isNiceToHave && <CheckCircle className="w-3 h-3 inline mr-1" />}
              Want
            </button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function StyleSelector({ styles, selectedStyles, onToggle }) {
  return (
    <div className="p-6 glass rounded-2xl border-2 border-cyan-300/50">
      <h4 className="font-semibold text-slate-900 mb-3">Design Style Preferences</h4>
      <div className="flex flex-wrap gap-3">
        {styles.map((style) => (
          <Badge
            key={style}
            onClick={() => onToggle(style)}
            className={`cursor-pointer px-4 py-2 text-sm transition-all ${
              selectedStyles.includes(style)
                ? "bg-cyan-600 text-white"
                : "bg-white text-slate-700 hover:bg-cyan-100"
            }`}
          >
            {selectedStyles.includes(style) && <CheckCircle className="w-3 h-3 mr-1 inline" />}
            {style}
          </Badge>
        ))}
      </div>
    </div>
  );
}