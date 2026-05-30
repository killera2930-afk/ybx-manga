"use client";
import Link from "next/link";
import { 
  Sword, Heart, Smile, Sparkles, Drama, Compass, 
  Skull, Rocket, Coffee, Search, Ghost, Flame, 
  GraduationCap, Globe, Brain 
} from "lucide-react";

export function GenreSlider() {
  const genresList = [
    { name: "Action", icon: Sword, color: "red", slug: "action" },
    { name: "Romance", icon: Heart, color: "pink", slug: "romance" },
    { name: "Comedy", icon: Smile, color: "yellow", slug: "comedy" },
    { name: "Fantasy", icon: Sparkles, color: "purple", slug: "fantasy" },
    { name: "Drama", icon: Drama, color: "blue", slug: "drama" },
    { name: "Adventure", icon: Compass, color: "emerald", slug: "adventure" },
    { name: "Horror", icon: Skull, color: "slate", slug: "horror" },
    { name: "Sci-Fi", icon: Rocket, color: "indigo", slug: "sci-fi" },
    { name: "Slice of Life", icon: Coffee, color: "amber", slug: "slice-of-life" },
    { name: "Mystery", icon: Search, color: "cyan", slug: "mystery" },
    { name: "Supernatural", icon: Ghost, color: "violet", slug: "supernatural" },
    { name: "Shounen", icon: Flame, color: "orange", slug: "shounen" },
    { name: "School", icon: GraduationCap, color: "sky", slug: "school" },
    { name: "Isekai", icon: Globe, color: "lime", slug: "isekai" },
    { name: "Psychological", icon: Brain, color: "fuchsia", slug: "psychological" }
  ];

  return (
    <section className="py-4">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-display font-bold text-lg text-foreground">Browse by Genre</h3>
          <Link href="/genres" className="text-sm text-primary hover:underline">
            View All
          </Link>
        </div>

        <div className="flex gap-3 overflow-x-auto scrollbar-hide snap-x snap-mandatory pb-2">
          {genresList.map((genre) => {
            const Icon = genre.icon;
            // Map color string to Tailwind arbitrary classes for dynamic gradient
            const colorClasses: Record<string, string> = {
              red: "from-red-500/20 to-red-600/5 border-red-500/20 text-red-400",
              pink: "from-pink-500/20 to-pink-600/5 border-pink-500/20 text-pink-400",
              yellow: "from-yellow-500/20 to-yellow-600/5 border-yellow-500/20 text-yellow-400",
              purple: "from-purple-500/20 to-purple-600/5 border-purple-500/20 text-purple-400",
              blue: "from-blue-500/20 to-blue-600/5 border-blue-500/20 text-blue-400",
              emerald: "from-emerald-500/20 to-emerald-600/5 border-emerald-500/20 text-emerald-400",
              slate: "from-slate-500/20 to-slate-600/5 border-slate-500/20 text-slate-400",
              indigo: "from-indigo-500/20 to-indigo-600/5 border-indigo-500/20 text-indigo-400",
              amber: "from-amber-500/20 to-amber-600/5 border-amber-500/20 text-amber-400",
              cyan: "from-cyan-500/20 to-cyan-600/5 border-cyan-500/20 text-cyan-400",
              violet: "from-violet-500/20 to-violet-600/5 border-violet-500/20 text-violet-400",
              orange: "from-orange-500/20 to-orange-600/5 border-orange-500/20 text-orange-400",
              sky: "from-sky-500/20 to-sky-600/5 border-sky-500/20 text-sky-400",
              lime: "from-lime-500/20 to-lime-600/5 border-lime-500/20 text-lime-400",
              fuchsia: "from-fuchsia-500/20 to-fuchsia-600/5 border-fuchsia-500/20 text-fuchsia-400",
            };

            return (
              <Link 
                key={genre.name} 
                href={`/genres/${genre.slug}`}
                className={`snap-start shrink-0 w-[140px] h-[80px] rounded-xl border bg-gradient-to-br flex flex-col items-center justify-center gap-1 hover-lift ${colorClasses[genre.color]}`}
              >
                <Icon size={24} />
                <span className="text-xs font-medium">{genre.name}</span>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
