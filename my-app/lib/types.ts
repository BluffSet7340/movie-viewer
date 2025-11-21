export interface Review {
  id: string;
  body: string;
}

export interface Movie {
  id: string;
  imdbID: string;
  title: string;
  released: string;
  metascore: string;
  imdbRating: string;
  poster: string;
  genre: string[];
  images: string[];
  reviewID: Review[];
}
