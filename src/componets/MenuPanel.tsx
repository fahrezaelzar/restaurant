import { useState } from 'react';
import { X, Flame, ShieldAlert, Plus } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { DISHES } from '../data';
import type { Dish } from '../type';

interface MenuPanelProps {
  onClose: () => void;
  onSelectDishToCustomize: (dish: Dish) => void;
}

export default function MenuPanel({ onClose, onSelectDishToCustomize }: MenuPanelProps) {
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'bowls' | 'mains' | 'juices' | 'desserts'>('all');

  const categories: { id: typeof selectedCategory; name: string }[] = [
    { id: 'all', name: 'All Dishes' },
    { id: 'bowls', name: 'Nourish Bowls' },
    { id: 'mains', name: 'Chef Mains' },
    { id: 'juices', name: 'Cold-Pressed Juices' },
    { id: 'desserts', name: 'Superfood Desserts' },
  ];

  const filteredDishes = selectedCategory === 'all'
    ? DISHES
    : DISHES.filter(d => d.category === selectedCategory);

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
      />

      <div className="pointer-events-none absolute inset-y-0 right-0 flex max-w-full pl-10">
        <motion.div
          initial={{ x: '100%' }}
          animate={{ x: 0 }}
          exit={{ x: '100%' }}
          transition={{ type: 'spring', damping: 25, stiffness: 200 }}
          className="pointer-events-auto w-screen max-w-2xl bg-white shadow-2xl flex flex-col h-full"
        >
          {/* Header */}
          <div className="flex items-center justify-between border-b border-zinc-100 p-6">
            <div>
              <h2 className="font-display text-2xl font-bold text-zinc-900">
                Culinary Menu
              </h2>
              <p className="font-sans text-xs text-zinc-500 mt-1">
                Nutrient dense plates designed for longevity and optimal energy
              </p>
            </div>
            <button
              onClick={onClose}
              className="flex h-10 w-10 items-center justify-center rounded-lg border border-zinc-200 text-zinc-500 hover:bg-zinc-50 hover:text-zinc-950 transition-all cursor-pointer"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Categories Bar */}
          <div className="border-b border-zinc-100 bg-zinc-50/50 px-6 py-3 overflow-x-auto scrollbar-none flex items-center gap-2">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`relative px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                  selectedCategory === cat.id
                    ? 'text-white'
                    : 'text-zinc-600 hover:bg-zinc-100 hover:text-zinc-900'
                }`}
              >
                {selectedCategory === cat.id && (
                  <motion.div
                    layoutId="active-menu-category-bg"
                    className="absolute inset-0 bg-emerald-500 rounded-xl -z-10"
                    transition={{ type: 'spring', stiffness: 350, damping: 28 }}
                  />
                )}
                {cat.name}
              </button>
            ))}
          </div>

          {/* Dishes List */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6 scrollbar-thin">
            <AnimatePresence mode="popLayout">
              {filteredDishes.map((dish) => (
                <motion.div
                  key={dish.id}
                  layout
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                  className="group rounded-2xl border border-zinc-100 bg-white p-4 flex flex-col md:flex-row gap-5 hover:border-emerald-200 hover:shadow-lg hover:shadow-emerald-500/[0.02] transition-all"
                >
                  {/* Photo with aspect-square */}
                  <div className="relative h-40 w-full md:w-40 shrink-0 overflow-hidden rounded-xl bg-zinc-100">
                    <img
                      src={dish.image}
                      alt={dish.name}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                      referrerPolicy="no-referrer"
                    />
                    <span className="absolute bottom-2 left-2 flex h-7 items-center justify-center rounded-lg bg-white/95 backdrop-blur-sm px-2.5 text-xs font-mono font-bold text-zinc-900 shadow-sm border border-zinc-100/50">
                      ${dish.price.toFixed(2)}
                    </span>
                  </div>

                  {/* Details */}
                  <div className="flex-1 flex flex-col justify-between space-y-3">
                    <div className="space-y-1.5">
                      <div className="flex items-start justify-between gap-2">
                        <h3 className="font-display text-lg font-bold text-zinc-900 leading-snug group-hover:text-emerald-600 transition-colors">
                          {dish.name}
                        </h3>
                      </div>
                      <p className="font-sans text-xs text-zinc-500 leading-relaxed">
                        {dish.description}
                      </p>
                      
                      {/* Tags */}
                      <div className="flex flex-wrap gap-1.5 pt-1">
                        {dish.tags.map(tag => (
                          <span key={tag} className="inline-flex items-center rounded-md bg-zinc-50 border border-zinc-100 px-2 py-0.5 text-[10px] font-medium text-zinc-600">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Macros Table */}
                    <div className="grid grid-cols-4 gap-2 bg-zinc-50 rounded-xl p-2 text-center text-[10px] font-mono border border-zinc-100/50">
                      <div>
                        <div className="text-zinc-400 font-semibold uppercase tracking-wider text-[8px]">Calories</div>
                        <div className="font-bold text-zinc-800 flex items-center justify-center gap-0.5 mt-0.5">
                          <Flame className="h-3 w-3 text-amber-500 shrink-0" />
                          {dish.nutrition.calories}
                        </div>
                      </div>
                      <div>
                        <div className="text-zinc-400 font-semibold uppercase tracking-wider text-[8px]">Protein</div>
                        <div className="font-bold text-zinc-800 mt-0.5">{dish.nutrition.protein}g</div>
                      </div>
                      <div>
                        <div className="text-zinc-400 font-semibold uppercase tracking-wider text-[8px]">Carbs</div>
                        <div className="font-bold text-zinc-800 mt-0.5">{dish.nutrition.carbs}g</div>
                      </div>
                      <div>
                        <div className="text-zinc-400 font-semibold uppercase tracking-wider text-[8px]">Fats</div>
                        <div className="font-bold text-zinc-800 mt-0.5">{dish.nutrition.fats}g</div>
                      </div>
                    </div>

                    {/* Order Action */}
                    <div className="flex items-center justify-between border-t border-zinc-50 pt-2">
                      <div className="text-[10px] text-zinc-400 italic">
                        Ingredients: {dish.ingredients.slice(0, 3).join(', ')}...
                      </div>
                      <button
                        onClick={() => onSelectDishToCustomize(dish)}
                        className="flex h-9 items-center gap-1.5 rounded-lg bg-emerald-50 px-4 font-sans text-xs font-semibold text-emerald-700 hover:bg-emerald-500 hover:text-white transition-all cursor-pointer shadow-sm group-hover:scale-102"
                      >
                        <Plus className="h-3.5 w-3.5" />
                        Customize & Order
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* Footer */}
          <div className="border-t border-zinc-100 p-6 bg-zinc-50 flex items-center justify-between">
            <div className="flex items-center gap-2 text-xs text-zinc-500">
              <ShieldAlert className="h-4 w-4 text-emerald-500" />
              <span>Celiac & Allergy customizable options inside</span>
            </div>
            <button
              onClick={onClose}
              className="h-11 items-center justify-center rounded-lg bg-zinc-900 px-6 font-sans text-xs font-semibold text-white hover:bg-zinc-800 transition-all cursor-pointer"
            >
              Close Menu
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
