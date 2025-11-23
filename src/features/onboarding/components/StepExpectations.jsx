/**
 * STEP 1: EXPECTATIONS / WELCOME SCREEN
 * 
 * Purpose: Introduce the Timeless Pools design experience and set expectations
 * for the onboarding journey. Emphasizes Master Certification, Bespoke Design,
 * and Award-Winning quality.
 * 
 * Architecture:
 * - Layout: Centered hero with 3-column feature grid
 * - Visuals: Custom SVG icons with increased stroke width for visibility
 * - Linguistics: All text strings should be extracted to i18n layer (future)
 */

import React from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/shared/components/ui/button";
import { ShieldCheckIcon, SparkleIcon, TrophyIcon } from "@/components/icons/CustomIcons";

/**
 * StepExpectations Component
 * 
 * @param {Function} updateData - Callback to update parent state (currently unused)
 * @param {Function} onNext - Callback to proceed to next step
 */
export default function StepExpectations({ updateData, onNext }) {
  // Feature cards data structure
  // TODO: Move to /src/data/onboarding/expectations.js for better separation
  const features = [
    {
      icon: ShieldCheckIcon,
      title: "Master Certified",
      desc: "Benefit from the highest level of industry education and engineering standards.",
      color: "text-primary" // Royal Blue
    },
    {
      icon: SparkleIcon,
      title: "Bespoke Design",
      desc: "Every element is hand-selected to match your architectural style and personal taste.",
      color: "text-accent" // Gold
    },
    {
      icon: TrophyIcon,
      title: "Award Winning",
      desc: "Join a legacy of excellence with designs recognized globally for their beauty.",
      color: "text-primary" // Royal Blue
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
          <TrophyIcon className="w-4 h-4" />
          World's Greatest Pools Winner
        </div>

        {/* Main Heading */}
        <h1 className="text-5xl md:text-7xl font-serif font-bold text-foreground leading-tight">
          Crafting Your <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-accent to-primary">
            Masterpiece
          </span>
        </h1>

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
            className="bg-card/80 backdrop-blur-md border-2 border-primary/20 p-8 rounded-2xl hover:bg-card/90 hover:border-primary/40 transition-all duration-300 group"
          >
            {/* Icon Container - Increased size and contrast */}
            <div className={`w-16 h-16 bg-gradient-to-br from-primary/10 to-accent/10 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 border-2 border-primary/20 ${item.color}`}>
              <item.icon className="w-9 h-9" />
            </div>

            {/* Title */}
            <h3 className="text-xl font-serif font-semibold text-foreground mb-3">
              {item.title}
            </h3>

            {/* Description */}
            <p className="text-muted-foreground leading-relaxed">
              {item.desc}
            </p>
          </motion.div>
        ))}
      </div>

      {/* CTA Button */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, delay: 0.6 }}
      >
        <Button
          size="lg"
          onClick={onNext}
          className="bg-primary text-primary-foreground hover:bg-primary/90 text-lg px-12 py-8 rounded-full shadow-xl shadow-primary/20 hover:shadow-primary/40 transition-all duration-300 group"
        >
          Begin Your Journey
          <ArrowRight className="ml-3 w-5 h-5 group-hover:translate-x-1 transition-transform" />
        </Button>
      </motion.div>
    </div>
  );
}