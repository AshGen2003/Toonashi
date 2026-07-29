"use client";

import React from 'react';
import Navigation from '../../components/sections/navigation';
import Footer from '../../components/sections/footer';
import { motion } from 'framer-motion';
import { Github, Linkedin, Mail, MessageSquare, ExternalLink } from 'lucide-react';

export default function ContactPage() {
  const contactInfo = {
    name: "AshGen",
    github: "https://github.com/AshGen927",
    linkedin: "https://www.linkedin.com/in/ashin-guwaneth-hettige/",
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      
      <main className="flex-1 container mx-auto px-4 md:px-8 py-24">
        <div className="max-w-4xl mx-auto space-y-16">
          <div className="text-center space-y-4">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-5xl md:text-7xl font-extrabold text-white tracking-tighter"
            >
              Get in <span className="text-primary">Touch</span>
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-muted-foreground text-xl max-w-2xl mx-auto"
            >
              Have suggestions or just want to say hi? I'm always open to discussing new projects, creative ideas, or opportunities to be part of your visions.
            </motion.p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="p-8 rounded-[3rem] bg-card border border-border space-y-8"
              >
                <div className="space-y-2">
                  <h3 className="text-2xl font-bold text-white">Contact Info</h3>
                  <p className="text-muted-foreground">Feel free to reach out via any of these platforms.</p>
                </div>

                <div className="space-y-4">
                  <a 
                    href={contactInfo.github} 
                    target="_blank" 
                    className="flex items-center justify-between p-4 rounded-full bg-white/5 border border-white/10 hover:border-primary/50 transition-all group"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                        <Github size={24} />
                      </div>
                      <div>
                        <p className="text-sm font-bold text-white">GitHub</p>
                        <p className="text-xs text-muted-foreground">AshGen</p>
                      </div>
                    </div>
                    <ExternalLink size={16} className="text-muted-foreground group-hover:text-primary transition-colors" />
                  </a>

                  <a 
                    href={contactInfo.linkedin} 
                    target="_blank" 
                    className="flex items-center justify-between p-4 rounded-full bg-white/5 border border-white/10 hover:border-primary/50 transition-all group"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                        <Linkedin size={24} />
                      </div>
                      <div>
                        <p className="text-sm font-bold text-white">LinkedIn</p>
                        <p className="text-xs text-muted-foreground">ashin-guwaneth-hettige</p>
                      </div>
                    </div>
                    <ExternalLink size={16} className="text-muted-foreground group-hover:text-primary transition-colors" />
                  </a>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
                className="p-8 rounded-[3rem] bg-primary/5 border border-primary/20 flex flex-col justify-center items-center text-center space-y-6"
              >
              <div className="w-20 h-20 rounded-full bg-primary/20 flex items-center justify-center text-primary neon-glow">
                <MessageSquare size={40} />
              </div>
              <div className="space-y-2">
                <h3 className="text-2xl font-bold text-white">Developer</h3>
                <p className="text-muted-foreground font-medium">This project is maintained by {contactInfo.name}.</p>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Focused on building high-performance, visually stunning web applications with modern technologies.
              </p>
            </motion.div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}




