"use client";

import React from 'react';
import { AlertCircle } from 'lucide-react';
import { motion } from 'framer-motion';

const MaintenanceBanner = () => {
  return (
    <div className="w-full py-2 px-4">
        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mx-auto max-w-fit flex items-center justify-center gap-3 rounded-full
                  border border-primary/30
                  bg-primary/10
                  px-6 py-2
                  text-primary
                  neon-glow"
      >
        <AlertCircle 
          className="h-4 w-4 flex-shrink-0" 
          aria-hidden="true"
        />
        <p className="text-xs font-bold uppercase tracking-widest leading-tight">
          Status: Might be discontinued
        </p>
      </motion.div>
    </div>
  );
};

export default MaintenanceBanner;




