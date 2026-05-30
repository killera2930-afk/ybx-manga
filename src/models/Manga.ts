import mongoose, { Schema, Document } from "mongoose";

export interface IChapter {
  id: string;
  number: number;
  title?: string;
  scanlator?: string;
  publishedAt: Date;
  pages: string[]; // array of image URLs
}

export interface IManga extends Document {
  title: string;
  slug: string;
  cover: string;
  description: string;
  author: string;
  artist?: string;
  releaseYear: number;
  status: "Ongoing" | "Completed" | "Hiatus";
  rating: number;
  views: number;
  genres: string[];
  chapters: IChapter[];
  createdAt: Date;
  updatedAt: Date;
}

const ChapterSchema = new Schema<IChapter>({
  id: { type: String, required: true },
  number: { type: Number, required: true },
  title: { type: String },
  scanlator: { type: String },
  publishedAt: { type: Date, default: Date.now },
  pages: [{ type: String }],
});

const MangaSchema = new Schema<IManga>(
  {
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    cover: { type: String, required: true },
    description: { type: String, required: true },
    author: { type: String, required: true },
    artist: { type: String },
    releaseYear: { type: Number, required: true },
    status: { type: String, enum: ["Ongoing", "Completed", "Hiatus"], default: "Ongoing" },
    rating: { type: Number, default: 0, min: 0, max: 10 },
    views: { type: Number, default: 0 },
    genres: [{ type: String }],
    chapters: [ChapterSchema],
  },
  { timestamps: true }
);

export const Manga = mongoose.models.Manga || mongoose.model<IManga>("Manga", MangaSchema);
