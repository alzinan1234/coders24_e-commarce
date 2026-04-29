import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatPrice(price: number): string {
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(price);
}

export function formatPriceCNY(price: number): string {
  return new Intl.NumberFormat("zh-CN", { style: "currency", currency: "CNY" }).format(price * 7.2);
}

export function getDiscountPercent(original: number, current: number): number {
  return Math.round(((original - current) / original) * 100);
}

export function truncate(str: string, length: number): string {
  return str.length > length ? str.slice(0, length) + "..." : str;
}

export function generateStars(rating: number): string {
  return "★".repeat(Math.floor(rating)) + (rating % 1 >= 0.5 ? "½" : "") + "☆".repeat(5 - Math.ceil(rating));
}

export function slugify(str: string): string {
  return str.toLowerCase().replace(/\s+/g, "-").replace(/[^\w-]+/g, "");
}
