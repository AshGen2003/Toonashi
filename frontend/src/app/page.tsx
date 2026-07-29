
import { getTopAnime, getNewestHighRatedAnime } from "../lib/jikan";
import Navigation from "../components/sections/navigation";
import MaintenanceBanner from "../components/sections/maintenance-banner";
import HeroSlider from "../components/sections/HeroSlider";
import HeroSearch from "../components/sections/hero-search";
import TopRatedGrid from "../components/sections/top-rated-grid";
import GenreExplorer from "../components/sections/genre-explorer";
import InfoCards from "../components/sections/info-cards";
import Footer from "../components/sections/footer";

export default async function Home() {
  let trending = [];
  let topRated = [];

    try {
      const trendingData = await getNewestHighRatedAnime(1);
      trending = trendingData?.data?.slice(0, 10) || [];
      
      const topRatedData = await getTopAnime(1);
      topRated = topRatedData?.data?.slice(0, 10) || [];
    } catch (error) {

    console.error("Error fetching home page data:", error);
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      
      <main className="flex-1 container mx-auto px-4 md:px-8 py-6 md:py-8 space-y-12 md:space-y-24">
        <MaintenanceBanner />
        
        <div className="space-y-12 md:space-y-24" data-protonpass-form="">
          <HeroSlider trending={trending} />
          <HeroSearch />
          <TopRatedGrid />
          <GenreExplorer />
          <InfoCards />
        </div>
      </main>

      <Footer />
    </div>
  );
}
