"use client";
import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { products, categories } from "@/lib/data";
import { Product } from "@/types";
import ProductCard from "@/components/product/ProductCard";
import { SlidersHorizontal, Grid3X3, LayoutList, X, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

const sortOptions = [
  { label: "Featured",    value: "featured" },
  { label: "Newest",      value: "newest" },
  { label: "Price: Low",  value: "price-asc" },
  { label: "Price: High", value: "price-desc" },
  { label: "Rating",      value: "rating" },
  { label: "Bestsellers", value: "bestsellers" },
];

function StoreContent() {
  const searchParams = useSearchParams();
  const initialCat = searchParams.get("category") || "all";
  const [category,   setCategory]   = useState(initialCat);
  const [sortBy,     setSortBy]     = useState("featured");
  const [priceMax,   setPriceMax]   = useState(1000);
  const [gridCols,   setGridCols]   = useState<3|4>(4);
  const [sidebarOpen,setSidebarOpen]= useState(false);
  const [filtered,   setFiltered]   = useState<Product[]>(products);

  useEffect(() => {
    let result = [...products];
    if (category !== "all") result = result.filter(p => p.category === category);
    result = result.filter(p => p.price <= priceMax);
    if (sortBy === "price-asc")    result.sort((a,b) => a.price - b.price);
    if (sortBy === "price-desc")   result.sort((a,b) => b.price - a.price);
    if (sortBy === "rating")       result.sort((a,b) => b.rating - a.rating);
    if (sortBy === "bestsellers")  result = result.filter(p => p.bestseller).concat(result.filter(p=>!p.bestseller));
    if (sortBy === "newest")       result = result.filter(p => p.newArrival).concat(result.filter(p=>!p.newArrival));
    setFiltered(result);
  }, [category, sortBy, priceMax]);

  useEffect(() => {
    const init = async () => {
      const AOS = (await import("aos")).default;
      await import("aos/dist/aos.css");
      AOS.init({ once: true, duration: 500 });
    };
    init();
  }, []);

  return (
    <div className="min-h-screen" style={{ paddingTop: "calc(var(--nav-height) + 2rem)", background: "var(--color-surface)" }}>
      <div className="container-custom">
        {/* Page header */}
        <div className="py-10 border-b mb-8" style={{ borderColor: "var(--color-border)" }}>
          <div className="breadcrumb mb-4">
            <a href="/">Home</a><span className="breadcrumb-sep">/</span>
            <span style={{ color: "var(--color-primary)" }}>Shop</span>
          </div>
          <div className="flex items-end justify-between flex-wrap gap-4">
            <div>
              <p className="section-subtitle">我们的产品</p>
              <h1 className="section-title">All Products</h1>
              <p className="mt-2 text-sm" style={{ color: "var(--color-ink-muted)" }}>
                {filtered.length} products found
              </p>
            </div>
            <div className="flex items-center gap-3">
              {/* Sort */}
              <div className="relative">
                <select value={sortBy} onChange={e => setSortBy(e.target.value)}
                        className="input py-2 pr-8 text-sm appearance-none cursor-pointer">
                  {sortOptions.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
                </select>
                <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" style={{ color: "var(--color-ink-muted)" }} />
              </div>
              {/* Grid toggle */}
              <div className="flex border rounded-lg overflow-hidden" style={{ borderColor: "var(--color-border)" }}>
                <button onClick={() => setGridCols(4)} className={cn("p-2 transition-colors", gridCols===4 ? "bg-primary text-white" : "hover:bg-gray-100")}
                        style={{ background: gridCols===4 ? "var(--color-primary)" : "" }}>
                  <Grid3X3 size={16} style={{ color: gridCols===4 ? "#fff" : "var(--color-ink-muted)" }} />
                </button>
                <button onClick={() => setGridCols(3)} className={cn("p-2 transition-colors", gridCols===3 ? "bg-primary text-white" : "hover:bg-gray-100")}
                        style={{ background: gridCols===3 ? "var(--color-primary)" : "" }}>
                  <LayoutList size={16} style={{ color: gridCols===3 ? "#fff" : "var(--color-ink-muted)" }} />
                </button>
              </div>
              {/* Filter toggle mobile */}
              <button onClick={() => setSidebarOpen(!sidebarOpen)}
                      className="btn btn-outline btn-sm flex items-center gap-2 lg:hidden">
                <SlidersHorizontal size={16} /> Filters
              </button>
            </div>
          </div>
        </div>

        <div className="flex gap-8">
          {/* Sidebar */}
          <aside className={cn(
            "w-72 shrink-0 transition-all duration-300",
            "fixed inset-y-0 left-0 z-50 bg-white p-6 overflow-y-auto lg:static lg:block lg:p-0 lg:bg-transparent",
            sidebarOpen ? "translate-x-0 shadow-2xl" : "-translate-x-full lg:translate-x-0"
          )}>
            <div className="flex items-center justify-between mb-6 lg:hidden">
              <h3 className="font-display font-bold text-lg">Filters</h3>
              <button onClick={() => setSidebarOpen(false)}><X size={20} /></button>
            </div>

            {/* Categories */}
            <div className="mb-8">
              <h4 className="font-semibold text-sm uppercase tracking-widest mb-4" style={{ color: "var(--color-ink-muted)" }}>Categories</h4>
              <div className="space-y-1">
                <button onClick={() => setCategory("all")}
                        className={cn("sidebar-link w-full text-left", category==="all" && "active")}>
                  All Products <span className="ml-auto text-xs">{products.length}</span>
                </button>
                {categories.map(cat => (
                  <button key={cat.id} onClick={() => setCategory(cat.slug)}
                          className={cn("sidebar-link w-full text-left", category===cat.slug && "active")}>
                    <span>{cat.icon}</span> {cat.name}
                    <span className="ml-auto text-xs">{cat.count}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Price range */}
            <div className="mb-8">
              <h4 className="font-semibold text-sm uppercase tracking-widest mb-4" style={{ color: "var(--color-ink-muted)" }}>Price Range</h4>
              <div className="space-y-3">
                <input type="range" min={0} max={1000} step={10} value={priceMax}
                       onChange={e => setPriceMax(Number(e.target.value))}
                       className="w-full accent-red-600" />
                <div className="flex justify-between text-sm" style={{ color: "var(--color-ink-muted)" }}>
                  <span>$0</span><span className="font-semibold" style={{ color: "var(--color-primary)" }}>${priceMax}</span>
                </div>
              </div>
            </div>

            {/* Product type */}
            <div className="mb-8">
              <h4 className="font-semibold text-sm uppercase tracking-widest mb-4" style={{ color: "var(--color-ink-muted)" }}>Type</h4>
              <div className="space-y-2">
                {[["New Arrivals","newArrival"],["Bestsellers","bestseller"],["On Sale","discount"],["Featured","featured"]].map(([label, key]) => (
                  <label key={key} className="flex items-center gap-3 cursor-pointer group">
                    <input type="checkbox" className="accent-red-600 w-4 h-4" />
                    <span className="text-sm group-hover:text-primary transition-colors" style={{ color: "var(--color-ink-muted)" }}>{label}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Reset */}
            <button onClick={() => { setCategory("all"); setSortBy("featured"); setPriceMax(1000); }}
                    className="btn btn-outline btn-sm w-full justify-center">
              Reset Filters
            </button>
          </aside>

          {/* Overlay for mobile sidebar */}
          {sidebarOpen && (
            <div className="fixed inset-0 bg-black/40 z-40 lg:hidden" onClick={() => setSidebarOpen(false)} />
          )}

          {/* Product grid */}
          <div className="flex-1">
            {filtered.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-20 text-center">
                <div className="text-6xl mb-4">🔍</div>
                <h3 className="font-display font-bold text-xl mb-2">No products found</h3>
                <p style={{ color: "var(--color-ink-muted)" }}>Try adjusting your filters</p>
              </div>
            ) : (
              <div className={cn(
                "grid gap-5",
                gridCols === 4 ? "grid-cols-2 sm:grid-cols-3 xl:grid-cols-4" : "grid-cols-2 sm:grid-cols-3"
              )}>
                {filtered.map((product, i) => (
                  <div key={product.id} data-aos="fade-up" data-aos-delay={Math.min(i * 40, 300)}>
                    <ProductCard product={product} />
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Bottom padding */}
        <div className="pb-16" />
      </div>
    </div>
  );
}

export default function StorePage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center"><div className="w-8 h-8 border-2 border-red-600 border-t-transparent rounded-full animate-spin" /></div>}>
      <StoreContent />
    </Suspense>
  );
}
