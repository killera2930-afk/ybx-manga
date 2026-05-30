"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { Clock, Play, X } from "lucide-react";
import { formatDistanceToNow } from "date-fns";

export function ContinueReading() {
  const [readingList, setReadingList] = useState<any[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem("ybx:reading-progress");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        // Sort by lastReadAt desc
        parsed.sort((a: any, b: any) => new Date(b.lastReadAt).getTime() - new Date(a.lastReadAt).getTime());
        setReadingList(parsed.slice(0, 4));
      } catch (e) {}
    }
  }, []);

  if (readingList.length === 0) return null;

  return (
    <section className="py-6 container mx-auto px-4">
      <div className="flex items-center gap-2 mb-4">
        <div className="w-5 h-5 rounded-full bg-primary flex items-center justify-center">
          <Clock size={12} className="text-primary-foreground" />
        </div>
        <h2 className="font-display font-bold text-lg text-foreground">Continue Reading</h2>
        <span className="text-xs text-muted-foreground ml-1">{readingList.length}</span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {readingList.map((item, idx) => (
          <Link 
            key={idx} 
            href={`/manga/${item.mangaId}/chapter/${item.chapterId}`}
            className="group relative flex gap-3 bg-card border border-border rounded-xl p-3 hover:border-primary/50 hover:shadow-lg hover:shadow-primary/5 transition-all"
          >
            {/* Cover */}
            <div className="relative w-16 h-[88px] shrink-0 rounded-lg overflow-hidden bg-muted">
              <img src={item.coverUrl} alt={item.mangaTitle} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <Play fill="white" className="text-white" size={24} />
              </div>
            </div>

            {/* Info */}
            <div className="flex flex-col justify-between flex-1 py-1 overflow-hidden">
              <div>
                <h3 className="font-display font-semibold text-sm line-clamp-1">{item.mangaTitle}</h3>
                <p className="text-xs text-muted-foreground mt-0.5">Chapter {item.chapterNumber}</p>
              </div>
              
              <div className="w-full">
                <div className="flex justify-between text-[10px] text-muted-foreground mb-1.5">
                  <span>{item.progress}% completed</span>
                  <span>{formatDistanceToNow(new Date(item.lastReadAt), { addSuffix: true })}</span>
                </div>
                <div className="w-full h-1.5 bg-secondary rounded-full overflow-hidden">
                  <div className="h-full bg-primary" style={{ width: `${item.progress}%` }} />
                </div>
              </div>
            </div>

            {/* Remove Button (Hover only) */}
            <button 
              className="absolute top-2 right-2 w-6 h-6 rounded-full bg-secondary/80 flex items-center justify-center text-muted-foreground opacity-0 group-hover:opacity-100 hover:bg-destructive hover:text-white transition-all"
              onClick={(e) => {
                e.preventDefault(); // prevent navigation
                // removal logic here
              }}
            >
              <X size={12} />
            </button>
          </Link>
        ))}
      </div>
    </section>
  );
}
