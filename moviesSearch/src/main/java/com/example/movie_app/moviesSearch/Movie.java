package com.example.movie_app.moviesSearch;

import java.util.List;

import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.DocumentReference;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Document(collection = "movies") // maps a class to a nosql database, in this case being Mongodb
@Data // lombok project and takes care of all the getter setter methods?
@AllArgsConstructor // make a constructor that takes all the fields below as an argument
@NoArgsConstructor // constructor that takes no parameters 
public class Movie {
    @Id //to make sure that each id in the database should be unique
    private ObjectId id;
    private  String imdbID;
    private String Title;
    private String Released;
    private String Metascore;
    private String imdbRating;
    private String Poster; // since I do not have the link for youtube trailer in my database
    private List<String> Genre; // my genre is a comma separated string, so will have to manipulate it later for the frontend prolly
    private List<String> Images; // array of images
    @DocumentReference // so this will store the Review as a separate collection on the db
    private List<Review> reviewID;
}
