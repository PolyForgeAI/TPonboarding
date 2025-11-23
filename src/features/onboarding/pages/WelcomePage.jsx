import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { base44 } from "@/api/base44Client";
import { Button } from "@/shared/components/ui/button";
import { Input } from "@/shared/components/ui/input";
import { Card, CardContent } from "@/shared/components/ui/card";
import { Label } from "@/shared/components/ui/label";
import { ArrowRight, Key, Loader2, Shield, Award, Star, Gem } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";
import { BRANDING } from "@/shared/components/branding/Constants";

const COMPARISONS = [
  {
    boring: "Weeks to hear back",
    nextLevel: "We respond quickly and transparently",
    image: "https://timelesspools.us/wp-content/uploads/2024/08/E-14.jpg"
  },
  {
    boring: "Generic cookie-cutter approach",
    nextLevel: "We take time to understand YOUR needs",
    image: "https://timelesspools.us/wp-content/uploads/2025/03/1920-AB-10.jpg"
  },
  {
    boring: "Communication black holes",
    nextLevel: "Responsive and available during business hours",
    image: "https://timelesspools.us/wp-content/uploads/2025/03/G-44.jpg"
  },
  {
    boring: "$150k quote mysteriously becomes $220k",
    nextLevel: "Transparent pricing. No surprise charges. Ever.",
    image: "https://timelesspools.us/wp-content/uploads/2024/06/H-27.jpg"
  },
  {
    boring: "Builder disappears after deposit",
    nextLevel: "We're here for you every step of the way",
    image: "https://timelesspools.us/wp-content/uploads/2024/08/I-10.jpg"
  },
  {
    boring: "One size fits all approach",
    nextLevel: "GENESIS® intentional design methodology",
    image: "https://timelesspools.us/wp-content/uploads/2024/06/J-3.jpg"
  },
  {
    boring: "Cheap materials that fail early",
    nextLevel: "Elite Pebble Tec finishes (20+ year lifespan)",
    image: "https://timelesspools.us/wp-content/uploads/2024/08/K-3.jpg"
  }
];

