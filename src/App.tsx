import React, { useState, useEffect } from "react";
import { Navbar } from "./sections/Navbar";
import { Hero } from "./sections/Hero";
import { LiveLocation } from "./sections/LiveLocation";
import { OrderStatusTracking } from "./sections/OrderStatusTracking";
import { BrandStory } from "./sections/BrandStory";
import { StreetCred } from "./sections/StreetCred";
import { Menu } from "./sections/Menu";
import { MerchDrops } from "./sections/MerchDrops";
import { Catering } from "./sections/Catering";
import { Location } from "./sections/Location";
import { Footer } from "./sections/Footer";
import { PlatterProvider } from "./context/PlatterContext";
import { FloatingPlatter } from "./components/FloatingPlatter";
import { AdminPortalModal } from "./components/AdminPortalModal";

export default function App() {
  const [isAdminOpen, setIsAdminOpen] = useState(false);

  useEffect(() => {
    if (
      window.location.pathname === "/admin" ||
      window.location.pathname === "/admin.html" ||
      window.location.hash === "#admin"
    ) {
      setIsAdminOpen(true);
    }
  }, []);

  return (
    <PlatterProvider>
      <div className="bg-brand-bg text-brand-text font-sans selection:bg-brand-accent selection:text-black">
        
        {/* Sticky Premium Navigation */}
        <Navbar onOpenAdmin={() => setIsAdminOpen(true)} />

        {/* Main Sections Assembly */}
        <main className="relative flex flex-col w-full min-h-screen">
          <Hero />
          <LiveLocation />
          <OrderStatusTracking />
          <BrandStory />
          <StreetCred />
          <Menu />
          <MerchDrops />
          <Catering />
          <Location />
        </main>

        {/* Simple Editorial Footer */}
        <Footer />

        {/* Floating active cart trigger & slide sidebar loadout drawer */}
        <FloatingPlatter />

        {/* Admin Portal Modal (Passkey: street2026) */}
        <AdminPortalModal
          isOpen={isAdminOpen}
          onClose={() => {
            setIsAdminOpen(false);
            if (window.location.pathname === "/admin" || window.location.pathname === "/admin.html") {
              window.history.pushState({}, "", "/");
            }
          }}
        />
        
      </div>
    </PlatterProvider>
  );
}

