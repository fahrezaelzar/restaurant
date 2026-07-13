import { motion } from 'motion/react';
import { Check, Truck, Clock, Sparkles } from 'lucide-react';

interface SuccessModalProps {
  onClose: () => void;
  orderDetails: { name: string; itemsCount: number; total: number } | null;
}

export default function SuccessModal({ onClose, orderDetails }: SuccessModalProps) {
  if (!orderDetails) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-hidden">
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
      />

      {/* Card container */}
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        transition={{ type: 'spring', damping: 25, stiffness: 220 }}
        className="relative w-full max-w-sm bg-white rounded-3xl border border-zinc-100 shadow-2xl p-6 text-center space-y-5 overflow-hidden"
      >
        {/* Abstract background blobs for premium feel */}
        <div className="absolute -top-12 -left-12 h-32 w-32 bg-emerald-100 rounded-full blur-2xl opacity-45 pointer-events-none" />
        <div className="absolute -bottom-12 -right-12 h-32 w-32 bg-amber-100 rounded-full blur-2xl opacity-45 pointer-events-none" />

        {/* Animated Check icon */}
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-emerald-100 text-emerald-600 relative z-10 shadow-sm shadow-emerald-500/10">
          <motion.div
            initial={{ scale: 0, rotate: -45 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ delay: 0.1, type: 'spring', stiffness: 300, damping: 20 }}
          >
            <Check className="h-6 w-6 stroke-[3px]" />
          </motion.div>
        </div>

        {/* Text Details */}
        <div className="space-y-1">
          <span className="font-mono text-[9px] font-bold uppercase tracking-widest text-emerald-600 flex items-center justify-center gap-1">
            <Sparkles className="h-3 w-3" /> Culinary Sourcing Secured
          </span>
          <h3 className="font-display text-lg font-bold text-zinc-950">
            Organic Box Dispatched!
          </h3>
          <p className="font-sans text-xs text-zinc-500 leading-relaxed max-w-[280px] mx-auto">
            Thank you, <strong className="text-zinc-800">{orderDetails.name}</strong>. Your customized healthy meal box has been assigned to our kitchen crew.
          </p>
        </div>

        {/* Live Status Tracking */}
        <div className="rounded-2xl border border-zinc-100 bg-zinc-50/50 p-4 space-y-3 text-left relative z-10">
          <div className="flex items-center gap-3 text-xs">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-50 text-emerald-600">
              <Clock className="h-4.5 w-4.5" />
            </div>
            <div>
              <div className="font-sans text-[10px] text-zinc-400 font-semibold uppercase">ETA Delivery</div>
              <div className="font-display font-bold text-zinc-900">Arriving in 18 minutes</div>
            </div>
          </div>

          <div className="flex items-center gap-3 text-xs border-t border-zinc-100 pt-2.5">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-zinc-100 text-zinc-700">
              <Truck className="h-4.5 w-4.5" />
            </div>
            <div>
              <div className="font-sans text-[10px] text-zinc-400 font-semibold uppercase">Freshness Vault</div>
              <div className="font-sans font-medium text-zinc-700">Temperature Controlled bag</div>
            </div>
          </div>

          {/* Progress visualizer */}
          <div className="space-y-1.5 pt-1">
            <div className="flex justify-between text-[9px] font-mono text-zinc-400">
              <span>Order Prepping</span>
              <span>18m left</span>
            </div>
            <div className="h-1.5 w-full bg-zinc-100 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: '33%' }}
                transition={{ duration: 1.5, ease: 'easeOut' }}
                className="h-full bg-emerald-500 rounded-full"
              />
            </div>
          </div>
        </div>

        {/* Pricing breakdown */}
        <div className="flex justify-between items-center text-xs font-mono text-zinc-500 bg-zinc-50 rounded-xl px-4 py-2 border border-zinc-100/50">
          <span>{orderDetails.itemsCount} Organic Plates</span>
          <span className="font-bold text-zinc-800">${orderDetails.total.toFixed(2)}</span>
        </div>

        {/* Return Button */}
        <button
          onClick={onClose}
          className="w-full h-11 items-center justify-center rounded-xl bg-zinc-950 font-sans text-xs font-semibold text-white hover:bg-zinc-800 transition-all cursor-pointer relative z-10"
        >
          Return to Kitchen Home
        </button>
      </motion.div>
    </div>
  );
}
