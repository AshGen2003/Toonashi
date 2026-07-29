"use client";

import React, { useState, useEffect } from "react";
import { Loader2, Compass } from "lucide-react";
import { getAnimeGenres } from "@/lib/jikan";
import { motion } from "framer-motion";
import Link from "next/link";

export default function GenreExplorer() {
  const [genres, setGenres] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await getAnimeGenres();
        const filtered = data.data.filter((g: any) => g.mal_id !== 12).slice(0, 18);
        setGenres(filtered);
      } catch (error) {
        console.error("Failed to fetch genres:", error);
      } finally {
        setIsLoading(false);
      }
    }
    fetchData();
  }, []);

  return (
    <section className="w-full">
      <div className="flex items-center gap-3 mb-8">
        <div className="p-3 rounded-2xl bg-primary/10 border border-primary/20 shadow-[0_0_20px_rgba(59,130,246,0.2)]">
          <Compass className="h-6 w-6 text-primary" />
        </div>
        <h2 className="text-3xl font-black text-white tracking-tighter uppercase">
          Explore <span className="text-primary">Genres</span>
        </h2>
      </div>

        <div 
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3 md:gap-4 p-4 md:p-8 rounded-[1.5rem] md:rounded-[3rem] bg-card border border-border shadow-2xl relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5 pointer-events-none" />
          {isLoading ? (
            <div className="col-span-full flex items-center justify-center gap-3 text-muted-foreground py-10">
              <Loader2 className="h-6 w-6 animate-spin text-primary" />
              <span className="text-lg font-bold animate-pulse">Categorizing anime...</span>
            </div>
          ) : (
            genres.map((genre, idx) => (
              <Link key={genre.mal_id} href={`/explore?genre=${genre.mal_id}`}>
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.02 }}
                  whileHover={{ scale: 1.05, backgroundColor: 'rgba(59, 130, 246, 0.1)', borderColor: 'rgba(59, 130, 246, 0.3)' }}
                  whileTap={{ scale: 0.95 }}
                  className="group p-3 md:p-4 rounded-xl md:rounded-2xl bg-white/5 border border-white/10 text-center transition-all duration-300 cursor-pointer"
                >
                  <p className="text-xs md:text-sm font-black text-white/80 group-hover:text-primary transition-colors">
                    {genre.name}
                  </p>
                  <p className="text-[9px] md:text-[10px] text-muted-foreground font-medium group-hover:text-white/60">
                    {genre.count} Titles
                  </p>
                </motion.div>
              </Link>
            ))
          )}
        </div>

    </section>
  );
}




