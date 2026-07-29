"use client";

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, Heart, MessageCircle, RefreshCw, Home, List } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { SignedIn, SignedOut, UserButton, SignInButton } from '@clerk/nextjs';
import { cn } from '@/lib/utils';

const Navigation = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  const pathname = usePathname();

    const navLinks = [
      { name: 'Home', href: '/', icon: Home },
      { name: 'Explore', href: '/explore', icon: Heart },
      { name: 'My List', href: '/my-list', icon: List },
      { name: 'Contact', href: '/contact', icon: MessageCircle },
      { name: 'Updates', href: '/updates', icon: RefreshCw },
    ];

    return (
      <header className="sticky top-0 z-50 w-full solid-header h-16">
        <div className="container mx-auto flex h-full items-center justify-between gap-4 px-4 md:px-8">
          {}
          <Link 
            href="/" 
            className="flex items-center gap-2 group transition-all"
          >
            <span className="font-bold tracking-tighter text-white text-2xl">
              Toon<span className="text-primary">ashi</span>
            </span>
          </Link>

        {}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => {
              const Icon = link.icon;
              const isActive = pathname === link.href;
              return (
                  <Link
                    key={link.name}
                    href={link.href}
                    className={cn(
                      "relative px-4 py-2 text-sm font-black uppercase tracking-[0.2em] transition-colors rounded-full group",
                      isActive ? "text-primary" : "text-muted-foreground hover:text-white"
                    )}
                  >
                    <div className="flex items-center gap-2">
                      <Icon size={16} className={cn(isActive && "text-primary")} />
                      {link.name}
                    </div>
                    {isActive && (
                      <motion.div
                        layoutId="nav-active"
                        className="absolute inset-0 bg-primary/10 rounded-full -z-10"
                        transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                      />
                    )}
                  </Link>
              );
            })}
          </nav>

        {}
        <div className="flex items-center gap-3">
          <SignedOut>
            {/* Replace Link with SignInButton for popup modal */}
            <SignInButton mode="modal">
              <button
                className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary border border-primary/20 text-sm font-semibold transition-all hover:bg-primary/20 active:scale-95"
                aria-label="Login"
              >
                <span>Login</span>
              </button>
            </SignInButton>
          </SignedOut>
          
          <SignedIn>
            <UserButton />
          </SignedIn>
          
          {}
          <button 
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 text-muted-foreground hover:text-white transition-colors"
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

        {}
        <AnimatePresence>
          {isOpen && (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setIsOpen(false)}
                className="fixed inset-0 bg-background/80 backdrop-blur-md z-40 md:hidden"
              />
              <motion.div
                initial={{ x: "100%" }}
                animate={{ x: 0 }}
                exit={{ x: "100%" }}
                transition={{ type: "spring", damping: 25, stiffness: 200 }}
                className="fixed top-0 right-0 bottom-0 w-[280px] bg-card border-l border-border z-50 md:hidden flex flex-col p-6 shadow-2xl"
              >
                <div className="flex items-center justify-between mb-8">
                  <span className="font-bold text-xl">Menu</span>
                  <button 
                    onClick={() => setIsOpen(false)}
                    className="p-2 rounded-full bg-white/5 text-white"
                  >
                    <X size={20} />
                  </button>
                </div>

                <div className="flex flex-col gap-2">
                  {navLinks.map((link) => {
                    const Icon = link.icon;
                    const isActive = pathname === link.href;
                    return (
                      <Link
                        key={link.name}
                        href={link.href}
                        onClick={() => setIsOpen(false)}
                        className={cn(
                          "flex items-center gap-4 p-4 rounded-xl transition-all active:scale-95",
                          isActive ? "bg-primary text-white shadow-lg shadow-primary/20" : "text-muted-foreground hover:bg-white/5 hover:text-white"
                        )}
                      >
                        <Icon size={20} />
                        <span className="font-bold text-lg">{link.name}</span>
                      </Link>
                    );
                  })}
                </div>

                <div className="mt-auto flex flex-col gap-3">
                  <SignedOut>
                    <SignInButton mode="modal">
                      <button
                        className="flex items-center justify-center gap-3 w-full py-4 rounded-xl bg-primary/10 text-primary border border-primary/20 font-bold transition-all active:scale-95"
                        aria-label="Login"
                      >
                        <span>Login</span>
                      </button>
                    </SignInButton>
                  </SignedOut>
                  <SignedIn>
                    <UserButton />
                  </SignedIn>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>

    </header>
  );
};

export default Navigation;
