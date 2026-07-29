import Navigation from "@/components/sections/navigation";
import Footer from "@/components/sections/footer";

export default function PrivacyPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      <main className="flex-1 container mx-auto px-6 py-20 max-w-4xl space-y-12">
        <div className="space-y-4">
          <h1 className="text-5xl font-black text-white tracking-tighter">PRIVACY <span className="text-primary">POLICY</span></h1>
          <p className="text-muted-foreground font-bold">Last updated: January 30, 2026</p>
        </div>

        <div className="space-y-8 prose prose-invert max-w-none text-muted-foreground leading-relaxed">
          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-white uppercase tracking-widest border-l-4 border-primary pl-4">1. Information We Collect</h2>
            <p>
              Toonashi is designed to be a privacy-first platform. We do not require account creation, and most of your data (like your "My List") is stored locally on your device using browser technology (LocalStorage). We do not collect personal identifying information.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-white uppercase tracking-widest border-l-4 border-primary pl-4">2. Cookies and Tracking</h2>
            <p>
              We use minimal cookies for essential site functionality. We may use third-party analytics services (like Vercel Analytics) to understand site performance and user experience without identifying individuals.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-white uppercase tracking-widest border-l-4 border-primary pl-4">3. External Links</h2>
            <p>
              Our site contains links to external platforms like MyAnimeList (Jikan API), Twitter, and YouTube. We are not responsible for the privacy practices of these external sites.
            </p>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
}




