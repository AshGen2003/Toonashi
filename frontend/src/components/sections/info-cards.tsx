"use client";

import React from 'react';
import { Info, ShieldCheck, Sparkles, Zap, Tv, Globe } from 'lucide-react';
import { motion } from 'framer-motion';

const InfoCards = () => {
    const cards = [
      {
        title: "What is Anime?",
        description: "Anime is a style of animation originating from Japan, known for vibrant art and complex storytelling. It encompasses many genres and has a massive global following.",
        icon: Sparkles,
        color: "text-primary",
        bg: "bg-primary/5"
      },
      {
        title: "About Toonashi",
        description: "Toonashi is your premium gateway to the world of anime. We provide up-to-date information on trending titles, ratings, and detailed character insights.",
        icon: Zap,
        color: "text-secondary",
        bg: "bg-secondary/5"
      }
    ];

  return (
    <section className="grid md:grid-cols-2 gap-8">
      {cards.map((card, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            viewport={{ once: true }}
                className="relative group p-6 md:p-10 rounded-[2rem] md:rounded-[3rem] bg-card border border-border overflow-hidden"
            >
              <div className="relative space-y-4 md:space-y-6">
                <div className={`w-12 h-12 md:w-14 md:h-14 rounded-full ${card.bg} flex items-center justify-center border border-white/5 shadow-inner`}>
                  <card.icon size={24} className={card.color} />
                </div>
                <h3 className="text-2xl md:text-3xl font-black text-white tracking-tight">{card.title}</h3>
                <p className="text-muted-foreground text-base md:text-lg leading-relaxed max-w-lg">
                  {card.description}
                </p>
              </div>

          </motion.div>
      ))}
    </section>
  );
};

export default InfoCards;




