import React, { useState } from "react";
import { Card, CardContent } from "@/shared/components/ui/card";
import { Button } from "@/shared/components/ui/button";
import { Badge } from "@/shared/components/ui/badge";
import { 
  ChevronLeft, 
  ChevronRight, 
  Maximize2, 
  Home, 
  Sparkles, 
  DollarSign, 
  TrendingUp,
  CheckCircle,
  FileText
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function SalesPresentationMode({ submission, concepts }) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const slides = [
    {
      type: "cover",
      title: "Your Dream Pool Awaits",
      subtitle: `Custom Design Proposal for ${submission?.contact_name}`,
      image: concepts?.[0]?.concept_images?.[0],
    },
    {
      type: "property",
      title: "Your Property",
      content: {
        address: submission?.property_address,
        city: `${submission?.property_city}, ${submission?.property_state}`,
        lot_size: submission?.property_data?.lot_square_footage,
        estimated_value: submission?.property_data?.estimated_value,
      }
    },
    {
      type: "vision",
      title: "Your Vision",
      content: submission?.pool_vision,
      features: submission?.must_haves,
    },
    ...concepts?.map((concept, idx) => ({
      type: "concept",
      title: concept.name,
      tagline: concept.tagline,
      description: concept.description,
      image: submission?.concept_images?.[idx],
      layout: submission?.site_layout_images?.[idx],
      cost: concept.estimated_cost,
      timeline: concept.timeline,
      features: concept.key_features,
      why: concept.why_this_fits,
    })) || [],
    {
      type: "investment",
      title: "Investment Analysis",
      content: "ROI and financing options"
    },
    {
      type: "next_steps",
      title: "Next Steps",
      content: "Let's bring your vision to life"
    },
  ];

  const totalSlides = slides.length;

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % totalSlides);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
  };

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  const currentSlideData = slides[currentSlide];

  const renderSlide = () => {
    switch (currentSlideData.type) {
      case "cover":
        return (
          <div className="relative h-full flex items-center justify-center text-center">
            {currentSlideData.image && (
              <div className="absolute inset-0">
                <img 
                  src={currentSlideData.image} 
                  alt="Pool concept"
                  className="w-full h-full object-cover opacity-40"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/70" />
              </div>
            )}
            <div className="relative z-10 px-12">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
              >
                <div className="inline-flex p-4 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-3xl mb-8 shadow-2xl">
                  <span className="text-white text-6xl font-bold">T</span>
                </div>
                <h1 className="text-7xl font-bold text-white mb-6 drop-shadow-lg">
                  {currentSlideData.title}
                </h1>
                <p className="text-3xl text-cyan-200 mb-12">
                  {currentSlideData.subtitle}
                </p>
                <div className="flex items-center justify-center gap-4 text-white/90">
                  <Badge className="bg-white/20 text-white text-lg px-6 py-2">
                    GENESIS® Certified Master
                  </Badge>
                  <Badge className="bg-white/20 text-white text-lg px-6 py-2">
                    World's Greatest Pools
                  </Badge>
                </div>
              </motion.div>
            </div>
          </div>
        );

      case "property":
        return (
          <div className="h-full flex items-center justify-center p-12">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="max-w-4xl w-full"
            >
              <div className="flex items-center gap-4 mb-8">
                <Home className="w-16 h-16 text-cyan-600" />
                <h2 className="text-5xl font-bold text-gray-900">{currentSlideData.title}</h2>
              </div>
              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-6">
                  <div className="p-6 bg-gradient-to-r from-cyan-50 to-blue-50 rounded-2xl">
                    <p className="text-sm text-gray-600 mb-2">Address</p>
                    <p className="text-2xl font-semibold text-gray-900">
                      {currentSlideData.content.address}
                    </p>
                    <p className="text-lg text-gray-700">{currentSlideData.content.city}</p>
                  </div>
                  <div className="p-6 bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl">
                    <p className="text-sm text-gray-600 mb-2">Lot Size</p>
                    <p className="text-3xl font-bold text-purple-900">
                      {currentSlideData.content.lot_size || "TBD"}
                    </p>
                  </div>
                </div>
                <div className="p-8 bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl flex flex-col justify-center">
                  <p className="text-sm text-gray-600 mb-3">Estimated Property Value</p>
                  <p className="text-5xl font-bold text-green-700">
                    {currentSlideData.content.estimated_value || "TBD"}
                  </p>
                  <p className="text-lg text-gray-600 mt-4">
                    Prime location for luxury pool installation
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        );

      case "vision":
        return (
          <div className="h-full flex items-center justify-center p-12">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              className="max-w-5xl w-full"
            >
              <div className="flex items-center gap-4 mb-8">
                <Sparkles className="w-16 h-16 text-purple-600" />
                <h2 className="text-5xl font-bold text-gray-900">{currentSlideData.title}</h2>
              </div>
              <div className="p-8 bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl mb-8">
                <p className="text-2xl text-gray-700 italic leading-relaxed">
                  "{currentSlideData.content}"
                </p>
              </div>
              {currentSlideData.features && currentSlideData.features.length > 0 && (
                <div>
                  <h3 className="text-2xl font-semibold text-gray-900 mb-6">Must-Have Features:</h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    {currentSlideData.features.map((feature, idx) => (
                      <div key={idx} className="flex items-center gap-3 p-4 bg-white rounded-xl shadow-md">
                        <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0" />
                        <span className="text-lg text-gray-900">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </motion.div>
          </div>
        );

      case "concept":
        return (
          <div className="h-full p-12 overflow-y-auto">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="max-w-6xl mx-auto"
            >
              <div className="mb-8">
                <h2 className="text-5xl font-bold text-gray-900 mb-3">
                  {currentSlideData.title}
                </h2>
                <p className="text-2xl text-cyan-600 italic">{currentSlideData.tagline}</p>
              </div>

              <div className="grid md:grid-cols-2 gap-8 mb-8">
                {currentSlideData.image && (
                  <div className="rounded-2xl overflow-hidden shadow-2xl">
                    <img 
                      src={currentSlideData.image} 
                      alt={currentSlideData.title}
                      className="w-full h-96 object-cover"
                    />
                  </div>
                )}
                {currentSlideData.layout && (
                  <div className="rounded-2xl overflow-hidden shadow-2xl bg-white p-4">
                    <img 
                      src={currentSlideData.layout} 
                      alt="Site layout"
                      className="w-full h-full object-contain"
                    />
                  </div>
                )}
              </div>

              <div className="grid md:grid-cols-3 gap-6 mb-8">
                <div className="p-6 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl">
                  <DollarSign className="w-8 h-8 text-green-600 mb-3" />
                  <p className="text-sm text-gray-600 mb-1">Investment</p>
                  <p className="text-2xl font-bold text-gray-900">{currentSlideData.cost}</p>
                </div>
                <div className="p-6 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl">
                  <TrendingUp className="w-8 h-8 text-blue-600 mb-3" />
                  <p className="text-sm text-gray-600 mb-1">Timeline</p>
                  <p className="text-2xl font-bold text-gray-900">{currentSlideData.timeline}</p>
                </div>
                <div className="p-6 bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl">
                  <Sparkles className="w-8 h-8 text-purple-600 mb-3" />
                  <p className="text-sm text-gray-600 mb-1">Features</p>
                  <p className="text-2xl font-bold text-gray-900">{currentSlideData.features?.length || 0}</p>
                </div>
              </div>

              <div className="p-8 bg-gradient-to-r from-cyan-50 to-blue-50 rounded-2xl">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Why This Design Fits You:</h3>
                <p className="text-lg text-gray-700 leading-relaxed">{currentSlideData.why}</p>
              </div>
            </motion.div>
          </div>
        );

      case "investment":
        return (
          <div className="h-full flex items-center justify-center p-12">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="max-w-5xl w-full"
            >
              <div className="flex items-center gap-4 mb-12 justify-center">
                <DollarSign className="w-16 h-16 text-green-600" />
                <h2 className="text-5xl font-bold text-gray-900">{currentSlideData.title}</h2>
              </div>
              <div className="text-center text-2xl text-gray-600 mb-12">
                See how this investment enhances your property value and lifestyle
              </div>
              <div className="grid md:grid-cols-3 gap-8">
                <div className="p-8 bg-gradient-to-br from-green-100 to-emerald-100 rounded-2xl text-center">
                  <TrendingUp className="w-12 h-12 text-green-700 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">ROI</h3>
                  <p className="text-4xl font-bold text-green-700">60-80%</p>
                  <p className="text-sm text-gray-600 mt-2">Value recovery at sale</p>
                </div>
                <div className="p-8 bg-gradient-to-br from-blue-100 to-cyan-100 rounded-2xl text-center">
                  <Home className="w-12 h-12 text-blue-700 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Home Value</h3>
                  <p className="text-4xl font-bold text-blue-700">+15%</p>
                  <p className="text-sm text-gray-600 mt-2">Typical increase</p>
                </div>
                <div className="p-8 bg-gradient-to-br from-purple-100 to-pink-100 rounded-2xl text-center">
                  <Sparkles className="w-12 h-12 text-purple-700 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Lifestyle</h3>
                  <p className="text-4xl font-bold text-purple-700">Priceless</p>
                  <p className="text-sm text-gray-600 mt-2">Daily enjoyment</p>
                </div>
              </div>
            </motion.div>
          </div>
        );

      case "next_steps":
        return (
          <div className="h-full flex items-center justify-center p-12">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              className="max-w-4xl w-full text-center"
            >
              <h2 className="text-6xl font-bold text-gray-900 mb-8">
                Let's Make It Happen
              </h2>
              <p className="text-2xl text-gray-600 mb-12">
                You're three simple steps away from your dream outdoor space
              </p>
              <div className="space-y-6 mb-12">
                <div className="p-6 bg-gradient-to-r from-cyan-50 to-blue-50 rounded-xl flex items-center gap-6">
                  <div className="w-16 h-16 bg-cyan-600 text-white rounded-full flex items-center justify-center text-2xl font-bold flex-shrink-0">
                    1
                  </div>
                  <div className="text-left">
                    <h3 className="text-xl font-bold text-gray-900 mb-1">Choose Your Design</h3>
                    <p className="text-gray-600">Select your favorite concept (or combine elements)</p>
                  </div>
                </div>
                <div className="p-6 bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl flex items-center gap-6">
                  <div className="w-16 h-16 bg-purple-600 text-white rounded-full flex items-center justify-center text-2xl font-bold flex-shrink-0">
                    2
                  </div>
                  <div className="text-left">
                    <h3 className="text-xl font-bold text-gray-900 mb-1">Finalize Details</h3>
                    <p className="text-gray-600">Work with our team to perfect every detail</p>
                  </div>
                </div>
                <div className="p-6 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl flex items-center gap-6">
                  <div className="w-16 h-16 bg-green-600 text-white rounded-full flex items-center justify-center text-2xl font-bold flex-shrink-0">
                    3
                  </div>
                  <div className="text-left">
                    <h3 className="text-xl font-bold text-gray-900 mb-1">Start Construction</h3>
                    <p className="text-gray-600">Begin building your dream with Timeless Pools</p>
                  </div>
                </div>
              </div>
              <Button size="lg" className="text-2xl px-12 py-8 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700">
                Let's Get Started
              </Button>
            </motion.div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className={`relative ${isFullscreen ? 'fixed inset-0 z-50' : 'h-screen'} bg-white`}>
      {/* Slide Content */}
      <div className="h-full">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.3 }}
            className="h-full"
          >
            {renderSlide()}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation Controls */}
      <div className="absolute bottom-8 left-0 right-0 flex items-center justify-between px-12">
        <Button
          onClick={prevSlide}
          size="lg"
          variant="outline"
          className="bg-white/90 backdrop-blur-sm"
          disabled={currentSlide === 0}
        >
          <ChevronLeft className="w-6 h-6" />
        </Button>

        <div className="flex items-center gap-4 bg-white/90 backdrop-blur-sm px-6 py-3 rounded-full">
          <span className="text-lg font-semibold">
            {currentSlide + 1} / {totalSlides}
          </span>
          <div className="flex gap-2">
            {slides.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentSlide(idx)}
                className={`w-3 h-3 rounded-full transition-all ${
                  idx === currentSlide 
                    ? 'bg-cyan-600 w-8' 
                    : 'bg-gray-300 hover:bg-gray-400'
                }`}
              />
            ))}
          </div>
        </div>

        <div className="flex gap-3">
          <Button
            onClick={toggleFullscreen}
            size="lg"
            variant="outline"
            className="bg-white/90 backdrop-blur-sm"
          >
            <Maximize2 className="w-5 h-5" />
          </Button>
          <Button
            onClick={nextSlide}
            size="lg"
            className="bg-gradient-to-r from-cyan-600 to-blue-600"
            disabled={currentSlide === totalSlides - 1}
          >
            <ChevronRight className="w-6 h-6" />
          </Button>
        </div>
      </div>

      {/* Timeless Pools Branding */}
      <div className="absolute top-8 left-8 flex items-center gap-3 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-lg">
        <div className="w-8 h-8 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-lg flex items-center justify-center">
          <span className="text-white text-lg font-bold">T</span>
        </div>
        <span className="font-bold text-gray-900">Timeless Pools</span>
      </div>
    </div>
  );
}