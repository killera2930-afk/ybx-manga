import Link from "next/link";
import { PlusSquare, BookOpen } from "lucide-react";
import connectDB from "@/lib/db";
import { Manga } from "@/models/Manga";

export default async function AdminDashboard() {
  await connectDB();
  const totalManga = await Manga.countDocuments();

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Dashboard Overview</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-card border border-border rounded-xl p-6">
          <h3 className="text-muted-foreground text-sm font-bold uppercase tracking-wider mb-2">Total Manga</h3>
          <div className="text-4xl font-black text-foreground">{totalManga}</div>
        </div>
        
        <div className="bg-card border border-border rounded-xl p-6">
          <h3 className="text-muted-foreground text-sm font-bold uppercase tracking-wider mb-2">Quick Actions</h3>
          <div className="flex gap-2 mt-4">
            <Link href="/admin/manga/new" className="flex items-center gap-2 bg-primary/20 text-primary px-3 py-2 rounded-lg text-sm font-bold hover:bg-primary/30 transition-colors">
              <PlusSquare size={16} /> Add Manga
            </Link>
            <Link href="/admin/manga" className="flex items-center gap-2 bg-secondary text-secondary-foreground px-3 py-2 rounded-lg text-sm font-bold hover:bg-secondary/80 transition-colors">
              <BookOpen size={16} /> View All
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
