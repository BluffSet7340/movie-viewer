package com.example.movie_app.moviesSearch;
// name of package

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication; // imports the springboot application annotation - used to let compiler know about what this class does
import org.springframework.web.bind.annotation.GetMapping;
// import statements, the first one is a class that contains a run method
import org.springframework.web.bind.annotation.RestController;

@SpringBootApplication
@RestController // using the rest api controller class
public class MoviesSearchApplication {

	public static void main(String[] args) {
		// to start the spring application and pass the application class to it
		SpringApplication.run(MoviesSearchApplication.class, args);
	}
// this GetMapping method cannot be declared inside of the main method since Java doesn't
// allow that
	@GetMapping("/root")
	public String apiRoot() {
		return "Hello, World!";
	}

}
