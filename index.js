const express = require('express');
const morgan = require('morgan');
const	app = express();
const	bodyParser = require('body-parser');
const	methodOverride = require('method-override');
const	uuid = require('uuid');
	
//Integrating Mongoose with a REST API
const	mongoose = require('mongoose');
const	Models = require('./models.js');

let auth = require('./auth')(app);

//Integrationg Passport module
const passport = require('passport');
require('./passport');

const	movie = Models.Movie;
const	user = Models.User;
const	director = Models.Director;
const genre = Models.Genre;

//Connect Mongoose to the local database
mongoose.connect('mongodb://127.0.0.1:27017/myFlixDB', {useNewUrlParser: true, useUnifiedTopology: true});

//Implements the Logs with Morgan in Express
app.use(morgan('common'));

//Implements Error Handling in Express
app.use(bodyParser.urlencoded({
	extended: true
}));

app.use(bodyParser.json());

app.use(methodOverride());



// Adds a GET route located at the endpoint “/” that returns a default textual response
app.get('/', (req, res) => {
	res.send('Welcome to the movies-API');
});

/* Implements an Express GET route located at the endpoint “/movies” that returns a JSON object containing data with Top 10 Worldwide Box Office (2021) */
app.get('/movies', passport.authenticate('jwt', {session: false}), (req, res) => {
	movie.find()
		.then((movies) => {
			res.status(201).json(movies);
		})
		.catch((error) => {
			console.error(error);
			res.status(500).send('Error: ' + error);
		});
});

// Gets the data about a single movie, by title.
app.get('/movies/:Title', passport.authenticate('jwt', {session: false}), (req, res) => {
  movie.findOne({Title: req.params.Title})
  	.then((movie) => { 
  		res.status(201).json(movie);
  		})
  	.catch((error) => {
  		console.error(error);
  		res.status(500).send('Error: ' + error);
  });
});

// Gets the data about all genres.
app.get('/genres', passport.authenticate('jwt', {session: false}), (req, res) => {
	genre.find()
		.then((genres) => {
			res.status(201).json(genres);
		})
		.catch((error) => {
			console.error(error);
			res.status(500).send('Error: ' + error);
		});
});

// Gets the data about genre (description), by name.
app.get('/genres/:Name', passport.authenticate('jwt', {session: false}), (req, res) => {
  	genre.findOne({Name: req.params.Name})
		.then((genre) => {
			res.status(201).json(genre);
		})
		.catch((error) => {
			console.error(error);
			res.status(500).send('Error: ' + error);
		});
});

// Gets the data about all directores.
app.get('/directors', passport.authenticate('jwt', {session: false}), (req, res) => {
	director.find()
		.then((directors) => {
			res.status(201).json(directors);
		})
		.catch((error) => {
			console.error(error);
			res.status(500).send('Error: ' + error);
		});
});

// Gets the data about a single director, by name.
app.get('/directors/:Name', passport.authenticate('jwt', {session: false}), (req, res) => {
	director.findOne({Name: req.params.Name})
		.then((director) => {
			res.status(201).json(director);
		})
		.catch((error) => {
			console.error(error);
			res.status(500).send('Error: ' + error);
		});
});

// Gets the data about all users.
app.get('/users', (req, res) => {
		user.find()
		.then((users) => {
			res.status(201).json(users);
		})
		.catch((error) => {
			console.error(error);
			res.status(500).send('Error: ' + error);
		});
});

// Gets the data about a single user, by name.
app.get('/users/:Username', passport.authenticate('jwt', {session: false}), (req, res) => {
	user.findOne({Username: req.params.Username})
		.then((user) => {
			res.status(201).json(user);
		})
		.catch((error) => {
			console.error(error);
			res.status(500).send('Error: ' + error);
		});
});

// Adds a new user to the list of Users.
app.post('/users', (req, res) => {
  user.findOne({Username: req.body.Username})
		.then((users) => {
			if (users) {
				return res.status(400).send(req.body.Username + ' already exists')
			} else {
				user.create({
					Username: req.body.Username,
					Password: req.body.Password,
					Email: req.body.Email,
					Birthday: req.body.Birthday,
				})
				.then((users) => {
					res.status(201).json(users).send('New User created')
				})
				.catch((error) => {
					console.error(error);
					res.status(500).send('Error: ' + error);	
				})
			}
		})
		.catch((error) => {
			console.error(error);
			res.status(500).send('Error: ' + error);	
		});
});

// Updates username from the list of Users.
app.put('/users/:Username', passport.authenticate('jwt', {session: false}), (req, res) => {
  updateUser = user.findOneAndUpdate({Username: req.params.Username}, {
  	$set:{
  		Username: req.body.Username,
  		Password: req.body.Password,
  		Email: req.body.Email,
  		Birthday: req.body.Birthday
  	}
  },
  {new: true},
  (err, updateUser) => {
  	if(err) {
  		console.error(err);
  		res.status(500).send('Error: ' + err);		
  	} else {
  		res.json(updateUser);
  	}
  });  
});

// Adds the favorite movies to the list of favorites
app.put('/users/:Username/add-movies/:_id', passport.authenticate('jwt', {session: false}), function (req, res) {
	user.findOneAndUpdate({Username: req.params.Username}, { 
		$push: {FavoriteMovies: req.params._id}
	},
	{new: true},
  (err, updateUser) => {
  	if(err) {
  		console.error(err);
  		res.status(500).send('Error: ' + err);		
  	} else {
  		res.json(updateUser);
  	}
  });
});

// Removes the favorite movies to the list of favorites
app.delete('/users/:Username/delete-movies/:_id', passport.authenticate('jwt', {session: false}), function (req, res) {
	user.findOneAndUpdate({Username: req.params.Username}, { 
		$pull: {FavoriteMovies: req.params._id}
	},
	{new: true},
  (err, updateUser) => {
  	if(err) {
  		console.error(err);
  		res.status(500).send('Error: ' + err);		
  	} else {
  		res.json(updateUser);
  	}
  });
});

// Deletes the user from the list of Users, by username.
app.delete('/users/:Username', passport.authenticate('jwt', {session: false}), (req, res) => {
  user.findOneAndRemove({Username: req.params.Username}) 
  	.then((users) => {
  		if (!users) {
  			res.status(400).send(req.params.Username + ' was not found.');
  		} else {
  			res.status(200).send(req.params.Username + ' was deleted.');
  		}
  	})
  	.catch((err) => {
  		console.error(err);
  		res.status(500).send('Error: ' + err);
  		});
});

//Implements Express.static to serve the “documentation.html” file
app.use(express.static('public'));

//Error-handling after the last endpoint
app.use((err, req, res, next) => {
	console.error(err.stack);
	res.status(500).send('Error!' + err)
});

//Listens for requests on port 8080
app.listen(8080, () => {
	console.log('This app is listening on port 8080.');
});