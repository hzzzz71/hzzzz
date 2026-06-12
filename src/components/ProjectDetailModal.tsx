import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Project } from '../types';
import { X, Sparkles, Plus, ShoppingCart, TrendingUp, CheckCircle, Smartphone, Sliders, Globe } from 'lucide-react';

interface ProjectDetailModalProps {
  project: Project | null;
  onClose: () => void;
}

export default function ProjectDetailModal({ project, onClose }: ProjectDetailModalProps) {
  if (!project) return null;

  // --- 1. EcoTracker Interactive State ---
  const [ecoScore, setEcoScore] = React.useState(68);
  const [habits, setHabits] = React.useState([
    { id: '1', name: 'Communted via bicycle/walk', points: 15, checked: false },
    { id: '2', name: 'Zero single-use plastics today', points: 10, checked: true },
    { id: '3', name: 'Power-off auxiliary appliances', points: 8, checked: false },
    { id: '4', name: 'Used cold-water wash cycles', points: 12, checked: true },
    { id: '5', name: 'Composted kitchen organic scraps', points: 10, checked: false }
  ]);

  const toggleHabit = (id: string, points: number) => {
    setHabits(habits.map(h => {
      if (h.id === id) {
        const nextChecked = !h.checked;
        setEcoScore(prev => nextChecked ? Math.min(prev + points, 100) : Math.max(prev - points, 0));
        return { ...h, checked: nextChecked };
      }
      return h;
    }));
  };

  // --- 2. DataStream Interactive State ---
  const [activeMetric, setActiveMetric] = React.useState<'traffic' | 'sales' | 'system'>('traffic');
  const metricData = {
    traffic: {
      title: 'Global Page Traffic',
      value: '1,284,592 sessions',
      gain: '+12.4% vs last week',
      chartPath: 'M0,80 Q25,20 50,60 T100,20 T150,70 T200,30 T250,55 T300,10',
      points: [120, 40, 80, 30, 95, 45, 80, 15]
    },
    sales: {
      title: 'Checkout Subscriptions',
      value: '$48,293.50 ARR',
      gain: '+24.1% acceleration',
      chartPath: 'M0,110 Q25,100 50,70 T100,80 T150,50 T200,40 T250,20 T300,5',
      points: [110, 100, 70, 80, 50, 40, 20, 5]
    },
    system: {
      title: 'Node Latency Metrics',
      value: '22ms avg delay',
      gain: '-8.5% faster response',
      chartPath: 'M0,50 Q25,60 50,40 T100,45 T150,52 T200,35 T250,48 T300,42',
      points: [50, 60, 40, 45, 52, 35, 48, 42]
    }
  };

  // --- 3. Bloom Boutique Interactive State ---
  const [cartItems, setCartItems] = React.useState<{id: string, name: string, price: number, qty: number}[]>([]);
  const shopBouquets = [
    { id: 'bq-1', name: 'Meadow Grace Bouquet', price: 68 },
    { id: 'bq-2', name: 'Symphony Rose Box', price: 92 },
    { id: 'bq-3', name: 'Wild Violet Harmony', price: 74 },
  ];

  const addToCart = (bouquet: { id: string, name: string, price: number }) => {
    const existing = cartItems.find(item => item.id === bouquet.id);
    if (existing) {
      setCartItems(cartItems.map(item => item.id === bouquet.id ? { ...item, qty: item.qty + 1 } : item));
    } else {
      setCartItems([...cartItems, { ...bouquet, qty: 1 }]);
    }
  };

  const cartTotal = cartItems.reduce((acc, item) => acc + (item.price * item.qty), 0);
  const clearCart = () => setCartItems([]);

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        {/* Darkened blur backdrop */}
        <motion.div
          id="modal-backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-slate-900/40 backdrop-blur-md"
        />

        {/* Modal Main container */}
        <motion.div
          id={`modal-body-${project.id}`}
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
          className="relative w-full max-w-4xl max-h-[85vh] overflow-y-auto rounded-3xl bg-white/90 border border-white/50 shadow-2xl z-10 flex flex-col md:flex-row divide-y md:divide-y-0 md:divide-x divide-slate-100"
        >
          {/* Close button top right */}
          <button
            id="btn-close-modal"
            onClick={onClose}
            className="absolute top-4 right-4 z-20 p-2 text-slate-400 hover:text-slate-800 bg-slate-100/50 hover:bg-slate-100 rounded-full cursor-pointer transition-all duration-200"
          >
            <X className="w-5 h-5" />
          </button>

          {/* LEFT: Project Overview (Graphic & Tech stats) */}
          <div className="w-full md:w-1/2 p-6 md:p-8 flex flex-col justify-between" id="modal-left-panel">
            <div>
              {/* Product Badge & Category */}
              <div className="flex items-center space-x-2 mb-3">
                <span className="bg-indigo-50 text-indigo-700 text-xs font-semibold px-3 py-1 rounded-full border border-indigo-100">
                  {project.category}
                </span>
                <span className="flex items-center text-[11px] text-pink-600 font-medium">
                  <Sparkles className="w-3.5 h-3.5 mr-1" />
                  Live Shell Prototype
                </span>
              </div>

              {/* Headings */}
              <h2 className="text-3xl font-bold font-display tracking-tight text-slate-900 leading-tight">
                {project.title}
              </h2>
              <p className="text-indigo-600 font-medium text-sm mt-1">
                {project.subtitle}
              </p>

              {/* Rich Description */}
              <p className="text-slate-600 text-xs leading-relaxed mt-4">
                {project.fullDetails}
              </p>

              {/* Specs Tag List */}
              <div className="mt-6">
                <h4 className="text-xs font-bold uppercase tracking-wide text-slate-400 mb-2.5">
                  Core Toolkit & Stack
                </h4>
                <div className="flex flex-wrap gap-1.5" id="modal-tech-tags">
                  {project.techTags.map((tech, idx) => (
                    <span 
                      key={idx}
                      className="text-xs bg-slate-100/70 text-slate-700 px-3 py-1 rounded-full border border-slate-200/40 font-medium"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Static Image banner */}
            <div className="mt-8 rounded-2xl overflow-hidden shadow-md border border-slate-100 aspect-[16/9] relative">
              <img 
                src={project.imageUrl} 
                alt={project.title} 
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* RIGHT: LIVE INTERACTIVE SHELL PROTOTYPE */}
          <div className="w-full md:w-1/2 p-6 md:p-8 bg-slate-50/50 flex flex-col" id="modal-right-prototype-panel">
            <div className="mb-4">
              <div className="flex items-center space-x-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping" />
                <h3 className="font-display font-bold text-sm text-slate-800 uppercase tracking-wider">
                  Interactive UI Simulator
                </h3>
              </div>
              <p className="text-[11px] text-slate-500 mt-0.5">
                Test-drive customized active states created by the designer.
              </p>
            </div>

            {/* Simulated Case 1: EcoTracker Mobile Mockup */}
            {project.mockupType === 'mobile' && (
              <div className="flex-grow flex flex-col justify-between" id="sim-ecotracker">
                <div className="bg-white rounded-3xl border border-slate-200/50 p-4 shadow-sm relative overflow-hidden">
                  {/* Simulated Mobile Status bar */}
                  <div className="flex justify-between items-center text-[10px] text-slate-400 font-medium mb-3">
                    <span>9:41 AM</span>
                    <div className="flex items-center space-x-1">
                      <Smartphone className="w-3.5 h-3.5" />
                      <span>EcoSim Active</span>
                    </div>
                  </div>

                  {/* Circular Score Badge */}
                  <div className="flex items-center justify-between bg-emerald-50/60 border border-emerald-100 p-3.5 rounded-2xl mb-4">
                    <div>
                      <h5 className="font-bold text-emerald-900 text-xs leading-none">Greenhouse Score</h5>
                      <p className="text-[10px] text-emerald-700 mt-1">Goal: 85+ points offset</p>
                    </div>
                    <div className="relative flex items-center justify-center">
                      <svg className="w-12 h-12">
                        <circle cx="24" cy="24" r="20" fill="transparent" stroke="#f1f5f9" strokeWidth="4" />
                        <circle cx="24" cy="24" r="20" fill="transparent" stroke="#10b981" strokeWidth="4" 
                                strokeDasharray={2 * Math.PI * 20} 
                                strokeDashoffset={2 * Math.PI * 20 * (1 - ecoScore/100)}
                                strokeLinecap="round"
                        />
                      </svg>
                      <span className="absolute text-xs font-bold text-slate-800">{ecoScore}%</span>
                    </div>
                  </div>

                  {/* Config Checklist */}
                  <h6 className="text-[10px] uppercase font-bold text-slate-400 tracking-wider mb-2">Sustainable Activity Logs</h6>
                  <div className="space-y-1.5 max-h-[160px] overflow-y-auto pr-1">
                    {habits.map(habit => (
                      <button
                        key={habit.id}
                        onClick={() => toggleHabit(habit.id, habit.points)}
                        className={`w-full flex items-center justify-between p-2.5 rounded-xl border text-left cursor-pointer transition-all text-xs ${
                          habit.checked 
                            ? 'bg-emerald-500/10 border-emerald-200 text-emerald-900' 
                            : 'bg-slate-50 hover:bg-slate-100 border-slate-200/60 text-slate-700'
                        }`}
                      >
                        <span className="font-medium pr-2 truncate">{habit.name}</span>
                        <div className="flex items-center space-x-1 flex-shrink-0">
                          <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-md ${
                            habit.checked ? 'bg-emerald-500/25 text-emerald-800' : 'bg-slate-200 text-slate-500'
                          }`}>
                            +{habit.points}
                          </span>
                          {habit.checked ? <CheckCircle className="w-3.5 h-3.5 text-emerald-600" /> : <div className="w-3.5 h-3.5 rounded-full border border-slate-300" />}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="text-[11px] text-slate-500 italic mt-3 text-center">
                  *Check/uncheck habits to update the real-time SVG greenhouse gas ring.
                </div>
              </div>
            )}

            {/* Simulated Case 2: DataStream Dashboard Mockup */}
            {project.mockupType === 'dashboard' && (
              <div className="flex-grow flex flex-col justify-between" id="sim-datastream">
                <div className="bg-slate-900 rounded-3xl border border-slate-800 p-4 shadow-xl text-white">
                  {/* Sim Controls */}
                  <div className="flex space-x-1.5 mb-4">
                    {(['traffic', 'sales', 'system'] as const).map(tab => (
                      <button
                        key={tab}
                        onClick={() => setActiveMetric(tab)}
                        className={`text-[11px] px-3 py-1 rounded-full font-medium transition cursor-pointer ${
                          activeMetric === tab 
                            ? 'bg-indigo-600 text-white' 
                            : 'bg-slate-800 hover:bg-slate-700 text-slate-400'
                        }`}
                      >
                        {tab.toUpperCase()}
                      </button>
                    ))}
                  </div>

                  {/* Mini-Card Body */}
                  <div className="bg-slate-950/80 rounded-2xl p-4 border border-slate-800/80">
                    <span className="text-[10px] uppercase font-bold text-indigo-400 tracking-widest block leading-none">
                      {metricData[activeMetric].title}
                    </span>
                    <div className="flex items-baseline space-x-2 mt-2">
                      <span className="text-2xl font-bold font-mono tracking-tight text-white">
                        {metricData[activeMetric].value}
                      </span>
                      <span className={`text-[11px] font-semibold text-emerald-400`}>
                        {metricData[activeMetric].gain}
                      </span>
                    </div>

                    {/* Animated Line Chart */}
                    <div className="h-28 w-full mt-4 flex items-end relative overflow-hidden">
                      {/* Grid background rails */}
                      <div className="absolute inset-x-0 top-0 border-b border-white/[0.04] h-0" />
                      <div className="absolute inset-x-0 top-1/3 border-b border-white/[0.04] h-0" />
                      <div className="absolute inset-x-0 top-2/3 border-b border-white/[0.04] h-0" />

                      {/* Sparkline Canvas rendering */}
                      <svg className="w-full h-full" viewBox="0 0 300 120" preserveAspectRatio="none">
                        <defs>
                          <linearGradient id="chart-grad" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor="#6366f1" stopOpacity="0.4" />
                            <stop offset="100%" stopColor="#6366f1" stopOpacity="0.0" />
                          </linearGradient>
                        </defs>
                        {/* Area shading */}
                        <motion.path
                          key={`area-${activeMetric}`}
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ duration: 0.5 }}
                          d={`${metricData[activeMetric].chartPath} L300,120 L0,120 Z`}
                          fill="url(#chart-grad)"
                        />
                        {/* Stroke path */}
                        <motion.path
                          key={`stroke-${activeMetric}`}
                          initial={{ pathLength: 0 }}
                          animate={{ pathLength: 1 }}
                          transition={{ duration: 0.7 }}
                          d={metricData[activeMetric].chartPath}
                          fill="none"
                          stroke="#818cf8"
                          strokeWidth="2.5"
                          strokeLinecap="round"
                        />
                      </svg>
                    </div>
                  </div>
                </div>

                <div className="text-[11px] text-slate-500 italic mt-3 text-center">
                  *Toggle dashboard headers to cycle mock metrics and redraw SVG path bindings.
                </div>
              </div>
            )}

            {/* Simulated Case 3: Bloom Boutique Flower Shop Checkout */}
            {project.mockupType === 'ecommerce' && (
              <div className="flex-grow flex flex-col justify-between" id="sim-bloom">
                <div className="bg-white rounded-3xl border border-[#ece4db] p-4 shadow-sm" style={{ backgroundColor: '#FAF9F6' }}>
                  <div className="flex justify-between items-center pb-2 border-b border-[#ebdccd]/50 mb-3 text-xs text-[#5c4a37]">
                    <span className="font-semibold text-stone-700 font-display">Bloom Botanist Closet</span>
                    <div className="flex items-center space-x-1">
                      <Globe className="w-3.5 h-3.5" />
                      <span>bloom.btq</span>
                    </div>
                  </div>

                  {/* Simple Products Shelf */}
                  <h6 className="text-[10px] font-bold text-stone-500 uppercase tracking-widest mb-2">Available Arrangements</h6>
                  <div className="space-y-1.5">
                    {shopBouquets.map(bouquet => (
                      <div 
                        key={bouquet.id} 
                        className="flex items-center justify-between p-2.5 rounded-xl border border-stone-200/40 bg-white shadow-[0_2px_12px_rgba(31,38,135,0.01)] text-xs"
                      >
                        <div>
                          <span className="font-semibold text-[#5c4a37] block">{bouquet.name}</span>
                          <span className="text-[10px] text-stone-500 font-mono">${bouquet.price}.00 USD</span>
                        </div>
                        <button
                          onClick={() => addToCart(bouquet)}
                          className="flex items-center space-x-1.5 py-1 px-3 bg-[#5c4a37] hover:bg-[#4a3928] text-white rounded-full text-[10px] font-bold cursor-pointer transition"
                        >
                          <Plus className="w-3 h-3" />
                          <span>Add</span>
                        </button>
                      </div>
                    ))}
                  </div>

                  {/* Digital flower cart */}
                  <div className="mt-4 pt-3 border-t border-[#ebdccd]/80">
                    <div className="flex items-center justify-between text-[#5c4a37] mb-2">
                      <div className="flex items-center space-x-1 font-bold text-xs">
                        <ShoppingCart className="w-3.5 h-3.5" />
                        <span>Shopping Basket ({cartItems.reduce((acc, i) => acc + i.qty, 0)})</span>
                      </div>
                      {cartItems.length > 0 && (
                        <button 
                          onClick={clearCart}
                          className="text-[10px] underline text-stone-400 hover:text-stone-600"
                        >
                          Clear
                        </button>
                      )}
                    </div>

                    {cartItems.length === 0 ? (
                      <div className="bg-[#fcfbf9]/80 border border-dashed border-stone-200 rounded-xl p-4 text-center text-[10px] text-stone-400">
                        No floral arrangements selected. Add above!
                      </div>
                    ) : (
                      <div className="space-y-1 max-h-[85px] overflow-y-auto pr-1">
                        {cartItems.map((item, id) => (
                          <div key={id} className="flex justify-between text-[11px] text-stone-600">
                            <span>{item.name} <span className="text-[10px] text-stone-400">x{item.qty}</span></span>
                            <span className="font-mono">${item.price * item.qty}.00</span>
                          </div>
                        ))}
                        <div className="flex justify-between items-center pt-2 border-t border-dashed border-stone-200 font-bold text-xs text-[#5c4a37]">
                          <span>Basket Total:</span>
                          <span className="font-mono text-indigo-700">${cartTotal}.00</span>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                <div className="text-[11px] text-slate-500 italic mt-3 text-center">
                  *Choose floral boxes to add items together.
                </div>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
