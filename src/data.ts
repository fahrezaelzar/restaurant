import type { Dish, Testimonial } from './type';
import healthySalad from "./assets/healthy_salad_1783252939926.jpg";
import smoothieBowl from "./assets/smoothie_bowl_1783252954620.jpg";
import grilledSalmon from "./assets/grilled_salmon_1783252966983.jpg";
import avocadoToast from "./assets/avocado_toast_1783252979075.jpg";
import greenJuice from "./assets/green_juice_1783252990736.jpg";
import chiaPudding from "./assets/chia_pudding_1783253002406.jpg";

export const DISHES: Dish[] = [
  {
    id: 'quinoa-power-bowl',
    name: 'Quinoa Power Bowl',
    category: 'bowls',
    description: 'Organic tri-color quinoa, sliced Hass avocado, pomegranate seeds, roasted organic chickpeas, raw baby kale, and zesty green herb vinaigrette.',
    price: 14.50,
    image: healthySalad,
    nutrition: {
      calories: 480,
      protein: 14,
      carbs: 52,
      fats: 22,
    },
    tags: ['Vegan', 'Gluten-Free', 'High Fiber'],
    ingredients: ['Tri-color Quinoa', 'Hass Avocado', 'Pomegranate Seeds', 'Chickpeas', 'Baby Kale', 'Dill-Basil Vinaigrette'],
  },
  {
    id: 'pitaya-zen-bowl',
    name: 'Pitaya Zen Smoothie Bowl',
    category: 'bowls',
    description: 'Vibrant pink dragonfruit purée whipped with organic almond milk, topped with organic kiwi, blueberries, raw chia seeds, coconut flakes, and toasted gluten-free granola.',
    price: 12.00,
    image: smoothieBowl,
    nutrition: {
      calories: 340,
      protein: 8,
      carbs: 62,
      fats: 9,
    },
    tags: ['Vegetarian', 'Gluten-Free', 'Superfood'],
    ingredients: ['Pink Pitaya', 'Almond Milk', 'Blueberries', 'Kiwi Slices', 'Chia Seeds', 'Coconut Flakes', 'Gluten-Free Oats'],
  },
  {
    id: 'seared-salmon-asparagus',
    name: 'Seared Salmon & Asparagus',
    category: 'mains',
    description: 'Crispy skin pan-seared wild salmon filet served over a bed of chargrilled organic asparagus spears, finished with fresh lemon zest, micro dill, and cold-pressed olive oil.',
    price: 22.00,
    image: grilledSalmon,
    nutrition: {
      calories: 520,
      protein: 38,
      carbs: 12,
      fats: 34,
    },
    tags: ['Keto', 'High Protein', 'Gluten-Free'],
    ingredients: ['Wild Salmon', 'Organic Asparagus', 'Meyer Lemon', 'Extra Virgin Olive Oil', 'Micro Dill', 'Fleur de Sel'],
  },
  {
    id: 'avocado-sourdough-toast',
    name: 'Artisanal Avocado Toast',
    category: 'mains',
    description: 'Freshly crushed organic avocado on slow-fermented, stone-ground sourdough, garnished with shaved red radishes, micro cilantro, and toasted red pepper flakes.',
    price: 13.50,
    image: avocadoToast,
    nutrition: {
      calories: 390,
      protein: 11,
      carbs: 42,
      fats: 18,
    },
    tags: ['Vegetarian', 'Dairy-Free', 'Heart Healthy'],
    ingredients: ['Sourdough Toast', 'Hass Avocado', 'Red Radishes', 'Micro Cilantro', 'Chili Flakes', 'Toasted Pumpkin Seeds'],
  },
  {
    id: 'spinach-booster-juice',
    name: 'Cold-Pressed Spinach Booster',
    category: 'juices',
    description: 'Slow cold-pressed organic baby spinach, crisp cucumber, granny smith apples, spicy fresh ginger root, peppermint, and key lime.',
    price: 9.00,
    image: greenJuice,
    nutrition: {
      calories: 120,
      protein: 3,
      carbs: 26,
      fats: 0,
    },
    tags: ['Raw', 'Vegan', 'Anti-inflammatory'],
    ingredients: ['Baby Spinach', 'English Cucumber', 'Granny Smith Apple', 'Ginger Root', 'Mint Leaves', 'Key Lime'],
  },
  {
    id: 'mango-chia-parfait',
    name: 'Mango Raspberry Chia Parfait',
    category: 'desserts',
    description: 'Organic white chia seeds bloomed in coconut milk, layered with organic sweet mango coulis and fresh raspberries, lightly sweetened with wild clover honey.',
    price: 10.50,
    image: chiaPudding,
    nutrition: {
      calories: 280,
      protein: 6,
      carbs: 38,
      fats: 11,
    },
    tags: ['Vegetarian', 'Gluten-Free', 'Prebiotic'],
    ingredients: ['Chia Seeds', 'Coconut Milk', 'Alphonso Mango Purée', 'Fresh Raspberries', 'Wild Honey', 'Vanilla Bean'],
  },
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: '1',
    name: 'Sarah Jenkins',
    role: 'Nutritionist & Fitness Coach',
    text: 'Verde Kitchen is a game-changer. The Salmon Platter is perfectly seared, and the macros are spot on for my athletic training.',
    rating: 5,
  },
  {
    id: '2',
    name: 'Chef Marcus Thorne',
    role: 'Culinary Reviewer',
    text: 'A rare concept where "healthy" does not compromise taste. The depth of flavor in their green herb vinaigrette is remarkable.',
    rating: 5,
  },
  {
    id: '3',
    name: 'Elena Rostova',
    role: 'Wellness Blogger',
    text: 'The Pitaya bowl is literally edible art. I order it every single morning. It gives me so much clean energy!',
    rating: 5,
  },
];
