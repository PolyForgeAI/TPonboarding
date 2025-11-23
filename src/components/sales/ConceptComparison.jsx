import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/components/ui/card";
import { Badge } from "@/shared/components/ui/badge";
import { Button } from "@/shared/components/ui/button";
import { Check, X, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

export default function ConceptComparison({ concepts = [], onSelectConcept }) {
  const [hoveredIndex, setHoveredIndex] = useState(null);

  if (!concepts || concepts.length === 0) {
    return (
      <Card>
        <CardContent className="p-12 text-center text-gray-500">
          No design concepts to compare yet
        </CardContent>
      </Card>
    );
  }

  const features = [
    { key: "pool_dimensions", label: "Pool Size" },
    { key: "estimated_cost", label: "Investment" },
    { key: "timeline", label: "Timeline" },
    { key: "total_square_footage", label: "Total Area" },
  ];

  const getFeatureValue = (concept, key) => {
    return concept[key] || "—";
  };

  const hasFeature = (concept, featureName) => {
    return concept.key_features?.some(f => 
      f.toLowerCase().includes(featureName.toLowerCase())
    );
  };

  const keyFeaturesToCheck = [
    "Spa",
    "Waterfall",
    "Fire Feature",
    "BBQ Island",
    "Outdoor Kitchen",
    "Heating",
    "Automation"
  ];

  return (
    <Card className="border-none shadow-xl overflow-hidden">
      <CardHeader className="bg-gradient-to-r from-cyan-600 to-blue-600 text-white">
        <CardTitle className="text-center text-2xl">
          Compare Your Design Concepts
        </CardTitle>
        <p className="text-center text-cyan-100 text-sm mt-2">
          Side-by-side comparison to help you choose
        </p>
      </CardHeader>
      <CardContent className="p-0">
        <div className="grid grid-cols-1 md:grid-cols-3 divide-x divide-gray-200">
          {concepts.slice(0, 3).map((concept, index) => (
            <motion.div
              key={index}
              className={`relative ${hoveredIndex === index ? 'bg-cyan-50' : 'bg-white'} transition-colors`}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              {/* Header */}
              <div className={`p-6 text-center border-b ${
                hoveredIndex === index ? 'bg-gradient-to-r from-cyan-100 to-blue-100' : 'bg-gray-50'
              }`}>
                <h3 className="text-xl font-bold text-gray-900 mb-1">
                  {concept.name}
                </h3>
                <p className="text-sm text-gray-600 italic mb-3">
                  {concept.tagline}
                </p>
                {index === 1 && (
                  <Badge className="bg-amber-500 text-white">Most Popular</Badge>
                )}
                {index === 2 && (
                  <Badge className="bg-purple-500 text-white">Premium</Badge>
                )}
              </div>

              {/* Specs */}
              <div className="p-6 space-y-4">
                {features.map((feature, idx) => (
                  <div key={idx}>
                    <p className="text-xs text-gray-500 mb-1">{feature.label}</p>
                    <p className="font-semibold text-gray-900">
                      {getFeatureValue(concept, feature.key)}
                    </p>
                  </div>
                ))}
              </div>

              {/* Features Checklist */}
              <div className="px-6 pb-6 space-y-2 border-t pt-4">
                <p className="text-sm font-semibold text-gray-700 mb-3">Included Features:</p>
                {keyFeaturesToCheck.map((feature, idx) => (
                  <div key={idx} className="flex items-center gap-2">
                    {hasFeature(concept, feature) ? (
                      <Check className="w-4 h-4 text-green-600 flex-shrink-0" />
                    ) : (
                      <X className="w-4 h-4 text-gray-300 flex-shrink-0" />
                    )}
                    <span className={`text-sm ${
                      hasFeature(concept, feature) ? 'text-gray-900' : 'text-gray-400'
                    }`}>
                      {feature}
                    </span>
                  </div>
                ))}
              </div>

              {/* Pros */}
              {concept.pros && concept.pros.length > 0 && (
                <div className="px-6 pb-6 border-t pt-4">
                  <p className="text-sm font-semibold text-green-700 mb-2">Why Choose This:</p>
                  <ul className="space-y-1">
                    {concept.pros.slice(0, 3).map((pro, idx) => (
                      <li key={idx} className="text-xs text-gray-600 flex items-start gap-2">
                        <span className="text-green-600 mt-0.5">✓</span>
                        <span>{pro}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* CTA Button */}
              <div className="p-6 border-t">
                <Button
                  onClick={() => onSelectConcept && onSelectConcept(concept, index)}
                  className={`w-full ${
                    hoveredIndex === index
                      ? 'bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700'
                      : 'bg-gray-800 hover:bg-gray-900'
                  }`}
                  size="lg"
                >
                  Choose This Design
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </div>

              {/* Hover Effect */}
              {hoveredIndex === index && (
                <motion.div
                  className="absolute inset-0 border-4 border-cyan-500 rounded-lg pointer-events-none"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.2 }}
                />
              )}
            </motion.div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}