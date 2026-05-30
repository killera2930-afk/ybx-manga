"use client";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { ChevronLeft, ChevronRight, BookOpen, Star } from "lucide-react";
import { Button } from "@/components/ui/button";

export function PopularSlider() {
  // Mock data for the hero slider based on blueprint requirements
  const popularManga = [
    {
      id: "1",
      slug: "solo-leveling",
      title: "Solo Leveling",
      cover: "https://via.placeholder.com/400x600/1a1a2e/ff6b00",
      bgImage: "https://via.placeholder.com/1200x600/1a1a2e/ff6b00",
      description: "10 years ago, after 'the Gate' that connected the real world with the monster world opened, some of the ordinary, everyday people received the power to hunt monsters within the Gate. They are known as 'Hunters'.",
      rating: 9.8,
      status: "Ongoing",
      year: 2024,
      genres: ["Action", "Fantasy", "Adventure"],
      rank: 1
    },
    {
      id: "2",
      slug: "omniscient-reader",
      title: "Omniscient Reader's Viewpoint",
      cover: "https://via.placeholder.com/400x600/22223a/00e676",
      bgImage: "https://via.placeholder.com/1200x600/22223a/00e676",
      description: "Dokja was an average office worker whose sole interest was reading his favorite web novel 'Three Ways to Survive the Apocalypse.' But when the novel suddenly becomes reality...",
      rating: 9.7,
      status: "Ongoing",
      year: 2023,
      genres: ["Action", "Fantasy", "Psychological"],
      rank: 2
    }
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const resetTimer = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % popularManga.length);
    }, 5000); // Auto-advance every 5000ms
  };

  useEffect(() => {
    resetTimer();
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [popularManga.length]);

  const goToPrev = () => {
    setCurrentIndex((prev) => (prev - 1 + popularManga.length) % popularManga.length);
    resetTimer();
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % popularManga.length);
    resetTimer();
  };

  return (
    <div className="relative w-full h-[420px] md:h-[500px] overflow-hidden">
      {popularManga.map((manga, index) => (
        <div
          key={manga.id}
          className={`absolute inset-0 transition-opacity duration-700 ${
            index === currentIndex ? "opacity-100 z-10" : "opacity-0 z-0"
          }`}
        >
          {/* Background Image & Overlays */}
          <div
            className="absolute inset-0 bg-cover bg-center blur-md scale-105"
            style={{ backgroundImage: `url(${manga.bgImage})` }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-background/20" />
          <div className="absolute inset-y-0 left-0 w-1/2 bg-gradient-to-r from-background to-transparent" />

          {/* Content */}
          <div className="container mx-auto px-4 h-full flex items-end pb-12 md:pb-16 gap-6 relative z-20">
            {/* Cover Thumb (Desktop only) */}
            <div className="hidden md:block shrink-0 relative">
              <div className="w-48 h-72 rounded-xl manga-shadow-lg glow-border overflow-hidden">
                <img src={manga.cover} alt={manga.title} className="w-full h-full object-cover" />
              </div>
            </div>

            {/* Info Block */}
            <div className="flex-1 max-w-2xl">
              <div className="flex items-center gap-2 mb-3">
                <span className="bg-primary text-primary-foreground text-xs font-bold px-2 py-1 rounded-md">
                  #{manga.rank} Popular
                </span>
                <span className="bg-secondary text-secondary-foreground text-xs font-bold px-2 py-1 rounded-md">
                  {manga.status}
                </span>
              </div>
              
              <h1 className="font-display font-bold text-3xl md:text-5xl text-foreground line-clamp-2 mb-3">
                {manga.title}
              </h1>
              
              <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4 font-medium">
                <span className="flex items-center gap-1 text-gold">
                  <Star size={14} fill="currentColor" /> {manga.rating}
                </span>
                <span>&middot;</span>
                <span>{manga.year}</span>
                <span>&middot;</span>
                <span className="truncate">{manga.genres.slice(0, 3).join(", ")}</span>
              </div>
              
              <p className="text-sm md:text-base text-muted-foreground line-clamp-2 md:line-clamp-3 max-w-2xl mb-6">
                {manga.description}
              </p>
              
              <div className="flex items-center gap-3">
                <Button className="rounded-full gap-2 px-6">
                  <BookOpen size={18} />
                  Read Now
                </Button>
                <Button variant="outline" className="rounded-full px-6" asChild>
                  <Link href={`/manga/${manga.slug}`}>Details</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* Dots Navigation */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-2 z-30">
        {popularManga.map((_, idx) => (
          <button
            key={idx}
            onClick={() => {
              setCurrentIndex(idx);
              resetTimer();
            }}
            className={`h-2 rounded-full transition-all duration-300 ${
              idx === currentIndex ? "w-6 bg-primary" : "w-2 bg-muted-foreground/40"
            }`}
          />
        ))}
      </div>

      {/* Desktop Arrows */}
      <button
        onClick={goToPrev}
        className="hidden md:flex absolute left-4 top-1/2 -translate-y-1/2 z-30 bg-background/50 backdrop-blur rounded-full p-2 text-foreground hover:bg-primary transition-colors"
      >
        <ChevronLeft size={24} />
      </button>
      <button
        onClick={goToNext}
        className="hidden md:flex absolute right-4 top-1/2 -translate-y-1/2 z-30 bg-background/50 backdrop-blur rounded-full p-2 text-foreground hover:bg-primary transition-colors"
      >
        <ChevronRight size={24} />
      </button>
    </div>
  );
}
