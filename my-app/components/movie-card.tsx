'use client';

import Link from 'next/link';
import { Movie } from '@/lib/types';
import Image from 'next/image';

interface MovieCardProps {
  movie: Movie;
}

export default function MovieCard({ movie }: MovieCardProps) {
  return (
    <Link href={`/movie/${movie.imdbID}`}>
      <div className="group cursor-pointer h-full">
        <div className="relative overflow-hidden rounded-lg bg-muted mb-4 aspect-2/3">
          <img
            src={movie.poster}
            alt={movie.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
            <div className="text-white text-center">
              <div className="text-sm font-semibold">View Details</div>
              <div className="text-xs mt-1">Click to explore</div>
            </div>
          </div>
        </div>
        
        <h3 className="font-semibold text-foreground text-balance group-hover:text-primary transition mb-1">
          {movie.title}
        </h3>
        
        <p className="text-sm text-muted-foreground mb-3">
          {movie.released.split('-')[0]}
        </p>
        
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1 bg-accent/10 text-accent px-2 py-1 rounded text-xs font-medium">
            ⭐ {movie.imdbRating}
          </span>
          <span className="text-xs text-muted-foreground">
            {movie.genre.slice(0, 2).join(', ')}
          </span>
        </div>
      </div>
    </Link>
  );
}
