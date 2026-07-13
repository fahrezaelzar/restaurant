import { Play, Pause, ChevronLeft, ChevronRight, Flame, Sparkles, Plus } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import type { Dish } from '../type';

interface SpotlightCardProps {
  activeDish: Dish;
  isAutoPlaying: boolean;
  onToggleAutoPlay: () => void;
  onPrev: () => void;
  onNext: () => void;
  onOrderNow: () => void;
}

export default function SpotlightCard({
  activeDish,
  isAutoPlaying,
  onToggleAutoPlay,
  onPrev,
  onNext,
  onOrderNow,
}: SpotlightCardProps) {
  // Calculates percentage width for macro lines
  const getPct = (value: number, max: number) => Math.min((value / max) * 100, 100);

  return (
    <div className="rounded-none border border-zinc-200 bg-white p-6 shadow-sm space-y-4">
      {/* Top Banner & Control row */}
      <div className="flex items-center justify-between border-b border-zinc-100 pb-3">
        <div className="flex items-center gap-1.5 bg-zinc-100 text-zinc-800 px-2.5 py-1 rounded-none text-[10px] font-mono font-bold uppercase tracking-wider">
          <Sparkles className="h-3 w-3 shrink-0 text-green-600" />
          Active Spotlight
        </div>
        
        {/* Navigation Arrows & Playback */}
        <div className="flex items-center gap-1">
          <button
            onClick={onPrev}
            className="flex h-7 w-7 items-center justify-center rounded-none border border-zinc-200 text-zinc-500 hover:bg-zinc-50 hover:text-zinc-900 transition-colors cursor-pointer"
            title="Previous Dish"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          
          <button
            onClick={onToggleAutoPlay}
            className="flex h-7 w-7 items-center justify-center rounded-none border border-zinc-200 text-zinc-500 hover:bg-zinc-50 hover:text-green-600 transition-colors cursor-pointer"
            title={isAutoPlaying ? "Pause Auto-Rotation (6s)" : "Resume Auto-Rotation"}
          >
            {isAutoPlaying ? <Pause className="h-3 w-3" /> : <Play className="h-3 w-3 fill-green-600 text-green-600" />}
          </button>

          <button
            onClick={onNext}
            className="flex h-7 w-7 items-center justify-center rounded-none border border-zinc-200 text-zinc-500 hover:bg-zinc-50 hover:text-zinc-900 transition-colors cursor-pointer"
            title="Next Dish"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Dish Name and short summary */}
      <div className="relative overflow-hidden h-24 flex flex-col justify-between">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeDish.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="space-y-1.5"
          >
            <div className="flex items-start justify-between gap-4">
              <h3 className="font-display text-base font-extrabold text-zinc-900 leading-snug">
                {activeDish.name}
              </h3>
              <span className="font-mono text-sm font-extrabold text-green-600 shrink-0">
                ${activeDish.price.toFixed(2)}
              </span>
            </div>
            
            <p className="font-sans text-[11px] text-zinc-500 leading-normal line-clamp-2">
              {activeDish.description}
            </p>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Macros Visual Indicators */}
      <div className="space-y-2 pt-1 border-t border-zinc-100">
        <div className="flex items-center justify-between text-[10px] font-mono text-zinc-400">
          <span className="flex items-center gap-1 font-bold text-zinc-600 uppercase tracking-wide">
            <Flame className="h-3.5 w-3.5 text-orange-500" />
            {activeDish.nutrition.calories} kcal Energy
          </span>
          <span>Max Satiety Ratio</span>
        </div>

        <div className="space-y-1.5 text-[10px] font-sans">
          {/* Protein Line */}
          <div className="space-y-0.5">
            <div className="flex justify-between text-[10px] font-medium text-zinc-600">
              <span className="flex items-center gap-1 font-semibold">Protein <span className="font-mono text-[9px] text-zinc-400 font-normal">({activeDish.nutrition.protein}g)</span></span>
              <span className="font-mono text-green-600 font-bold">Target Plating</span>
            </div>
            <div className="h-1 w-full bg-zinc-100 rounded-none overflow-hidden">
              <motion.div
                key={`p-${activeDish.id}`}
                initial={{ width: 0 }}
                animate={{ width: `${getPct(activeDish.nutrition.protein, 40)}%` }}
                transition={{ duration: 0.6, ease: 'easeOut' }}
                className="h-full bg-green-600 rounded-none"
              />
            </div>
          </div>

          {/* Carbs Line */}
          <div className="space-y-0.5">
            <div className="flex justify-between text-[10px] font-medium text-zinc-600">
              <span className="flex items-center gap-1 font-semibold">Healthy Carbs <span className="font-mono text-[9px] text-zinc-400 font-normal">({activeDish.nutrition.carbs}g)</span></span>
              <span className="font-mono text-zinc-400">Complex Glycemic</span>
            </div>
            <div className="h-1 w-full bg-zinc-100 rounded-none overflow-hidden">
              <motion.div
                key={`c-${activeDish.id}`}
                initial={{ width: 0 }}
                animate={{ width: `${getPct(activeDish.nutrition.carbs, 70)}%` }}
                transition={{ duration: 0.6, ease: 'easeOut' }}
                className="h-full bg-zinc-400 rounded-none"
              />
            </div>
          </div>

          {/* Fats Line */}
          <div className="space-y-0.5">
            <div className="flex justify-between text-[10px] font-medium text-zinc-600">
              <span className="flex items-center gap-1 font-semibold">Healthy Fats <span className="font-mono text-[9px] text-zinc-400 font-normal">({activeDish.nutrition.fats}g)</span></span>
              <span className="font-mono text-zinc-400">Essential Lipids</span>
            </div>
            <div className="h-1 w-full bg-zinc-100 rounded-none overflow-hidden">
              <motion.div
                key={`f-${activeDish.id}`}
                initial={{ width: 0 }}
                animate={{ width: `${getPct(activeDish.nutrition.fats, 40)}%` }}
                transition={{ duration: 0.6, ease: 'easeOut' }}
                className="h-full bg-zinc-800 rounded-none"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Immediate Add CTA */}
      <button
        onClick={onOrderNow}
        className="flex w-full h-11 items-center justify-center gap-1.5 rounded-none bg-zinc-950 font-sans text-xs font-bold uppercase tracking-widest text-white hover:bg-green-600 transition-all shadow-sm active:scale-[0.98] cursor-pointer"
      >
        <Plus className="h-3.5 w-3.5" />
        Customize & Order Now
      </button>
    </div>
  );
}
