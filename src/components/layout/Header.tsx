"use client";
import Link from "next/link";
import { Search, User, ChevronDown } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full bg-background/80 backdrop-blur-xl border-b border-border/50">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between gap-4">
        {/* Logo */}
        <Link href="/" className="group flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-primary shadow-lg shadow-primary/20 flex items-center justify-center group-hover:shadow-primary/40 transition-shadow">
            <span className="font-display font-bold text-sm text-white">Y</span>
          </div>
          <span className="font-display font-bold text-lg hidden sm:block">YBX MANGA</span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-0.5">
          <Link href="/" className="px-3 py-2 text-sm rounded-lg text-primary bg-primary/10 font-medium">Home</Link>
          <Link href="/manga" className="px-3 py-2 text-sm rounded-lg text-muted-foreground hover:text-foreground hover:bg-secondary">All Manga</Link>
          <Link href="/genres" className="px-3 py-2 text-sm rounded-lg text-muted-foreground hover:text-foreground hover:bg-secondary">Genres</Link>
          <a href="https://ybxanime.com" target="_blank" rel="noreferrer" className="px-3 py-2 text-sm rounded-lg text-muted-foreground hover:text-foreground hover:bg-secondary">Anime</a>
          <Link href="/bookmark" className="px-3 py-2 text-sm rounded-lg text-muted-foreground hover:text-foreground hover:bg-secondary">Bookmark</Link>
          
          <button className="px-3 py-2 text-sm rounded-lg text-muted-foreground hover:text-foreground hover:bg-secondary flex items-center gap-1">
            More <ChevronDown size={14} />
          </button>
        </nav>

        {/* Right Actions */}
        <div className="flex items-center gap-2">
          {/* Desktop Search */}
          <div className="hidden md:flex relative">
            <Input type="text" placeholder="Search manga..." className="w-56 h-9 bg-secondary/50 border-border/50 text-sm rounded-lg pr-9" />
            <button className="absolute right-2.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground">
              <Search size={16} />
            </button>
          </div>
          
          {/* Mobile Search Toggle */}
          <Button variant="ghost" size="icon" className="md:hidden">
            <Search size={20} />
          </Button>

          {/* User Menu */}
          <Button variant="ghost" size="icon">
            <User size={20} />
          </Button>
        </div>
      </div>
    </header>
  );
}
