"use client";
import Link from "next/link";
import { Home, BookOpen, Search, Tv, Bookmark } from "lucide-react";
import { usePathname } from "next/navigation";

export function MobileNav() {
  const pathname = usePathname();

  const items = [
    { label: "Home", href: "/", icon: Home },
    { label: "Manga", href: "/manga", icon: BookOpen },
    { label: "Search", href: "/search", icon: Search },
    { label: "Anime", href: "https://ybxanime.com", icon: Tv, external: true },
    { label: "Bookmark", href: "/bookmark", icon: Bookmark },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 lg:hidden flex items-end justify-center pb-3 px-4 pointer-events-none">
      <nav className="relative w-full h-[64px] pointer-events-auto rounded-[22px] px-2 flex items-center justify-between"
        style={{
          background: "linear-gradient(135deg, rgba(255,255,255,0.12) 0%, rgba(255,255,255,0.05) 50%, rgba(255,255,255,0.08) 100%)",
          backdropFilter: "blur(40px) saturate(180%)",
          border: "1px solid rgba(255,255,255,0.15)",
          boxShadow: "0 8px 32px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.1), inset 0 -1px 0 rgba(255,255,255,0.05)"
        }}
      >
        {/* Top Highlight Line */}
        <div className="absolute top-0 left-4 right-4 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent" />
        
        {items.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;
          const LinkComp = item.external ? "a" : Link;
          const linkProps = item.external ? { href: item.href, target: "_blank", rel: "noreferrer" } : { href: item.href };
          
          return (
            <LinkComp key={item.label} {...linkProps as any} className="relative w-full h-full flex flex-col items-center justify-center">
              {isActive && (
                <div className="absolute inset-1 rounded-2xl border border-white/12 shadow-[inset_0_1px_0_rgba(255,255,255,0.1)]"
                     style={{ background: "linear-gradient(to bottom, rgba(255,255,255,0.15), rgba(255,255,255,0.06))", backdropFilter: "blur(10px)" }} />
              )}
              <div className="relative z-10 flex flex-col items-center justify-center mt-1">
                <Icon size={22} strokeWidth={isActive ? 2.2 : 1.8} className={isActive ? "text-foreground" : "text-muted-foreground"} />
                {isActive && <span className="text-[10px] font-semibold mt-0.5 text-foreground">{item.label}</span>}
              </div>
            </LinkComp>
          );
        })}
      </nav>
    </div>
  );
}
