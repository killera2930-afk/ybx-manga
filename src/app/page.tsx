import { PopularSlider } from "@/components/home/PopularSlider";
import { GenreSlider } from "@/components/home/GenreSlider";
import { ContinueReading } from "@/components/home/ContinueReading";
import { TrendingSlider } from "@/components/home/TrendingSlider";
import { LatestMangaGrid } from "@/components/home/LatestMangaGrid";
import { Newsletter } from "@/components/home/Newsletter";

export default function Home() {
  return (
    <div className="pb-8">
      <PopularSlider />
      <GenreSlider />
      <ContinueReading />
      <TrendingSlider />
      <div className="section-divider container mx-auto" />
      <LatestMangaGrid />
      <Newsletter />
    </div>
  );
}
