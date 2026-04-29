"use client";
import Link from "next/link";
import { Mail, Phone, MapPin, Instagram, Facebook, Twitter, Youtube } from "lucide-react";

export default function Footer() {
  return (
    <footer style={{ background: "var(--color-secondary)", color: "rgba(255,248,240,0.85)" }}>
      {/* Divider */}
      <div style={{ height: "1px", background: "var(--gradient-gold)", opacity: 0.4 }} />

      <div className="container-custom py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-12 h-12 rounded-full flex items-center justify-center text-white text-xl font-bold"
                   style={{ background: "var(--gradient-dragon)" }}>
                龍
              </div>
              <div>
                <div className="font-display font-bold text-2xl text-white">Dragon Market</div>
                <div className="font-chinese text-xs tracking-widest" style={{ color: "var(--color-gold)" }}>
                  龙腾四海 · 品质之选
                </div>
              </div>
            </div>
            <p className="text-sm leading-relaxed mb-6 opacity-70 max-w-sm">
              Bringing the finest Chinese craftsmanship to the world since 2009. Each piece tells a story of tradition, artistry, and cultural heritage.
            </p>
            <div className="flex gap-3">
              {[Instagram, Facebook, Twitter, Youtube].map((Icon, i) => (
                <a key={i} href="#" className="w-9 h-9 rounded-full flex items-center justify-center transition-all hover:scale-110"
                   style={{ background: "rgba(212,175,55,0.15)", border: "1px solid rgba(212,175,55,0.2)" }}
                   onMouseEnter={e => (e.currentTarget.style.background = "var(--color-primary)")}
                   onMouseLeave={e => (e.currentTarget.style.background = "rgba(212,175,55,0.15)")}>
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          {/* Shop */}
          <div>
            <h4 className="font-display font-bold text-white mb-4 text-lg">Shop</h4>
            <ul className="space-y-2.5 text-sm opacity-70">
              {["All Products","Silk & Fabric","Tea & Herbs","Ceramics","Jade & Jewelry","Art & Calligraphy","Lanterns & Decor"].map(l => (
                <li key={l}><Link href="/store" className="hover:text-yellow-400 transition-colors">{l}</Link></li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-display font-bold text-white mb-4 text-lg">Company</h4>
            <ul className="space-y-2.5 text-sm opacity-70">
              {[["About Us","/#about"],["Our Artisans","/#artisans"],["Sustainability","/#"],["Press","/#"],["Careers","/#"],["Blog","/#"]].map(([l, h]) => (
                <li key={l}><Link href={h} className="hover:text-yellow-400 transition-colors">{l}</Link></li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-display font-bold text-white mb-4 text-lg">Contact</h4>
            <ul className="space-y-3 text-sm opacity-70">
              <li className="flex items-start gap-2"><MapPin size={16} className="mt-0.5 shrink-0" /> 88 Dragon Lane, Shanghai 200001, China</li>
              <li className="flex items-center gap-2"><Phone size={16} /> +86 21 1234 5678</li>
              <li className="flex items-center gap-2"><Mail size={16} /> hello@dragonmarket.com</li>
            </ul>
            <div className="mt-6">
              <div className="text-sm font-medium text-white mb-2">Subscribe to newsletter</div>
              <div className="flex">
                <input placeholder="Your email" className="input text-sm py-2 flex-1 rounded-r-none" style={{ background: "rgba(255,255,255,0.08)", border: "1px solid rgba(212,175,55,0.3)", color: "#fff" }} />
                <button className="px-4 py-2 text-sm font-semibold rounded-r-lg transition-all"
                        style={{ background: "var(--color-primary)", color: "#fff" }}>
                  Go
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom */}
      <div style={{ borderTop: "1px solid rgba(212,175,55,0.15)" }}>
        <div className="container-custom py-5 flex flex-col md:flex-row items-center justify-between gap-3">
          <p className="text-xs opacity-50">© 2024 Dragon Market. All rights reserved. 版权所有</p>
          <div className="flex gap-5 text-xs opacity-50">
            <Link href="#" className="hover:opacity-100 transition-opacity">Privacy Policy</Link>
            <Link href="#" className="hover:opacity-100 transition-opacity">Terms of Service</Link>
            <Link href="#" className="hover:opacity-100 transition-opacity">Cookie Policy</Link>
          </div>
          <div className="flex items-center gap-2 text-xs opacity-50">
            <span>Secured by</span>
            <span className="font-bold text-yellow-400">SSL</span>
            <span>· Payments via</span>
            <span className="font-mono font-bold" style={{ color: "var(--color-gold)" }}>STRIPE</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
