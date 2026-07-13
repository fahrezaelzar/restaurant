export interface Nutrition {
  calories: number;
  protein: number;
  carbs: number;
  fats: number;
}

export interface Dish {
  id: string;
  name: string;
  category: 'bowls' | 'mains' | 'juices' | 'desserts';
  description: string;
  price: number;
  image: string;
  nutrition: Nutrition;
  tags: string[];
  ingredients: string[];
}

export interface CartItem {
  dish: Dish;
  quantity: number;
  customization?: {
    extraProtein: boolean;
    glutenFree: boolean;
    extraDressing: boolean;
    specialInstructions: string;
  };
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  text: string;
  rating: number;
}
