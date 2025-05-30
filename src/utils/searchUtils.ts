import type { Kural } from '../hooks/useKurals';

export interface SearchResult {
  id: number;
  tamil: string[];
  english: string[];
  highlight: string;
  index: number;
}

export const searchKurals = (query: string, kurals: Kural[]): SearchResult[] => {
  if (!query.trim()) {
    return [];
  }

  const searchTerm = query.toLowerCase();
  
  return kurals
    .map((kural, index) => ({
      id: kural.KuralID,
      tamil: kural.VerseTamil,
      english: kural.VerseEnglish,
      highlight: searchTerm,
      index
    }))
    .filter(kural => 
      kural.tamil.some((line: string) => line.toLowerCase().includes(searchTerm)) ||
      kural.english.some((line: string) => line.toLowerCase().includes(searchTerm))
    )
    .slice(0, 10); // Limit to 10 results
};

// This function just splits the text into parts for highlighting
// The actual highlighting should be done in a React component
export const getHighlightedTextParts = (text: string, highlight: string): string[] => {
  if (!highlight) return [text];
  return text.split(new RegExp(`(${highlight})`, 'gi'));
};
