import { create } from "zustand";
import { Product } from "@/types";

interface WishlistStore {
  items: Product[];
  toggle: (product: Product) => void;
  has: (productId: string) => boolean;
  clear: () => void;
}

export const useWishlistStore = create<WishlistStore>((set, get) => ({
  items: [],
  toggle: (product) => {
    const items = get().items;
    const has = items.some(i => i.id === product.id);
    set({ items: has ? items.filter(i => i.id !== product.id) : [...items, product] });
  },
  has: (productId) => get().items.some(i => i.id === productId),
  clear: () => set({ items: [] }),
}));
