import Link from "next/link";

export function Footer() {
  return (
    <footer className="w-full border-t border-border/50 mb-16 lg:mb-0 mt-8">
      <div className="container mx-auto px-4 py-8 flex flex-col md:flex-row items-center justify-between gap-3">
        {/* Left: Logo */}
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-primary shadow-lg shadow-primary/20 flex items-center justify-center">
            <span className="font-display font-bold text-xs text-white">Y</span>
          </div>
          <span className="font-display font-bold text-base">YBX MANGA</span>
        </div>

        {/* Center: Links */}
        <div className="flex flex-wrap items-center justify-center gap-4 text-xs text-muted-foreground">
          <Link href="/" className="hover:text-primary transition-colors">Home</Link>
          <Link href="/manga" className="hover:text-primary transition-colors">All Manga</Link>
          <Link href="/genres" className="hover:text-primary transition-colors">Genres</Link>
          <Link href="/bookmark" className="hover:text-primary transition-colors">Bookmarks</Link>
        </div>

        {/* Right: Copyright */}
        <div className="text-xs text-muted-foreground">
          © 2025 YBX Manga · <span className="text-foreground font-medium">YBX TEAM</span>
        </div>
      </div>
    </footer>
  );
}
