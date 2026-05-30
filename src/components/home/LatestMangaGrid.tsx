"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { Star } from "lucide-react";

export function LatestMangaGrid() {
  const [mangas, setMangas] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/manga?limit=12")
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          setMangas(data.data);
        }
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return <div className="text-center py-10 text-muted-foreground">Loading latest manga...</div>;
  }

  return (
    <section className="py-6 container mx-auto px-4">
      <div className="flex items-center justify-between mb-4">
        <h2 className="font-display font-bold text-lg text-foreground">Latest Manga</h2>
        <Link href="/manga" className="px-3 py-1.5 rounded-full border border-border text-foreground text-xs hover:bg-secondary transition-colors">
          All Manga
        </Link>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {mangas.map(manga => (
          <Link key={manga._id} href={`/manga/${manga.slug}`} className="group relative block aspect-[2/3] rounded-xl overflow-hidden bg-muted manga-shadow hover-lift">
            <img src={manga.cover || "/placeholder-cover.jpg"} alt={manga.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
            <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
            
            {/* Badges */}
            <div className="absolute top-2 left-2 text-[10px] px-1.5 py-0.5 rounded-md backdrop-blur bg-black/40 border border-white/10 text-emerald-400">
              {manga.status}
            </div>
            {manga.rating > 0 && (
              <div className="absolute top-2 right-2 text-[10px] px-1.5 py-0.5 rounded-md backdrop-blur bg-black/40 border border-white/10 text-gold flex items-center gap-1">
                <Star size={10} fill="currentColor" /> {manga.rating}
              </div>
            )}
            
            {/* Text */}
            <div className="absolute inset-x-0 bottom-0 p-3">
              <h3 className="font-display font-semibold text-sm text-white line-clamp-2">{manga.title}</h3>
              <p className="text-[11px] text-white/70 mt-0.5">
                {manga.chapters?.length ? `Chapter ${Math.max(...manga.chapters.map((c:any) => c.number))}` : "No chapters"}
              </p>
            </div>
          </Link>
        ))}
      </div>
      
      {mangas.length === 0 && (
        <div className="text-center py-10 text-muted-foreground border border-dashed border-border rounded-xl">
          No manga found. Add some from the admin panel!
        </div>
      )}
    </section>
  );
}
