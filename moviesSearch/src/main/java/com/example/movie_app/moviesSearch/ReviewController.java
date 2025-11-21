package com.example.movie_app.moviesSearch;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
@RequestMapping("/api/v1/reviews")
// we gon have just one post method
public class ReviewController {
    @Autowired
    private ReviewService reviewService;

    @PostMapping
    // whatever we get from the request body, use the map to convert into key string and value string
    public ResponseEntity<Review> addReview(@RequestBody Map<String, String> payload){
        // using the created status, code 201, meaning successfully created
        return new ResponseEntity<Review>(reviewService.addReview(payload.get("reviewBody"), payload.get("imdbID")), HttpStatus.CREATED);
    }
}
