'use client';

import { useState, useEffect } from 'react';
import { Movie } from '@/lib/types';
import { fetchAllMovies } from '@/lib/api';
import MovieGrid from '@/components/movie-grid';
import GenreFilter from '@/components/genre-filter';
import Header from '@/components/header';
import SearchBar from '@/components/search-bar';

export default function HomePage() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [selectedGenre, setSelectedGenre] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadMovies = async () => {
      setIsLoading(true);
      const data = await fetchAllMovies();
      setMovies(data);
      setIsLoading(false);
      // console.log(data)
    };
    loadMovies();
  }, []);

  // Extract all unique genres
  const allGenres = ['All', ...new Set(movies.flatMap(m => m.genre))];

  const filteredMovies = movies.filter(m => {
    const genreMatch = selectedGenre === 'All' || m.genre.includes(selectedGenre);
    const searchMatch = m.title.toLowerCase().includes(searchQuery.toLowerCase());
    return genreMatch && searchMatch;
  });

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-8 md:py-12">
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2 text-balance">
            Discover Movies
          </h1>
          <p className="text-muted-foreground text-lg">
            Browse our collection of movies and read reviews from the community
          </p>
        </div>

        <SearchBar value={searchQuery} onChange={setSearchQuery} />

        <GenreFilter 
          genres={allGenres} 
          selectedGenre={selectedGenre}
          onGenreChange={setSelectedGenre}
        />

        {isLoading ? (
          <div className="flex items-center justify-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-2 border-primary border-t-transparent"></div>
          </div>
        ) : (
          <MovieGrid movies={filteredMovies} />
        )}
      </main>
    </div>
  );
}
