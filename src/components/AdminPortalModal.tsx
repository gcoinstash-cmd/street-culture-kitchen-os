import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Lock, 
  Flame, 
  MapPin, 
  Truck, 
  Sparkles, 
  DollarSign, 
  Users, 
  Clock, 
  X, 
  LogOut,
  Radio,
  ShoppingBag
} from 'lucide-react';

interface AdminPortalModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AdminPortalModal: React.FC<AdminPortalModalProps> = ({ isOpen, onClose }) => {
  const [passcode, setPasscode] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [error, setError] = useState(false);
  const [activeTab, setActiveTab] = useState<'trucks' | 'drops' | 'orders'>('trucks');

  const [trucks, setTrucks] = useState([
    { id: 'UNIT-01', location: 'Arts District (Santa Fe Ave & 4th)', status: 'Curbside Active', shift: '11:00 AM — 9:00 PM', queueWait: '8 Mins', ordersQueued: 14 },
    { id: 'UNIT-02', location: 'Venice Boardwalk Skate Park', status: 'Curbside Active', shift: '12:00 PM — 10:00 PM', queueWait: '12 Mins', ordersQueued: 22 },
    { id: 'UNIT-03', location: 'Silver Lake Meadow Lot', status: 'Prep & Transit', shift: '4:00 PM — 11:00 PM', queueWait: 'Standby', ordersQueued: 0 }
  ]);

  const [merchDrops, setMerchDrops] = useState([
    { drop: 'Drop 04: Heavyweight Raw French Terry Hoodie', stock: '28 / 100 Left', price: '$95.00', status: 'Live On-Truck' },
    { drop: 'Drop 05: Tokyo Smoked Chili Oil (Batch 12)', stock: '42 / 200 Left', price: '$22.00', status: 'Live On-Truck' },
    { drop: 'Drop 06: SCK Acid-Washed Skate Deck', stock: '8 / 50 Left', price: '$85.00', status: 'Low Inventory' }
  ]);

  const [orders, setOrders] = useState([
    { id: 'SCK-881', truck: 'Unit 01', guest: 'Trevon King', items: '2x Nashville Hot Bao, 1x Truffle Fries, 1x Yuzu Soda', total: '$38.50', status: 'Frying Station' },
    { id: 'SCK-882', truck: 'Unit 02', guest: 'Maya Lin', items: '1x Smash Taco Trio, 1x Horchata Cold Brew', total: '$21.00', status: 'Order Bagged' },
    { id: 'SCK-883', truck: 'Unit 01', guest: 'Zack Taylor', items: '1x Street Burger, 1x Chili Oil Wings', total: '$27.50', status: 'Plancha Searing' }
  ]);

