# MyFlix API

## Objective
To build the server-side component of a "movies" web application. The web application will provide users with access to information about different movies, directors, and genres. Users will be able to sign up or sign in, update their data and create a list of their favorite movies.

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

## Technical Requirements
- The API must be a Node.js and Express application
- The API must use REST architecture, with URL endpoints corresponding to the data operations listed above 
- The API must use at least three middleware modules, such as the body-parser package for reading data from requests and morgan for logging
- The API must use a "package.json" file. 
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
