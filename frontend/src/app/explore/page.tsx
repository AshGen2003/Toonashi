import Navigation from "../../components/sections/navigation";
import Footer from "../../components/sections/footer";
import ExploreView from "../../components/sections/ExploreView";
import { Suspense } from "react";
import { Loader2 } from "lucide-react";

export default function ExplorePage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      
      <main className="flex-1 py-12">
        <Suspense fallback={
          <div className="flex flex-col items-center justify-center py-40 space-y-4">
            <Loader2 className="w-12 h-12 text-primary animate-spin" />
            <p className="text-muted-foreground font-bold animate-pulse">Loading Explore...</p>
          </div>
        }>
          <ExploreView />
        </Suspense>
      </main>

      <Footer />
    </div>
  );
}




