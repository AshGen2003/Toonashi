"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, Play, Info, Users, Clock, Calendar, ChevronRight, Share2, Heart, ExternalLink, Youtube, Twitter, CheckCircle2, EyeOff, AlertCircle } from 'lucide-react';
import { useMyList, ListStatus } from '@/hooks/useMyList';
import * as Tooltip from '@radix-ui/react-tooltip';
import { toast } from 'sonner';
import { useSettings } from '@/hooks/useSettings';
import { getAnimeRecommendations } from '@/lib/jikan';
import { AnimeCard } from '@/components/AnimeCard';
import Player from '@/components/Player';
import { cn } from '@/lib/utils';
import axios from 'axios';

interface AnimeDetailViewProps {
  anime: any;
  characters: any[];
}

export default function AnimeDetailView({ anime, characters }: AnimeDetailViewProps) {
  const [activeTab, setActiveTab] = useState<'overview' | 'episodes' | 'characters' | 'media'>('overview');
  const [recommendations, setRecommendations] = useState<any[]>([]);
  const [episodes, setEpisodes] = useState<any[]>([]);
  const [currentEpisode, setCurrentEpisode] = useState<any>(null);
  const { nsfwFilter } = useSettings();
  const [showNsfwAnyway, setShowNsfwAnyway] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);
  
  const isNSFW = anime.genres?.some((g: any) => ['Hentai', 'Erotica'].includes(g.name)) || 
                 anime.rating?.includes('R+') || 
                 anime.rating?.includes('Rx');

  const shouldBlur = isMounted && isNSFW && nsfwFilter && !showNsfwAnyway;

  const { addItem, getStatus, removeItem } = useMyList();
  const currentStatus = isMounted ? getStatus(anime.mal_id) : null;

  useEffect(() => {
    const fetchRecs = async () => {
      try {
        const data = await getAnimeRecommendations(anime.mal_id.toString());
        setRecommendations(data.data?.slice(0, 10) || []);
      } catch (err) {
        console.error(err);
      }
    };
    fetchRecs();
  }, [anime.mal_id]);

  useEffect(() => {
    if (activeTab === 'episodes' && episodes.length === 0) {
      axios.get(`https://api.jikan.moe/v4/anime/${anime.mal_id}/episodes`)
        .then(response => setEpisodes(response.data.data || []))
        .catch(err => console.error("Failed to fetch episodes", err));
    }
  }, [activeTab, anime.mal_id, episodes.length]);

  const handleChangeEpisode = (direction: "prev" | "next") => {
    if (!currentEpisode || episodes.length === 0) return;
    
    // Assuming episodes are sorted by mal_id (episode number)
    const currentIndex = episodes.findIndex(ep => ep.mal_id === currentEpisode.mal_id);
    if (currentIndex === -1) return;
    
    const newIndex = direction === "next" ? currentIndex + 1 : currentIndex - 1;
    if (newIndex >= 0 && newIndex < episodes.length) {
      setCurrentEpisode(episodes[newIndex]);
    }
  };

  const handleAddToList = (status: ListStatus) => {
    addItem({
      mal_id: anime.mal_id,
      title: anime.title,
      image_url: anime.images.webp.large_image_url
    }, status);
    toast.success(`Successfully added to ${status}!`, {
      icon: <CheckCircle2 className="text-green-500" size={18} />,
      description: anime.title,
    });
  };

  const externalLinks = anime.external?.filter((link: any) => 
    link.name.toLowerCase().includes('twitter') || 
    link.name.toLowerCase().includes('youtube') ||
    link.name.toLowerCase().includes('official site')
  ) || [];

  const handleShare = () => {
    const url = typeof window !== 'undefined' ? window.location.href : 'https://animexus.vercel.app';
    navigator.clipboard.writeText(url);
    toast.info('URL copied to clipboard!', {
      description: 'You can now share this anime with your friends.'
    });
  };

  const mangaAdaptation = anime.relations?.find((rel: any) => rel.relation === 'Adaptation')?.entry || [];

  return (
    <div className="relative min-h-screen pb-24 bg-background">
      {}
      <div className="relative min-h-[50vh] md:h-[80vh] w-full overflow-hidden">
        <div className="absolute inset-0 hidden md:block">
          <img
            src={anime.images.webp.large_image_url}
            alt={anime.title}
            className={cn(
              "h-full w-full object-cover opacity-20 blur-2xl scale-110 transition-all duration-1000",
              shouldBlur && "blur-[100px] grayscale brightness-50"
            )}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-transparent to-transparent" />
        </div>

          <div className="container relative h-full flex items-end pt-32 pb-10 md:pb-20">
            <div className="flex flex-col md:flex-row gap-6 md:gap-12 items-center md:items-end w-full text-center md:text-left">
              {}
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                className="shrink-0 group relative z-20"
              >
                <div className="absolute -inset-2 bg-primary/20 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                <div className="relative overflow-hidden rounded-[1.5rem] md:rounded-[2.5rem] border-2 md:border-4 border-white/10 shadow-2xl relative z-10 transition-transform md:group-hover:-translate-y-4 duration-500">
                  <img
                    src={anime.images.webp.large_image_url}
                    alt={anime.title}
                    className={cn(
                      "w-[160px] md:w-[300px] transition-all duration-700",
                      shouldBlur && "blur-3xl scale-110 grayscale"
                    )}
                  />
                  
                  {shouldBlur && (
                    <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/60 backdrop-blur-md p-6 text-center">
                      <div className="w-16 h-16 rounded-full bg-red-500/20 border border-red-500/40 flex items-center justify-center mb-4">
                        <EyeOff className="text-red-500" size={32} />
                      </div>
                      <h3 className="text-sm font-black text-white uppercase tracking-widest mb-2">Sensitive Content</h3>
                      <p className="text-[10px] text-white/60 font-medium mb-6 uppercase tracking-tighter">This anime is marked as NSFW</p>
                      <button 
                        onClick={() => setShowNsfwAnyway(true)}
                        className="px-6 py-2 rounded-full bg-white text-black font-black text-[10px] uppercase tracking-widest hover:scale-105 active:scale-95 transition-all"
                      >
                        View Anyway
                      </button>
                    </div>
                  )}
                </div>
              </motion.div>
  
              {}
              <div className="flex-1 space-y-4 md:space-y-8 z-20 w-full">
                <div className="flex flex-col gap-4 md:gap-6">
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="flex flex-wrap justify-center md:justify-start gap-2 md:gap-3"
                  >
                    <span className="px-3 py-1 md:px-5 md:py-2 rounded-full bg-white/10 border border-white/20 text-white text-[10px] md:text-xs font-black uppercase tracking-[0.2em] backdrop-blur-md">
                      {anime.type}
                    </span>
                    <span className="px-3 py-1 md:px-5 md:py-2 rounded-full bg-primary/20 border border-primary/30 text-primary text-[10px] md:text-xs font-black uppercase tracking-[0.2em] backdrop-blur-md">
                      {anime.status}
                    </span>
                    {isNSFW && (
                      <span className="px-3 py-1 md:px-5 md:py-2 rounded-full bg-red-500/20 border border-red-500/30 text-red-500 text-[10px] md:text-xs font-black uppercase tracking-[0.2em] backdrop-blur-md">
                        NSFW 18+
                      </span>
                    )}
                  </motion.div>
  
                  {}
                  <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex flex-wrap justify-center md:justify-start gap-2 max-w-full md:max-w-2xl px-4 md:px-0"
                  >
                    {anime.genres?.map((genre: any) => (
                      <Link 
                        key={genre.mal_id} 
                        href={`/explore?genre=${genre.mal_id}`}
                        className="text-[10px] md:text-xs font-bold text-primary/80 uppercase tracking-widest border border-primary/20 px-3 py-1 rounded-full bg-primary/5 hover:bg-primary/20 hover:border-primary/40 transition-all whitespace-nowrap"
                      >
                        {genre.name}
                      </Link>
                    ))}
                  </motion.div>
                </div>

              <div className="space-y-2 md:space-y-4">
                  <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-4xl md:text-8xl font-black tracking-tighter text-white leading-[1.1] md:leading-[0.85] line-clamp-3 md:line-clamp-none px-4 md:px-0"
                  >
                    {anime.title}
                  </motion.h1>
                  <p className="text-base md:text-2xl text-muted-foreground font-bold italic tracking-tight px-4 md:px-0">{anime.title_japanese}</p>
              </div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="flex justify-center md:justify-start items-center gap-6 md:gap-12"
              >
                    <div className="flex flex-col">
                      <span className="text-[9px] md:text-[10px] font-black text-muted-foreground uppercase tracking-[0.3em] mb-1 md:mb-2">Score</span>
                      <div className="flex items-center gap-2">
                        <Star className="h-4 w-4 md:h-5 md:w-5 text-primary" fill="currentColor" />
                        <span className="text-xl md:text-3xl font-black text-white leading-none">{anime.score || 'N/A'}</span>
                      </div>
                    </div>
                <div className="w-px h-8 md:h-12 bg-white/10" />
                <div className="flex flex-col">
                  <span className="text-[9px] md:text-[10px] font-black text-muted-foreground uppercase tracking-[0.3em] mb-1 md:mb-2">Popularity</span>
                  <span className="text-xl md:text-3xl font-black text-white leading-none">#{anime.popularity || '??'}</span>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="flex flex-wrap justify-center md:justify-start gap-3 md:gap-5 pt-2 md:pt-4"
              >
                <div className="flex flex-wrap justify-center items-center bg-white/5 border border-white/10 rounded-[1.5rem] md:rounded-[2rem] p-1 md:p-1.5 backdrop-blur-md">
                  {(['Watching', 'Plan to Watch', 'Completed'] as ListStatus[]).map((status) => (
                    <button
                      key={status}
                      onClick={() => currentStatus === status ? removeItem(anime.mal_id) : handleAddToList(status)}
                      className={`px-3 py-2 md:px-6 md:py-3 rounded-[1rem] md:rounded-[1.5rem] text-[9px] md:text-[10px] font-black uppercase tracking-widest transition-all ${
                        currentStatus === status 
                          ? "bg-primary text-white shadow-xl shadow-primary/20" 
                          : "text-white/60 hover:text-white hover:bg-white/5"
                      }`}
                    >
                      {status}
                    </button>
                  ))}
                </div>
                
                <button 
                  onClick={handleShare}
                  className="p-3 md:p-5 rounded-[1rem] md:rounded-[1.5rem] bg-white/5 border border-white/10 text-white hover:bg-white/10 transition-all active:scale-95 flex items-center gap-2 font-black text-[9px] md:text-[10px] uppercase tracking-widest"
                >
                  <Share2 size={16} className="md:w-5 md:h-5" />
                  SHARE
                </button>
              </motion.div>
            </div>
          </div>
        </div>
      </div>

      {}
      <div className="container mt-12 md:mt-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-16">
          {}
          <div className="lg:col-span-8 space-y-12 md:space-y-20">
            {}
            <div className="flex gap-2 md:gap-4 border-b border-white/5 pb-2 md:pb-4 overflow-x-auto no-scrollbar">
              {['overview', 'episodes', 'characters', 'media'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab as any)}
                  className={`relative px-3 py-2 text-xs md:text-sm font-black uppercase tracking-[0.2em] transition-all whitespace-nowrap ${
                    activeTab === tab ? 'text-primary' : 'text-muted-foreground hover:text-white'
                  }`}
                >
                  {tab}
                  {activeTab === tab && (
                    <motion.div layoutId="tab-active" className="absolute bottom-[-1px] left-0 right-0 h-1 bg-primary rounded-full shadow-[0_0_10px_rgba(59,130,246,0.5)]" />
                  )}
                </button>
              ))}
            </div>

            <AnimatePresence mode="wait">
              {activeTab === 'overview' && (
                <motion.div
                  key="overview"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="space-y-10 md:space-y-16"
                >
                  {}
                  {anime.trailer?.embed_url && (
                    <div className="space-y-6 md:space-y-8">
                      <div className="flex items-center gap-3 md:gap-4">
                        <div className="w-8 h-8 md:w-10 md:h-10 rounded-lg md:rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center">
                          <Youtube className="text-primary w-4 h-4 md:w-5 md:h-5" />
                        </div>
                        <h3 className="text-xl md:text-2xl font-black text-white uppercase tracking-tighter">
                          Official <span className="text-primary">Trailer</span>
                        </h3>
                      </div>
                      <div className="aspect-video w-full rounded-[1.5rem] md:rounded-[2.5rem] overflow-hidden border-2 md:border-4 border-white/5 shadow-2xl relative group">
                        <div className="absolute inset-0 bg-primary/5 pointer-events-none group-hover:opacity-0 transition-opacity" />
                        <iframe
                          src={anime.trailer.embed_url}
                          className="w-full h-full"
                          allowFullScreen
                        />
                      </div>
                    </div>
                  )}

                  <div className="space-y-6 md:space-y-8">
                    <div className="flex items-center gap-3 md:gap-4">
                      <div className="w-8 h-8 md:w-10 md:h-10 rounded-lg md:rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center">
                        <Info className="text-primary w-4 h-4 md:w-5 md:h-5" />
                      </div>
                      <h3 className="text-xl md:text-2xl font-black text-white uppercase tracking-tighter">Synopsis</h3>
                    </div>
                      <p className="text-base md:text-xl text-muted-foreground leading-relaxed font-medium px-4 md:px-0">
                        {anime.synopsis}
                      </p>
                  </div>

                  {}
                  {mangaAdaptation.length > 0 && (
                    <div className="space-y-8">
                      <h3 className="text-2xl font-black text-white uppercase tracking-tighter border-l-4 border-primary pl-4">Manga Adaptation</h3>
                      <div className="grid sm:grid-cols-2 gap-4">
                        {mangaAdaptation.map((entry: any) => (
                          <a 
                            key={entry.mal_id} 
                            href={entry.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-6 rounded-[2rem] bg-white/5 border border-white/10 flex items-center justify-between group hover:border-primary/50 transition-all"
                          >
                            <span className="text-white font-bold">{entry.name}</span>
                            <ExternalLink size={16} className="text-muted-foreground group-hover:text-primary transition-transform group-hover:scale-110" />
                          </a>
                        ))}
                      </div>
                    </div>
                  )}
                </motion.div>
              )}

              {activeTab === 'episodes' && (
                <motion.div
                  key="episodes"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="space-y-8"
                >
                  {currentEpisode ? (
                    <Player
                      episodeId={`ep=${currentEpisode.mal_id}`}
                      animeId={anime.mal_id.toString()}
                      currentEp={{
                        episodeNumber: currentEpisode.mal_id,
                        isFiller: currentEpisode.filler
                      }}
                      changeEpisode={handleChangeEpisode}
                      hasNextEp={episodes.findIndex(ep => ep.mal_id === currentEpisode.mal_id) < episodes.length - 1}
                      hasPrevEp={episodes.findIndex(ep => ep.mal_id === currentEpisode.mal_id) > 0}
                    />
                  ) : (
                    <div className="w-full aspect-video bg-white/5 rounded-[2rem] border border-white/10 flex items-center justify-center">
                      <p className="text-muted-foreground font-bold uppercase tracking-widest">Select an episode to start watching</p>
                    </div>
                  )}

                  {episodes.length === 0 && (
                    <div className="text-center py-10 text-muted-foreground font-bold uppercase tracking-widest">
                      Loading episodes...
                    </div>
                  )}

                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                    {episodes.map((ep) => (
                      <button
                        key={ep.mal_id}
                        onClick={() => setCurrentEpisode(ep)}
                        className={cn(
                          "p-4 rounded-2xl border transition-all text-left group relative overflow-hidden hover:scale-105 active:scale-95",
                          currentEpisode?.mal_id === ep.mal_id
                            ? "bg-primary text-white border-primary shadow-lg shadow-primary/20"
                            : "bg-white/5 border-white/10 hover:border-primary/50 hover:bg-white/10"
                        )}
                      >
                        <div className="flex flex-col gap-1 relative z-10">
                          <span className={cn("text-[10px] font-black uppercase tracking-widest", currentEpisode?.mal_id === ep.mal_id ? "text-white/80" : "text-muted-foreground")}>
                            Episode {ep.mal_id}
                          </span>
                          <span className="font-bold line-clamp-1 text-sm">{ep.title || `Episode ${ep.mal_id}`}</span>
                        </div>
                        {ep.filler && (
                          <span className="absolute top-2 right-2 w-1.5 h-1.5 rounded-full bg-red-500 shadow-[0_0_10px_rgba(239,68,68,0.5)]" title="Filler" />
                        )}
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}

              {activeTab === 'characters' && (
                <motion.div
                  key="characters"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-8"
                >
                  <Tooltip.Provider delayDuration={0}>
                    {characters?.slice(0, 24).map((char: any) => (
                      <Tooltip.Root key={char.character.mal_id}>
                        <Tooltip.Trigger asChild>
                          <motion.div
                            whileHover={{ y: -10, scale: 1.02 }}
                            className="group relative aspect-[3/4.5] overflow-hidden rounded-[2rem] border border-white/5 bg-card cursor-pointer shadow-xl"
                          >
                            <img
                              src={char.character.images.webp.image_url}
                              alt={char.character.name}
                              className="h-full w-full object-cover transition-all duration-700 group-hover:scale-110 group-hover:rotate-1"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent opacity-80" />
                            <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-2 group-hover:translate-y-0 transition-transform">
                              <p className="text-sm font-black text-white leading-tight mb-1">{char.character.name}</p>
                              <p className="text-[10px] text-primary font-black uppercase tracking-[0.2em]">{char.role}</p>
                            </div>
                          </motion.div>
                        </Tooltip.Trigger>
                        <Tooltip.Portal>
                          <Tooltip.Content
                            className="z-50 max-w-[250px] rounded-2xl bg-[#08080a] p-5 text-xs text-white border-2 border-primary/30 shadow-[0_0_30px_rgba(59,130,246,0.3)] backdrop-blur-xl animate-in fade-in zoom-in-95 duration-100"
                            sideOffset={10}
                          >
                            <div className="space-y-3">
                              <div className="space-y-1">
                                <p className="font-black text-primary uppercase tracking-widest text-sm">{char.character.name}</p>
                                <p className="text-white/40 font-bold uppercase text-[10px] tracking-widest">{char.role} Character</p>
                              </div>
                              <div className="h-px bg-white/10" />
                              {char.voice_actors?.[0] && (
                                <div className="space-y-1">
                                  <p className="text-white/40 uppercase text-[10px] font-bold tracking-widest">Voice Actor</p>
                                  <p className="font-bold text-white">{char.voice_actors[0].person.name}</p>
                                </div>
                              )}
                            </div>
                            <Tooltip.Arrow className="fill-primary/30" />
                          </Tooltip.Content>
                        </Tooltip.Portal>
                      </Tooltip.Root>
                    ))}
                  </Tooltip.Provider>
                </motion.div>
              )}

              {activeTab === 'media' && (
                <motion.div
                  key="media"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="grid grid-cols-1 md:grid-cols-2 gap-8"
                >
                  {}
                  <div className="col-span-full grid md:grid-cols-2 gap-6">
                    {anime.relations?.map((rel: any, i: number) => (
                      <div key={i} className="p-8 rounded-[2.5rem] bg-white/5 border border-white/10 space-y-4 hover:border-primary/30 transition-all">
                        <h4 className="text-[10px] font-black text-primary uppercase tracking-[0.3em]">{rel.relation}</h4>
                        <div className="space-y-3">
                          {rel.entry.map((entry: any) => (
                            <Link 
                              key={entry.mal_id} 
                              href={entry.type === 'anime' ? `/anime/${entry.mal_id}` : entry.url}
                              className="flex items-center justify-between text-white font-bold group cursor-pointer"
                            >
                              <span className="group-hover:text-primary transition-colors">{entry.name}</span>
                              <ChevronRight size={16} className="text-muted-foreground group-hover:translate-x-1 transition-transform" />
                            </Link>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {}
          <div className="lg:col-span-4 space-y-12">
            <div className="p-10 rounded-[3rem] bg-card border border-border space-y-12 shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-3xl -z-10" />
              
              <div className="space-y-8">
                <h4 className="text-[10px] font-black text-white uppercase tracking-[0.4em] border-b border-white/10 pb-4">SPECIFICATIONS</h4>
                <div className="space-y-8">
                  {[
                    { label: 'Format', value: anime.type, icon: Play },
                    { label: 'Length', value: anime.episodes ? `${anime.episodes} Episodes` : 'Unknown', icon: Youtube },
                    { label: 'Status', value: anime.status, icon: Info },
                    { label: 'Premiere', value: anime.aired?.string, icon: Calendar },
                    { label: 'Runtime', value: anime.duration, icon: Clock },
                    { label: 'Source', value: anime.source, icon: Share2 },
                  ].map((item, idx) => (
                    <div key={idx} className="flex items-center gap-5 group">
                      <div className="w-12 h-12 rounded-[1rem] bg-white/5 border border-white/10 flex items-center justify-center text-primary group-hover:bg-primary/10 group-hover:border-primary/30 transition-all">
                        <item.icon size={22} />
                      </div>
                      <div>
                        <p className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.2em] mb-1 group-hover:text-primary transition-colors">{item.label}</p>
                        <p className="text-sm font-black text-white tracking-tight">{item.value}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-8 pt-8 border-t border-white/5">
                <h4 className="text-[10px] font-black text-white uppercase tracking-[0.4em]">Official Channels</h4>
                <div className="grid grid-cols-1 gap-4">
                  {externalLinks.map((link: any, idx: number) => (
                    <a 
                      key={idx}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-between p-5 rounded-[1.5rem] bg-white/5 border border-white/10 hover:border-primary/50 hover:bg-white/10 transition-all group"
                    >
                      <div className="flex items-center gap-4">
                        {link.name.toLowerCase().includes('twitter') ? <Twitter size={20} className="text-[#1DA1F2]" /> : 
                         link.name.toLowerCase().includes('youtube') ? <Youtube size={20} className="text-[#FF0000]" /> : 
                         <ExternalLink size={20} className="text-primary" />}
                        <span className="text-xs font-black text-white uppercase tracking-widest">{link.name}</span>
                      </div>
                      <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-all">
                        <ChevronRight size={14} />
                      </div>
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
          </div>
        </div>

        {}
        {recommendations.length > 0 && (
          <section className="container mt-24 md:mt-32 space-y-10 md:space-y-16">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 px-4 md:px-0">
              <div className="space-y-2">
                <h3 className="text-3xl md:text-5xl font-black text-white uppercase tracking-tighter">
                  YOU MIGHT <span className="text-primary">ALSO LIKE</span>
                </h3>
                <p className="text-muted-foreground font-bold uppercase tracking-widest text-xs md:text-sm">Based on similar themes and genres</p>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6 md:gap-8 px-4 md:px-0">
              {recommendations.map((rec: any, idx: number) => (
                <AnimeCard 
                  key={rec.entry.mal_id} 
                  anime={{
                    mal_id: rec.entry.mal_id,
                    title: rec.entry.title,
                    images: rec.entry.images,
                    score: 0, // Recommendations don't include scores usually
                    type: '',
                    episodes: 0,
                    genres: [] // Will fetch genres on hover/card if needed or just show title
                  }} 
                />
              ))}
            </div>
          </section>
        )}
      </div>
    );
  }
