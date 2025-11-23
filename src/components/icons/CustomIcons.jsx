/**
 * CUSTOM SVG ICONS FOR TIMELESS POOLS
 * 
 * Purpose: Replace generic emoji/lucide icons with bespoke, brand-aligned SVG icons
 * that maintain visibility against the Champagne background.
 * 
 * Design: Minimalist line art with increased stroke width for visibility.
 * Colors: Royal Blue (#102A43) and Gold (#C6A87C) from brand palette.
 */

import React from 'react';

/**
 * Shield with checkmark icon
 * Represents: Master Certification, Trust, Quality
 */
export const ShieldCheckIcon = ({ className = "w-8 h-8" }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
            d="M12 2L4 6V11C4 16.55 7.84 21.74 12 23C16.16 21.74 20 16.55 20 11V6L12 2Z"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
        />
        <path
            d="M9 12L11 14L15 10"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
        />
    </svg>
);

/**
 * Sparkle/Star icon
 * Represents: Bespoke Design, Luxury, Attention to Detail
 */
export const SparkleIcon = ({ className = "w-8 h-8" }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
            d="M12 2L14.5 9.5L22 12L14.5 14.5L12 22L9.5 14.5L2 12L9.5 9.5L12 2Z"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="currentColor"
            fillOpacity="0.1"
        />
        <path
            d="M18 4L19 7L22 8L19 9L18 12L17 9L14 8L17 7L18 4Z"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="currentColor"
            fillOpacity="0.1"
        />
    </svg>
);

/**
 * Trophy/Award icon
 * Represents: Award Winning, Excellence, Recognition
 */
export const TrophyIcon = ({ className = "w-8 h-8" }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
            d="M6 9H4.5C3.67 9 3 8.33 3 7.5V6C3 5.17 3.67 4.5 4.5 4.5H6"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
        />
        <path
            d="M18 9H19.5C20.33 9 21 8.33 21 7.5V6C21 5.17 20.33 4.5 19.5 4.5H18"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
        />
        <path
            d="M6 4.5H18V12C18 15.31 15.31 18 12 18C8.69 18 6 15.31 6 12V4.5Z"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
        />
        <path
            d="M12 18V22"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
        />
        <path
            d="M8 22H16"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
        />
    </svg>
);
