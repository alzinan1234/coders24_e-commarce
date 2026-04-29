import { create } from "zustand";
import { FilterState } from "@/types";

interface FilterStore extends FilterState {
  setCategory:   (category: string) => void;
  setPriceRange: (range: [number, number]) => void;
  setRating:     (rating: number) => void;
  setSortBy:     (sortBy: string) => void;
  setInStock:    (inStock: boolean) => void;
  toggleTag:     (tag: string) => void;
  reset:         () => void;
}

const defaultState: FilterState = {
  category:   "all",
  priceRange: [0, 1000],
  rating:     0,
  sortBy:     "featured",
  inStock:    false,
  tags:       [],
};

export const useFilterStore = create<FilterStore>((set) => ({
  ...defaultState,
  setCategory:   (category)   => set({ category }),
  setPriceRange: (priceRange) => set({ priceRange }),
  setRating:     (rating)     => set({ rating }),
  setSortBy:     (sortBy)     => set({ sortBy }),
  setInStock:    (inStock)    => set({ inStock }),
  toggleTag: (tag) => set((s) => ({
    tags: s.tags.includes(tag) ? s.tags.filter(t => t !== tag) : [...s.tags, tag],
  })),
  reset: () => set(defaultState),
}));
