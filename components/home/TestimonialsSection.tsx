"use client";
import { useEffect } from "react";
import Image from "next/image";
import { Star, Quote } from "lucide-react";
import { testimonials, stats } from "@/lib/data";

export default function TestimonialsSection() {
  useEffect(() => {
    const init = async () => {
      const AOS = (await import("aos")).default;
      AOS.init({ once: true, duration: 700 });
    };
    init();
  }, []);

  return (
    <>
      {/* Stats */}
      <section className="py-20" style={{ background: "var(--gradient-dragon)" }}>
        <div className="container-custom">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, i) => (
              <div key={stat.label} data-aos="fade-up" data-aos-delay={i*100} className="text-center">
                <div className="text-3xl mb-2" style={{ color: "var(--color-gold)" }}>{stat.icon}</div>
                <div className="font-display font-black text-4xl text-white mb-1">
                  {stat.value}<span style={{ color: "var(--color-gold)" }}>{stat.suffix}</span>
                </div>
                <div className="font-mono text-xs tracking-widest text-white/60 uppercase">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24" style={{ background: "var(--color-surface-alt)" }}>
        <div className="container-custom">
          <div className="text-center mb-14" data-aos="fade-up">
            <p className="section-subtitle">客户评价</p>
            <h2 className="section-title">What Our Customers Say</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <div key={t.id} data-aos="fade-up" data-aos-delay={i*120}
                   className="card p-7 relative">
                <Quote size={32} className="absolute top-5 right-5 opacity-10" style={{ color: "var(--color-primary)" }} />
                <div className="flex gap-0.5 mb-4">
                  {Array.from({length:5}).map((_,j)=>(
                    <Star key={j} size={14} fill="var(--color-gold)" style={{ color: "var(--color-gold)" }} />
                  ))}
                </div>
                <p className="text-sm leading-relaxed mb-6" style={{ color: "var(--color-ink-muted)" }}>&ldquo;{t.text}&rdquo;</p>
                <div className="divider-gold mb-4" />
                <div className="flex items-center gap-3">
                  <Image src={t.avatar} alt={t.name} width={44} height={44} className="rounded-full ring-2 ring-yellow-400" />
                  <div>
                    <p className="font-semibold text-sm">{t.name}</p>
                    <p className="text-xs" style={{ color: "var(--color-ink-muted)" }}>{t.location}</p>
                  </div>
                  <span className="ml-auto badge badge-outline text-xs">{t.product.split(" ").slice(0,2).join(" ")}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
