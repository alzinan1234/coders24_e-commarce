"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { ShoppingBag, Heart, Search, Menu, X, User, ChevronDown } from "lucide-react";
import { useCartStore } from "@/store/cartStore";
import { useWishlistStore } from "@/store/wishlistStore";
import { cn } from "@/lib/utils";

const navLinks = [
  { label: "Home",       href: "/" },
  { label: "Shop",       href: "/store", hasDropdown: true,
    children: [
      { label: "All Products",  href: "/store" },
      { label: "Silk & Fabric", href: "/store?category=silk" },
      { label: "Tea & Herbs",   href: "/store?category=tea" },
      { label: "Ceramics",      href: "/store?category=ceramics" },
      { label: "Jade & Jewelry",href: "/store?category=jewelry" },
      { label: "Art & Decor",   href: "/store?category=art" },
    ]
  },
  { label: "Collections", href: "/store?filter=featured" },
  { label: "About",       href: "/#about" },
];

export default function Navbar() {
  const [scrolled,   setScrolled]   = useState(false);
  const [menuOpen,   setMenuOpen]   = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [query,      setQuery]      = useState("");
  const { count, toggleCart } = useCartStore();
  const wishlist = useWishlistStore(s => s.items);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      {/* Top bar */}
      <div style={{ background: "var(--color-ink)", color: "rgba(212,175,55,0.9)" }}
           className="text-xs text-center py-2 font-mono tracking-widest hidden md:block">
        FREE SHIPPING ON ORDERS OVER $150 &nbsp;·&nbsp; 龙腾四海 · AUTHENTIC CRAFTSMANSHIP
      </div>

      {/* Main navbar */}
      <nav className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        scrolled ? "bg-white/95 backdrop-blur-xl shadow-md" : "bg-white",
        "md:top-8"
      )} style={{ borderBottom: "1px solid var(--color-border)" }}>
        <div className="container-custom flex items-center justify-between h-[var(--nav-height)]">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-full flex items-center justify-center text-white text-lg font-bold"
                 style={{ background: "var(--gradient-dragon)" }}>
              龍
            </div>
            <div>
              <div className="font-display font-bold text-xl leading-none"
                   style={{ color: "var(--color-ink)" }}>Dragon</div>
              <div className="font-mono text-xs tracking-[0.2em] uppercase"
                   style={{ color: "var(--color-primary)" }}>Market</div>
            </div>
          </Link>

          {/* Desktop nav */}
          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map(link => (
              <div key={link.label} className="relative group">
                <Link href={link.href}
                      className="flex items-center gap-1 px-4 py-2 text-sm font-medium rounded-lg transition-all"
                      style={{ color: "var(--color-ink)" }}
                      onMouseEnter={e => (e.currentTarget.style.color = "var(--color-primary)")}
                      onMouseLeave={e => (e.currentTarget.style.color = "var(--color-ink)")}>
                  {link.label}
                  {link.hasDropdown && <ChevronDown size={14} />}
                </Link>
                {link.hasDropdown && link.children && (
                  <div className="absolute top-full left-0 w-52 bg-white rounded-xl shadow-xl border opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 overflow-hidden z-50"
                       style={{ borderColor: "var(--color-border)" }}>
                    {link.children.map(child => (
                      <Link key={child.label} href={child.href}
                            className="block px-4 py-2.5 text-sm transition-colors hover:bg-red-50"
                            style={{ color: "var(--color-ink-muted)" }}
                            onMouseEnter={e => (e.currentTarget.style.color = "var(--color-primary)")}
                            onMouseLeave={e => (e.currentTarget.style.color = "var(--color-ink-muted)")}>
                        {child.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2">
            <button onClick={() => setSearchOpen(true)} className="btn btn-ghost btn-icon hidden md:flex">
              <Search size={20} />
            </button>
            <Link href="/wishlist" className="btn btn-ghost btn-icon hidden md:flex relative">
              <Heart size={20} />
              {wishlist.length > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full text-white text-xs flex items-center justify-center"
                      style={{ background: "var(--color-primary)", fontSize: "10px" }}>
                  {wishlist.length}
                </span>
              )}
            </Link>
            <Link href="/dashboard" className="btn btn-ghost btn-icon hidden md:flex">
              <User size={20} />
            </Link>
            <button onClick={toggleCart} className="btn btn-primary btn-icon relative ml-1">
              <ShoppingBag size={18} />
              {count() > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold"
                      style={{ background: "var(--color-gold)", color: "var(--color-ink)" }}>
                  {count()}
                </span>
              )}
            </button>
            <button onClick={() => setMenuOpen(!menuOpen)} className="btn btn-ghost btn-icon lg:hidden">
              {menuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <div className="lg:hidden border-t py-4 px-6 space-y-1"
               style={{ borderColor: "var(--color-border)", background: "var(--color-surface)" }}>
            {navLinks.map(link => (
              <Link key={link.label} href={link.href}
                    onClick={() => setMenuOpen(false)}
                    className="block py-3 text-sm font-medium border-b"
                    style={{ color: "var(--color-ink)", borderColor: "var(--color-border)" }}>
                {link.label}
              </Link>
            ))}
            <div className="flex gap-4 pt-3">
              <Link href="/wishlist" onClick={() => setMenuOpen(false)} className="flex items-center gap-2 text-sm" style={{ color: "var(--color-ink-muted)" }}>
                <Heart size={18} /> Wishlist
              </Link>
              <Link href="/dashboard" onClick={() => setMenuOpen(false)} className="flex items-center gap-2 text-sm" style={{ color: "var(--color-ink-muted)" }}>
                <User size={18} /> Account
              </Link>
            </div>
          </div>
        )}
      </nav>

      {/* Search overlay */}
      {searchOpen && (
        <div className="fixed inset-0 z-[100] flex items-start justify-center pt-32"
             style={{ background: "rgba(26,10,0,0.8)", backdropFilter: "blur(10px)" }}
             onClick={() => setSearchOpen(false)}>
          <div className="w-full max-w-2xl mx-4" onClick={e => e.stopPropagation()}>
            <div className="relative">
              <Search size={20} className="absolute left-4 top-1/2 -translate-y-1/2"
                      style={{ color: "var(--color-ink-muted)" }} />
              <input
                autoFocus
                value={query}
                onChange={e => setQuery(e.target.value)}
                onKeyDown={e => { if(e.key === "Escape") setSearchOpen(false); }}
                placeholder="Search for silk, tea, jade…"
                className="input pl-12 pr-12 py-4 text-lg rounded-2xl shadow-xl"
              />
              <button onClick={() => setSearchOpen(false)} className="absolute right-4 top-1/2 -translate-y-1/2">
                <X size={20} style={{ color: "var(--color-ink-muted)" }} />
              </button>
            </div>
            <p className="text-center text-sm mt-4" style={{ color: "rgba(255,255,255,0.5)" }}>
              Press ESC to close
            </p>
          </div>
        </div>
      )}
    </>
  );
}
