-- ==============================================================================
-- STREET CULTURE KITCHEN OS — PRODUCTION SEED DATA
-- ==============================================================================

-- Seed Truck Status
INSERT INTO public.truck_status (
    service_status,
    current_location,
    coordinates,
    current_eta,
    battery_load_pct,
    grill_temp_f,
    fryer_oil_temp_f
) VALUES (
    'ACTIVE SERVICE',
    '1082 Vandal Way SE, Industrial Quarter',
    '{"lat": 34.0407, "lng": -118.2468}',
    '14 MINS RUNNING',
    94,
    475,
    360
) ON CONFLICT DO NOTHING;

-- Seed Sample Orders
INSERT INTO public.orders (order_number, customer_name, customer_phone, customer_email, status, items, subtotal_cents, tax_cents, total_cents)
VALUES 
    ('SCK-8921', 'Marcus Vance', '+1 (555) 234-8901', 'm.vance@soundgrid.la', 'ON GRILL', '[{"name": "Vandal Double Smash", "qty": 2, "price": 1800}, {"name": "Tallow Truffle Fries", "qty": 1, "price": 900}]'::jsonb, 4500, 428, 4928),
    ('SCK-8922', 'Elena Rostova', '+1 (555) 876-1209', 'elena@rostovastudio.com', 'QUEUED', '[{"name": "Smoked Birria Bao (3pc)", "qty": 1, "price": 1600}, {"name": "Matcha Cold Brew Yuzu", "qty": 2, "price": 800}]'::jsonb, 3200, 304, 3504),
    ('SCK-8920', 'Julian Drake', '+1 (555) 902-3311', 'drake@apexgarage.cc', 'PACKAGED', '[{"name": "Glazed Pork Belly Skewers", "qty": 3, "price": 1500}]'::jsonb, 4500, 428, 4928)
ON CONFLICT (order_number) DO NOTHING;

-- Seed Merch Drops
INSERT INTO public.merch_drops (title, sku, edition_label, price_cents, total_inventory, claimed_inventory, drop_status, image_url)
VALUES
    ('Vandal Heavyweight Hoodie (Obsidian)', 'SCK-MRCH-001', 'LIMITED 100 PIECES', 11000, 100, 84, 'LIVE', 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&q=80&w=1000'),
    ('Industrial Cast Iron Press Badge', 'SCK-MRCH-002', 'ATELIER NUMBERED', 4500, 50, 41, 'LIVE', 'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&q=80&w=1000'),
    ('SCK Soundsystem USB Mixtape Vol. IV', 'SCK-MRCH-003', 'ANALOG DUBBED', 3000, 150, 150, 'SOLD OUT', 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&q=80&w=1000')
ON CONFLICT (sku) DO NOTHING;