  if (!isOpen) return null;

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (passcode === 'street2026') {
      setIsAuthenticated(true);
      setError(false);
    } else {
      setError(true);
    }
  };

  const handleOneClickFill = () => {
    setPasscode('street2026');
    setIsAuthenticated(true);
    setError(false);
  };

  return (
    <div className="fixed inset-0 z-[2000] flex items-center justify-center p-4 bg-black/90 backdrop-blur-md animate-fadeIn text-stone-100 font-sans">
      <div className="relative w-full max-w-4xl bg-stone-950 border border-brand-accent/30 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[92vh]">
        {/* Top Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-stone-800 bg-stone-900/60">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-brand-accent text-black font-black flex items-center justify-center shadow-lg">
              <Flame className="w-5 h-5 text-black" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-mono text-base tracking-wider font-bold text-white">STREET CULTURE KITCHEN // COMMAND OS</h3>
                <span className="text-[10px] uppercase font-bold tracking-widest px-2 py-0.5 rounded bg-brand-accent/20 text-brand-accent border border-brand-accent/30 font-mono">
                  Fleet Dispatch
                </span>
              </div>
              <p className="text-xs text-stone-400">Mobile Food Truck GPS • Line Wait Times • Merch Drops</p>
            </div>
          </div>
          <button 
            onClick={onClose} 
            className="p-2 text-stone-400 hover:text-white rounded-lg hover:bg-stone-800/80 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Gate vs Dashboard */}
        {!isAuthenticated ? (
          <div className="p-8 sm:p-12 flex flex-col items-center justify-center text-center">
            <div className="w-16 h-16 rounded-2xl bg-brand-accent/10 border border-brand-accent/20 flex items-center justify-center mb-6">
              <Lock className="w-8 h-8 text-brand-accent" />
            </div>
            <h4 className="text-xl font-bold font-mono text-stone-100 mb-2">Fleet Terminal Authorization</h4>
            <p className="text-stone-400 text-sm max-w-md mb-8">
              Authorized truck captains and culinary operations personnel only.
            </p>

            <form onSubmit={handleLogin} className="w-full max-w-sm space-y-4">
              <div>
                <input
                  type="password"
                  value={passcode}
                  onChange={(e) => setPasscode(e.target.value)}
                  placeholder="Enter passkey (street2026)"
                  className="w-full px-4 py-3 bg-stone-900/90 border border-stone-800 rounded-xl text-center text-stone-100 placeholder:text-stone-500 focus:outline-none focus:border-brand-accent transition-all font-mono tracking-widest text-lg"
                />
                {error && (
                  <p className="text-rose-400 text-xs mt-2 font-medium">Invalid passkey. Cheat code: street2026</p>
                )}
              </div>

              <div className="flex flex-col gap-2">
                <button
                  type="submit"
                  className="w-full py-3 bg-brand-accent hover:opacity-90 text-black font-black rounded-xl shadow-lg transition-all text-xs tracking-widest uppercase font-mono"
                >
                  Verify Access
                </button>
                <button
                  type="button"
                  onClick={handleOneClickFill}
                  className="w-full py-2.5 bg-stone-900 hover:bg-stone-800 border border-stone-700 text-stone-300 font-bold rounded-xl transition-all text-xs tracking-wider flex items-center justify-center gap-2"
                >
                  <Sparkles className="w-4 h-4 text-brand-accent" />
                  Auto-Fill 1-Click Passkey (street2026)
                </button>
              </div>
            </form>
          </div>
        ) : (
          <div className="flex-1 overflow-y-auto flex flex-col">
            {/* Top Subnav */}
            <div className="flex items-center justify-between px-6 py-3 border-b border-stone-800 bg-stone-900/40">
              <div className="flex gap-2">
                {[
                  { id: 'trucks', label: 'Mobile Units', icon: Truck },
                  { id: 'drops', label: 'Merch Inventory', icon: ShoppingBag },
                  { id: 'orders', label: 'Kitchen Tickets', icon: Flame }
                ].map((tab) => {
                  const Icon = tab.icon;
                  const isActive = activeTab === tab.id;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id as any)}
                      className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-bold transition-all font-mono ${
                        isActive 
                          ? 'bg-brand-accent text-black shadow-md' 
                          : 'text-stone-400 hover:text-stone-200 hover:bg-stone-800/60'
                      }`}
                    >
                      <Icon className="w-3.5 h-3.5" />
                      {tab.label}
                    </button>
                  );
                })}
              </div>
              <div className="flex items-center gap-4">
                <span className="text-[11px] text-stone-400 font-mono flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                  FLEET LIVE: 2 UNITS
                </span>
                <button 
                  onClick={() => setIsAuthenticated(false)}
                  className="text-stone-400 hover:text-rose-400 text-xs flex items-center gap-1 transition-colors"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  Lock
                </button>
              </div>
            </div>

            {/* Dashboard Body */}
            <div className="p-6 space-y-6 flex-1">
              {/* Metric Strip */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="p-4 bg-stone-900/50 border border-stone-800 rounded-xl">
                  <span className="text-[10px] text-stone-400 uppercase tracking-widest block mb-1">Today's Fleet Gross</span>
                  <span className="text-xl font-bold font-mono text-stone-100">$9,840.00</span>
                  <span className="text-[10px] text-emerald-400 block mt-1">+26% vs Target</span>
                </div>
                <div className="p-4 bg-stone-900/50 border border-stone-800 rounded-xl">
                  <span className="text-[10px] text-stone-400 uppercase tracking-widest block mb-1">Total Bao & Tacos Sold</span>
                  <span className="text-xl font-bold font-mono text-stone-100">842 Portions</span>
                  <span className="text-[10px] text-brand-accent block mt-1">Arts District Lead</span>
                </div>
                <div className="p-4 bg-stone-900/50 border border-stone-800 rounded-xl">
                  <span className="text-[10px] text-stone-400 uppercase tracking-widest block mb-1">Avg Ticket Turnaround</span>
                  <span className="text-xl font-bold font-mono text-stone-100">7.2 Mins</span>
                  <span className="text-[10px] text-emerald-400 block mt-1">Blazing Speed</span>
                </div>
                <div className="p-4 bg-stone-900/50 border border-stone-800 rounded-xl">
                  <span className="text-[10px] text-stone-400 uppercase tracking-widest block mb-1">Merch Drop Sell-Through</span>
                  <span className="text-xl font-bold font-mono text-stone-100">78%</span>
                  <span className="text-[10px] text-brand-accent block mt-1">Hoodie Sold Out Soon</span>
                </div>
              </div>

              {/* Tab 1: Trucks */}
              {activeTab === 'trucks' && (
                <div className="space-y-4">
                  <h4 className="text-sm font-bold text-stone-200 uppercase tracking-wider flex items-center gap-2 font-mono">
                    <Truck className="w-4 h-4 text-brand-accent" />
                    Real-Time Mobile Truck GPS & Wait Times
                  </h4>
                  <div className="space-y-3">
                    {trucks.map((trk) => (
                      <div key={trk.id} className="p-4 bg-stone-900/60 border border-stone-800 rounded-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-mono text-xs font-bold text-brand-accent">{trk.id}</span>
                            <span className="font-bold text-sm text-stone-100">{trk.location}</span>
                          </div>
                          <div className="text-xs text-stone-400 mt-1">Shift: {trk.shift} • Queue Wait: <span className="text-stone-200 font-bold">{trk.queueWait}</span></div>
                        </div>
                        <div className="flex items-center gap-4">
                          <span className="font-mono text-xs text-stone-300">{trk.ordersQueued} Orders Queued</span>
                          <span className="px-2.5 py-1 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-medium">
                            {trk.status}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Tab 2: Drops */}
              {activeTab === 'drops' && (
                <div className="space-y-4">
                  <h4 className="text-sm font-bold text-stone-200 uppercase tracking-wider flex items-center gap-2 font-mono">
                    <ShoppingBag className="w-4 h-4 text-brand-accent" />
                    Limited Streetwear & Pantry Drops
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {merchDrops.map((d, idx) => (
                      <div key={idx} className="p-4 bg-stone-900/60 border border-stone-800 rounded-xl space-y-2">
                        <div className="text-xs font-bold text-stone-100">{d.drop}</div>
                        <div className="text-xs text-brand-accent font-mono">Remaining: {d.stock}</div>
                        <div className="text-xs text-stone-400">Price: {d.price}</div>
                        <div className="pt-2 border-t border-stone-800 text-[11px] text-emerald-400">{d.status}</div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Tab 3: Orders */}
              {activeTab === 'orders' && (
                <div className="space-y-4">
                  <h4 className="text-sm font-bold text-stone-200 uppercase tracking-wider flex items-center gap-2 font-mono">
                    <Flame className="w-4 h-4 text-brand-accent" />
                    Live Plancha & Fryer Dispatch Queue
                  </h4>
                  <div className="space-y-2">
                    {orders.map((ord) => (
                      <div key={ord.id} className="p-4 bg-stone-900/60 border border-stone-800 rounded-xl flex items-center justify-between">
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-mono text-xs font-bold text-brand-accent">{ord.id}</span>
                            <span className="text-xs text-stone-400">[{ord.truck}]</span>
                            <span className="font-bold text-sm text-stone-100">{ord.guest}</span>
                          </div>
                          <div className="text-xs text-stone-400 mt-1">{ord.items}</div>
                        </div>
                        <div className="flex items-center gap-4">
                          <span className="font-mono text-xs font-bold text-stone-100">{ord.total}</span>
                          <span className="text-[10px] font-bold px-2 py-1 rounded bg-amber-500/10 text-amber-300 border border-amber-500/20 font-mono">
                            {ord.status}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Bottom Footer */}
            <div className="px-6 py-3 border-t border-stone-800 bg-stone-900/60 flex items-center justify-between text-xs text-stone-500">
              <span className="font-mono">Turnkey Supabase Schema Ready • RLS Active</span>
              <button
                onClick={onClose}
                className="px-4 py-1.5 bg-stone-800 hover:bg-stone-700 text-stone-200 font-bold rounded-lg transition-colors text-xs"
              >
                Close Terminal
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
