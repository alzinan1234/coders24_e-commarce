"use client";
import Image from "next/image";
import Link from "next/link";
import { Trash2, Plus, Minus, ArrowRight, ShoppingBag, ArrowLeft } from "lucide-react";
import { useCartStore } from "@/store/cartStore";
import { formatPrice } from "@/lib/utils";
import toast from "react-hot-toast";

export default function CartPage() {
  const { items, removeItem, updateQuantity, total, clearCart } = useCartStore();
  const subtotal = total();
  const shipping = subtotal >= 150 ? 0 : 15;
  const tax = subtotal * 0.08;
  const grandTotal = subtotal + shipping + tax;

  if (items.length === 0) return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-6"
         style={{ paddingTop: "var(--nav-height)", background: "var(--color-surface)" }}>
      <ShoppingBag size={80} style={{ color: "var(--color-border)" }} />
      <h2 className="font-display font-bold text-3xl">Your cart is empty</h2>
      <p style={{ color: "var(--color-ink-muted)" }}>Discover our beautiful collection of Chinese crafts</p>
      <Link href="/store" className="btn btn-primary btn-lg">Start Shopping <ArrowRight size={18} /></Link>
    </div>
  );

  return (
    <div className="min-h-screen" style={{ paddingTop: "calc(var(--nav-height) + 2rem)", background: "var(--color-surface-alt)" }}>
      <div className="container-custom py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="font-display font-bold text-3xl">Shopping Cart</h1>
            <p className="text-sm mt-1" style={{ color: "var(--color-ink-muted)" }}>{items.reduce((s,i)=>s+i.quantity,0)} items</p>
          </div>
          <Link href="/store" className="btn btn-ghost btn-sm flex items-center gap-2">
            <ArrowLeft size={16} /> Continue Shopping
          </Link>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Items */}
          <div className="lg:col-span-2 space-y-4">
            {items.map(item => (
              <div key={item.product.id} className="card p-5 flex gap-5">
                <Link href={`/product/${item.product.id}`} className="relative w-24 h-28 rounded-xl overflow-hidden flex-shrink-0">
                  <Image src={item.product.images[0]} alt={item.product.name} fill className="object-cover" />
                </Link>
                <div className="flex-1 min-w-0">
                  <p className="font-chinese text-xs mb-0.5" style={{ color: "var(--color-primary)" }}>{item.product.nameZh}</p>
                  <Link href={`/product/${item.product.id}`} className="font-display font-semibold hover:text-primary transition-colors">{item.product.name}</Link>
                  {item.product.origin && <p className="text-xs mt-0.5" style={{ color: "var(--color-ink-faint)" }}>From {item.product.origin}</p>}
                  <div className="flex items-center justify-between mt-4 flex-wrap gap-3">
                    <div className="qty-input">
                      <button className="qty-btn" onClick={() => updateQuantity(item.product.id, item.quantity-1)}><Minus size={12} /></button>
                      <span className="qty-num">{item.quantity}</span>
                      <button className="qty-btn" onClick={() => updateQuantity(item.product.id, item.quantity+1)}><Plus size={12} /></button>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-lg price-sale">{formatPrice(item.product.price * item.quantity)}</p>
                      <p className="text-xs" style={{ color: "var(--color-ink-faint)" }}>{formatPrice(item.product.price)} each</p>
                    </div>
                    <button onClick={() => { removeItem(item.product.id); toast.success("Item removed"); }}
                            className="btn btn-ghost btn-icon hover:text-red-500 transition-colors">
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
            <button onClick={() => { clearCart(); toast.success("Cart cleared"); }}
                    className="text-sm" style={{ color: "var(--color-ink-muted)" }}>
              Clear cart
            </button>
          </div>

          {/* Summary */}
          <div>
            <div className="card p-6 sticky top-24">
              <h2 className="font-display font-bold text-xl mb-6">Order Summary</h2>
              <div className="space-y-3 text-sm mb-6">
                <div className="flex justify-between">
                  <span style={{ color: "var(--color-ink-muted)" }}>Subtotal</span>
                  <span>{formatPrice(subtotal)}</span>
                </div>
                <div className="flex justify-between">
                  <span style={{ color: "var(--color-ink-muted)" }}>Shipping</span>
                  <span className={shipping === 0 ? "text-green-600 font-medium" : ""}>{shipping === 0 ? "FREE" : formatPrice(shipping)}</span>
                </div>
                <div className="flex justify-between">
                  <span style={{ color: "var(--color-ink-muted)" }}>Tax (8%)</span>
                  <span>{formatPrice(tax)}</span>
                </div>
                <div className="divider-gold" />
                <div className="flex justify-between font-display font-bold text-xl">
                  <span>Total</span>
                  <span style={{ color: "var(--color-primary)" }}>{formatPrice(grandTotal)}</span>
                </div>
              </div>

              {/* Coupon */}
              <div className="flex gap-2 mb-6">
                <input placeholder="Coupon code" className="input flex-1 text-sm py-2" />
                <button className="btn btn-outline btn-sm">Apply</button>
              </div>

              <Link href="/checkout" className="btn btn-primary btn-lg w-full justify-center mb-3">
                Checkout <ArrowRight size={18} />
              </Link>
              <div className="text-center text-xs" style={{ color: "var(--color-ink-faint)" }}>
                🔒 Secured by SSL · 256-bit encryption
              </div>

              {/* Free shipping notice */}
              {subtotal < 150 && (
                <div className="mt-4 p-3 rounded-xl text-center" style={{ background: "rgba(200,16,46,0.06)", border: "1px solid rgba(200,16,46,0.15)" }}>
                  <p className="text-xs" style={{ color: "var(--color-primary)" }}>
                    Add <strong>{formatPrice(150 - subtotal)}</strong> more for free shipping!
                  </p>
                  <div className="progress-bar mt-2">
                    <div className="progress-fill" style={{ width: `${(subtotal/150)*100}%` }} />
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
