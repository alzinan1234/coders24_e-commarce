"use client";
import { useEffect, useState } from "react";
import { products } from "@/lib/data";
import ProductCard from "@/components/product/ProductCard";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

const tabs = ["All","Featured","Bestsellers","New Arrivals","On Sale"];

export default function FeaturedProducts() {
  const [activeTab, setActiveTab] = useState("All");

  useEffect(() => {
    const init = async () => {
      const AOS = (await import("aos")).default;
      AOS.init({ once: true, duration: 600, offset: 40 });
    };
    init();
  }, []);

  const filtered = products.filter(p => {
    if (activeTab === "Featured")    return p.featured;
    if (activeTab === "Bestsellers") return p.bestseller;
    if (activeTab === "New Arrivals")return p.newArrival;
    if (activeTab === "On Sale")     return p.discount;
    return true;
  }).slice(0, 8);

  return (
    <section className="py-24" style={{ background: "var(--color-surface)" }}>
      <div className="container-custom">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12" data-aos="fade-up">
          <div>
            <p className="section-subtitle">精选商品</p>
            <h2 className="section-title">Featured Products</h2>
          </div>
          <Link href="/store" className="btn btn-outline hidden md:flex items-center gap-2">
            View All <ArrowRight size={16} />
          </Link>
        </div>

        {/* Tabs */}
        <div className="flex flex-wrap gap-2 mb-10" data-aos="fade-up" data-aos-delay="100">
          {tabs.map(tab => (
            <button key={tab} onClick={() => setActiveTab(tab)}
                    className={`tag ${activeTab === tab ? "active" : ""}`}>
              {tab}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 lg:gap-6">
          {filtered.map((product, i) => (
            <div key={product.id} data-aos="fade-up" data-aos-delay={i * 60}>
              <ProductCard product={product} />
            </div>
          ))}
        </div>

        <div className="text-center mt-10">
          <Link href="/store" className="btn btn-primary btn-lg">
            Explore All Products <ArrowRight size={18} />
          </Link>
        </div>
      </div>
    </section>
  );
}
