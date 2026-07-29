"use client";

import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Filter, SlidersHorizontal, ChevronRight, X, Loader2, ChevronDown, Calendar, Play, Settings2, Eye, EyeOff } from 'lucide-react';
import { searchAnime, getAnimeGenres, getNewestHighRatedAnime } from '@/lib/jikan';
import { AnimeCard } from '@/components/AnimeCard';
import { cn } from '@/lib/utils';
import * as Select from '@radix-ui/react-select';
import { useSettings } from '@/hooks/useSettings';
import * as Popover from '@radix-ui/react-popover';

const CustomSelect = ({ value, onValueChange, placeholder, options, icon: Icon }: any) => (
  <Select.Root value={value} onValueChange={onValueChange}>
    <Select.Trigger className="flex items-center justify-between gap-3 bg-white/5 border border-white/10 rounded-full px-6 py-2.5 text-sm text-white focus:outline-none focus:border-primary/50 transition-all hover:bg-white/10 min-w-[140px]">
      <div className="flex items-center gap-2">
        {Icon && <Icon size={14} className="text-primary" />}
        <Select.Value placeholder={placeholder} />
      </div>
      <Select.Icon>
        <ChevronDown size={14} className="text-muted-foreground" />
      </Select.Icon>
    </Select.Trigger>

    <Select.Portal>
      <Select.Content className="z-50 overflow-hidden bg-[#0a0a0c] border border-white/10 rounded-2xl shadow-2xl backdrop-blur-xl animate-in fade-in zoom-in-95 duration-200">
        <Select.ScrollUpButton className="flex items-center justify-center h-6 bg-white/5 text-white cursor-default">
          <ChevronDown className="rotate-180" size={14} />
        </Select.ScrollUpButton>
        <Select.Viewport className="p-2">
          {options.map((opt: any) => (
            <Select.Item
              key={opt.value}
              value={opt.value}
              className="relative flex items-center px-8 py-2.5 text-sm text-muted-foreground rounded-full cursor-pointer outline-none focus:bg-primary/20 focus:text-white transition-colors"
            >
              <Select.ItemText>{opt.label}</Select.ItemText>
            </Select.Item>
          ))}
        </Select.Viewport>
      </Select.Content>
    </Select.Portal>
  </Select.Root>
);

