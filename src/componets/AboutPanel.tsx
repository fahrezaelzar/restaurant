import { X, Heart, Shield, Award, Users, Star, Quote } from 'lucide-react';
import { motion } from 'motion/react';
import { TESTIMONIALS } from '../data';

interface AboutPanelProps {
  onClose: () => void;
}

export default function AboutPanel({ onClose }: AboutPanelProps) {
  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
      />

      <div className="pointer-events-none absolute inset-y-0 left-0 flex max-w-full pr-10">
        <motion.div
          initial={{ x: '-100%' }}
          animate={{ x: 0 }}
          exit={{ x: '-100%' }}
          transition={{ type: 'spring', damping: 25, stiffness: 200 }}
          className="pointer-events-auto w-screen max-w-lg bg-white shadow-2xl flex flex-col h-full"
        >
          {/* Header */}
          <div className="flex items-center justify-between border-b border-zinc-100 p-6">
            <h2 className="font-display text-2xl font-bold text-zinc-900">
              Our Sourcing & Philosophy
            </h2>
            <button
              onClick={onClose}
              className="flex h-10 w-10 items-center justify-center rounded-lg border border-zinc-200 text-zinc-500 hover:bg-zinc-50 hover:text-zinc-950 transition-all cursor-pointer"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto p-6 space-y-8 scrollbar-thin">
            {/* Mission Statement */}
            <div className="space-y-3">
              <span className="font-mono text-xs font-bold uppercase tracking-widest text-emerald-600">Our Essence</span>
              <p className="font-display text-lg font-medium leading-relaxed text-zinc-800">
                We believe food is medicine. Every dish at Verde Kitchen is designed by certified clinical nutritionists and executed by artisanal chefs to deliver absolute health without sacrificing high-end culinary pleasure.
              </p>
            </div>

            {/* Core Values */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="rounded-xl border border-zinc-100 bg-zinc-50 p-4 space-y-2">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-50 text-emerald-600">
                  <Shield className="h-5 w-5" />
                </div>
                <h4 className="font-display font-bold text-zinc-900">Zero Toxins</h4>
                <p className="font-sans text-xs text-zinc-600 leading-relaxed">
                  No refined sugars, hydrogenated seed oils, artificial colors, or chemical preservatives. Ever.
                </p>
              </div>

              <div className="rounded-xl border border-zinc-100 bg-zinc-50 p-4 space-y-2">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-50 text-emerald-600">
                  <Award className="h-5 w-5" />
                </div>
                <h4 className="font-display font-bold text-zinc-900">100% Organic</h4>
                <p className="font-sans text-xs text-zinc-600 leading-relaxed">
                  We partner directly with 14 local bio-dynamic farms to source fresh, soil-nurtured, organic produce.
                </p>
              </div>

              <div className="rounded-xl border border-zinc-100 bg-zinc-50 p-4 space-y-2">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-50 text-emerald-600">
                  <Heart className="h-5 w-5" />
                </div>
                <h4 className="font-display font-bold text-zinc-900">Nutrient Dense</h4>
                <p className="font-sans text-xs text-zinc-600 leading-relaxed">
                  Engineered using cold-press and raw-state retention to maximize vitamins, active enzymes, and raw minerals.
                </p>
              </div>

              <div className="rounded-xl border border-zinc-100 bg-zinc-50 p-4 space-y-2">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-50 text-emerald-600">
                  <Users className="h-5 w-5" />
                </div>
                <h4 className="font-display font-bold text-zinc-900">Traceability</h4>
                <p className="font-sans text-xs text-zinc-600 leading-relaxed">
                  Scan any order QR to trace back its complete lifecycle, from seed planting to your bowl.
                </p>
              </div>
            </div>

            {/* Sourcing details */}
            <div className="rounded-2xl border-2 border-dashed border-zinc-200 p-6 space-y-4">
              <h3 className="font-display text-lg font-bold text-zinc-900 flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                Our Farm-to-Table Promise
              </h3>
              <p className="font-sans text-sm text-zinc-600 leading-relaxed">
                By purchasing directly from growers, we bypass supply chain warehouses. This guarantees that your greens are in our kitchen less than 12 hours from harvest, preserving up to <strong className="text-emerald-600">80% more active antioxidants</strong> than typical grocery equivalents.
              </p>
              <div className="flex items-center justify-between border-t border-zinc-100 pt-4 text-xs font-mono text-zinc-500">
                <span>📍 Sourced within 50 miles</span>
                <span>👨‍🌾 Fair Trade Certified</span>
              </div>
            </div>

            {/* Testimonials */}
            <div className="space-y-4">
              <span className="font-mono text-xs font-bold uppercase tracking-widest text-emerald-600">What Wellness Leaders Say</span>
              <div className="space-y-4">
                {TESTIMONIALS.map((t) => (
                  <div key={t.id} className="rounded-xl border border-zinc-100 p-5 space-y-3 relative overflow-hidden bg-zinc-50/50">
                    <Quote className="absolute right-4 top-4 h-8 w-8 text-zinc-100" />
                    <div className="flex items-center gap-1">
                      {[...Array(t.rating)].map((_, i) => (
                        <Star key={i} className="h-4 w-4 fill-amber-400 text-amber-400" />
                      ))}
                    </div>
                    <p className="font-sans text-sm text-zinc-700 italic relative z-10">
                      "{t.text}"
                    </p>
                    <div className="flex items-center gap-2 pt-1 border-t border-zinc-100/50">
                      <div>
                        <h5 className="font-display text-sm font-bold text-zinc-900">{t.name}</h5>
                        <p className="font-sans text-[11px] text-zinc-500">{t.role}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Footer CTA */}
          <div className="border-t border-zinc-100 p-6 bg-zinc-50">
            <button
              onClick={onClose}
              className="flex w-full h-12 items-center justify-center rounded-xl bg-zinc-900 font-sans text-sm font-semibold text-white hover:bg-zinc-800 transition-all cursor-pointer"
            >
              Continue Exploring
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
