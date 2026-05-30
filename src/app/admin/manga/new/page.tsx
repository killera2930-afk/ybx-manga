"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Save, AlertCircle } from "lucide-react";
import { toast } from "sonner";

export default function AddMangaPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    cover: "",
    description: "",
    author: "",
    artist: "",
    releaseYear: new Date().getFullYear(),
    status: "Ongoing",
    genres: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // Convert genres from comma-separated string to array
    const genresArray = formData.genres.split(",").map(g => g.trim()).filter(Boolean);
    
    const payload = {
      ...formData,
      releaseYear: Number(formData.releaseYear),
      genres: genresArray
    };

    try {
      const res = await fetch("/api/manga", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });
      
      const data = await res.json();
      if (data.success) {
        toast.success("Manga created successfully!");
        router.push("/admin/manga");
      } else {
        toast.error(data.error || "Failed to create manga");
      }
    } catch (err: any) {
      toast.error(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold flex items-center gap-2">
          <span className="text-primary">#</span> Add New Manga
        </h1>
      </div>

      <form onSubmit={handleSubmit} className="glass-card rounded-xl p-6 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-xs font-bold text-muted-foreground uppercase tracking-wide">Title *</label>
            <Input required name="title" value={formData.title} onChange={handleChange} placeholder="e.g. Solo Leveling" />
          </div>
          
          <div className="space-y-2">
            <label className="text-xs font-bold text-muted-foreground uppercase tracking-wide">Slug (Optional)</label>
            <Input name="slug" value={formData.slug} onChange={handleChange} placeholder="e.g. solo-leveling (auto-generated if empty)" />
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold text-muted-foreground uppercase tracking-wide">Cover Image URL *</label>
            <Input required name="cover" value={formData.cover} onChange={handleChange} placeholder="https://..." />
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold text-muted-foreground uppercase tracking-wide">Author *</label>
            <Input required name="author" value={formData.author} onChange={handleChange} placeholder="Author name" />
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold text-muted-foreground uppercase tracking-wide">Release Year *</label>
            <Input required type="number" name="releaseYear" value={formData.releaseYear} onChange={handleChange} />
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold text-muted-foreground uppercase tracking-wide">Status</label>
            <select name="status" value={formData.status} onChange={handleChange} className="flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring">
              <option value="Ongoing">Ongoing</option>
              <option value="Completed">Completed</option>
              <option value="Hiatus">Hiatus</option>
            </select>
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-xs font-bold text-muted-foreground uppercase tracking-wide">Genres (Comma separated)</label>
          <Input name="genres" value={formData.genres} onChange={handleChange} placeholder="Action, Fantasy, Adventure" />
        </div>

        <div className="space-y-2">
          <label className="text-xs font-bold text-muted-foreground uppercase tracking-wide">Description *</label>
          <textarea 
            required 
            name="description" 
            value={formData.description} 
            onChange={handleChange}
            rows={5}
            className="flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring resize-y"
            placeholder="Manga synopsis..."
          />
        </div>

        <div className="pt-4 border-t border-border flex justify-end">
          <Button type="submit" disabled={loading} className="gap-2">
            <Save size={16} />
            {loading ? "Saving..." : "Save Manga"}
          </Button>
        </div>
      </form>
    </div>
  );
}
