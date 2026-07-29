"use client";

import React from 'react';
import Navigation from '@/components/sections/navigation';
import Footer from '@/components/sections/footer';
import { motion } from 'framer-motion';
import { History, CheckCircle2, AlertCircle, Clock } from 'lucide-react';

export default function UpdatesPage() {
    const versions = [
                { version: 'V2.2.0', date: 'Jan 30, 2026', changes: ['Implemented secure login authentication', 'Integrated backend services for data management', 'Added user session handling', 'Optimized backend performance'], status: 'Current' },
                { version: 'V2.1.1', date: 'Jan 19, 2026', changes: ['Reduced page load times by 30%', 'Fixed critical bugs in anime detail view', 'Improved error handling for API failures', 'Optimized image loading for better performance', 'Added keyboard shortcuts for navigation'], status: 'Previous' },
                { version: 'V2.1.0', date: 'Dec 11, 2025', changes: ['Improved search bar responsiveness and width', 'Rounded search bars and buttons site-wide', 'New icons for informational sections', 'Added NSFW tags for adult content', 'Redesigned My List delete feedback with custom popups', 'Enhanced Explore page with trending content', 'Resolved deployment lockfile conflicts'], status: 'Previous' },
                { version: 'V2.0.5', date: 'Dec 10, 2025', changes: ['Only show newest high-rated anime in slider', 'Added Year filter to Explore page', 'Custom dropdown filters for better UX', 'Replaced all alerts with smooth popups (sonner)', 'Fixed related media links in details', 'Removed all logo circle branding', 'Added "Fully Operational" status to footer', 'Rounded buttons for a more modern look'], status: 'Previous' },
                { version: 'V2.0.4', date: 'Dec 05, 2025', changes: ['Redesigned entire UI with Cyber-Noir aesthetic', 'Implemented character detail tooltips', 'Added Privacy Policy & Terms of Service'], status: 'Previous' },
                { version: 'V2.0.3', date: 'Nov 30, 2025', changes: ['Enhanced Hero Slider with Swiper modules', 'Improved Anime Detail View layout', 'Optimized mobile responsiveness'], status: 'Previous' },
                { version: 'V2.0.2', date: 'Nov 20, 2025', changes: ['Added instant character hover details', 'Fixed score glow effect', 'Updated social links to @PERFEE123'], status: 'Previous' },
                { version: 'V2.0.1', date: 'Nov 10, 2025', changes: ['Optimized Jikan API calls for faster loading', 'Fixed search grid spacing issues', 'Added share feature functionality'], status: 'Previous' },
                { version: 'V1.1.0', date: 'Oct 25, 2025', changes: ['Implemented Local Storage for My List', 'Added filtering by Watching/Planned/Completed', 'Enhanced image quality across site'], status: 'Previous' },
                { version: 'V1.0.5', date: 'Oct 05, 2025', changes: ['Added Genre Explorer section', 'Improved navigation bar stability', 'Fixed trailer embed sizing'], status: 'Previous' },
                { version: 'V1.0.2', date: 'Sep 15, 2025', changes: ['Added Info Cards for newcomers', 'Implemented basic search functionality', 'Refined typography'], status: 'Previous' },
                { version: 'V1.0.1', date: 'Aug 20, 2025', changes: ['Fixed major bugs in API integration', 'Added footer with social links', 'Improved loading states'], status: 'Previous' },
                { version: 'V1.0.0', date: 'Aug 01, 2025', changes: ['Initial release of Toonashi'], status: 'Birth' },
              ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      
      <main className="flex-1 container mx-auto px-4 md:px-8 py-24">
        <div className="max-w-4xl mx-auto space-y-16">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-2">
              <h1 className="text-5xl font-extrabold text-white flex items-center gap-4 tracking-tighter">
                <History className="text-primary" size={48} />
                Release Notes
              </h1>
              <p className="text-muted-foreground text-lg">Tracking the evolution of Toonashi from birth to now.</p>
            </div>

            <div className="px-6 py-3 rounded-2xl bg-primary/10 border border-primary/20 flex items-center gap-3">
                <AlertCircle size={20} className="text-primary" />
                <div>
                  <p className="text-xs font-bold text-primary uppercase tracking-widest">Current Status</p>
                  <p className="text-sm font-bold text-white">Fully Operational</p>
                </div>
            </div>
          </div>

          <div className="relative space-y-12 before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-primary before:via-border before:to-transparent">
            {versions.map((v, idx) => (
              <motion.div 
                key={v.version}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                viewport={{ once: true }}
                className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group"
              >
                  <div className="flex items-center justify-center w-10 h-10 rounded-full border border-border bg-card text-primary shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10">
                    <CheckCircle2 size={18} />
                  </div>

                <div className="w-[calc(100%-4rem)] md:w-[45%] p-6 rounded-3xl bg-card border border-border group-hover:border-primary/30 transition-all duration-300">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-extrabold text-white">{v.version}</h3>
                    <time className="text-xs font-bold text-muted-foreground uppercase tracking-widest">{v.date}</time>
                  </div>
                  <ul className="space-y-3">
                    {v.changes.map((change, i) => (
                      <li key={i} className="flex items-start gap-3 text-sm text-muted-foreground leading-relaxed">
                        <CheckCircle2 size={16} className="text-primary shrink-0 mt-0.5" />
                        {change}
                      </li>
                    ))}
                  </ul>
                  <div className="mt-6 flex justify-end">
                    <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest ${
                      v.status === 'Current' ? 'bg-primary text-white' : 'bg-white/5 text-muted-foreground'
                    }`}>
                      {v.status}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
