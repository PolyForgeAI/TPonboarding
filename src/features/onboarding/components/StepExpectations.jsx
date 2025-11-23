/**
 * STEP 1: EXPECTATIONS / WELCOME SCREEN
 * 
 * Purpose: Introduce the Timeless Pools design experience and set expectations
 * for the onboarding journey. Emphasizes Master Certification, Bespoke Design,
 * and Award-Winning quality.
 * 
 * Architecture:
 * - Layout: Centered hero with 3-column feature grid
 * - Visuals: Custom generated icons with luxury aesthetic
 * - Typography: Cursive "Your" overlay for elegant emphasis
 */

import React from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/shared/components/ui/button";

/**
 * StepExpectations Component
 * 
 * @param {Function} updateData - Callback to update parent state (currently unused)
 * @param {Function} onNext - Callback to proceed to next step
 */
export default function StepExpectations({ updateData, onNext }) {
  // Feature cards data structure
  const features = [
    {
      icon: "/images/icons/genesis-badge.png",
      title: "Master Certified",
      desc: "Benefit from the highest level of industry education and engineering standards.",
      color: "from-blue-500 to-blue-600"
    },
    {
      icon: "/images/icons/design-transform.png",
      title: "Bespoke Design",
      desc: "Every element is hand-selected to match your architectural style and personal taste.",
      color: "from-amber-500 to-amber-600"
    },
    {
      icon: "/images/icons/award-trophy.png",
      title: "Award Winning",
      desc: "Join a legacy of excellence with designs recognized globally for their beauty.",
      color: "from-blue-500 to-blue-600"
    }
  ];

  return (
    <div className="flex flex-col items-center justify-center max-w-5xl mx-auto w-full py-12 px-4 md:px-0">
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-16 space-y-6"
      >
        {/* Award Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border-2 border-primary/30 text-primary font-medium text-sm tracking-wide uppercase">
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
          World's Greatest Pools Winner
        </div>

        {/* Main Heading with Cursive Overlay */}
        <div className="relative">
          <h1 className="text-5xl md:text-7xl font-serif text-foreground leading-tight relative">
            Crafting{" "}
            <span className="relative inline-block">
              <span className="font-script text-6xl md:text-8xl text-transparent bg-clip-text bg-gradient-to-r from-amber-500 via-amber-600 to-amber-500 relative z-10">
                Your
              </span>
            </span>
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-accent to-primary">
              Masterpiece
            </span>
          </h1>
        </div>

        {/* Subheading */}
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
          Welcome to the Timeless Pools design experience. As a Genesis Master Certified Builder,
          we don't just build pools; we curate outdoor lifestyles tailored to your unique vision.
        </p>
      </motion.div>

      {/* Feature Cards Grid */}
      <div className="grid md:grid-cols-3 gap-8 w-full mb-16">
        {features.map((item, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 + (idx * 0.1) }}
            className="bg-card/80 backdrop-blur-md border-2 border-primary/20 p-8 rounded-2xl hover:bg-card/90 hover:border-primary/40 transition-all duration-300 group relative overflow-hidden"
          >
            {/* Subtle gradient background */}
            <div className={`absolute inset-0 bg-gradient-to-br ${item.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300`}></div>

            {/* Icon Container with Custom Image */}
            <div className="relative w-24 h-24 mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
              <img
                src={item.icon}
                alt={item.title}
                className="w-full h-full object-contain drop-shadow-lg"
              />
            </div>

            {/* Title */}
            <h3 className="text-xl font-serif font-semibold text-foreground mb-3 text-center">
              {item.title}
            </h3>

            {/* Description */}
            <p className="text-muted-foreground leading-relaxed text-center">
              {item.desc}
            </p>
          </motion.div>
        ))}
      </div>

      {/* CTA Button - Matching "Enter Atelier" Style */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, delay: 0.6 }}
      >
        <Button
          size="lg"
          onClick={onNext}
          className="h-12 text-lg font-serif tracking-widest bg-primary text-primary-foreground hover:bg-primary/90 transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5 px-12 rounded-full"
        >
          Begin Your Journey
          <ArrowRight className="ml-3 w-5 h-5" />
        </Button>
      </motion.div>
    </div>
  );
}