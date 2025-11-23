import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/shared/components/ui/tabs";
import { Card } from "@/shared/components/ui/card";
import { Sparkles, MapPin, Cloud, TrendingUp } from "lucide-react";
import { motion } from "framer-motion";
import DesignTrendPredictor from "../components/DesignTrendPredictor";
import NeighborhoodMapper from "../components/NeighborhoodMapper";
import WeatherIntegration from "../components/WeatherIntegration";

export default function IntelligenceCenter() {
  return (
    <div className="min-h-screen gradient-mesh p-6">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="glass p-8 rounded-3xl border-2 border-white/30 shadow-floating">
            <div className="flex items-center gap-4 mb-2">
              <div className="p-4 bg-gradient-to-br from-cyan-600 to-blue-600 rounded-2xl shadow-lg">
                <TrendingUp className="w-10 h-10 text-white" />
              </div>
              <div>
                <h1 className="text-4xl md:text-5xl font-bold text-slate-900 tracking-tight">
                  Market Intelligence Center
                </h1>
                <p className="text-slate-600 mt-1">
                  Strategic insights for customer acquisition and market domination
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        <Tabs defaultValue="trends" className="space-y-6">
          <TabsList className="glass grid w-full grid-cols-3 h-auto p-1">
            <TabsTrigger value="trends" className="flex items-center gap-2">
              <Sparkles className="w-4 h-4" />
              Design Trends
            </TabsTrigger>
            <TabsTrigger value="mapping" className="flex items-center gap-2">
              <MapPin className="w-4 h-4" />
              Neighborhood Mapping
            </TabsTrigger>
            <TabsTrigger value="weather" className="flex items-center gap-2">
              <Cloud className="w-4 h-4" />
              Weather Intelligence
            </TabsTrigger>
          </TabsList>

          <TabsContent value="trends">
            <DesignTrendPredictor />
          </TabsContent>

          <TabsContent value="mapping">
            <NeighborhoodMapper />
          </TabsContent>

          <TabsContent value="weather">
            <div className="text-center py-12 glass rounded-2xl">
              <Cloud className="w-16 h-16 text-slate-400 mx-auto mb-4" />
              <p className="text-slate-600">
                Weather integration requires a specific project. Access via Sales Hub for individual projects.
              </p>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}