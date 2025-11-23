import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/shared/lib/supabaseClient';
import { Button } from "@/shared/components/ui/button";
import { Input } from "@/shared/components/ui/input";
import { useToast } from "@/shared/components/ui/use-toast";
import { ArrowRight, Lock, Key } from 'lucide-react';

export default function Homepage() {
    const [code, setCode] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const { toast } = useToast();

    const handleEnter = async (e) => {
        e.preventDefault();
        if (code.length < 5) return;

        setLoading(true);
        try {
            // 1. Verify Code in Database
            const { data, error } = await supabase
                .from('AccessCode')
                .select('*')
                .eq('code', code.toUpperCase())
                .single();

            if (error || !data) {
                throw new Error("Invalid access code.");
            }

            // 2. Check if used (optional logic, for now we allow re-entry)
            // if (data.is_used) ...

            // 3. Success - Store code in session/local storage if needed
            localStorage.setItem('tp_access_code', code.toUpperCase());

            // 4. Redirect to Onboarding
            toast({
                title: "Access Granted",
                description: "Welcome to Timeless Pools.",
            });
            navigate('/Onboarding');

        } catch (error) {
            toast({
                variant: "destructive",
                title: "Access Denied",
                description: "The code you entered is invalid. Please try again.",
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-background text-foreground relative overflow-hidden">
            {/* Hero Background - Timeless Pools Gallery */}
            <div
                className="fixed inset-0 pointer-events-none opacity-20"
                style={{
                    backgroundImage: `url('https://timelesspools.us/wp-content/uploads/2025/03/Modern-Infinity-Edge-Pool.jpg')`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    filter: 'blur(8px)'
                }}>
            </div>

            {/* Subtle Paper Texture Overlay */}
            <div className="fixed inset-0 pointer-events-none opacity-[0.03] mix-blend-multiply"
                style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}>
            </div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="z-10 w-full max-w-md px-8 text-center"
            >
                {/* Logo Mark */}
                <div className="w-16 h-16 mx-auto mb-8 rounded-full border-2 border-primary flex items-center justify-center">
                    <span className="font-serif font-bold text-3xl text-primary">T</span>
                </div>

                <h1 className="font-serif text-4xl md:text-5xl font-bold text-primary mb-2 tracking-tight">
                    Timeless Pools
                </h1>
                <p className="font-script text-3xl text-muted-foreground mb-12">
                    Bespoke Design Experience
                </p>

                <form onSubmit={handleEnter} className="space-y-6">
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Key className="h-5 w-5 text-muted-foreground/50" />
                        </div>
                        <Input
                            type="text"
                            placeholder="Enter Access Code"
                            value={code}
                            onChange={(e) => setCode(e.target.value.toUpperCase())}
                            className="pl-10 h-14 text-center text-lg tracking-[0.5em] font-serif uppercase border-primary/20 focus:border-primary bg-white/50 backdrop-blur-sm transition-all"
                            maxLength={6}
                        />
                    </div>

                    <Button
                        type="submit"
                        disabled={loading || code.length < 5}
                        className="w-full h-12 text-lg font-serif tracking-widest bg-primary text-primary-foreground hover:bg-primary/90 transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5"
                    >
                        {loading ? "Verifying..." : "Enter Atelier"}
                    </Button>
                </form>

                <div className="mt-12 pt-8 border-t border-primary/10">
                    <p className="text-xs text-muted-foreground uppercase tracking-widest mb-4">Don't have a code?</p>
                    <Button variant="outline" className="border-primary/20 text-primary hover:bg-primary/5 font-serif text-xs tracking-widest">
                        Request Private Access
                    </Button>
                </div>
            </motion.div >
        </div >
    );
}
