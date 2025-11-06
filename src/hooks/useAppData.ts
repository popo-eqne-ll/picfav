import { useState, useEffect } from 'react';
import type { Performance } from '../types';
import localData from '../data.json'; // Import local data as fallback

const DATA_URL = import.meta.env.VITE_DATA_URL;

export const useAppData = () => {
  const [data, setData] = useState<Performance[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        let fetchedData: Performance[];
        if (DATA_URL) {
          console.log('Fetching data from URL:', DATA_URL);
          const response = await fetch(DATA_URL);
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          fetchedData = await response.json();
        } else {
          console.log('Using local data.');
          fetchedData = localData as Performance[];
        }
        setData(fetchedData);
      } catch (err) {
        console.error('Failed to load app data:', err);
        setError(err instanceof Error ? err.message : 'An unknown error occurred');
        // Fallback to local data on error if URL was used
        if (DATA_URL) {
          console.warn('Falling back to local data due to fetch error.');
          setData(localData as Performance[]);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []); // Empty dependency array means this runs once on mount

  return { data, loading, error };
};
