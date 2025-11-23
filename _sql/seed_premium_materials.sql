-- Seed Premium Materials
-- Vendors: PebbleTec, Aquabella, NPT, Jandy, MSI

-- Clear existing materials to avoid duplicates (optional, but good for dev)
DELETE FROM "Material";

-- 1. POOL FINISHES (PebbleTec)
INSERT INTO "Material" (name, category, brand, product_line, color_name, manufacturer, description, image_url, is_recommended, is_active) VALUES
('Blue Surf', 'pool_finish', 'PebbleTec', 'PebbleSheen', 'Blue Surf', 'Pebble Technology International', 'A vibrant, light blue finish that mimics the look of a tropical lagoon.', 'https://placehold.co/600x400/0077be/ffffff?text=PebbleTec+Blue+Surf', true, true),
('Majestic Plum', 'pool_finish', 'PebbleTec', 'PebbleSheen', 'Majestic Plum', 'Pebble Technology International', 'A deep, rich purple-blue hue for a sophisticated and dramatic water color.', 'https://placehold.co/600x400/4b0082/ffffff?text=PebbleTec+Majestic+Plum', false, true),
('Aqua Blue', 'pool_finish', 'PebbleTec', 'PebbleSheen', 'Aqua Blue', 'Pebble Technology International', 'A classic, bright blue that sparkles in the sunlight.', 'https://placehold.co/600x400/00ffff/000000?text=PebbleTec+Aqua+Blue', true, true),
('Black Onyx', 'pool_finish', 'PebbleTec', 'PebbleSheen', 'Black Onyx', 'Pebble Technology International', 'Create a mirror-like effect with this deep black finish.', 'https://placehold.co/600x400/1a1a1a/ffffff?text=PebbleTec+Black+Onyx', false, true);

-- 2. WATERLINE TILE (Aquabella & NPT)
INSERT INTO "Material" (name, category, brand, product_line, color_name, manufacturer, description, image_url, is_recommended, is_active) VALUES
('Glass Series - Ocean Blue', 'waterline_tile', 'Aquabella', 'Glass Series', 'Ocean Blue', 'Aquabella Tile', 'Shimmering glass tiles that reflect the water''s movement.', 'https://placehold.co/600x400/006994/ffffff?text=Aquabella+Ocean+Blue', true, true),
('Subway Series - Arctic White', 'waterline_tile', 'NPT', 'Subway', 'Arctic White', 'National Pool Tile', 'Clean, modern lines with a classic white subway tile look.', 'https://placehold.co/600x400/f0f8ff/000000?text=NPT+Arctic+White', false, true),
('Luminous - Night Sky', 'waterline_tile', 'Aquabella', 'Luminous', 'Night Sky', 'Aquabella Tile', 'Dark, iridescent tiles that glow under pool lighting.', 'https://placehold.co/600x400/191970/ffffff?text=Aquabella+Night+Sky', false, true);

-- 3. COPING & DECKING (MSI)
INSERT INTO "Material" (name, category, brand, product_line, color_name, manufacturer, description, image_url, is_recommended, is_active) VALUES
('Arterra Pavers - Tierra Beige', 'coping', 'MSI', 'Arterra', 'Tierra Beige', 'MSI', 'Durable porcelain pavers with a natural stone look.', 'https://placehold.co/600x400/f5f5dc/000000?text=MSI+Arterra+Tierra+Beige', true, true),
('Natural Ledgestone - Silver Travertine', 'coping', 'MSI', 'Natural Stone', 'Silver Travertine', 'MSI', 'Elegant silver-grey travertine for a timeless edge.', 'https://placehold.co/600x400/c0c0c0/000000?text=MSI+Silver+Travertine', true, true),
('Arterra Pavers - Quartz White', 'deck_material', 'MSI', 'Arterra', 'Quartz White', 'MSI', 'Bright and cool to the touch, perfect for sunny decks.', 'https://placehold.co/600x400/ffffff/000000?text=MSI+Arterra+Quartz+White', true, true);

-- 4. EQUIPMENT (Jandy)
INSERT INTO "Material" (name, category, brand, product_line, color_name, manufacturer, description, image_url, is_recommended, is_active) VALUES
('VS FloPro Variable Speed Pump', 'equipment', 'Jandy', 'FloPro', 'N/A', 'Fluidra / Jandy', 'High-efficiency pump for optimal energy savings.', 'https://placehold.co/600x400/333333/ffffff?text=Jandy+VS+FloPro', true, true),
('JXi Heater', 'equipment', 'Jandy', 'JXi', 'N/A', 'Fluidra / Jandy', 'Compact and ultra-efficient gas heater.', 'https://placehold.co/600x400/cc0000/ffffff?text=Jandy+JXi+Heater', true, true),
('AquaLink RS Automation', 'equipment', 'Jandy', 'AquaLink', 'N/A', 'Fluidra / Jandy', 'Complete pool control from your smartphone.', 'https://placehold.co/600x400/000000/ffffff?text=Jandy+AquaLink', true, true);
