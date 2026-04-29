"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, ChevronLeft, ChevronRight, Play } from "lucide-react";
import { heroSlides } from "@/lib/data";
import dynamic from "next/dynamic";

const DragonScene = dynamic(() => import("@/components/three/DragonScene"), { ssr: false });

export default function HeroSection() {
  const [current, setCurrent] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const goTo = (i: number) => setCurrent((i + heroSlides.length) % heroSlides.length);
  const prev = () => goTo(current - 1);
  const next = () => goTo(current + 1);

  useEffect(() => {
    if (!isPlaying) return;
    timerRef.current = setInterval(() => setCurrent(c => (c + 1) % heroSlides.length), 5000);
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [isPlaying, current]);

  const slide = heroSlides[current];

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden" style={{ paddingTop: "var(--nav-height)", background: "var(--gradient-hero)" }}>
      {/* Background image with overlay */}
      <div className="absolute inset-0 transition-opacity duration-1000">
        <Image src={slide.image} alt={slide.title} fill className="object-cover opacity-20" priority />
      </div>

      {/* Three.js dragon */}
      <div className="absolute right-0 top-0 bottom-0 w-1/2 pointer-events-none hidden lg:block">
        <DragonScene className="w-full h-full" />
      </div>

      {/* Chinese pattern overlay */}
      <div className="absolute inset-0 opacity-5 pointer-events-none"
           style={{ backgroundImage: "repeating-linear-gradient(45deg, var(--color-gold) 0, var(--color-gold) 1px, transparent 0, transparent 50%)", backgroundSize: "20px 20px" }} />

      {/* Lantern decorations */}
      <div className="absolute top-20 left-8 hidden xl:block">
        {[0,1].map(i => (
          <div key={i} className={`w-6 h-10 rounded-full border-2 mb-8 ${i===0?"ml-4":""}`}
               style={{ borderColor: "var(--color-gold)", background: "rgba(200,16,46,0.4)", animation: `lanternSway ${2.5+i*0.5}s ease-in-out infinite` }}>
            <div className="w-full h-full rounded-full opacity-60" style={{ background: "radial-gradient(circle, rgba(255,200,0,0.6), transparent)" }} />
          </div>
        ))}
      </div>

      {/* Content */}
      <div className="container-custom relative z-10 py-20">
        <div className="max-w-3xl">
          {/* Chinese subtitle */}
          <div className="flex items-center gap-3 mb-6 animate-fade-in">
            <div className="h-px w-12" style={{ background: "var(--color-gold)" }} />
            <span className="font-chinese text-sm tracking-widest" style={{ color: "var(--color-gold)" }}>
              {slide.titleZh}
            </span>
            <span className="badge" style={{ background: "rgba(200,16,46,0.9)", color: "#fff" }}>
              {slide.badge}
            </span>
          </div>

          {/* Main title */}
          <h1 className="font-display font-black text-white mb-6 leading-tight"
              style={{ fontSize: "clamp(2.5rem, 7vw, 5.5rem)", textShadow: "0 4px 40px rgba(0,0,0,0.5)" }}>
            {slide.title.split(" ").map((word, i) => (
              <span key={i} className={`block ${i > 0 ? "text-gradient-gold" : ""}`}>{word} </span>
            ))}
          </h1>

          <p className="text-xl mb-10 opacity-80 text-white max-w-lg">{slide.subtitle}</p>

          {/* CTAs */}
          <div className="flex flex-wrap gap-4">
            <Link href="/store" className="btn btn-xl" style={{ background: "var(--color-primary)", color: "#fff" }}>
              {slide.cta} <ArrowRight size={20} />
            </Link>
            <Link href="/#collections" className="btn btn-xl glass text-white" style={{ border: "1.5px solid rgba(212,175,55,0.5)" }}>
              View Collections
            </Link>
          </div>

          {/* Stats row */}
          <div className="flex flex-wrap gap-8 mt-14">
            {[["10K+","Products"],["50K+","Customers"],["85+","Countries"]].map(([v,l]) => (
              <div key={l} className="text-center">
                <div className="font-display font-black text-3xl text-gradient-gold">{v}</div>
                <div className="text-xs text-white/60 mt-1 tracking-widest uppercase font-mono">{l}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Slider controls */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex items-center gap-4 z-20">
        <button onClick={prev} className="w-10 h-10 rounded-full flex items-center justify-center glass text-white hover:bg-white/20 transition-all">
          <ChevronLeft size={20} />
        </button>
        <div className="flex gap-2">
          {heroSlides.map((_, i) => (
            <button key={i} onClick={() => goTo(i)}
                    className="h-1.5 rounded-full transition-all duration-300"
                    style={{ width: i === current ? "2rem" : "0.5rem", background: i === current ? "var(--color-gold)" : "rgba(255,255,255,0.4)" }} />
          ))}
        </div>
        <button onClick={next} className="w-10 h-10 rounded-full flex items-center justify-center glass text-white hover:bg-white/20 transition-all">
          <ChevronRight size={20} />
        </button>
        <button onClick={() => setIsPlaying(!isPlaying)} className="w-10 h-10 rounded-full flex items-center justify-center glass text-white hover:bg-white/20 transition-all">
          {isPlaying ? <span className="w-2 h-3 border-l-2 border-r-2 border-white" /> : <Play size={14} fill="white" />}
        </button>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-10 right-8 flex flex-col items-center gap-2 text-white/40 z-20 hidden lg:flex">
        <span className="font-mono text-xs tracking-widest rotate-90 mb-4">SCROLL</span>
        <div className="w-0.5 h-16 relative overflow-hidden" style={{ background: "rgba(255,255,255,0.2)" }}>
          <div className="absolute inset-x-0 top-0 h-8 animate-bounce" style={{ background: "var(--color-gold)" }} />
        </div>
      </div>
    </section>
  );
}
