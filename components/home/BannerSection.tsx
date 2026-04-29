"use client";
import { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function BannerSection() {
  useEffect(() => {
    const init = async () => {
      const AOS = (await import("aos")).default;
      AOS.init({ once: true, duration: 800 });
    };
    init();
  }, []);

  return (
    <section className="py-24" style={{ background: "var(--color-surface)" }}>
      <div className="container-custom">
        <div className="grid md:grid-cols-2 gap-6">
          {/* Banner 1 — Tea */}
          <div data-aos="fade-right" className="relative overflow-hidden rounded-3xl h-80 group cursor-pointer">
            <Image src="https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=800" alt="Tea Collection"
                   fill className="object-cover transition-transform duration-700 group-hover:scale-110" />
            <div className="absolute inset-0" style={{ background: "linear-gradient(135deg, rgba(26,10,0,0.85) 0%, rgba(26,10,0,0.3) 100%)" }} />
            <div className="absolute inset-0 p-8 flex flex-col justify-end">
              <span className="badge badge-gold mb-3 w-fit">Spring Collection</span>
              <h3 className="font-display font-bold text-white text-2xl mb-1">Sacred Tea<br/>Ceremony</h3>
              <p className="font-chinese text-sm mb-4" style={{ color: "var(--color-gold)" }}>茶道 · 禅意生活</p>
              <Link href="/store?category=tea" className="btn btn-gold btn-sm w-fit">
                Shop Tea <ArrowRight size={14} />
              </Link>
            </div>
          </div>

          {/* Banner 2 — Silk */}
          <div data-aos="fade-left" className="relative overflow-hidden rounded-3xl h-80 group cursor-pointer">
            <Image src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800" alt="Silk Collection"
                   fill className="object-cover transition-transform duration-700 group-hover:scale-110" />
            <div className="absolute inset-0" style={{ background: "linear-gradient(135deg, rgba(139,10,30,0.85) 0%, rgba(139,10,30,0.2) 100%)" }} />
            <div className="absolute inset-0 p-8 flex flex-col justify-end">
              <span className="badge badge-primary mb-3 w-fit">Bestsellers</span>
              <h3 className="font-display font-bold text-white text-2xl mb-1">Imperial Silk<br/>Heritage</h3>
              <p className="font-chinese text-sm mb-4" style={{ color: "rgba(212,175,55,0.9)" }}>丝绸之路 · 皇家品质</p>
              <Link href="/store?category=silk" className="btn btn-primary btn-sm w-fit">
                Shop Silk <ArrowRight size={14} />
              </Link>
            </div>
          </div>
        </div>

        {/* Wide banner */}
        <div data-aos="fade-up" data-aos-delay="200"
             className="relative overflow-hidden rounded-3xl mt-6 h-52 group cursor-pointer">
          <Image src="https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=1400" alt="Festival Collection"
                 fill className="object-cover transition-transform duration-700 group-hover:scale-105" />
          <div className="absolute inset-0" style={{ background: "linear-gradient(90deg, rgba(26,10,0,0.9) 0%, rgba(26,10,0,0.4) 60%, transparent 100%)" }} />
          <div className="absolute inset-0 p-8 flex items-center">
            <div className="max-w-lg">
              <p className="font-chinese text-sm tracking-widest mb-2" style={{ color: "var(--color-gold)" }}>节庆限定 · FESTIVAL SPECIAL</p>
              <h3 className="font-display font-black text-white text-3xl">Up to 40% Off Festival Decor</h3>
              <Link href="/store?filter=sale" className="btn btn-gold mt-4">Shop Sale <ArrowRight size={16} /></Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
