import { create } from 'zustand';
import { Product } from '@/lib/types/Product';

export interface CartItem {
  product: Product;
  quantity: number;
}

interface CartStore {
  items: CartItem[];
  addProduct: (product: Product, quantity: number) => void;
  removeProduct: (productId: string) => void;
  incrementQuantity: (productId: string) => void;
  decrementQuantity: (productId: string) => void;
  clearCart: () => void;
  getTotalItems: () => number;
  getSubtotal: () => number;
  getShippingCost: () => number;
  getTotal: () => number;
}

export const useCartStore = create<CartStore>((set, get) => ({
  items: [],

  addProduct: (product: Product, quantity: number) => {
    set((state) => {
      const existingItem = state.items.find(item => item.product.id === product.id);
      
      if (existingItem) {
        return {
          items: state.items.map(item =>
            item.product.id === product.id
              ? { ...item, quantity: item.quantity + quantity }
              : item
          )
        };
      } else {
        return {
          items: [...state.items, { product, quantity }]
        };
      }
    });
  },

  removeProduct: (productId: string) => {
    set((state) => ({
      items: state.items.filter(item => item.product.id !== productId)
    }));
  },

  incrementQuantity: (productId: string) => {
    set((state) => ({
      items: state.items.map(item =>
        item.product.id === productId
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )
    }));
  },

  decrementQuantity: (productId: string) => {
    set((state) => ({
      items: state.items.map(item =>
        item.product.id === productId && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
    }));
  },

  clearCart: () => {
    set({ items: [] });
  },

  getTotalItems: () => {
    const { items } = get();
    return items.reduce((total, item) => total + item.quantity, 0);
  },

  getSubtotal: () => {
    const { items } = get();
    return items.reduce((total, item) => total + (item.product.precio * item.quantity), 0);
  },

  getShippingCost: () => {
    const subtotal = get().getSubtotal();
    // Envío gratis para pedidos mayores a $30,000
    return subtotal >= 30000 ? 0 : 3000;
  },

  getTotal: () => {
    const { getSubtotal, getShippingCost } = get();
    return getSubtotal() + getShippingCost();
  }
}));