"use client";

import React, { useEffect, useState } from "react";
import { Star, ArrowRight, Loader2 } from "lucide-react";
import { motion } from "framer-motion";
import { getTopAnime } from "@/lib/jikan";
import { AnimeCard } from "@/components/AnimeCard";
import Link from "next/link";

export default function TopRatedGrid() {
  const [animeList, setAnimeList] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
    const fetchTopAnime = async () => {
      try {
        const data = await getTopAnime(1);
        setAnimeList(data.data.slice(0, 10));
      } catch (error) {

        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTopAnime();
  }, []);

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center py-24 gap-4">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
        <p className="text-muted-foreground font-medium animate-pulse">Loading top rated anime...</p>
      </div>
    );
  }

  return (
    <section className="space-y-8">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <h2 className="text-3xl font-extrabold text-white flex items-center gap-3">
              <Star className="text-primary" size={32} />
              Top Rated
            </h2>
            <p className="text-muted-foreground font-medium">All-time masterpieces you must watch</p>
          </div>
          
          <Link 
            href="/explore" 
            className="group flex items-center gap-2 text-sm font-bold text-primary hover:text-primary/80 transition-colors"
          >
            Explore More
            <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6 md:gap-8">
        {animeList.map((anime, index) => (
          <motion.div
            key={anime.mal_id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            viewport={{ once: true }}
          >
            <AnimeCard anime={anime} />
          </motion.div>
        ))}
      </div>
    </section>
  );
}




