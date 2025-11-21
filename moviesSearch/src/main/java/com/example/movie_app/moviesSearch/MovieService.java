package com.example.movie_app.moviesSearch;

// import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

// here we write the database access methods
@Service
public class MovieService {
    @Autowired // we want the framework to instantiate the class for us
    private MovieRepository movieRepository;

    public List<Movie> allMovies() {
        // I know this as mongodb's find all method that gets all existing movies?
        return movieRepository.findAll();
    }

    public Optional<Movie> oneMovie(String imdbID) {
        // I know this as mongodb's find all method that gets all existing movies?
        return movieRepository.findMovieByImdbID(imdbID);
        // to account for not being able to find a movie, have to let Java know to return null
    }
}
