"use client";
import { X, ShoppingBag, Trash2, Plus, Minus, ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useCartStore } from "@/store/cartStore";
import { formatPrice } from "@/lib/utils";

export default function CartDrawer() {
  const { items, isOpen, closeCart, removeItem, updateQuantity, total, count } = useCartStore();

  return (
    <>
      {/* Backdrop */}
      {isOpen && (
        <div className="fixed inset-0 z-[90] bg-black/50 backdrop-blur-sm"
             onClick={closeCart} />
      )}

      {/* Drawer */}
      <div className={`fixed right-0 top-0 bottom-0 z-[100] w-full max-w-md flex flex-col transition-transform duration-300 ${isOpen ? "translate-x-0" : "translate-x-full"}`}
           style={{ background: "var(--color-surface)", boxShadow: "var(--shadow-xl)" }}>
        {/* Header */}
        <div className="flex items-center justify-between p-6"
             style={{ borderBottom: "1px solid var(--color-border)" }}>
          <div className="flex items-center gap-3">
            <ShoppingBag style={{ color: "var(--color-primary)" }} />
            <h2 className="font-display font-bold text-xl">Your Cart</h2>
            {count() > 0 && (
              <span className="badge badge-primary">{count()} items</span>
            )}
          </div>
          <button onClick={closeCart} className="btn btn-ghost btn-icon">
            <X size={20} />
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto py-4 px-6 space-y-4">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-64 text-center">
              <ShoppingBag size={56} style={{ color: "var(--color-border)" }} className="mb-4" />
              <p className="font-display text-lg font-semibold" style={{ color: "var(--color-ink)" }}>Your cart is empty</p>
              <p className="text-sm mt-1" style={{ color: "var(--color-ink-muted)" }}>Add some beautiful items to get started</p>
              <Link href="/store" onClick={closeCart} className="btn btn-primary btn-sm mt-6">
                Shop Now <ArrowRight size={16} />
              </Link>
            </div>
          ) : (
            items.map(item => (
              <div key={item.product.id} className="flex gap-4 p-3 rounded-xl"
                   style={{ border: "1px solid var(--color-border)" }}>
                <div className="relative w-20 h-24 rounded-lg overflow-hidden flex-shrink-0">
                  <Image src={item.product.images[0]} alt={item.product.name} fill className="object-cover" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-sm line-clamp-2 mb-1">{item.product.name}</p>
                  <p className="text-xs font-chinese mb-2" style={{ color: "var(--color-primary)" }}>{item.product.nameZh}</p>
                  <div className="flex items-center justify-between">
                    <div className="qty-input">
                      <button className="qty-btn" onClick={() => updateQuantity(item.product.id, item.quantity - 1)}>
                        <Minus size={12} />
                      </button>
                      <span className="qty-num">{item.quantity}</span>
                      <button className="qty-btn" onClick={() => updateQuantity(item.product.id, item.quantity + 1)}>
                        <Plus size={12} />
                      </button>
                    </div>
                    <span className="font-bold text-sm" style={{ color: "var(--color-primary)" }}>
                      {formatPrice(item.product.price * item.quantity)}
                    </span>
                  </div>
                </div>
                <button onClick={() => removeItem(item.product.id)} className="self-start p-1 rounded transition-colors hover:text-red-500">
                  <Trash2 size={16} style={{ color: "var(--color-ink-faint)" }} />
                </button>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="p-6 space-y-4" style={{ borderTop: "1px solid var(--color-border)" }}>
            <div className="flex justify-between text-sm" style={{ color: "var(--color-ink-muted)" }}>
              <span>Subtotal</span>
              <span>{formatPrice(total())}</span>
            </div>
            <div className="flex justify-between text-sm" style={{ color: "var(--color-ink-muted)" }}>
              <span>Shipping</span>
              <span className="text-green-600 font-medium">{total() >= 150 ? "FREE" : formatPrice(15)}</span>
            </div>
            <div className="divider-gold" />
            <div className="flex justify-between font-display font-bold text-xl">
              <span>Total</span>
              <span style={{ color: "var(--color-primary)" }}>{formatPrice(total() + (total() >= 150 ? 0 : 15))}</span>
            </div>
            {total() < 150 && (
              <p className="text-xs text-center" style={{ color: "var(--color-ink-muted)" }}>
                Add {formatPrice(150 - total())} more for free shipping!
              </p>
            )}
            <Link href="/checkout" onClick={closeCart} className="btn btn-primary w-full justify-center btn-lg">
              Checkout <ArrowRight size={18} />
            </Link>
            <Link href="/cart" onClick={closeCart} className="btn btn-outline w-full justify-center">
              View Full Cart
            </Link>
          </div>
        )}
      </div>
    </>
  );
}
