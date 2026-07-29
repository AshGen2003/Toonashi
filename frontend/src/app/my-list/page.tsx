"use client";

import React from 'react';
import Navigation from '../../components/sections/navigation';
import Footer from '../../components/sections/footer';
import { useMyList, ListStatus } from '../../hooks/useMyList';
import { AnimeCard } from '../../components/AnimeCard';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Trash2, LayoutGrid, ListChecks } from 'lucide-react';
import Link from 'next/link';

import { toast } from 'sonner';

export default function MyListPage() {
  const { list, removeItem } = useMyList();
  const [filter, setFilter] = React.useState<ListStatus | 'All'>('All');

    const handleRemove = (id: number, title: string) => {
      removeItem(id);
      toast.error(`"${title}" deleted`, {
        description: "Removed from your list",
        icon: <Trash2 size={16} />,
        className: "bg-black border-red-500/20 text-white",
        descriptionClassName: "text-red-400",
      });
    };

  const filteredList = filter === 'All' 
    ? list 
    : list.filter(item => item.status === filter);

  const statuses: (ListStatus | 'All')[] = ['All', 'Watching', 'Plan to Watch', 'Completed'];

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      
      <main className="flex-1 container mx-auto px-4 md:px-8 py-12">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
          <div className="space-y-2">
            <h1 className="text-4xl font-extrabold text-white flex items-center gap-3">
              <Heart className="text-primary fill-primary" size={40} />
              My Anime List
            </h1>
            <p className="text-muted-foreground font-medium">
              You have {list.length} titles in your collection
            </p>
          </div>

          <div className="flex items-center gap-2 bg-card border border-border p-1 rounded-full self-start">
            {statuses.map((status) => (
              <button
                key={status}
                onClick={() => setFilter(status)}
                className={`px-6 py-2 rounded-full text-sm font-bold transition-all ${
                  filter === status 
                    ? "bg-primary text-white shadow-lg shadow-primary/20" 
                    : "text-muted-foreground hover:text-white hover:bg-white/5"
                }`}
              >
                {status}
              </button>
            ))}
          </div>
        </div>

        {filteredList.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-8">
            <AnimatePresence mode="popLayout">
              {filteredList.map((item) => (
                <motion.div
                  key={item.mal_id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="relative group"
                >
                  <AnimeCard anime={{
                    mal_id: item.mal_id,
                    title: item.title,
                    images: { webp: { image_url: item.image_url, large_image_url: item.image_url } },
                    score: 0,
                    type: '',
                    episodes: 0,
                    genres: []
                  }} />
                  
                  <div className="absolute top-2 left-2 z-20">
                    <span className={`px-2 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider shadow-lg ${
                      item.status === 'Completed' ? 'bg-green-500 text-white' :
                      item.status === 'Watching' ? 'bg-blue-500 text-white' :
                      'bg-yellow-500 text-white'
                    }`}>
                      {item.status}
                    </span>
                  </div>

                  <button
                    onClick={() => handleRemove(item.mal_id, item.title)}
                    className="absolute -top-2 -right-2 z-30 p-2 rounded-full bg-destructive text-white opacity-0 group-hover:opacity-100 transition-all hover:scale-110 shadow-xl"
                    title="Remove from list"
                  >
                    <Trash2 size={16} />
                  </button>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        ) : (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col items-center justify-center py-32 text-center space-y-6 bg-card/50 border border-border border-dashed rounded-[3rem]"
          >
            <div className="w-20 h-20 rounded-full bg-muted flex items-center justify-center">
              <div className="flex items-center justify-center">
                 <LayoutGrid size={40} className="text-muted-foreground" />
              </div>
            </div>
            <div className="space-y-2">
              <h3 className="text-2xl font-bold text-white">No titles found</h3>
              <p className="text-muted-foreground max-w-xs mx-auto">
                {filter === 'All' 
                  ? "Your list is empty. Start adding some anime to your collection!"
                  : `You don't have any titles marked as "${filter}" yet.`}
              </p>
            </div>
            <Link 
              href="/"
              className="px-10 py-4 rounded-full bg-primary text-white font-black text-lg transition-all hover:scale-105 active:scale-95 neon-glow"
            >
              Discover Anime
            </Link>
          </motion.div>
        )}
      </main>

      <Footer />
    </div>
  );
}




