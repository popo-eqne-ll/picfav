import { useState, useEffect, useCallback } from 'react';
import { postFavoriteStatus } from '../utils/api';

const FAVORITES_KEY = 'picfav_favorites';

const getInitialFavorites = (): Set<string> => {
  try {
    const item = window.localStorage.getItem(FAVORITES_KEY);
    return item ? new Set(JSON.parse(item)) : new Set();
  } catch (error) {
    console.error('Error reading from localStorage', error);
    return new Set();
  }
};

export const useFavorites = () => {
  const [favorites, setFavorites] = useState<Set<string>>(getInitialFavorites);

  useEffect(() => {
    try {
      window.localStorage.setItem(FAVORITES_KEY, JSON.stringify(Array.from(favorites)));
    } catch (error) {
      console.error('Error writing to localStorage', error);
    }
  }, [favorites]);

  const toggleFavorite = useCallback(async (photoUrl: string) => {
    const newFavorites = new Set(favorites);
    let status: 'favorited' | 'unfavorited';

    if (newFavorites.has(photoUrl)) {
      newFavorites.delete(photoUrl);
      status = 'unfavorited';
    } else {
      newFavorites.add(photoUrl);
      status = 'favorited';
    }

    setFavorites(newFavorites);
    await postFavoriteStatus(photoUrl, status);
  }, [favorites]);

  return { favorites, toggleFavorite };
};