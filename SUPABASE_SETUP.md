# Street Culture Kitchen OS — 3-Minute Supabase Quickstart

Turnkey setup guide for wiring the live order status tracker, dispatch telemetry, catering pipeline, and limited merch drops.

---

### Step 1: Create Supabase Project
1. Log into your [Supabase Dashboard](https://supabase.com/dashboard).
2. Click **New Project**, choose a project name (e.g. `street-culture-kitchen-os`), and set a secure database password.
3. Select your closest hosting region.

---

### Step 2: Execute SQL Migration
1. In your project dashboard, navigate to the **SQL Editor** tab (left sidebar).
2. Click **New query**, open `supabase/schema.sql` from this repository, paste the entire contents, and click **Run**.
3. Create a second query, open `supabase/seed.sql`, paste the contents, and click **Run** to load initial mock orders, dispatch telemetry, and merch drops.

---

### Step 3: Wire Environment Variables
1. Go to **Project Settings** -> **API**.
2. Copy your **Project URL** and **anon / public** API key.
3. In your environment or `.env.local` file:
   ```env
   VITE_SUPABASE_URL=https://your-project-id.supabase.co
   VITE_SUPABASE_ANON_KEY=your-anon-public-key
   ```
4. Deploy or restart your dev server (`npm run dev`).

---

### Instant Demo Passkey
- Visiting `/admin` or `/admin.html` triggers the 1-click auto-fill bypass passkey:
  - **Passkey**: `street2026`
