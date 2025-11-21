package com.example.movie_app.moviesSearch;

import java.util.Optional;

import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository // annotate as repo so that the framework knows that this is a repo
// this extends the mongo repository with type movie and id objectid
public interface MovieRepository extends MongoRepository<Movie, ObjectId> {
    // apparently the Spring mongodb is smart enuf to figure what I am doing here ??
    // hmm I think in this case you have to make sure that the property name matches the exact field on your mongodb database
    Optional<Movie> findMovieByImdbID(String imdbID);
}
