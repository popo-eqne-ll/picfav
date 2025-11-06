import { useState, useEffect, useCallback } from 'react';
import { postFavoriteStatus } from '../utils/api';
import { trackEvent } from '../utils/ga';

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

  const toggleFavorite = useCallback(async (photoId: string) => {
    const newFavorites = new Set(favorites);
    let status: 'favorited' | 'unfavorited';

    if (newFavorites.has(photoId)) {
      newFavorites.delete(photoId);
      status = 'unfavorited';
    } else {
      newFavorites.add(photoId);
      status = 'favorited';
    }

    setFavorites(newFavorites);
    await postFavoriteStatus(photoId, status);

    // Track GA event
    trackEvent('favorite_action', {
      photo_id: photoId,
      action_type: status,
    });
  }, [favorites]);

  return { favorites, toggleFavorite };
};
