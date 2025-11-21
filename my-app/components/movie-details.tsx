'use client';

import { Movie } from '@/lib/types';

interface MovieDetailsProps {
  movie: Movie;
}

export default function MovieDetails({ movie }: MovieDetailsProps) {
  return (
    <div className="bg-card rounded-lg border border-border overflow-hidden mb-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6 md:p-8">
        {/* Poster */}
        <div className="md:col-span-1">
          <img
            src={movie.poster || "/placeholder.svg"}
            alt={movie.title}
            className="w-full rounded-lg object-cover"
          />
        </div>

        {/* Details */}
        <div className="md:col-span-2">
          <h1 className="text-4xl font-bold text-foreground mb-2 text-balance">
            {movie.title}
          </h1>

          <div className="flex flex-wrap gap-2 mb-6">
            {movie.genre.map((genre) => (
              <span
                key={genre}
                className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium"
              >
                {genre}
              </span>
            ))}
          </div>

          <div className="space-y-4 mb-6">
            <div>
              <span className="text-muted-foreground text-sm">Release Date</span>
              <p className="text-foreground font-medium">
                {new Date(movie.released).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </p>
            </div>

            <div className="flex gap-4">
              <div>
                <span className="text-muted-foreground text-sm">IMDb Rating</span>
                <p className="text-3xl font-bold text-accent">{movie.imdbRating}/10</p>
              </div>
              {movie.metascore && (
                <div>
                  <span className="text-muted-foreground text-sm">Metascore</span>
                  <p className="text-3xl font-bold text-primary">{movie.metascore}</p>
                </div>
              )}
            </div>

            <div>
              <span className="text-muted-foreground text-sm">IMDB ID</span>
              <p className="text-foreground font-mono">{movie.imdbID}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Images Gallery */}
      {movie.images && movie.images.length > 0 && (
        <div className="border-t border-border p-6 md:p-8">
          <h2 className="text-2xl font-bold text-foreground mb-6">Gallery</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {movie.images.map((image, idx) => (
              <img
                key={idx}
                src={image || "/placeholder.svg"}
                alt={`${movie.title} scene ${idx + 1}`}
                className="w-full h-64 object-cover rounded-lg"
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
