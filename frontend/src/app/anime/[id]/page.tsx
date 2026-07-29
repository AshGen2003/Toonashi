import { getAnimeDetails, getAnimeCharacters } from "../../../lib/jikan";
import AnimeDetailView from "../../../components/AnimeDetailView";
import Navigation from "../../../components/sections/navigation";
import Footer from "../../../components/sections/footer";

export default async function AnimePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  
  try {
    const [details, characters] = await Promise.all([
      getAnimeDetails(id),
      getAnimeCharacters(id)
    ]);

    return (
      <div className="min-h-screen flex flex-col">
        <Navigation />
        <main className="flex-1">
          <AnimeDetailView anime={details.data} characters={characters.data} />
        </main>
        <Footer />
      </div>
    );
  } catch (error) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-black text-white">
        <h1 className="text-2xl font-bold mb-4">Failed to load anime details</h1>
        <a href="/" className="text-teal-400 hover:underline">Return Home</a>
      </div>
    );
  }
}