const ExploreView = () => {
  const { nsfwFilter, toggleNsfwFilter } = useSettings();
  const searchParams = useSearchParams();

  const [query, setQuery] = useState(searchParams.get('q') || '');
  const [results, setResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [genres, setGenres] = useState<any[]>([]);
  const [selectedGenre, setSelectedGenre] = useState<string>(searchParams.get('genre') || '');
  const [selectedType, setSelectedType] = useState<string>('');
  const [selectedStatus, setSelectedStatus] = useState<string>('');
  const [selectedYear, setSelectedYear] = useState<string>('');
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

    const years = Array.from({ length: 100 }, (_, i) => (new Date().getFullYear() - i).toString());

  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const data = await getAnimeGenres();
        const sortedGenres = data.data.sort((a: any, b: any) => {
          if (a.mal_id === 12) return 1;
          if (b.mal_id === 12) return -1;
          return a.name.localeCompare(b.name);
        });
        setGenres(sortedGenres);
      } catch (err) {
        console.error(err);
      }
    };
    fetchGenres();
  }, []);

  useEffect(() => {
    handleSearch(true);
  }, [selectedGenre, selectedType, selectedStatus, selectedYear]);

  const handleSearch = async (reset = false) => {
    setLoading(true);
    const currentPage = reset ? 1 : page;
    try {
      let data;
      const hasFilters = query || 
        (selectedGenre && selectedGenre !== 'all') || 
        (selectedType && selectedType !== 'all') || 
        (selectedStatus && selectedStatus !== 'all') || 
        (selectedYear && selectedYear !== 'all');

        if (!hasFilters) {
          data = await getNewestHighRatedAnime(currentPage);
          } else {
            let params = "";
            
            if (!query) {
              params += "&order_by=score&sort=desc";
            }
            
            if (selectedGenre && selectedGenre !== 'all') params += `&genres=${selectedGenre}`;
            if (selectedType && selectedType !== 'all') params += `&type=${selectedType}`;
            if (selectedStatus && selectedStatus !== 'all') params += `&status=${selectedStatus}`;
            
            if (selectedYear && selectedYear !== 'all') {
              params += `&start_date=${selectedYear}-01-01&end_date=${selectedYear}-12-31`;
            } else if (!query && !selectedStatus) {
              const currentYear = new Date().getFullYear();
              params += `&start_date=${currentYear - 3}-01-01`;
            }

            data = await searchAnime(query, currentPage, params);
          }

      if (reset) {
        setResults(data.data || []);
      } else {
        setResults(prev => [...prev, ...(data.data || [])]);
      }
      setHasMore(data.pagination.has_next_page);
      setPage(currentPage + 1);
    } catch (err) {
      console.error(err);
      if (reset) setResults([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-12 pb-24">
      {}
      <section className="relative py-12 md:py-20 overflow-hidden rounded-[1.5rem] md:rounded-[3rem] bg-gradient-to-br from-primary/10 via-background to-secondary/10 border border-white/5">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10 pointer-events-none" />
        <div className="container relative z-10 mx-auto px-4 md:px-6 text-center space-y-6 md:space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-3 md:space-y-4"
          >
            <h1 className="text-4xl md:text-7xl font-black text-white tracking-tighter">
              EXPLORE <span className="text-primary">ANIME</span>
            </h1>
            <p className="text-muted-foreground text-sm md:text-lg max-w-2xl mx-auto px-2">
              Discover your next favorite series. Filter by genre, status, or search through thousands of titles.
            </p>
          </motion.div>
  
          <div className="max-w-2xl mx-auto relative group px-2">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSearch(true)}
              placeholder="Search anime..."
              className="w-full bg-white/5 border-2 border-white/10 rounded-full py-4 md:py-6 px-6 md:px-10 text-lg md:text-xl text-white placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 transition-all backdrop-blur-xl"
            />
            <button 
              onClick={() => handleSearch(true)}
              className="absolute right-6 md:right-4 top-1/2 -translate-y-1/2 w-10 h-10 md:w-12 md:h-12 rounded-full bg-primary text-white flex items-center justify-center transition-transform hover:scale-110 active:scale-95 shadow-lg shadow-primary/20"
            >
              <Search size={20} className="md:w-6 md:h-6" />
            </button>
          </div>
        </div>
      </section>
  
      {}
      <section className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col md:flex-row md:items-center gap-4 md:gap-6 p-4 md:p-8 rounded-[1.5rem] md:rounded-[2rem] bg-card border border-white/5">
            <div className="flex items-center gap-4">
              <Popover.Root>
                <Popover.Trigger asChild>
                  <button className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/50 transition-all active:scale-95">
                    <Settings2 size={20} />
                  </button>
                </Popover.Trigger>
                <Popover.Portal>
                  <Popover.Content className="z-50 w-64 p-5 rounded-[2rem] bg-[#0a0a0c] border border-white/10 shadow-2xl backdrop-blur-xl animate-in fade-in zoom-in-95 duration-200" sideOffset={10}>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <h4 className="text-sm font-black text-white uppercase tracking-widest">Settings</h4>
                        <Popover.Close className="text-muted-foreground hover:text-white">
                          <X size={16} />
                        </Popover.Close>
                      </div>
                      <div className="h-px bg-white/5" />
                      <div className="flex items-center justify-between group">
                        <div className="flex items-center gap-3">
                          <div className={cn("p-2 rounded-lg transition-colors", nsfwFilter ? "bg-red-500/10 text-red-500" : "bg-green-500/10 text-green-500")}>
                            {nsfwFilter ? <EyeOff size={16} /> : <Eye size={16} />}
                          </div>
                          <div>
                            <p className="text-xs font-bold text-white uppercase tracking-tighter">NSFW Filter</p>
                            <p className="text-[10px] text-muted-foreground">{nsfwFilter ? "Active" : "Disabled"}</p>
                          </div>
                        </div>
                        <button 
                          onClick={toggleNsfwFilter}
                          className={cn(
                            "w-12 h-6 rounded-full relative transition-colors duration-300 outline-none",
                            nsfwFilter ? "bg-primary" : "bg-white/10"
                          )}
                        >
                          <motion.div 
                            animate={{ x: nsfwFilter ? 24 : 4 }}
                            className="absolute top-1 w-4 h-4 rounded-full bg-white shadow-sm"
                          />
                        </button>
                      </div>
                    </div>
                  </Popover.Content>
                </Popover.Portal>
              </Popover.Root>

              <div className="flex items-center gap-2 text-primary font-bold uppercase tracking-widest text-xs md:text-sm">
                <Filter className="w-4 h-4 md:w-[18px] md:h-[18px]" />
                Filters
              </div>
            </div>

  
          <div className="flex-1 flex flex-wrap gap-2 md:gap-4">
            <CustomSelect
              value={selectedGenre}
              onValueChange={setSelectedGenre}
              placeholder="All Genres"
              options={[{ value: "all", label: "All Genres" }, ...genres.map(g => ({ value: g.mal_id.toString(), label: g.name }))]}
              icon={SlidersHorizontal}
            />
  
            <CustomSelect
              value={selectedType}
              onValueChange={setSelectedType}
              placeholder="All Types"
              options={[
                { value: "all", label: "All Types" },
                { value: "tv", label: "TV Series" },
                { value: "movie", label: "Movies" },
                { value: "ova", label: "OVA" },
                { value: "special", label: "Special" },
              ]}
              icon={Play}
            />
  
            <CustomSelect
              value={selectedStatus}
              onValueChange={setSelectedStatus}
              placeholder="All Status"
              options={[
                { value: "all", label: "All Status" },
                { value: "airing", label: "Currently Airing" },
                { value: "complete", label: "Completed" },
                { value: "upcoming", label: "Upcoming" },
              ]}
              icon={Loader2}
            />
  
            <CustomSelect
              value={selectedYear}
              onValueChange={setSelectedYear}
              placeholder="All Years"
              options={[{ value: "all", label: "All Years" }, ...years.map(y => ({ value: y, label: y }))]}
              icon={Calendar}
            />
  
            {(selectedGenre || selectedType || selectedStatus || selectedYear || query) && (
              <button 
                onClick={() => {
                  setSelectedGenre('');
                  setSelectedType('');
                  setSelectedStatus('');
                  setSelectedYear('');
                  setQuery('');
                  handleSearch(true);
                }}
                className="flex items-center gap-2 text-[10px] md:text-xs font-bold text-muted-foreground hover:text-white transition-colors uppercase tracking-widest px-2 md:px-4"
              >
                <X className="w-3 h-3 md:w-3.5 md:h-3.5" />
                Clear All
              </button>
            )}
          </div>
        </div>
      </section>
  
      {}
      <section className="container mx-auto px-4 md:px-6">

        {loading && results.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-40 space-y-4">
            <Loader2 className="w-12 h-12 text-primary animate-spin" />
            <p className="text-muted-foreground font-bold animate-pulse">Summoning Anime...</p>
          </div>
        ) : results.length > 0 ? (
          <div className="space-y-12">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6 md:gap-8">
              {results.map((anime, idx) => (
                <AnimeCard key={`${anime.mal_id}-${idx}`} anime={anime} />
              ))}
            </div>
            
              {hasMore && (
                <div className="flex justify-center pt-8">
                  <button
                    onClick={() => handleSearch()}
                    disabled={loading}
                    className="px-12 py-4 rounded-full bg-white/5 border border-white/10 text-white font-bold hover:bg-white/10 transition-all flex items-center gap-3 active:scale-95 disabled:opacity-50"
                  >
                    {loading ? (
                    <Loader2 className="w-5 h-5 animate-spin" />
                  ) : (
                    <>
                      LOAD MORE
                      <ChevronRight size={20} />
                    </>
                  )}
                </button>
              </div>
            )}
          </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-40 space-y-6 text-center">
              <div className="w-24 h-24 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-muted-foreground/20">
                <Search size={48} />
              </div>
              <div className="space-y-2">
                <h3 className="text-4xl font-black text-white uppercase tracking-tighter">Nothing Found</h3>
                <p className="text-muted-foreground font-bold">We couldn't find any anime matching your selection.</p>
              </div>
              <button 
                onClick={() => {
                  setSelectedGenre('');
                  setSelectedType('');
                  setSelectedStatus('');
                  setSelectedYear('');
                  setQuery('');
                  handleSearch(true);
                }}
                className="px-8 py-3 rounded-full bg-primary text-white font-black uppercase tracking-widest text-xs hover:scale-105 transition-transform active:scale-95"
              >
                Clear All Filters
              </button>
            </div>
          )}
      </section>
    </div>
  );
};

export default ExploreView;




