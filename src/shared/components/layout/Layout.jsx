import React from 'react';
import { motion } from 'framer-motion';
import { Toaster } from "@/shared/components/ui/toaster";

export default function Layout({ children, currentPageName }) {
    return (
        <div className="min-h-screen bg-background text-foreground font-sans selection:bg-primary/20 relative">
            {/* Subtle Background Pool Image */}
            <div
                className="fixed inset-0 pointer-events-none opacity-10 z-0"
                style={{
                    backgroundImage: `url('https://timelesspools.us/wp-content/uploads/2024/06/J-3.jpg')`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    filter: 'blur(10px)'
                }}>
            </div>

            {/* Background Texture (Subtle Paper/Grain) */}
            <div className="fixed inset-0 pointer-events-none opacity-[0.03] mix-blend-multiply z-0"
                style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}>
            </div>

            {/* Elegant Header */}
            <header className="fixed top-0 left-0 right-0 z-50 py-6 px-8 flex justify-between items-center bg-background/80 backdrop-blur-md border-b border-primary/10 relative">
                <div className="flex items-center gap-4">
                    {/* Logo Placeholder - Think "Wax Seal" or "Monogram" */}
                    <div className="w-10 h-10 rounded-full border-2 border-primary flex items-center justify-center">
                        <span className="font-serif font-bold text-xl text-primary">T</span>
                    </div>
                    <h1 className="font-serif text-2xl tracking-widest text-primary uppercase">Timeless Pools</h1>
                </div>

                <div className="hidden md:flex items-center gap-8 text-sm font-medium tracking-wide text-muted-foreground">
                    <span>BESPOKE DESIGN</span>
                </div>
            </header>

            {/* Main Content Area */}
            <main className="relative z-10 pt-32 pb-20 px-4 md:px-8 max-w-7xl mx-auto min-h-screen flex flex-col">
                <motion.div
                    key={currentPageName}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                    className="flex-1 flex flex-col"
                >
                    {children}
                </motion.div>
            </main>

            {/* Footer - "Hand-Stitched" Vibe */}
            <footer className="py-8 text-center text-xs text-muted-foreground font-medium tracking-widest uppercase border-t border-primary/10 mx-8">
                <p>&copy; {new Date().getFullYear()} SPCL.tech &amp; PolyForj AS &middot; Crafted with Precision</p>
            </footer>

            <Toaster />
        </div>
    );
}