export default function Welcome() {
  const navigate = useNavigate();
  const [accessCode, setAccessCode] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [currentComparison, setCurrentComparison] = useState(0);
  const [showRequestForm, setShowRequestForm] = useState(false);
  const [requestData, setRequestData] = useState({
    name: "",
    email: "",
    phone: "",
    property_address: ""
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentComparison((prev) => (prev + 1) % COMPARISONS.length);
    }, 4500);
    return () => clearInterval(interval);
  }, []);

  const handleAccessCode = async () => {
    const trimmed = accessCode.trim().toUpperCase();

    if (!trimmed) {
      toast.error("Please enter an access code");
      return;
    }

    setIsLoading(true);

    try {
      const submissions = await base44.entities.OnboardingSubmission.filter({
        access_code: trimmed
      });

      if (submissions && submissions.length > 0) {
        navigate(createPageUrl("Onboarding") + `?code=${trimmed}`);
      } else {
        toast.error("Access code not found. Please check and try again.");
      }
    } catch (error) {
      console.error("Error finding access code:", error);
      toast.error("Error validating access code. Please try again.");
    }
    
    setIsLoading(false);
  };

  const handleRequestAccess = async () => {
    if (!requestData.name || !requestData.email || !requestData.property_address) {
      toast.error("Please fill in all required fields");
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(requestData.email)) {
      toast.error("Please enter a valid email address");
      return;
    }

    setIsLoading(true);

    try {
      const generateCode = () => {
        const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
        let code = "";
        for (let i = 0; i < 6; i++) {
          code += chars.charAt(Math.floor(Math.random() * chars.length));
          if (i === 2) code += "-";
        }
        return code;
      };

      const accessCode = generateCode();
      
      await base44.entities.OnboardingSubmission.create({
        contact_name: requestData.name,
        contact_email: requestData.email,
        contact_phone: requestData.phone,
        property_address: requestData.property_address,
        access_code: accessCode,
        status: "in_progress",
        current_step: 1
      });

      await base44.integrations.Core.SendEmail({
        to: requestData.email,
        subject: `Welcome to ${BRANDING.company_name} - Your Access Code`,
        body: `Hi ${requestData.name},

Thank you for reaching out to ${BRANDING.company_name}!

Your access code: ${accessCode}

Click here to continue: ${window.location.origin}${createPageUrl("Onboarding")}?code=${accessCode}

We'll ask you some questions about your project so we can better understand your needs and help you explore what's possible for your property.

Looking forward to working with you!

Best,
${BRANDING.company_name} Team

P.S. Save this email - you'll need your access code to return anytime.`
      });

      toast.success(`Access code sent to ${requestData.email}!`);
      
      setTimeout(() => {
        navigate(createPageUrl("Onboarding") + `?code=${accessCode}`);
      }, 1500);

    } catch (error) {
      console.error("Error creating project:", error);
      toast.error("Something went wrong. Please try again or contact us directly.");
    }

    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-slate-50 relative overflow-hidden">
      {/* Hero Background - Stunning Pool from Gallery */}
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url('https://timelesspools.us/wp-content/uploads/2024/05/U-1.jpg')`,
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-white/70 via-white/50 to-white/80" />
      </div>

      <div className="relative z-10">
        {/* Header - Minimal */}
        <header className="py-6 px-6">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <motion.div 
              className="flex items-center gap-3"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <div className="w-12 h-12 bg-gradient-to-br from-cyan-400 to-blue-600 rounded-xl flex items-center justify-center shadow-2xl">
                <span className="text-white text-2xl font-bold">T</span>
              </div>
              <div>
                <h1 className="text-xl font-bold text-slate-900 tracking-tight">{BRANDING.company_name}</h1>
                <p className="text-xs text-cyan-600">{BRANDING.company_tagline}</p>
              </div>
            </motion.div>

            <Link to={createPageUrl("AdminDashboard")}>
              <Button className="glass border border-slate-200 hover:border-cyan-400 text-slate-900 shadow-lg backdrop-blur-xl">
                <Shield className="w-4 h-4 mr-2" />
                Admin
              </Button>
            </Link>
          </div>
        </header>

        {/* Hero Section */}
        <section className="py-20 px-6">
          <div className="max-w-7xl mx-auto">
            
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-20"
            >
              <h2 className="text-6xl md:text-8xl font-black text-slate-900 mb-8 leading-none tracking-tighter">
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 via-blue-600 to-cyan-500 animate-gradient bg-[length:200%_auto]">
                  Welcome to Timeless Pools
                </span>
              </h2>

              <p className="text-2xl md:text-3xl text-slate-700 max-w-4xl mx-auto font-light leading-relaxed">
                Let's begin your <span className="text-cyan-600 font-semibold">bespoke</span>, <span className="text-cyan-600 font-semibold">transparent</span>, award-winning personal resort experience—<span className="text-cyan-600 font-semibold">uniquely built for you</span>.
              </p>
            </motion.div>

            {/* Comparison Section - ALL POOL IMAGES */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="mb-20"
            >
              <div className="relative h-[500px] rounded-2xl overflow-hidden border-2 border-slate-200 shadow-2xl">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentComparison}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.6 }}
                    className="absolute inset-0"
                  >
                    <img 
                      src={COMPARISONS[currentComparison].image} 
                      alt="Luxury Pool"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/30 to-transparent" />
                  </motion.div>
                </AnimatePresence>

                {/* Content Overlay */}
                <div className="absolute inset-0 flex flex-col justify-end p-8 md:p-12">
                  <div className="grid md:grid-cols-2 gap-8">
                    {/* Boring Side */}
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={`boring-${currentComparison}`}
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 30 }}
                        transition={{ duration: 0.5 }}
                        className="flex flex-col justify-end"
                      >
                        <div className="inline-block mb-3">
                          <span className="px-4 py-1.5 bg-rose-500/40 text-rose-100 text-xs font-bold uppercase tracking-wider border border-rose-300/60 backdrop-blur-sm">
                            Typical Builder
                          </span>
                        </div>
                        <p className="text-lg md:text-xl text-rose-200 line-through font-light">
                          {COMPARISONS[currentComparison].boring}
                        </p>
                      </motion.div>
                    </AnimatePresence>

                    {/* Next Level - MUCH LARGER */}
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={`next-${currentComparison}`}
                        initial={{ opacity: 0, x: 30 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -30 }}
                        transition={{ duration: 0.5 }}
                        className="flex flex-col justify-end"
                      >
                        <div className="inline-block mb-4">
                          <span className="px-5 py-2 bg-gradient-to-r from-cyan-500 to-blue-600 text-white text-sm font-black uppercase tracking-wider shadow-xl animate-pulse-glow">
                            Timeless Pools
                          </span>
                        </div>
                        <p className="text-3xl md:text-5xl text-white font-black leading-tight">
                          {COMPARISONS[currentComparison].nextLevel}
                        </p>
                      </motion.div>
                    </AnimatePresence>
                  </div>
                </div>

                {/* Progress Indicators */}
                <div className="absolute top-8 right-8 flex flex-col gap-2">
                  {COMPARISONS.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => setCurrentComparison(idx)}
                      className={`h-1 transition-all ${
                        idx === currentComparison 
                          ? 'bg-cyan-400 w-12' 
                          : 'bg-white/50 w-8 hover:bg-white/70'
                      }`}
                    />
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Trust Elements - ALL POOL IMAGES */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="grid md:grid-cols-3 gap-6 mb-20"
            >
              <TrustCard
                image="https://timelesspools.us/wp-content/uploads/2025/03/Modern-Infinity-Edge-Pool.jpg"
                icon={<Award className="w-10 h-10" />}
                title="World's Greatest Pools"
                subtitle="Award-Winning Design"
              />
              <TrustCard
                image="https://timelesspools.us/wp-content/uploads/2025/03/Geometric-Pool-with-Spa.jpg"
                icon={<Star className="w-10 h-10" />}
                title="GENESIS® Certified"
                subtitle="Master Builder Status"
              />
              <TrustCard
                image="https://timelesspools.us/wp-content/uploads/2024/05/W-9.jpg"
                icon={<Gem className="w-10 h-10" />}
                title="Elite Pebble Tec"
                subtitle="Premium Materials Only"
              />
            </motion.div>

            {/* CTA Cards */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto"
            >
              {/* Access Code Card */}
              <Card className="glass border-2 border-slate-200 shadow-2xl backdrop-blur-xl overflow-hidden group hover:border-cyan-400 transition-all">
                <CardContent className="p-8 space-y-6">
                  <div className="flex items-center gap-3">
                    <div className="p-3 bg-cyan-500/10 border border-cyan-500/30 rounded-lg">
                      <Key className="w-6 h-6 text-cyan-600" />
                    </div>
                    <h3 className="text-2xl font-black text-slate-900">Have a Code?</h3>
                  </div>
                  <Input
                    placeholder="ABC-123"
                    value={accessCode}
                    onChange={(e) => setAccessCode(e.target.value.toUpperCase())}
                    onKeyDown={(e) => e.key === "Enter" && handleAccessCode()}
                    className="text-center text-xl tracking-widest font-mono bg-white border-2 border-slate-300 text-slate-900 placeholder:text-slate-400 h-14 focus:border-cyan-500"
                  />
                  <Button
                    onClick={handleAccessCode}
                    disabled={isLoading}
                    className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-bold text-lg h-14 shadow-2xl border-0"
                    size="lg"
                  >
                    {isLoading ? (
                      <><Loader2 className="w-5 h-5 mr-2 animate-spin" />Validating...</>
                    ) : (
                      <>Continue <ArrowRight className="w-5 h-5 ml-2" /></>
                    )}
                  </Button>
                </CardContent>
              </Card>

              {/* Request Access Card */}
              <Card className="glass border-2 border-cyan-400/50 shadow-2xl backdrop-blur-xl overflow-hidden relative group hover:border-cyan-500 transition-all">
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 to-blue-600/10" />
                <CardContent className="p-8 relative">
                  {!showRequestForm ? (
                    <div className="space-y-6">
                      <h3 className="text-2xl font-black text-slate-900">Start Your Journey</h3>
                      <ul className="space-y-3">
                        <BenefitBullet text="Tell us about your vision" />
                        <BenefitBullet text="Get personalized insights" />
                        <BenefitBullet text="Transparent pricing" />
                        <BenefitBullet text="No pressure. Ever." />
                      </ul>
                      <Button
                        size="lg"
                        onClick={() => setShowRequestForm(true)}
                        className="w-full bg-slate-900 text-white hover:bg-slate-800 font-black text-lg h-14 shadow-2xl group border-0"
                      >
                        Get Started
                        <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                      </Button>
                    </div>
                  ) : (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
                      <h3 className="text-2xl font-black text-slate-900 mb-6">Let's Connect</h3>
                      
                      <div>
                        <Label className="text-slate-700 text-sm mb-2 block font-semibold">Name *</Label>
                        <Input
                          placeholder="John Smith"
                          value={requestData.name}
                          onChange={(e) => setRequestData({...requestData, name: e.target.value})}
                          className="bg-white border-2 border-slate-300 text-slate-900 placeholder:text-slate-400 h-12 focus:border-cyan-500"
                        />
                      </div>

                      <div>
                        <Label className="text-slate-700 text-sm mb-2 block font-semibold">Email *</Label>
                        <Input
                          type="email"
                          placeholder="john@email.com"
                          value={requestData.email}
                          onChange={(e) => setRequestData({...requestData, email: e.target.value})}
                          className="bg-white border-2 border-slate-300 text-slate-900 placeholder:text-slate-400 h-12 focus:border-cyan-500"
                        />
                      </div>

                      <div>
                        <Label className="text-slate-700 text-sm mb-2 block font-semibold">Phone</Label>
                        <Input
                          type="tel"
                          placeholder="(555) 123-4567"
                          value={requestData.phone}
                          onChange={(e) => setRequestData({...requestData, phone: e.target.value})}
                          className="bg-white border-2 border-slate-300 text-slate-900 placeholder:text-slate-400 h-12 focus:border-cyan-500"
                        />
                      </div>

                      <div>
                        <Label className="text-slate-700 text-sm mb-2 block font-semibold">Property Address *</Label>
                        <Input
                          placeholder="123 Main St, Newport Beach, CA"
                          value={requestData.property_address}
                          onChange={(e) => setRequestData({...requestData, property_address: e.target.value})}
                          className="bg-white border-2 border-slate-300 text-slate-900 placeholder:text-slate-400 h-12 focus:border-cyan-500"
                        />
                      </div>

                      <div className="flex gap-3 pt-2">
                        <Button
                          variant="outline"
                          onClick={() => setShowRequestForm(false)}
                          className="flex-1 border-2 border-slate-300 text-slate-900 hover:bg-slate-100 h-12"
                        >
                          Back
                        </Button>
                        <Button
                          onClick={handleRequestAccess}
                          disabled={isLoading}
                          className="flex-1 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-bold h-12"
                        >
                          {isLoading ? (
                            <><Loader2 className="w-4 h-4 mr-2 animate-spin" />Sending...</>
                          ) : (
                            <>Submit <ArrowRight className="w-4 h-4 ml-2" /></>
                          )}
                        </Button>
                      </div>
                    </motion.div>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </section>

        <footer className="py-8 px-6 border-t border-slate-200 backdrop-blur-xl">
          <div className="max-w-7xl mx-auto text-center text-sm text-slate-600">
            <p>© 2025 {BRANDING.company_name}. All rights reserved.</p>
            <p className="mt-2">
              <a href={BRANDING.company_website} target="_blank" rel="noopener noreferrer" className="hover:text-cyan-600 transition-colors">
                {BRANDING.company_website.replace('https://', '')}
              </a>
            </p>
          </div>
        </footer>
      </div>
    </div>
  );
}

function TrustCard({ image, icon, title, subtitle }) {
  return (
    <div className="relative h-64 overflow-hidden group cursor-pointer border-2 border-slate-200 hover:border-cyan-400 transition-all rounded-xl shadow-lg">
      <img src={image} alt={title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
      <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/40 to-transparent" />
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-6">
        <div className="text-cyan-400 mb-4 group-hover:scale-110 transition-transform">
          {icon}
        </div>
        <h4 className="font-black text-white text-xl mb-1">{title}</h4>
        <p className="text-sm text-cyan-300 font-semibold">{subtitle}</p>
      </div>
    </div>
  );
}

function BenefitBullet({ text }) {
  return (
    <div className="flex items-start gap-3 text-slate-700">
      <div className="w-1.5 h-1.5 bg-cyan-500 mt-2 flex-shrink-0 rounded-full" />
      <span className="text-base font-light">{text}</span>
    </div>
  );
}