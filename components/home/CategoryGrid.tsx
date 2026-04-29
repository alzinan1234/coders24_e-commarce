"use client";
import Link from "next/link";
import Image from "next/image";
import { useEffect } from "react";
import { categories } from "@/lib/data";

export default function CategoryGrid() {
  useEffect(() => {
    const init = async () => {
      const AOS = (await import("aos")).default;
      await import("aos/dist/aos.css");
      AOS.init({ once: true, duration: 700, offset: 60 });
    };
    init();
  }, []);

  return (
    <section className="py-24" style={{ background: "var(--color-surface-alt)" }}>
      <div className="container-custom">
        <div className="text-center mb-14" data-aos="fade-up">
          <p className="section-subtitle">探索我们的精品</p>
          <h2 className="section-title">Shop by Category</h2>
          <p className="mt-3 text-base max-w-xl mx-auto" style={{ color: "var(--color-ink-muted)" }}>
            From imperial silk to aged pu-erh, discover handpicked treasures from China&apos;s finest artisans
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {categories.map((cat, i) => (
            <Link key={cat.id} href={`/store?category=${cat.slug}`}
                  data-aos="zoom-in-up" data-aos-delay={i * 80}
                  className="group relative overflow-hidden rounded-2xl cursor-pointer block">
              {/* Image */}
              <div className="relative h-40 lg:h-48 overflow-hidden">
                <Image src={cat.image} alt={cat.name} fill className="object-cover transition-transform duration-700 group-hover:scale-115" />
                <div className="absolute inset-0 transition-opacity duration-300"
                     style={{ background: "linear-gradient(to top, rgba(26,10,0,0.8) 0%, rgba(26,10,0,0.2) 60%, transparent 100%)" }} />
                {/* Hover overlay */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                     style={{ background: "rgba(200,16,46,0.4)" }} />
              </div>
              {/* Label */}
              <div className="absolute bottom-0 left-0 right-0 p-3 text-center">
                <div className="text-lg mb-0.5">{cat.icon}</div>
                <p className="font-display font-bold text-sm text-white">{cat.name}</p>
                <p className="font-chinese text-xs" style={{ color: "rgba(212,175,55,0.9)" }}>{cat.nameZh}</p>
                <p className="text-xs text-white/60 mt-0.5">{cat.count} items</p>
              </div>
              {/* Gold border on hover */}
              <div className="absolute inset-0 rounded-2xl border-2 border-transparent group-hover:border-yellow-400 transition-all duration-300 pointer-events-none" />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
