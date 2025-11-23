import React from 'react';
import { motion } from 'framer-motion';
import { Check, Plus } from 'lucide-react';
import { cn } from '@/shared/lib/utils';

export default function FeatureCard({ feature, isSelected, onToggle }) {
    return (
        <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => onToggle(feature.id)}
            className={cn(
                "relative flex flex-col items-start p-4 rounded-xl border transition-all duration-300 w-full text-left h-full",
                isSelected
                    ? "bg-primary/10 border-primary shadow-lg shadow-primary/10"
                    : "bg-card/50 border-white/5 hover:bg-card/80 hover:border-white/10"
            )}
        >
            <div className={cn(
                "w-8 h-8 rounded-full flex items-center justify-center mb-3 transition-colors",
                isSelected ? "bg-primary text-primary-foreground" : "bg-secondary/20 text-secondary"
            )}>
                {isSelected ? <Check className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
            </div>

            <h4 className={cn(
                "font-serif font-semibold text-lg mb-1",
                isSelected ? "text-primary" : "text-foreground"
            )}>
                {feature.label}
            </h4>

            <p className="text-sm text-muted-foreground leading-snug">
                {feature.description}
            </p>
        </motion.button>
    );
}
