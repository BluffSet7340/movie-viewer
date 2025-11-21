'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { Movie } from '@/lib/types';
import { fetchMovieByImdbId } from '@/lib/api';
import MovieDetails from '@/components/movie-details';
import ReviewSection from '@/components/review-section';
import Header from '@/components/header';

export default function MoviePage() {
  const params = useParams();
  const imdbID = params.imdbID as string;
  const [movie, setMovie] = useState<Movie | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadMovie = async () => {
      setIsLoading(true);
      const data = await fetchMovieByImdbId(imdbID);
      setMovie(data);
      setIsLoading(false);
    };
    loadMovie();
  }, [imdbID]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-2 border-primary border-t-transparent"></div>
      </div>
    );
  }

  if (!movie) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="container mx-auto px-4 py-8">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-foreground mb-4">Movie Not Found</h1>
            <p className="text-muted-foreground mb-6">
              The movie you&apos;re looking for doesn&apos;t exist or couldn&apos;t be loaded.
            </p>
            <a href="/" className="inline-block px-6 py-2 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition">
              Back to Movies
            </a>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-8 md:py-12">
        <a href="/" className="inline-flex items-center text-primary hover:opacity-80 transition mb-6">
          <span className="mr-2">←</span>
          Back to Movies
        </a>
        
        <MovieDetails movie={movie} />
        <ReviewSection movie={movie} />
      </main>
    </div>
  );
}
