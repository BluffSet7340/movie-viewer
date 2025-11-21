import { Movie, Review } from './types';

// Fallback demo data
const DEMO_MOVIES: Movie[] = [
  {
    id: '1',
    imdbID: 'tt0111161',
    title: 'The Shawshank Redemption',
    released: '1994-10-14',
    metascore: '82',
    imdbRating: '9.3',
    poster: '/shawshank-redemption-poster.png',
    genre: ['Drama'],
    images: [
      '/prison-cell-scene.jpg',
      '/escape-tunnel-scene.jpg',
    ],
    reviewID: [
      { id: '1', body: 'One of the greatest films ever made. A masterpiece of storytelling and character development.' },
      { id: '2', body: 'Absolutely brilliant. The ending is perfect.' },
    ],
  },
  {
    id: '2',
    imdbID: 'tt0068646',
    title: 'The Godfather',
    released: '1972-03-24',
    metascore: '100',
    imdbRating: '9.2',
    poster: '/classic-mob-poster.png',
    genre: ['Crime', 'Drama'],
    images: [
      '/godfather-office-scene.jpg',
      '/wedding-scene-godfather.jpg',
    ],
    reviewID: [
      { id: '1', body: 'A timeless classic. The best mafia movie ever made.' },
      { id: '2', body: 'Marlon Brando is incredible. Every scene is memorable.' },
      { id: '3', body: 'Perfect in every way. A must-watch.' },
    ],
  },
  {
    id: '3',
    imdbID: 'tt0071562',
    title: 'The Godfather Part II',
    released: '1974-12-20',
    metascore: '90',
    imdbRating: '9.0',
    poster: '/godfather-part-2-poster.jpg',
    genre: ['Crime', 'Drama'],
    images: [
      '/godfather-2-scene.jpg',
    ],
    reviewID: [
      { id: '1', body: 'Sequels are rarely this good. This is an exception.' },
    ],
  },
  {
    id: '4',
    imdbID: 'tt0468569',
    title: 'The Dark Knight',
    released: '2008-07-18',
    metascore: '84',
    imdbRating: '9.0',
    poster: '/dark-knight-batman-poster.jpg',
    genre: ['Action', 'Crime', 'Drama'],
    images: [
      '/batman-dark-knight-scene.jpg',
      '/joker-scene.jpg',
    ],
    reviewID: [
      { id: '1', body: 'Heath Ledger is phenomenal as the Joker. A game-changing superhero film.' },
      { id: '2', body: 'The best Batman movie ever made.' },
    ],
  },
  {
    id: '5',
    imdbID: 'tt0110912',
    title: 'Pulp Fiction',
    released: '1994-10-14',
    metascore: '94',
    imdbRating: '8.9',
    poster: '/generic-movie-poster.png',
    genre: ['Crime', 'Drama'],
    images: [
      '/pulp-fiction-diner-scene.jpg',
    ],
    reviewID: [
      { id: '1', body: 'Tarantino is a genius. The dialogue is incredible.' },
    ],
  },
  {
    id: '6',
    imdbID: 'tt0816692',
    title: 'Interstellar',
    released: '2014-11-07',
    metascore: '74',
    imdbRating: '8.6',
    poster: '/interstellar-space-movie-poster.jpg',
    genre: ['Adventure', 'Drama', 'Sci-Fi'],
    images: [
      '/interstellar-space-wormhole.jpg',
      '/interstellar-black-hole.jpg',
    ],
    reviewID: [
      { id: '1', body: 'Mind-blowing. Christopher Nolan at his best.' },
      { id: '2', body: 'A stunning sci-fi epic.' },
    ],
  },
  {
    id: '7',
    imdbID: 'tt0137523',
    title: 'Fight Club',
    released: '1999-10-15',
    metascore: '67',
    imdbRating: '8.8',
    poster: '/fight-club-poster.png',
    genre: ['Drama'],
    images: [
      '/fight-club-scene.jpg',
    ],
    reviewID: [
      { id: '1', body: 'A cult classic with an unforgettable twist.' },
    ],
  },
  {
    id: '8',
    imdbID: 'tt0109830',
    title: 'Forrest Gump',
    released: '1994-07-06',
    metascore: '82',
    imdbRating: '8.8',
    poster: '/forrest-gump-poster.png',
    genre: ['Drama', 'Romance'],
    images: [
      '/forrest-gump-bench-scene.jpg',
    ],
    reviewID: [
      { id: '1', body: 'A beautiful story. Tom Hanks delivers a career-defining performance.' },
    ],
  },
];

export async function fetchAllMovies(): Promise<Movie[]> {
  try {
    const apiUrl = `${process.env.NEXT_PUBLIC_BASE_API_URL}/movies`;
    const response = await fetch(`${apiUrl}`, {
      cache: 'no-store',
    });
    
    if (!response.ok) {
      console.log('API failed, using demo data');
      return DEMO_MOVIES;
    }
    
    const data = await response.json();
    return data || DEMO_MOVIES;
  } catch (error) {
    console.log('API error:', error, 'using demo data');
    return DEMO_MOVIES;
  }
}

export async function fetchMovieByImdbId(imdbID: string): Promise<Movie | null> {
  try {
    const apiUrl = `${process.env.NEXT_PUBLIC_BASE_API_URL}`;
    const response = await fetch(`${apiUrl}/movies/${imdbID}`, {
      cache: 'no-store',
    });
    
    if (!response.ok) {
      // Fallback to find from demo data
      return DEMO_MOVIES.find(m => m.imdbID === imdbID) || null;
    }
    
    return await response.json();
  } catch (error) {
    console.log('API error:', error, 'searching demo data');
    return DEMO_MOVIES.find(m => m.imdbID === imdbID) || null;
  }
}

export async function addReviewToMovie(movieId: string, reviewText: string): Promise<void> {
  try {
    const apiUrl = `${process.env.NEXT_PUBLIC_BASE_API_URL}`;
    const response = await fetch(`${apiUrl}/reviews`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ imdbID: movieId, reviewBody: reviewText }),
    });
    
    if (!response.ok) {
      throw new Error('Failed to add review');
    } else{
      console.log("Review addition successful")
    }
  } catch (error) {
    console.log('Error adding review:', error);
    throw error;
  }
}
