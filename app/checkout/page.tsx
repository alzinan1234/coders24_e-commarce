"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowRight, CreditCard, Truck, CheckCircle, Shield } from "lucide-react";
import { useCartStore } from "@/store/cartStore";
import { formatPrice } from "@/lib/utils";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

const steps = ["Shipping", "Payment", "Review"];

export default function CheckoutPage() {
  const [step, setStep] = useState(0);
  const [placing, setPlacing] = useState(false);
  const [placed, setPlaced] = useState(false);
  const { items, total, clearCart } = useCartStore();
  const router = useRouter();

  const [form, setForm] = useState({
    firstName:"", lastName:"", email:"", phone:"",
    address:"", city:"", state:"", zip:"", country:"US",
    cardName:"", cardNumber:"", expiry:"", cvv:"",
    sameAsBilling: true,
  });

  const set = (k: string, v: string | boolean) => setForm(f => ({ ...f, [k]: v }));
  const subtotal = total();
  const shipping = subtotal >= 150 ? 0 : 15;
  const grandTotal = subtotal + shipping + subtotal * 0.08;

  const placeOrder = async () => {
    setPlacing(true);
    await new Promise(r => setTimeout(r, 2000));
    setPlacing(false);
    setPlaced(true);
    clearCart();
  };

  if (placed) return (
    <div className="min-h-screen flex items-center justify-center" style={{ paddingTop: "var(--nav-height)", background: "var(--color-surface)" }}>
      <div className="text-center max-w-md p-8">
        <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6"
             style={{ background: "rgba(16,185,129,0.1)" }}>
          <CheckCircle size={48} className="text-green-500" />
        </div>
        <h2 className="font-display font-bold text-3xl mb-3">Order Placed!</h2>
        <p className="mb-2" style={{ color: "var(--color-ink-muted)" }}>Thank you for your purchase.</p>
        <p className="font-mono text-sm font-bold mb-8" style={{ color: "var(--color-primary)" }}>
          Order #DM{Math.floor(Math.random()*900000+100000)}
        </p>
        <div className="flex gap-4 justify-center">
          <Link href="/" className="btn btn-outline">Back to Home</Link>
          <Link href="/dashboard" className="btn btn-primary">View Orders <ArrowRight size={16} /></Link>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen" style={{ paddingTop: "calc(var(--nav-height) + 1rem)", background: "var(--color-surface-alt)" }}>
      <div className="container-custom py-8">
        <div className="flex items-center gap-4 mb-8">
          <Link href="/cart" className="btn btn-ghost btn-sm flex items-center gap-2">
            <ArrowLeft size={16} /> Cart
          </Link>
          <div className="flex items-center gap-2 flex-1 max-w-sm mx-auto">
            {steps.map((s, i) => (
              <div key={s} className="flex items-center flex-1">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-all ${i <= step ? "text-white" : "border-2"}`}
                     style={{ background: i <= step ? "var(--color-primary)" : "transparent", borderColor: i < step ? "var(--color-primary)" : "var(--color-border)" }}>
                  {i < step ? "✓" : i + 1}
                </div>
                <div className="text-xs ml-1 font-medium hidden sm:block" style={{ color: i === step ? "var(--color-primary)" : "var(--color-ink-faint)" }}>{s}</div>
                {i < steps.length - 1 && <div className="flex-1 h-0.5 mx-2" style={{ background: i < step ? "var(--color-primary)" : "var(--color-border)" }} />}
              </div>
            ))}
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Form */}
          <div className="lg:col-span-2">
            {step === 0 && (
              <div className="card p-6">
                <h2 className="font-display font-bold text-xl mb-6 flex items-center gap-2"><Truck size={20} style={{ color: "var(--color-primary)" }} /> Shipping Information</h2>
                <div className="grid sm:grid-cols-2 gap-4">
                  {[["First Name","firstName"],["Last Name","lastName"],["Email","email"],["Phone","phone"]].map(([label,key])=>(
                    <div key={key}>
                      <label className="block text-sm font-medium mb-1.5">{label} *</label>
                      <input className="input" placeholder={label} value={(form as any)[key]} onChange={e=>set(key,e.target.value)} required />
                    </div>
                  ))}
                  <div className="sm:col-span-2">
                    <label className="block text-sm font-medium mb-1.5">Street Address *</label>
                    <input className="input" placeholder="123 Main Street" value={form.address} onChange={e=>set("address",e.target.value)} />
                  </div>
                  {[["City","city"],["State/Province","state"],["ZIP Code","zip"]].map(([label,key])=>(
                    <div key={key}>
                      <label className="block text-sm font-medium mb-1.5">{label} *</label>
                      <input className="input" placeholder={label} value={(form as any)[key]} onChange={e=>set(key,e.target.value)} />
                    </div>
                  ))}
                  <div>
                    <label className="block text-sm font-medium mb-1.5">Country *</label>
                    <select className="input" value={form.country} onChange={e=>set("country",e.target.value)}>
                      <option value="US">United States</option>
                      <option value="GB">United Kingdom</option>
                      <option value="CA">Canada</option>
                      <option value="AU">Australia</option>
                      <option value="CN">China</option>
                    </select>
                  </div>
                </div>
                <button onClick={() => setStep(1)} className="btn btn-primary btn-lg mt-6 flex items-center gap-2">
                  Continue to Payment <ArrowRight size={18} />
                </button>
              </div>
            )}

            {step === 1 && (
              <div className="card p-6">
                <h2 className="font-display font-bold text-xl mb-6 flex items-center gap-2"><CreditCard size={20} style={{ color: "var(--color-primary)" }} /> Payment Details</h2>
                <div className="flex gap-3 mb-6">
                  {["VISA","MC","AMEX","PayPal"].map(m=>(
                    <div key={m} className="px-3 py-1.5 rounded-lg border text-xs font-bold" style={{ borderColor: "var(--color-border)", color: "var(--color-ink-muted)" }}>{m}</div>
                  ))}
                </div>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-1.5">Name on Card *</label>
                    <input className="input" placeholder="John Doe" value={form.cardName} onChange={e=>set("cardName",e.target.value)} />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1.5">Card Number *</label>
                    <input className="input" placeholder="1234 5678 9012 3456" maxLength={19} value={form.cardNumber}
                           onChange={e=>set("cardNumber",e.target.value.replace(/\D/g,"").replace(/(.{4})/g,"$1 ").trim())} />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-1.5">Expiry *</label>
                      <input className="input" placeholder="MM/YY" value={form.expiry} onChange={e=>set("expiry",e.target.value)} />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1.5">CVV *</label>
                      <input className="input" placeholder="123" maxLength={4} value={form.cvv} onChange={e=>set("cvv",e.target.value)} />
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2 mt-4 text-sm" style={{ color: "var(--color-ink-muted)" }}>
                  <Shield size={16} style={{ color: "var(--color-primary)" }} /> Your payment info is secured with 256-bit SSL
                </div>
                <div className="flex gap-3 mt-6">
                  <button onClick={() => setStep(0)} className="btn btn-outline">Back</button>
                  <button onClick={() => setStep(2)} className="btn btn-primary btn-lg flex items-center gap-2">
                    Review Order <ArrowRight size={18} />
                  </button>
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="card p-6">
                <h2 className="font-display font-bold text-xl mb-6">Review Your Order</h2>
                <div className="space-y-4 mb-6">
                  {items.map(item => (
                    <div key={item.product.id} className="flex gap-4 items-center">
                      <div className="relative w-16 h-16 rounded-lg overflow-hidden">
                        <Image src={item.product.images[0]} alt={item.product.name} fill className="object-cover" />
                      </div>
                      <div className="flex-1">
                        <p className="font-semibold text-sm">{item.product.name}</p>
                        <p className="text-xs" style={{ color: "var(--color-ink-muted)" }}>Qty: {item.quantity}</p>
                      </div>
                      <p className="font-bold" style={{ color: "var(--color-primary)" }}>{formatPrice(item.product.price * item.quantity)}</p>
                    </div>
                  ))}
                </div>
                <div className="p-4 rounded-xl mb-6 text-sm space-y-1" style={{ background: "var(--color-surface-alt)" }}>
                  <p><strong>Ship to:</strong> {form.firstName} {form.lastName}, {form.address}, {form.city}</p>
                  <p><strong>Email:</strong> {form.email || "—"}</p>
                </div>
                <div className="flex gap-3">
                  <button onClick={() => setStep(1)} className="btn btn-outline">Back</button>
                  <button onClick={placeOrder} disabled={placing} className="btn btn-primary btn-lg flex items-center gap-2 flex-1 justify-center">
                    {placing ? <><div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" /> Placing Order…</> : <>Place Order · {formatPrice(grandTotal)} <ArrowRight size={18} /></>}
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Summary */}
          <div>
            <div className="card p-5 sticky top-24">
              <h3 className="font-semibold mb-4">Order Summary ({items.reduce((s,i)=>s+i.quantity,0)} items)</h3>
              <div className="space-y-3 text-sm mb-4">
                {items.map(item => (
                  <div key={item.product.id} className="flex justify-between">
                    <span className="truncate mr-2" style={{ color: "var(--color-ink-muted)" }}>{item.product.name} ×{item.quantity}</span>
                    <span className="shrink-0">{formatPrice(item.product.price * item.quantity)}</span>
                  </div>
                ))}
                <div className="divider-gold" />
                <div className="flex justify-between"><span style={{ color: "var(--color-ink-muted)" }}>Shipping</span><span className={shipping===0?"text-green-600":""}>{shipping===0?"FREE":formatPrice(shipping)}</span></div>
                <div className="flex justify-between"><span style={{ color: "var(--color-ink-muted)" }}>Tax</span><span>{formatPrice(subtotal*0.08)}</span></div>
                <div className="flex justify-between font-bold text-lg"><span>Total</span><span style={{ color: "var(--color-primary)" }}>{formatPrice(grandTotal)}</span></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
