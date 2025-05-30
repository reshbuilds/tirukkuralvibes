import { useState, useEffect } from 'react';

export interface Kural {
  KuralID: number;
  VerseTamil: string[];
  VerseEnglish: string[];
  VerseTranslit: string[];
  highlight?: string;
}

export const useKurals = () => {
  const [kurals, setKurals] = useState<Kural[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchKurals = async () => {
      try {
        const response = await fetch('/tirukkural.json');
        if (!response.ok) {
          throw new Error('Failed to load Tirukkural data');
        }
        const data = await response.json();
        // Ensure we have valid data
        if (!Array.isArray(data) || data.length === 0) {
          throw new Error('Invalid data format');
        }
        setKurals(data);
      } catch (err) {
        console.error('Error loading Tirukkural data:', err);
        setError('Failed to load Tirukkural data. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchKurals();
  }, []);

  return { kurals, loading, error };
}
