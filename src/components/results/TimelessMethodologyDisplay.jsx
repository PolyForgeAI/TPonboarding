import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/components/ui/card";
import { Lightbulb, Eye, Navigation, Zap } from "lucide-react";

export default function TimelessMethodologyDisplay({ concept }) {
  if (!concept) return null;

  return (
    <div className="space-y-4">
      <div className="bg-gradient-to-r from-slate-800 to-slate-900 text-white p-6 rounded-xl">
        <h3 className="text-xl font-bold mb-4">Timeless Pools Design Methodology</h3>
        <div className="grid md:grid-cols-2 gap-4">
          <MethodologyPrinciple
            icon={<Lightbulb className="w-5 h-5" />}
            title="Intentional Design"
            description="Every element exists for a specific reason"
          />
          <MethodologyPrinciple
            icon={<Eye className="w-5 h-5" />}
            title="Lines of Sight"
            description="360° sightline analysis from every angle"
          />
          <MethodologyPrinciple
            icon={<Navigation className="w-5 h-5" />}
            title="Traffic Flow"
            description="Intuitive movement, zero blockages"
          />
          <MethodologyPrinciple
            icon={<Zap className="w-5 h-5" />}
            title="Advanced Lighting"
            description="7-15 Jandy lights, full color control"
          />
        </div>
      </div>

      {concept.intentional_design_rationale && (
        <Card className="border-cyan-200 bg-cyan-50/50">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Lightbulb className="w-5 h-5 text-cyan-600" />
              Intentional Design Analysis
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-700 leading-relaxed">{concept.intentional_design_rationale}</p>
          </CardContent>
        </Card>
      )}

      {concept.lines_of_sight_analysis && (
        <Card className="border-purple-200 bg-purple-50/50">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Eye className="w-5 h-5 text-purple-600" />
              Lines of Sight Analysis
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-700 leading-relaxed">{concept.lines_of_sight_analysis}</p>
          </CardContent>
        </Card>
      )}

      {concept.traffic_flow_analysis && (
        <Card className="border-green-200 bg-green-50/50">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Navigation className="w-5 h-5 text-green-600" />
              Traffic Flow Analysis
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-700 leading-relaxed">{concept.traffic_flow_analysis}</p>
          </CardContent>
        </Card>
      )}

      {concept.lighting_plan && (
        <Card className="border-yellow-200 bg-yellow-50/50">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Zap className="w-5 h-5 text-yellow-600" />
              Advanced Lighting Plan
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-4 mb-4">
              <div className="p-3 bg-white rounded-lg">
                <span className="text-xs text-gray-600">Total Lights</span>
                <p className="font-bold text-xl text-gray-900">
                  {concept.lighting_plan.total_lights || "10-15"}
                </p>
                <p className="text-xs text-gray-600">Jandy Infinite Watercolor</p>
              </div>
              <div className="p-3 bg-white rounded-lg">
                <span className="text-xs text-gray-600">Control System</span>
                <p className="font-semibold text-gray-900">
                  {concept.lighting_plan.control_system || "Jandy iAquaLink"}
                </p>
              </div>
            </div>

            <div className="space-y-2">
              {concept.lighting_plan.floor_uplights > 0 && (
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Floor Uplights (through water features):</span>
                  <span className="font-semibold">{concept.lighting_plan.floor_uplights}</span>
                </div>
              )}
              {concept.lighting_plan.trough_lights > 0 && (
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Overflow Trough Lighting:</span>
                  <span className="font-semibold">{concept.lighting_plan.trough_lights}</span>
                </div>
              )}
              {concept.lighting_plan.perimeter_lights > 0 && (
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Perimeter/Step Lights:</span>
                  <span className="font-semibold">{concept.lighting_plan.perimeter_lights}</span>
                </div>
              )}
            </div>

            {concept.lighting_plan.placement_details && (
              <p className="text-sm text-gray-700 mt-4 p-3 bg-white rounded-lg">
                {concept.lighting_plan.placement_details}
              </p>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
}

function MethodologyPrinciple({ icon, title, description }) {
  return (
    <div className="flex items-start gap-3 p-3 bg-white/10 rounded-lg">
      <div className="p-2 bg-cyan-500 rounded-lg">
        {icon}
      </div>
      <div>
        <h4 className="font-semibold text-white mb-1">{title}</h4>
        <p className="text-sm text-white/80">{description}</p>
      </div>
    </div>
  );
}