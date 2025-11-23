import React, { useState, useEffect, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/components/ui/card";
import { Button } from "@/shared/components/ui/button";
import { Badge } from "@/shared/components/ui/badge";
import { Eye, Move, RotateCw, Play, Pause, Info } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function VirtualWalkthrough({ concept, images }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentPosition, setCurrentPosition] = useState(0);
  const [viewAngle, setViewAngle] = useState(0);
  const [showInfo, setShowInfo] = useState(true);

  const walkthroughPoints = [
    {
      name: "Entry Point",
      position: 0,
      angle: 0,
      description: "You approach the pool area from the house. Notice the smooth transition from patio to pool deck.",
      features: ["Wide entrance", "Level access", "Clear sightlines"]
    },
    {
      name: "Pool Edge",
      position: 1,
      angle: 45,
      description: `Standing at the pool's edge. The ${concept?.recommended_finish || "premium"} finish creates a stunning visual effect.`,
      features: ["Pebble Tec finish", "Waterline tile detail", "Coping edge"]
    },
    {
      name: "Spa View",
      position: 2,
      angle: 90,
      description: "Looking toward the spa area. Perfect for relaxation with intentional placement for privacy.",
      features: ["Spa jets", "Spillover to pool", "Comfortable seating"]
    },
    {
      name: "Water Feature",
      position: 3,
      angle: 135,
      description: "The sound of cascading water creates a resort-like ambiance throughout the space.",
      features: ["Rock waterfall", "LED accent lights", "Natural stone"]
    },
    {
      name: "Outdoor Living",
      position: 4,
      angle: 180,
      description: "Your outdoor kitchen and lounge area. Perfect for entertaining with clear views of the pool.",
      features: ["BBQ island", "Bar seating", "Shade structure"]
    },
    {
      name: "Deep End",
      position: 5,
      angle: 225,
      description: `At ${concept?.pool_depth_deep || "8ft"} depth, ideal for diving and swimming laps.`,
      features: ["Deep end marker", "Underwater lights", "Safety features"]
    },
    {
      name: "Sun Shelf",
      position: 6,
      angle: 270,
      description: `Shallow ${concept?.pool_depth_shallow || "12in"} area perfect for lounging with kids or just cooling off.`,
      features: ["Baja shelf", "Sun loungers", "Umbrella placement"]
    },
    {
      name: "Evening View",
      position: 7,
      angle: 315,
      description: `At night, ${concept?.lighting_plan?.total_lights || 10} Jandy Infinite Watercolor lights transform your backyard into magic.`,
      features: ["Color-changing LEDs", "Ambient lighting", "Full control system"]
    }
  ];

  useEffect(() => {
    let interval;
    if (isPlaying) {
      interval = setInterval(() => {
        setCurrentPosition((prev) => (prev + 1) % walkthroughPoints.length);
      }, 5000);
    }
    return () => clearInterval(interval);
  }, [isPlaying, walkthroughPoints.length]);

  const currentPoint = walkthroughPoints[currentPosition];

  return (
    <Card className="border-none shadow-2xl overflow-hidden">
      <CardHeader className="bg-gradient-to-r from-slate-900 to-slate-800 text-white">
        <CardTitle className="flex items-center gap-2 text-2xl">
          <Eye className="w-6 h-6" />
          Virtual First-Person Walkthrough
        </CardTitle>
        <p className="text-slate-300 text-sm mt-2">
          Experience your pool design like you're already there
        </p>
      </CardHeader>
      <CardContent className="p-0">
        {/* Main View */}
        <div className="relative h-[500px] bg-gradient-to-br from-cyan-900 via-blue-900 to-slate-900">
          {/* 3D Environment Simulation */}
          <div className="absolute inset-0 flex items-center justify-center">
            <motion.div
              animate={{
                scale: [1, 1.05, 1],
                opacity: [0.6, 0.8, 0.6]
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="text-center"
            >
              <div className="text-white/40 text-6xl mb-4">
                {currentPosition === 0 && "🏠"}
                {currentPosition === 1 && "🏊"}
                {currentPosition === 2 && "♨️"}
                {currentPosition === 3 && "💦"}
                {currentPosition === 4 && "🍖"}
                {currentPosition === 5 && "🤿"}
                {currentPosition === 6 && "☀️"}
                {currentPosition === 7 && "✨"}
              </div>
              <p className="text-white/60 text-lg">
                {currentPoint.name}
              </p>
            </motion.div>
          </div>

          {/* View Angle Indicator */}
          <div className="absolute top-4 left-4 glass text-white px-4 py-2 rounded-full">
            <div className="flex items-center gap-2">
              <RotateCw className="w-4 h-4" />
              <span className="text-sm font-semibold">{currentPoint.angle}°</span>
            </div>
          </div>

          {/* Position Counter */}
          <div className="absolute top-4 right-4 glass text-white px-4 py-2 rounded-full">
            <div className="text-sm font-semibold">
              {currentPosition + 1} / {walkthroughPoints.length}
            </div>
          </div>

          {/* Info Overlay */}
          <AnimatePresence>
            {showInfo && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="absolute bottom-6 left-6 right-6 glass-dark text-white p-6 rounded-2xl"
              >
                <div className="flex items-start justify-between mb-3">
                  <h3 className="text-xl font-bold">{currentPoint.name}</h3>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => setShowInfo(false)}
                    className="text-white hover:bg-white/20 -mt-2 -mr-2"
                  >
                    ✕
                  </Button>
                </div>
                <p className="text-white/90 mb-4 leading-relaxed">
                  {currentPoint.description}
                </p>
                <div className="flex gap-2 flex-wrap">
                  {currentPoint.features.map((feature, idx) => (
                    <Badge key={idx} className="bg-white/20 text-white border-white/30">
                      {feature}
                    </Badge>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {!showInfo && (
            <Button
              size="sm"
              onClick={() => setShowInfo(true)}
              className="absolute bottom-6 right-6 glass-dark text-white hover:bg-white/20"
            >
              <Info className="w-4 h-4 mr-2" />
              Show Info
            </Button>
          )}
        </div>

        {/* Controls */}
        <div className="p-6 bg-slate-50 border-t-2 border-slate-200">
          <div className="flex items-center justify-between mb-4">
            <Button
              onClick={() => setIsPlaying(!isPlaying)}
              size="lg"
              className="bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700"
            >
              {isPlaying ? (
                <>
                  <Pause className="w-5 h-5 mr-2" />
                  Pause Tour
                </>
              ) : (
                <>
                  <Play className="w-5 h-5 mr-2" />
                  Start Auto Tour
                </>
              )}
            </Button>

            <div className="flex gap-2">
              <Button
                variant="outline"
                onClick={() => setCurrentPosition(Math.max(0, currentPosition - 1))}
                disabled={currentPosition === 0}
              >
                ← Previous
              </Button>
              <Button
                variant="outline"
                onClick={() => setCurrentPosition(Math.min(walkthroughPoints.length - 1, currentPosition + 1))}
                disabled={currentPosition === walkthroughPoints.length - 1}
              >
                Next →
              </Button>
            </div>
          </div>

          {/* Position Timeline */}
          <div className="space-y-2">
            <div className="flex justify-between text-xs text-slate-600 mb-1">
              <span>Tour Progress</span>
              <span>{Math.round(((currentPosition + 1) / walkthroughPoints.length) * 100)}%</span>
            </div>
            <div className="h-2 bg-slate-200 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-cyan-600 to-blue-600"
                animate={{
                  width: `${((currentPosition + 1) / walkthroughPoints.length) * 100}%`
                }}
                transition={{ duration: 0.3 }}
              />
            </div>
          </div>

          {/* Quick Jump */}
          <div className="mt-4 grid grid-cols-4 md:grid-cols-8 gap-2">
            {walkthroughPoints.map((point, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentPosition(idx)}
                className={`p-2 rounded-lg text-xs font-medium transition-all ${
                  idx === currentPosition
                    ? "bg-gradient-to-r from-cyan-600 to-blue-600 text-white shadow-lg scale-105"
                    : idx < currentPosition
                    ? "bg-green-100 text-green-800 hover:bg-green-200"
                    : "bg-slate-200 text-slate-600 hover:bg-slate-300"
                }`}
              >
                {idx + 1}
              </button>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}