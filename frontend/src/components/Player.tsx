"use client";

import React, { useState } from "react";
import { SkipBack, SkipForward } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface PlayerProps {
  episodeId: string;
  animeId: string;
  currentEp: {
    episodeNumber: number | string;
    isFiller?: boolean;
  };
  changeEpisode: (direction: "prev" | "next") => void;
  hasNextEp: boolean;
  hasPrevEp: boolean;
}

const Player = ({
  episodeId,
  animeId,
  currentEp,
  changeEpisode,
  hasNextEp,
  hasPrevEp,
}: PlayerProps) => {
  const [category, setCategory] = useState<"sub" | "dub">("sub");
  const [server, setServer] = useState<"vidPlay" | "streamSb">("vidPlay");

  const changeCategory = (newType: "sub" | "dub") => {
    if (newType !== category) {
      setCategory(newType);
    }
  };

  const changeServer = (newServer: "vidPlay" | "streamSb") => {
    if (newServer !== server) setServer(newServer);
  };

  return (
    <div className="flex flex-col w-full max-w-screen-xl mx-auto gap-6">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full bg-black aspect-video relative rounded-[1.5rem] md:rounded-[2.5rem] overflow-hidden shadow-2xl border-2 md:border-4 border-white/5"
      >
        <iframe
          src={`https://${
            server === "vidPlay" ? "vidplay.online" : "streamsb.com"
          }/e/${animeId}-episode-${currentEp.episodeNumber}`}
          className="w-full h-full border-none"
          allowFullScreen
          referrerPolicy="no-referrer"
          title={`Episode ${currentEp.episodeNumber}`}
        />
      </motion.div>
      
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="flex flex-wrap flex-col md:flex-row items-center justify-between p-4 md:p-6 gap-6 bg-white/5 border border-white/10 rounded-[2rem] backdrop-blur-md"
      >
        <div className="flex flex-wrap justify-center gap-4">
          <div className="flex items-center gap-1 bg-black/20 p-1.5 rounded-full border border-white/5">
            <button
              onClick={() => changeServer("vidPlay")}
              className={cn(
                "px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-widest transition-all",
                server === "vidPlay"
                  ? "bg-primary text-white shadow-lg shadow-primary/20"
                  : "text-white/60 hover:text-white hover:bg-white/5"
              )}
            >
              VidPlay
            </button>
            <button
              onClick={() => changeServer("streamSb")}
              className={cn(
                "px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-widest transition-all",
                server === "streamSb"
                  ? "bg-primary text-white shadow-lg shadow-primary/20"
                  : "text-white/60 hover:text-white hover:bg-white/5"
              )}
            >
              StreamSB
            </button>
          </div>

          <div className="flex items-center gap-1 bg-black/20 p-1.5 rounded-full border border-white/5">
            {(["sub", "dub"] as const).map((type) => (
              <button
                key={type}
                onClick={() => changeCategory(type)}
                className={cn(
                  "px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-widest transition-all",
                  category === type
                    ? "bg-primary text-white shadow-lg shadow-primary/20"
                    : "text-white/60 hover:text-white hover:bg-white/5"
                )}
              >
                {type}
              </button>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-4 w-full md:w-auto justify-between md:justify-end">
            {hasPrevEp && (
              <button
                title="Previous Episode"
                className="p-4 rounded-full bg-white/5 text-white hover:bg-primary hover:text-white border border-white/10 transition-all active:scale-95"
                onClick={() => changeEpisode("prev")}
              >
                <SkipBack size={20} />
              </button>
            )}
            
            <div className="flex flex-col items-center px-4">
              <span className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.2em] mb-1">Now Watching</span>
              <span className="text-xl font-black text-white tracking-tight">Episode {currentEp.episodeNumber}</span>
              {currentEp.isFiller && (
                <span className="text-red-400 text-[9px] font-black uppercase tracking-widest mt-1 bg-red-500/10 px-2 py-0.5 rounded-full border border-red-500/20">
                  Filler
                </span>
              )}
            </div>

            {hasNextEp && (
              <button
                title="Next Episode"
                className="p-4 rounded-full bg-white/5 text-white hover:bg-primary hover:text-white border border-white/10 transition-all active:scale-95"
                onClick={() => changeEpisode("next")}
              >
                <SkipForward size={20} />
              </button>
            )}
        </div>
      </motion.div>
    </div>
  );
};

export default Player;