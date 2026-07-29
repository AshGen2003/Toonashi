"use client";

import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface SettingsState {
  nsfwFilter: boolean;
  toggleNsfwFilter: () => void;
  setNsfwFilter: (value: boolean) => void;
}

export const useSettings = create<SettingsState>()(
  persist(
    (set) => ({
      nsfwFilter: true, // Default to true (ON - hiding/blurring NSFW)
      toggleNsfwFilter: () => set((state) => ({ nsfwFilter: !state.nsfwFilter })),
      setNsfwFilter: (value: boolean) => set({ nsfwFilter: value }),
    }),
    {
      name: 'animexus-settings',
    }
  )
);




