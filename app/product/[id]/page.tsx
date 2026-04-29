"use client";
import { useState } from "react";
import Image from "next/image";
import { notFound } from "next/navigation";
import { products } from "@/lib/data";
import { useCartStore } from "@/store/cartStore";
import { useWishlistStore } from "@/store/wishlistStore";
import { formatPrice } from "@/lib/utils";
import { Heart, ShoppingBag, Share2, Star, Shield, Truck, RotateCcw, ChevronLeft, ChevronRight, Plus, Minus } from "lucide-react";
import ProductCard from "@/components/product/ProductCard";
import toast from "react-hot-toast";

export default function ProductPage({ params }: { params: { id: string } }) {
  const product = products.find(p => p.id === params.id);
  if (!product) notFound();

  const [selectedImg, setSelectedImg] = useState(0);
  const [qty, setQty] = useState(1);
  const [tab, setTab] = useState<"desc"|"details"|"reviews">("desc");

  const addItem = useCartStore(s => s.addItem);
  const { toggle, has } = useWishlistStore();
  const inWishlist = has(product.id);

  const related = products.filter(p => p.category === product.category && p.id !== product.id).slice(0, 4);

  const handleAddToCart = () => {
    addItem(product, qty);
    toast.success(`✦ Added ${qty} × ${product.name} to cart`);
  };

  return (
    <div className="min-h-screen" style={{ paddingTop: "calc(var(--nav-height) + 1rem)", background: "var(--color-surface)" }}>
      <div className="container-custom py-10">
        {/* Breadcrumb */}
        <div className="breadcrumb mb-8">
          <a href="/">Home</a><span className="breadcrumb-sep">/</span>
          <a href="/store">Shop</a><span className="breadcrumb-sep">/</span>
          <span style={{ color: "var(--color-primary)" }}>{product.name}</span>
        </div>

        {/* Main layout */}
        <div className="grid lg:grid-cols-2 gap-12 mb-20">
          {/* Images */}
          <div>
            <div className="relative h-96 lg:h-[520px] rounded-3xl overflow-hidden mb-4"
                 style={{ background: "var(--color-surface-alt)" }}>
              <Image src={product.images[selectedImg]} alt={product.name} fill className="object-cover" />
              {/* Badges */}
              <div className="absolute top-4 left-4 flex gap-2">
                {product.newArrival && <span className="badge badge-primary">New</span>}
                {product.discount   && <span className="badge badge-danger">-{product.discount}%</span>}
              </div>
              {/* Nav arrows */}
              {product.images.length > 1 && (
                <>
                  <button onClick={() => setSelectedImg(i => (i - 1 + product.images.length) % product.images.length)}
                          className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/90 flex items-center justify-center shadow-md hover:bg-white transition-all">
                    <ChevronLeft size={18} />
                  </button>
                  <button onClick={() => setSelectedImg(i => (i + 1) % product.images.length)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/90 flex items-center justify-center shadow-md hover:bg-white transition-all">
                    <ChevronRight size={18} />
                  </button>
                </>
              )}
            </div>
            {/* Thumbnails */}
            <div className="flex gap-3">
              {product.images.map((img, i) => (
                <button key={i} onClick={() => setSelectedImg(i)}
                        className="relative w-20 h-20 rounded-xl overflow-hidden flex-shrink-0 transition-all"
                        style={{ border: `2px solid ${i === selectedImg ? "var(--color-primary)" : "var(--color-border)"}` }}>
                  <Image src={img} alt="" fill className="object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* Info */}
          <div>
            <p className="font-chinese text-base mb-1" style={{ color: "var(--color-primary)" }}>{product.nameZh}</p>
            <h1 className="font-display font-bold text-3xl lg:text-4xl mb-4" style={{ color: "var(--color-ink)" }}>{product.name}</h1>

            {/* Rating */}
            <div className="flex items-center gap-3 mb-6">
              <div className="flex">
                {Array.from({length:5}).map((_,i)=>(
                  <Star key={i} size={18} fill={i < Math.floor(product.rating) ? "var(--color-gold)" : "none"} style={{ color: "var(--color-gold)" }} />
                ))}
              </div>
              <span className="font-semibold">{product.rating}</span>
              <span className="text-sm" style={{ color: "var(--color-ink-muted)" }}>({product.reviews} reviews)</span>
              {product.bestseller && <span className="badge badge-gold">Bestseller</span>}
            </div>

            {/* Price */}
            <div className="flex items-baseline gap-4 mb-8 p-4 rounded-2xl" style={{ background: "var(--color-surface-alt)" }}>
              <span className="font-display font-black text-4xl price-sale">{formatPrice(product.price)}</span>
              {product.originalPrice && (
                <span className="price-original text-lg">{formatPrice(product.originalPrice)}</span>
              )}
              {product.discount && (
                <span className="badge badge-danger ml-auto">{product.discount}% OFF</span>
              )}
            </div>

            <p className="text-base leading-relaxed mb-8" style={{ color: "var(--color-ink-muted)" }}>{product.description}</p>

            {/* Origin / Material */}
            {(product.origin || product.material) && (
              <div className="grid grid-cols-2 gap-4 mb-8">
                {product.origin && (
                  <div className="p-3 rounded-xl" style={{ background: "var(--color-surface-alt)", border: "1px solid var(--color-border)" }}>
                    <p className="text-xs font-mono uppercase tracking-widest mb-1" style={{ color: "var(--color-ink-faint)" }}>Origin</p>
                    <p className="font-semibold text-sm">{product.origin}</p>
                  </div>
                )}
                {product.material && (
                  <div className="p-3 rounded-xl" style={{ background: "var(--color-surface-alt)", border: "1px solid var(--color-border)" }}>
                    <p className="text-xs font-mono uppercase tracking-widest mb-1" style={{ color: "var(--color-ink-faint)" }}>Material</p>
                    <p className="font-semibold text-sm">{product.material}</p>
                  </div>
                )}
              </div>
            )}

            {/* Stock */}
            <div className="flex items-center gap-2 mb-6">
              <div className="w-2 h-2 rounded-full" style={{ background: product.stock > 0 ? "#10b981" : "#ef4444" }} />
              <span className="text-sm font-medium">
                {product.stock > 0 ? `In Stock (${product.stock} left)` : "Out of Stock"}
              </span>
            </div>

            {/* Qty + CTA */}
            <div className="flex items-center gap-4 mb-6">
              <div className="qty-input">
                <button className="qty-btn" onClick={() => setQty(q => Math.max(1, q-1))}><Minus size={14} /></button>
                <span className="qty-num">{qty}</span>
                <button className="qty-btn" onClick={() => setQty(q => Math.min(product.stock, q+1))}><Plus size={14} /></button>
              </div>
              <button onClick={handleAddToCart} disabled={product.stock === 0}
                      className="btn btn-primary btn-lg flex-1 justify-center">
                <ShoppingBag size={20} /> Add to Cart
              </button>
              <button onClick={() => { toggle(product); toast.success(inWishlist ? "Removed" : "♡ Saved"); }}
                      className="btn btn-outline btn-icon w-12 h-12">
                <Heart size={20} fill={inWishlist ? "var(--color-primary)" : "none"} style={{ color: "var(--color-primary)" }} />
              </button>
              <button className="btn btn-ghost btn-icon w-12 h-12">
                <Share2 size={20} />
              </button>
            </div>

            {/* Trust badges */}
            <div className="grid grid-cols-3 gap-3 pt-6" style={{ borderTop: "1px solid var(--color-border)" }}>
              {[
                { icon: Truck,     label: "Free Shipping", sub: "Orders over $150" },
                { icon: Shield,    label: "Authentic",      sub: "Certified goods" },
                { icon: RotateCcw, label: "30-Day Returns", sub: "Hassle-free" },
              ].map(({ icon: Icon, label, sub }) => (
                <div key={label} className="flex flex-col items-center text-center gap-1">
                  <Icon size={20} style={{ color: "var(--color-primary)" }} />
                  <p className="font-semibold text-xs">{label}</p>
                  <p className="text-xs" style={{ color: "var(--color-ink-faint)" }}>{sub}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="mb-16">
          <div className="flex gap-1 border-b mb-8" style={{ borderColor: "var(--color-border)" }}>
            {(["desc","details","reviews"] as const).map(t => (
              <button key={t} onClick={() => setTab(t)}
                      className="px-6 py-3 text-sm font-semibold transition-all capitalize relative"
                      style={{ color: tab === t ? "var(--color-primary)" : "var(--color-ink-muted)" }}>
                {t === "desc" ? "Description" : t === "details" ? "Details" : `Reviews (${product.reviews})`}
                {tab === t && <div className="absolute bottom-0 left-0 right-0 h-0.5" style={{ background: "var(--color-primary)" }} />}
              </button>
            ))}
          </div>
          {tab === "desc" && (
            <div className="max-w-2xl">
              <p className="leading-relaxed" style={{ color: "var(--color-ink-muted)" }}>{product.description}</p>
              <p className="mt-4 leading-relaxed" style={{ color: "var(--color-ink-muted)" }}>
                Each piece is carefully selected and quality-inspected before shipping. We work directly with artisans from the heartland of Chinese craftsmanship to bring you authentic, high-quality goods.
              </p>
            </div>
          )}
          {tab === "details" && (
            <table className="data-table max-w-lg">
              <tbody>
                {[
                  ["Category",  product.category],
                  ["Origin",    product.origin || "—"],
                  ["Material",  product.material || "—"],
                  ["Weight",    product.weight || "—"],
                  ["Stock",     `${product.stock} units`],
                  ["Rating",    `${product.rating}/5.0`],
                  ["Reviews",   product.reviews.toString()],
                ].map(([k,v]) => (
                  <tr key={k}>
                    <td className="font-semibold w-36" style={{ color: "var(--color-ink)" }}>{k}</td>
                    <td style={{ color: "var(--color-ink-muted)" }}>{v}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
          {tab === "reviews" && (
            <div className="max-w-2xl space-y-4">
              {[
                { name:"Sarah L.", rating:5, comment:"Absolutely beautiful! Exceeded my expectations.", date:"2024-05-12" },
                { name:"James T.", rating:5, comment:"Fast shipping and authentic quality. Will order again!", date:"2024-04-28" },
                { name:"Mei W.",   rating:4, comment:"Lovely item, carefully packaged. Slightly smaller than expected.", date:"2024-04-10" },
              ].map((r, i) => (
                <div key={i} className="p-5 rounded-2xl" style={{ background: "var(--color-surface-alt)", border: "1px solid var(--color-border)" }}>
                  <div className="flex items-center justify-between mb-2">
                    <p className="font-semibold">{r.name}</p>
                    <p className="text-xs" style={{ color: "var(--color-ink-faint)" }}>{r.date}</p>
                  </div>
                  <div className="flex mb-2">
                    {Array.from({length:5}).map((_,j)=>(
                      <Star key={j} size={14} fill={j<r.rating?"var(--color-gold)":"none"} style={{ color:"var(--color-gold)" }} />
                    ))}
                  </div>
                  <p className="text-sm" style={{ color: "var(--color-ink-muted)" }}>{r.comment}</p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Related */}
        {related.length > 0 && (
          <div>
            <h2 className="section-title mb-8">You May Also Like</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
              {related.map(p => <ProductCard key={p.id} product={p} />)}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
