"use client";
import { useRef } from "react";
import Link from "next/link";
import { Flame, ChevronLeft, ChevronRight, Star } from "lucide-react";

export function TrendingSlider() {
  const scrollRef = useRef<HTMLDivElement>(null);
  
  // Mock data for trending
  const trending = Array(10).fill(null).map((_, i) => ({
    id: `trend-${i}`,
    title: `Trending Manga ${i+1}`,
    cover: `https://via.placeholder.com/300x450/22223a/ff6b00?text=Trending+${i+1}`,
    status: "Ongoing",
    rating: 9.5 - (i * 0.1),
    chapter: 120 - i
  }));

  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -320, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 320, behavior: "smooth" });
    }
  };

  return (
    <section className="py-6 container mx-auto px-4 relative">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div className="w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center">
            <Flame size={14} className="text-primary" />
          </div>
          <h2 className="font-display font-bold text-lg text-foreground">Trending Now</h2>
        </div>
        
        <div className="hidden md:flex gap-2">
          <button onClick={scrollLeft} className="w-8 h-8 rounded-full border border-border flex items-center justify-center hover:bg-secondary transition-colors">
            <ChevronLeft size={16} />
          </button>
          <button onClick={scrollRight} className="w-8 h-8 rounded-full border border-border flex items-center justify-center hover:bg-secondary transition-colors">
            <ChevronRight size={16} />
          </button>
        </div>
      </div>

      <div 
        ref={scrollRef}
        className="flex gap-4 overflow-x-auto scrollbar-hide snap-x snap-mandatory scroll-smooth pb-4"
      >
        {trending.map((manga, idx) => (
          <Link key={manga.id} href={`/manga/${manga.id}`} className="snap-start shrink-0 w-[160px] md:w-[180px] group relative block aspect-[2/3] rounded-xl overflow-hidden bg-muted manga-shadow hover-lift">
            <img src={manga.cover} alt={manga.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
            <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
            
            {/* Rank Overlay */}
            <div className={`absolute -left-2 -bottom-2 font-display font-black text-7xl z-10 opacity-90 ${idx < 3 ? 'text-gradient-gold' : 'text-border'}`}>
              {idx + 1}
            </div>

            <div className="absolute top-2 left-2 text-[10px] px-1.5 py-0.5 rounded-md backdrop-blur bg-black/40 border border-white/10 text-emerald-400">
              {manga.status}
            </div>
            
            <div className="absolute inset-x-0 bottom-0 p-3 z-20 pl-12">
              <h3 className="font-display font-semibold text-sm text-white line-clamp-2">{manga.title}</h3>
              <p className="text-[11px] text-white/70 mt-0.5">Chapter {manga.chapter}</p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
