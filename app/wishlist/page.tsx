"use client";
import Link from "next/link";
import { Heart, ArrowRight } from "lucide-react";
import { useWishlistStore } from "@/store/wishlistStore";
import ProductCard from "@/components/product/ProductCard";

export default function WishlistPage() {
  const { items, clear } = useWishlistStore();

  return (
    <div className="min-h-screen" style={{ paddingTop: "calc(var(--nav-height) + 2rem)", background: "var(--color-surface)" }}>
      <div className="container-custom py-8">
        <div className="flex items-center justify-between mb-10">
          <div>
            <p className="section-subtitle">我的收藏</p>
            <h1 className="section-title">My Wishlist</h1>
            {items.length > 0 && <p className="mt-1 text-sm" style={{ color: "var(--color-ink-muted)" }}>{items.length} saved items</p>}
          </div>
          {items.length > 0 && <button onClick={clear} className="btn btn-ghost btn-sm text-sm" style={{ color: "var(--color-ink-muted)" }}>Clear all</button>}
        </div>

        {items.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <Heart size={72} style={{ color: "var(--color-border)" }} className="mb-5" />
            <h2 className="font-display font-bold text-2xl mb-2">Your wishlist is empty</h2>
            <p className="mb-6" style={{ color: "var(--color-ink-muted)" }}>Save items you love to come back to them later</p>
            <Link href="/store" className="btn btn-primary btn-lg">Browse Products <ArrowRight size={18} /></Link>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
            {items.map(p => <ProductCard key={p.id} product={p} />)}
          </div>
        )}
      </div>
    </div>
  );
}
