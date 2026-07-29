import Navigation from "@/components/sections/navigation";
import Footer from "@/components/sections/footer";

export default function TermsPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      <main className="flex-1 container mx-auto px-6 py-20 max-w-4xl space-y-12">
        <div className="space-y-4">
          <h1 className="text-5xl font-black text-white tracking-tighter">TERMS OF <span className="text-primary">SERVICE</span></h1>
          <p className="text-muted-foreground font-bold">Last updated: January 30, 2026</p>
        </div>

        <div className="space-y-8 prose prose-invert max-w-none text-muted-foreground leading-relaxed">
          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-white uppercase tracking-widest border-l-4 border-primary pl-4">1. Acceptance of Terms</h2>
            <p>
              By accessing Toonashi, you agree to be bound by these Terms of Service. If you do not agree, please do not use the site.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-white uppercase tracking-widest border-l-4 border-primary pl-4">2. Use License</h2>
            <p>
              Toonashi is for personal, non-commercial use only. You may not scrape, crawl, or otherwise attempt to extract large amounts of data from the platform for commercial purposes.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-white uppercase tracking-widest border-l-4 border-primary pl-4">3. Content</h2>
            <p>
              All anime data and images are provided by the Jikan API (MyAnimeList). We do not host any video content. All trademarks and copyrights belong to their respective owners.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-white uppercase tracking-widest border-l-4 border-primary pl-4">4. "My List" Responsibility</h2>
            <p>
              Since "My List" data is stored locally on your device, clearing your browser cache or switching devices will result in the loss of this data. Toonashi is not responsible for data loss.
            </p>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
}
