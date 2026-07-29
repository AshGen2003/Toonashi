"use client";

import { useState, useEffect } from 'react';

export type ListStatus = 'Completed' | 'Watching' | 'Plan to Watch';

export interface MyListItem {
  mal_id: number;
  title: string;
  image_url: string;
  status: ListStatus;
  addedAt: number;
}

export const useMyList = () => {
  const [list, setList] = useState<MyListItem[]>([]);

  useEffect(() => {
    const savedList = localStorage.getItem('animexus-mylist');
    if (savedList) {
      try {
        setList(JSON.parse(savedList));
      } catch (e) {
        console.error('Failed to parse list', e);
      }
    }
  }, []);

  const saveList = (newList: MyListItem[]) => {
    setList(newList);
    localStorage.setItem('animexus-mylist', JSON.stringify(newList));
  };

  const addItem = (anime: { mal_id: number; title: string; image_url: string }, status: ListStatus) => {
    const newList = [...list.filter(item => item.mal_id !== anime.mal_id), {
      ...anime,
      status,
      addedAt: Date.now()
    }];
    saveList(newList);
  };

  const removeItem = (mal_id: number) => {
    const newList = list.filter(item => item.mal_id !== mal_id);
    saveList(newList);
  };

  const getStatus = (mal_id: number) => {
    return list.find(item => item.mal_id === mal_id)?.status;
  };

  return { list, addItem, removeItem, getStatus };
};




