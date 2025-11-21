interface GenreFilterProps {
  genres: string[];
  selectedGenre: string;
  onGenreChange: (genre: string) => void;
}

export default function GenreFilter({ genres, selectedGenre, onGenreChange }: GenreFilterProps) {
  return (
    <div className="mb-8 flex flex-wrap gap-4">
      {genres.map((genre) => (
        <button
          key={genre}
          onClick={() => onGenreChange(genre)}
          className={`px-4 py-2 rounded-lg font-medium transition-all 
            border border-transparent ${
            selectedGenre === genre
              ? 'bg-primary text-primary-foreground'
              : 'bg-card text-foreground border hover:border-primary'
          }`}
        >
          {genre}
        </button>
      ))}
    </div>
  );
}
