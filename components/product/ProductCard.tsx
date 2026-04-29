"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Heart, ShoppingBag, Eye, Star } from "lucide-react";
import { Product } from "@/types";
import { useCartStore } from "@/store/cartStore";
import { useWishlistStore } from "@/store/wishlistStore";
import { formatPrice, cn } from "@/lib/utils";
import toast from "react-hot-toast";

interface Props { product: Product; className?: string; }

export default function ProductCard({ product, className }: Props) {
  const [imageIdx, setImageIdx] = useState(0);
  const [loading,  setLoading]  = useState(false);
  const addItem  = useCartStore(s => s.addItem);
  const { toggle, has } = useWishlistStore();
  const inWishlist = has(product.id);

  const handleAddToCart = async (e: React.MouseEvent) => {
    e.preventDefault();
    setLoading(true);
    await new Promise(r => setTimeout(r, 400));
    addItem(product);
    setLoading(false);
    toast.success(`✦ ${product.name} added to cart`);
  };

  const handleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    toggle(product);
    toast.success(inWishlist ? "Removed from wishlist" : `♡ Added to wishlist`);
  };

  return (
    <div className={cn("group relative bg-white rounded-2xl overflow-hidden hover-lift", className)}
         style={{ border: "1px solid var(--color-border)", boxShadow: "var(--shadow-sm)" }}>
      {/* Badges */}
      <div className="absolute top-3 left-3 z-10 flex flex-col gap-1.5">
        {product.newArrival  && <span className="badge badge-primary">New</span>}
        {product.bestseller  && <span className="badge badge-gold">Hot</span>}
        {product.discount    && <span className="badge badge-danger">-{product.discount}%</span>}
      </div>

      {/* Wishlist */}
      <button onClick={handleWishlist}
              className="absolute top-3 right-3 z-10 w-9 h-9 rounded-full flex items-center justify-center bg-white/90 backdrop-blur-sm shadow-sm transition-all hover:scale-110">
        <Heart size={16} fill={inWishlist ? "var(--color-primary)" : "none"}
               style={{ color: inWishlist ? "var(--color-primary)" : "var(--color-ink-faint)" }} />
      </button>

      {/* Image */}
      <Link href={`/product/${product.id}`}>
        <div className="relative h-56 sm:h-64 overflow-hidden bg-gray-50"
             onMouseEnter={() => product.images[1] && setImageIdx(1)}
             onMouseLeave={() => setImageIdx(0)}>
          <Image src={product.images[imageIdx] || product.images[0]} alt={product.name}
                 fill className="object-cover transition-all duration-700 group-hover:scale-110" />
          {/* Quick view */}
          <div className="absolute inset-0 flex items-end justify-center pb-4 opacity-0 group-hover:opacity-100 transition-all duration-300">
            <span className="flex items-center gap-2 glass text-white text-xs font-semibold px-4 py-2 rounded-full">
              <Eye size={14} /> Quick View
            </span>
          </div>
        </div>
      </Link>

      {/* Content */}
      <div className="p-4">
        <p className="font-chinese text-xs mb-1" style={{ color: "var(--color-primary)" }}>{product.nameZh}</p>
        <Link href={`/product/${product.id}`}>
          <h3 className="font-display font-semibold text-sm leading-snug mb-2 line-clamp-2 hover:text-primary transition-colors"
              style={{ color: "var(--color-ink)" }}>
            {product.name}
          </h3>
        </Link>

        {/* Rating */}
        <div className="flex items-center gap-1.5 mb-3">
          <div className="flex">
            {Array.from({length:5}).map((_,i) => (
              <Star key={i} size={12}
                    fill={i < Math.floor(product.rating) ? "var(--color-gold)" : "none"}
                    style={{ color: "var(--color-gold)" }} />
            ))}
          </div>
          <span className="text-xs" style={{ color: "var(--color-ink-muted)" }}>
            {product.rating} ({product.reviews})
          </span>
        </div>

        {/* Price + CTA */}
        <div className="flex items-center justify-between gap-2">
          <div>
            <span className="price-sale text-lg font-bold">{formatPrice(product.price)}</span>
            {product.originalPrice && (
              <span className="price-original text-xs ml-2">{formatPrice(product.originalPrice)}</span>
            )}
          </div>
          <button onClick={handleAddToCart} disabled={loading || product.stock === 0}
                  className="w-9 h-9 rounded-full flex items-center justify-center transition-all hover:scale-110 active:scale-95 disabled:opacity-50"
                  style={{ background: loading ? "var(--color-surface-alt)" : "var(--color-primary)", color: "#fff" }}>
            {loading
              ? <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              : <ShoppingBag size={15} />
            }
          </button>
        </div>

        {product.stock <= 5 && product.stock > 0 && (
          <p className="text-xs mt-2" style={{ color: "var(--color-accent)" }}>Only {product.stock} left!</p>
        )}
        {product.stock === 0 && (
          <p className="text-xs mt-2" style={{ color: "var(--color-ink-faint)" }}>Out of stock</p>
        )}
      </div>
    </div>
  );
}
