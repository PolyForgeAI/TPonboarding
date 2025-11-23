import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
    console.error('Missing Supabase URL or Key');
    process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

const materials = [
    // 1. POOL FINISHES (PebbleTec)
    { name: 'Blue Surf', category: 'pool_finish', brand: 'PebbleTec', product_line: 'PebbleSheen', color_name: 'Blue Surf', manufacturer: 'Pebble Technology International', description: 'A vibrant, light blue finish that mimics the look of a tropical lagoon.', image_url: 'https://placehold.co/600x400/0077be/ffffff?text=PebbleTec+Blue+Surf', is_recommended: true, is_active: true },
    { name: 'Majestic Plum', category: 'pool_finish', brand: 'PebbleTec', product_line: 'PebbleSheen', color_name: 'Majestic Plum', manufacturer: 'Pebble Technology International', description: 'A deep, rich purple-blue hue for a sophisticated and dramatic water color.', image_url: 'https://placehold.co/600x400/4b0082/ffffff?text=PebbleTec+Majestic+Plum', is_recommended: false, is_active: true },
    { name: 'Aqua Blue', category: 'pool_finish', brand: 'PebbleTec', product_line: 'PebbleSheen', color_name: 'Aqua Blue', manufacturer: 'Pebble Technology International', description: 'A classic, bright blue that sparkles in the sunlight.', image_url: 'https://placehold.co/600x400/00ffff/000000?text=PebbleTec+Aqua+Blue', is_recommended: true, is_active: true },
    { name: 'Black Onyx', category: 'pool_finish', brand: 'PebbleTec', product_line: 'PebbleSheen', color_name: 'Black Onyx', manufacturer: 'Pebble Technology International', description: 'Create a mirror-like effect with this deep black finish.', image_url: 'https://placehold.co/600x400/1a1a1a/ffffff?text=PebbleTec+Black+Onyx', is_recommended: false, is_active: true },

    // 2. WATERLINE TILE (Aquabella & NPT)
    { name: 'Glass Series - Ocean Blue', category: 'waterline_tile', brand: 'Aquabella', product_line: 'Glass Series', color_name: 'Ocean Blue', manufacturer: 'Aquabella Tile', description: 'Shimmering glass tiles that reflect the water\'s movement.', image_url: 'https://placehold.co/600x400/006994/ffffff?text=Aquabella+Ocean+Blue', is_recommended: true, is_active: true },
    { name: 'Subway Series - Arctic White', category: 'waterline_tile', brand: 'NPT', product_line: 'Subway', color_name: 'Arctic White', manufacturer: 'National Pool Tile', description: 'Clean, modern lines with a classic white subway tile look.', image_url: 'https://placehold.co/600x400/f0f8ff/000000?text=NPT+Arctic+White', is_recommended: false, is_active: true },
    { name: 'Luminous - Night Sky', category: 'waterline_tile', brand: 'Aquabella', product_line: 'Luminous', color_name: 'Night Sky', manufacturer: 'Aquabella Tile', description: 'Dark, iridescent tiles that glow under pool lighting.', image_url: 'https://placehold.co/600x400/191970/ffffff?text=Aquabella+Night+Sky', is_recommended: false, is_active: true },

    // 3. COPING & DECKING (MSI)
    { name: 'Arterra Pavers - Tierra Beige', category: 'coping', brand: 'MSI', product_line: 'Arterra', color_name: 'Tierra Beige', manufacturer: 'MSI', description: 'Durable porcelain pavers with a natural stone look.', image_url: 'https://placehold.co/600x400/f5f5dc/000000?text=MSI+Arterra+Tierra+Beige', is_recommended: true, is_active: true },
    { name: 'Natural Ledgestone - Silver Travertine', category: 'coping', brand: 'MSI', product_line: 'Natural Stone', color_name: 'Silver Travertine', manufacturer: 'MSI', description: 'Elegant silver-grey travertine for a timeless edge.', image_url: 'https://placehold.co/600x400/c0c0c0/000000?text=MSI+Silver+Travertine', is_recommended: true, is_active: true },
    { name: 'Arterra Pavers - Quartz White', category: 'deck_material', brand: 'MSI', product_line: 'Arterra', color_name: 'Quartz White', manufacturer: 'MSI', description: 'Bright and cool to the touch, perfect for sunny decks.', image_url: 'https://placehold.co/600x400/ffffff/000000?text=MSI+Arterra+Quartz+White', is_recommended: true, is_active: true },

    // 4. EQUIPMENT (Jandy)
    { name: 'VS FloPro Variable Speed Pump', category: 'equipment', brand: 'Jandy', product_line: 'FloPro', manufacturer: 'Fluidra / Jandy', description: 'High-efficiency pump for optimal energy savings.', image_url: 'https://placehold.co/600x400/333333/ffffff?text=Jandy+VS+FloPro', is_recommended: true, is_active: true },
    { name: 'JXi Heater', category: 'equipment', brand: 'Jandy', product_line: 'JXi', manufacturer: 'Fluidra / Jandy', description: 'Compact and ultra-efficient gas heater.', image_url: 'https://placehold.co/600x400/cc0000/ffffff?text=Jandy+JXi+Heater', is_recommended: true, is_active: true },
    { name: 'AquaLink RS Automation', category: 'equipment', brand: 'Jandy', product_line: 'AquaLink', manufacturer: 'Fluidra / Jandy', description: 'Complete pool control from your smartphone.', image_url: 'https://placehold.co/600x400/000000/ffffff?text=Jandy+AquaLink', is_recommended: true, is_active: true },
];

async function seed() {
    console.log('Seeding materials...');

    // Optional: Clear existing (might fail if RLS blocks delete, but we'll try)
    // const { error: deleteError } = await supabase.from('Material').delete().neq('id', '00000000-0000-0000-0000-000000000000');
    // if (deleteError) console.log('Delete error (might be RLS):', deleteError.message);

    for (const item of materials) {
        const { data, error } = await supabase
            .from('Material')
            .insert([item])
            .select();

        if (error) {
            console.error(`Error inserting ${item.name}:`, error.message);
        } else {
            console.log(`Inserted: ${item.name}`);
        }
    }
    console.log('Done.');
}

seed();
