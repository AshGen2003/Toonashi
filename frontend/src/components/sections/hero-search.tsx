"use client";

import React, { useState, useEffect } from "react";
import { Search, TrendingUp, Calendar, Loader2, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { searchAnime } from "@/lib/jikan";
import { AnimeCard } from "@/components/AnimeCard";

export default function HeroSearch() {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [isSearching, setIsSearching] = useState(false);

  useEffect(() => {
    const delayDebounceFn = setTimeout(async () => {
      if (searchQuery.length > 2) {
        setIsSearching(true);
        try {
          const data = await searchAnime(searchQuery);
          setSearchResults(data.data);
        } catch (error) {
          console.error(error);
        } finally {
          setIsSearching(false);
        }
      } else {
        setSearchResults([]);
      }
    }, 500);

    return () => clearTimeout(delayDebounceFn);
  }, [searchQuery]);

  return (
    <section className="relative z-30">
      <div className="flex flex-col gap-8">
        <div className="relative max-w-xl mx-auto w-full group">
          <div className="absolute inset-y-0 left-5 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-muted-foreground group-focus-within:text-primary transition-colors" />
          </div>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search anime, movies, or series..."
            className="w-full rounded-full bg-card border border-border pl-14 pr-12 py-5 text-lg outline-none focus:border-primary/50 focus:ring-4 focus:ring-primary/10 text-white transition-all duration-300 shadow-2xl"
          />
          <div className="absolute right-5 inset-y-0 flex items-center gap-2">
            {isSearching ? (
              <Loader2 className="h-5 w-5 animate-spin text-primary" />
            ) : searchQuery.length > 0 && (
              <button 
                onClick={() => setSearchQuery("")}
                className="p-1 hover:bg-white/10 rounded-full transition-colors"
              >
                <X className="h-5 w-5 text-muted-foreground" />
              </button>
            )}
          </div>
        </div>

        <AnimatePresence>
          {searchResults.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className="space-y-6"
            >
              <div className="flex items-center justify-between border-b border-border pb-4">
                <h2 className="text-2xl font-bold flex items-center gap-2">
                  <Search className="text-primary" size={24} />
                  Search Results for "{searchQuery}"
                </h2>
                <span className="text-sm text-muted-foreground">{searchResults.length} titles found</span>
              </div>
              
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
                {searchResults.map((anime) => (
                  <AnimeCard key={anime.mal_id} anime={anime} />
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}




