import React from "react";
import { motion } from "framer-motion";
import { Check } from "lucide-react";

const POOL_SHAPES = [
  {
    id: "rectangular",
    name: "Rectangular",
    icon: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 60'%3E%3Crect x='10' y='10' width='80' height='40' fill='%2306b6d4' stroke='%230284c7' stroke-width='2' rx='4'/%3E%3C/svg%3E",
    description: "Classic, timeless design"
  },
  {
    id: "kidney",
    name: "Kidney",
    icon: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 60'%3E%3Cpath d='M 15 30 Q 15 10 35 10 L 60 10 Q 80 10 85 25 Q 90 35 85 40 Q 80 50 60 50 L 35 50 Q 15 50 15 30 Z' fill='%2306b6d4' stroke='%230284c7' stroke-width='2'/%3E%3C/svg%3E",
    description: "Organic, flowing curves"
  },
  {
    id: "freeform",
    name: "Freeform",
    icon: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 60'%3E%3Cpath d='M 20 15 Q 10 10 15 25 Q 12 35 25 40 Q 35 50 55 48 Q 70 47 80 35 Q 88 25 85 15 Q 80 8 65 10 Q 45 12 30 10 Q 25 10 20 15 Z' fill='%2306b6d4' stroke='%230284c7' stroke-width='2'/%3E%3C/svg%3E",
    description: "Natural, custom curves"
  },
  {
    id: "figure-8",
    name: "Figure 8",
    icon: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 60'%3E%3Ccircle cx='35' cy='20' r='15' fill='%2306b6d4' stroke='%230284c7' stroke-width='2'/%3E%3Ccircle cx='65' cy='40' r='15' fill='%2306b6d4' stroke='%230284c7' stroke-width='2'/%3E%3C/svg%3E",
    description: "Dual lounging areas"
  },
  {
    id: "geometric",
    name: "Geometric",
    icon: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 60'%3E%3Cpolygon points='20,15 50,8 80,15 85,45 50,52 15,45' fill='%2306b6d4' stroke='%230284c7' stroke-width='2'/%3E%3C/svg%3E",
    description: "Modern angular design"
  },
  {
    id: "grecian",
    name: "Grecian",
    icon: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 60'%3E%3Cpath d='M 25 10 L 75 10 Q 85 10 85 20 L 85 40 Q 85 50 75 50 L 25 50 Q 15 50 15 40 L 15 20 Q 15 10 25 10 Z' fill='%2306b6d4' stroke='%230284c7' stroke-width='2'/%3E%3C/svg%3E",
    description: "Classical Roman style"
  },
  {
    id: "lazy-l",
    name: "Lazy L",
    icon: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 60'%3E%3Cpath d='M 15 10 L 60 10 L 60 25 L 85 25 L 85 50 L 15 50 Z' fill='%2306b6d4' stroke='%230284c7' stroke-width='2'/%3E%3C/svg%3E",
    description: "Separate spa section"
  },
  {
    id: "roman",
    name: "Roman",
    icon: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 60'%3E%3Cpath d='M 30 10 Q 20 10 15 15 L 15 45 Q 15 50 20 50 L 80 50 Q 85 50 85 45 L 85 15 Q 85 10 80 10 L 70 10 Q 65 15 50 15 Q 35 15 30 10 Z' fill='%2306b6d4' stroke='%230284c7' stroke-width='2'/%3E%3C/svg%3E",
    description: "Elegant Roman ends"
  },
  {
    id: "oval",
    name: "Oval",
    icon: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 60'%3E%3Cellipse cx='50' cy='30' rx='38' ry='20' fill='%2306b6d4' stroke='%230284c7' stroke-width='2'/%3E%3C/svg%3E",
    description: "Smooth, flowing shape"
  },
  {
    id: "infinity",
    name: "Infinity Edge",
    icon: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 60'%3E%3Crect x='10' y='15' width='80' height='30' fill='%2306b6d4' stroke='%230284c7' stroke-width='2'/%3E%3Cline x1='10' y1='45' x2='90' y2='45' stroke='%2314b8a6' stroke-width='4' stroke-dasharray='5,5'/%3E%3C/svg%3E",
    description: "Vanishing edge design"
  },
  {
    id: "beach-entry",
    name: "Beach Entry",
    icon: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 60'%3E%3Cpath d='M 10 50 L 35 25 Q 50 15 75 20 L 90 50 Z' fill='%2306b6d4' stroke='%230284c7' stroke-width='2'/%3E%3Cpath d='M 10 50 L 25 35' stroke='%23fbbf24' stroke-width='3'/%3E%3C/svg%3E",
    description: "Zero-depth entry"
  },
  {
    id: "lap",
    name: "Lap Pool",
    icon: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 60'%3E%3Crect x='10' y='20' width='80' height='20' fill='%2306b6d4' stroke='%230284c7' stroke-width='2' rx='2'/%3E%3Cline x1='25' y1='20' x2='25' y2='40' stroke='white' stroke-width='1' stroke-dasharray='2,2'/%3E%3Cline x1='40' y1='20' x2='40' y2='40' stroke='white' stroke-width='1' stroke-dasharray='2,2'/%3E%3Cline x1='55' y1='20' x2='55' y2='40' stroke='white' stroke-width='1' stroke-dasharray='2,2'/%3E%3Cline x1='70' y1='20' x2='70' y2='40' stroke='white' stroke-width='1' stroke-dasharray='2,2'/%3E%3C/svg%3E",
    description: "Long, narrow for swimming"
  }
];

export default function VisualPoolShapeSelector({ selectedShape, onSelect }) {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-2xl font-bold text-slate-900 mb-2">Select Your Pool Shape</h3>
        <p className="text-slate-600">Choose the shape that best fits your vision and property</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {POOL_SHAPES.map((shape) => (
          <motion.button
            key={shape.id}
            onClick={() => onSelect(shape.id)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            className={`relative p-4 rounded-xl border-2 transition-all ${
              selectedShape === shape.id
                ? "border-cyan-600 bg-cyan-50 shadow-lg"
                : "border-slate-200 bg-white hover:border-cyan-300 hover:shadow-md"
            }`}
          >
            {selectedShape === shape.id && (
              <div className="absolute top-2 right-2 w-6 h-6 bg-cyan-600 rounded-full flex items-center justify-center">
                <Check className="w-4 h-4 text-white" />
              </div>
            )}

            <div className="mb-3">
              <img
                src={shape.icon}
                alt={shape.name}
                className="w-full h-24 object-contain"
              />
            </div>

            <div className="text-center">
              <h4 className={`font-semibold mb-1 ${
                selectedShape === shape.id ? "text-cyan-900" : "text-slate-900"
              }`}>
                {shape.name}
              </h4>
              <p className={`text-xs ${
                selectedShape === shape.id ? "text-cyan-700" : "text-slate-500"
              }`}>
                {shape.description}
              </p>
            </div>
          </motion.button>
        ))}
      </div>
    </div>
  );
}