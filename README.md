# MyFlix API. Technical Case Study

## Objective
To build the server-side component of a "movies" web application. The web application will provide users with access to information about different movies, directors, and genres. Users will be able to sign up or sign in, update their data and create a list of their favorite movies.

## Context
It’s no longer enough for JavaScript developers to be alone skilled in Front-end development; it’s also essential for them to be able to interface with and even create their APIs. For this reason, I built a REST API for an application called “myFlix” that interacts with a database that stores data about different movies.

## My Role
- Full-Stack Web Developer

## The 5 W's
- Who? — My immediate users will be frontend developers who'll work on the client-side for the application based on what's been documented on the server side. The users of the myFlix application could also be movie enthusiasts who enjoy reading information about different movies
- What? — The complete server-side of my web application, including the server, business logic, and business layers of the application. It will consist of a well-designed REST API and
architected database built using JavaScript, Node.js, Express, and MongoDB. The REST API is accessible via commonly used HTTP methods like GET and POST. Similar HTTP methods (CRUD) can be used to retrieve data from the database and store that data in a non-relational way
- When? — Whenever users of myFlix are interacting with the application, the server-side of the application will be in use, processing their requests and performing operations against the
data in the database. These users will be able to use the myFlix application whenever they like to read information about different movies or update their user information, for instance, their list of "Favorite Movies"
- Where? — The application is hosted online. The myFlix application itself is responsive and can therefore be used anywhere and on any device, giving all users the same experience
- Why? — Movie enthusiasts want to be able to access information about different movies, directors, and genres. The server-side of the myFlix application will ensure they have access to this information, that their requests are processed, and that all necessary data is stored.

## User Stories
- As a user, I should be able to receive information on movies, directors, and genres so that I can learn more about movies I've watched or am interested in
- As a user, I should be able to create an account and log into it so that I can save data about my favorite movies
- As a web developer, I should be able to access the JSDoc Documentation.

## Technical Requirements & Solutions
- The API must be a Node.js and Express application
- The API must use REST architecture, with URL endpoints corresponding to the data operations listed above 
- The API must use at least three middleware modules, such as the body-parser package for reading data from requests and morgan for logging
- The API must use a "package.json" file 
- The database must be built using MongoDB 
- The business logic must be modeled with Mongoose
- The API must provide movie information in JSON format
- The JavaScript code must be error-free  
- The API must be tested in Postman
- The API must include user authentication and authorization code
- The API must include data validation logic
- The API must meet data security regulations
- The API source code must be deployed to a publicly accessible platform like GitHub
- The API must be deployed to Heroku
- The API must provide JSDoc Documentation.

## Essential Features
- Return a list of ALL movies to the user 
- Return data (description, genre, director, image URL, whether it's featured or not) about a single movie by title to the user 
- Return data about a genre (description) by name/title (e.g., "Thriller") 
- Return data about a director (bio, birth year, death year) by name 
- Allow new users to register 
- Allow users to update their user info (username, password, email, date of birth) 
- Allow users to add a movie to their list of favorites 
- Allow users to remove a movie from their list of favorites 
- Allow existing users to delete their accounts
- Allow web developers to access the JSDoc Documentation.

## Endpoint Documentation
Description  | URL |  Method  | Body data | Response                                           
-------------|-----|----------|-----------|----------
Display Welcome Page to the user|GET|/|none|A text message welcoming the user  
Get the list of all movies|/movies|GET|None|JSON object contains data (Genre, Director, _id, Title, Description, Featured, imgUrl) about all movie
Get the data about one movie by title|/movies/:title|GET|None|A JSON object contains data (Genre, Director, _id, Title, Description, Featured, imgUrl) about one movie of chose
Gets the list of all genres|/genres|GET|None|A JSON object contains data (_id, Name, Description) about the movie of chose
Gets the data about one genre by name|/genres/:name|GET|None|A JSON object contains data (_id, Name, Description) about the movie of chose
Gets the list of all directors|/directors|GET|None|A JSON object contains data (_id, Name, Bio, Birth) about all directors
Gets the data about one director by name|/directors/:name|GET|None|A JSON object contains data (_id, Name, Bio, Birth) about a single director, by name
Gets the list of all users|/users/all|GET|None|A JSON object contains data (FavoriteMovies, _id, Username, Password, Email, Birthday) about all users
Gets the data about one user by username|/users/:username|GET|None|A JSON object contains data (FavoriteMovies, _id, Username, Password, Email, Birthday) about a single user, by username
Adds a new user to the list of Users|/users|POST|A JSON object contains data (Username, Password, Email, Birthday), about a single user that was added, but no ID necessary|A JSON object contains data (FavoriteMovies, Username, Password, Email, Birthday), about a single user that was added, includins an ID
Deletes a user from the list of Users, by username|/users/:username|DELETE|None|A text message indicating that a user has been removed from the list of users
Updates username from the list of Users|/users/:username|PUT|A JSON object contains the updated data (Username, Password, Email, Birthday), about one user, but no ID necessary|A JSON object contains the updated data (FavoriteMovies, Username, Password, Email, Birthday), about one user, includins an ID
Adds the favorite movies to the list of favorites|/users/:username/add-favorites/:_id|PUT|None|A JSON object contains the updated data (FavoriteMovies, Username, Password, Email, Birthday), about one user, including the ID from the Movies in FavoriteMovies
Deletes the favorite movies to the list of favorites|/users/:username/remove-favorites/:_id|DELETE|None|A text message indicating that a favorite movie has been deleted to the list of favorites
