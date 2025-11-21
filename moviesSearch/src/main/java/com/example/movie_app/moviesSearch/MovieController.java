// gonna write the rest api stuff here
package com.example.movie_app.moviesSearch;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Optional;
// import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;

@RestController // annotate the class as a rest controller
@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
@RequestMapping("api/v1/movies") // any requests to this route will be handled by this controller
public class MovieController {
    
    @Autowired
    private MovieService movieService;

    @GetMapping
    public ResponseEntity<List<Movie>> getAllMovies(){
        return new ResponseEntity<List<Movie>>(movieService.allMovies(), HttpStatus.OK);
    }

    @GetMapping("/{imdbId}")
    // @PathVariable is used to pass in the information that is received from the mapping
    public ResponseEntity<Optional<Movie>> getOneMovie(@PathVariable String imdbId){
        return new ResponseEntity<Optional<Movie>>(movieService.oneMovie(imdbId), HttpStatus.OK);
    }
}
