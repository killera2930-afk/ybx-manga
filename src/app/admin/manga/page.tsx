import Link from "next/link";
import { PlusSquare, Trash2 } from "lucide-react";
import connectDB from "@/lib/db";
import { Manga } from "@/models/Manga";
import { revalidatePath } from "next/cache";

export default async function AdminMangaList() {
  await connectDB();
  const mangas = await Manga.find().sort("-createdAt").lean();

  const deleteManga = async (formData: FormData) => {
    "use server";
    await connectDB();
    const id = formData.get("id");
    await Manga.findByIdAndDelete(id);
    revalidatePath("/admin/manga");
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">All Manga</h1>
        <Link href="/admin/manga/new" className="flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2 rounded-lg text-sm font-bold hover:bg-primary/90 transition-colors">
          <PlusSquare size={16} /> Add New
        </Link>
      </div>

      <div className="bg-card border border-border rounded-xl overflow-hidden">
        <table className="w-full text-left text-sm">
          <thead className="bg-secondary/50 border-b border-border">
            <tr>
              <th className="px-4 py-3 font-semibold text-muted-foreground">Title</th>
              <th className="px-4 py-3 font-semibold text-muted-foreground">Status</th>
              <th className="px-4 py-3 font-semibold text-muted-foreground">Chapters</th>
              <th className="px-4 py-3 font-semibold text-muted-foreground text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {mangas.map((manga: any) => (
              <tr key={manga._id.toString()} className="border-b border-border/50 hover:bg-secondary/20 transition-colors">
                <td className="px-4 py-3 font-medium flex items-center gap-3">
                  <img src={manga.cover} alt="cover" className="w-8 h-12 object-cover rounded" />
                  {manga.title}
                </td>
                <td className="px-4 py-3 text-emerald-500 font-medium">{manga.status}</td>
                <td className="px-4 py-3 text-muted-foreground">{manga.chapters?.length || 0}</td>
                <td className="px-4 py-3 text-right">
                  <form action={deleteManga}>
                    <input type="hidden" name="id" value={manga._id.toString()} />
                    <button type="submit" className="text-destructive hover:text-destructive/80 p-2">
                      <Trash2 size={16} />
                    </button>
                  </form>
                </td>
              </tr>
            ))}
            {mangas.length === 0 && (
              <tr>
                <td colSpan={4} className="px-4 py-8 text-center text-muted-foreground">No manga found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
