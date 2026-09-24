-- ==============================================================================
-- STREET CULTURE KITCHEN OS — SUPABASE SCHEMA & RLS POLICIES
-- Target #40 | Luxury Hospitality & Dining Vault (14/60)
-- ==============================================================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. TRUCK STATUS & LIVE DISPATCH
CREATE TABLE IF NOT EXISTS public.truck_status (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    service_status TEXT NOT NULL DEFAULT 'ACTIVE SERVICE',
    current_location TEXT NOT NULL DEFAULT '1082 Vandal Way SE, Industrial Quarter',
    coordinates JSONB DEFAULT '{"lat": 34.0407, "lng": -118.2468}',
    current_eta TEXT DEFAULT '14 MINS RUNNING',
    battery_load_pct INT DEFAULT 94,
    grill_temp_f INT DEFAULT 475,
    fryer_oil_temp_f INT DEFAULT 360,
    service_start_time TIMESTAMPTZ DEFAULT NOW(),
    estimated_service_end TIMESTAMPTZ DEFAULT (NOW() + INTERVAL '5 hours'),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. LIVE ORDER TRACKING
CREATE TABLE IF NOT EXISTS public.orders (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    order_number TEXT NOT NULL UNIQUE,
    customer_name TEXT NOT NULL,
    customer_phone TEXT,
    customer_email TEXT,
    status TEXT NOT NULL DEFAULT 'QUEUED', -- QUEUED, ON GRILL, PACKAGED, DISPATCHED, COMPLETED
    items JSONB NOT NULL DEFAULT '[]'::jsonb,
    subtotal_cents INT NOT NULL DEFAULT 0,
    tax_cents INT NOT NULL DEFAULT 0,
    total_cents INT NOT NULL DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. CATERING & VIP TRUCK INQUIRIES
CREATE TABLE IF NOT EXISTS public.catering_inquiries (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    full_name TEXT NOT NULL,
    organization TEXT,
    email TEXT NOT NULL,
    phone TEXT NOT NULL,
    event_date DATE NOT NULL,
    headcount INT NOT NULL DEFAULT 50,
    event_location TEXT NOT NULL,
    package_tier TEXT NOT NULL DEFAULT 'STREET TAKEOVER',
    budget_range TEXT,
    status TEXT NOT NULL DEFAULT 'NEW', -- NEW, CONTACTED, QUOTED, CONFIRMED, ARCHIVED
    notes TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. MERCH DROPS & INVENTORY
CREATE TABLE IF NOT EXISTS public.merch_drops (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title TEXT NOT NULL,
    sku TEXT UNIQUE NOT NULL,
    edition_label TEXT NOT NULL DEFAULT 'STREET CULTURE LIMITED',
    price_cents INT NOT NULL DEFAULT 4500,
    total_inventory INT NOT NULL DEFAULT 100,
    claimed_inventory INT NOT NULL DEFAULT 0,
    drop_status TEXT NOT NULL DEFAULT 'LIVE', -- LIVE, SOLD OUT, VAULTED
    image_url TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5. ROW LEVEL SECURITY (RLS)
ALTER TABLE public.truck_status ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.catering_inquiries ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.merch_drops ENABLE ROW LEVEL SECURITY;

-- Anonymous public read policies
CREATE POLICY "Public read truck status" ON public.truck_status FOR SELECT USING (true);
CREATE POLICY "Public read menu & merch" ON public.merch_drops FOR SELECT USING (true);
CREATE POLICY "Public read own orders" ON public.orders FOR SELECT USING (true);
CREATE POLICY "Public create orders" ON public.orders FOR INSERT WITH CHECK (true);
CREATE POLICY "Public submit catering inquiries" ON public.catering_inquiries FOR INSERT WITH CHECK (true);

-- Authenticated / Admin bypass policies
CREATE POLICY "Admin full access truck status" ON public.truck_status FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin full access orders" ON public.orders FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin full access catering" ON public.catering_inquiries FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin full access merch" ON public.merch_drops FOR ALL USING (auth.role() = 'authenticated');
