const express = require('express');
const morgan = require('morgan');
const	app = express();
const	bodyParser = require('body-parser');
const	methodOverride = require('method-override');
const	uuid = require('uuid');
	
//Integrating Mongoose
const	mongoose = require('mongoose');
const	Models = require('./models.js');

//Integrating CORS
const cors =require('cors');

//Integrating Passport module
const passport = require('passport');

//Integrating Express Validator
const {check, validationResult} = require('express-validator');

const	movie = Models.Movie;
const	user = Models.User;
const	director = Models.Director;
const genre = Models.Genre;

//Connect Mongoose to the local database
mongoose.connect('mongodb://127.0.0.1:27017/myFlixDB', {useNewUrlParser: true, useUnifiedTopology: true});

//Implements auth
let auth = require('./auth')(app);

//Implements the Logs with Morgan in Express
app.use(morgan('common'));

require('./passport');

//Implements CORS
app.use(cors());

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

// Adds a new user to the list of Users.
app.post('/users', [
		check('Username', 'Username is required').isLength({min: 6}),  //Only a minimum value of 6 characters are allowed
		check('Username', 'Username contains non alphanumeric characters - not allowed.'),  //Only alphanumeric characters are allowed
		check('Password', 'Password is required').not().isEmpty(),  //Which means "opposite of isEmpty". The password is not allowed to be "empty"
		check('Email', 'Email does not appear to be valid.').isEmail() //Only email format is allowed
	], (req, res) => {

		//Checks the validation object for errors
		let error = validationResult(req);
		if (!error.isEmpty()) {
			return res.status(422).json({error: error.array()});
		}
		
		let hashedPassword = user.hashPassword(req.body.Password); //Hashes the password
		user.findOne({Username: req.body.Username}) // Search to see if a user already exists
			.then((users) => {
				if (users) {
					return res.status(400).send(req.body.Username + ' already exists')
				} else {
					user.create({
						Username: req.body.Username,
						Password: hashedPassword,
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
app.put('/users/:Username', passport.authenticate('jwt', {session: false}), [
		check('Username', 'Username is required').isLength({min: 6}),  //Only a minimum value of 6 characters are allowed
		check('Username', 'Username contains non alphanumeric characters - not allowed.'),  //Only alphanumeric characters are allowed
		check('Password', 'Password is required').not().isEmpty(),  //Which means "opposite of isEmpty". The password is not allowed to be "empty"
		check('Email', 'Email does not appear to be valid').isEmail() //Only email format is allowed
	], (req, res) => {

		//Checks the validation object for errors
		let error = validationResult(req);
		if (!error.isEmpty()) {
			return res.status(422).json({error: error.array()});
		}
		
		let hashedPassword = user.hashPassword(req.body.Password); //Hashes the password	
	  updateUser = user.findOneAndUpdate({Username: req.params.Username}, {
	  	$set:{
	  		Username: req.body.Username,
	  		Password: hashedPassword,
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

// Gets the data about all users.
app.get('/users/all', passport.authenticate('jwt', {session: false}), (req, res) => {
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
const port = process.env.PORT || 8080;
app.listen(port, '0.0.0.0', () => {
	console.log('This app is listening on port: ' + port);
});