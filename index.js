const express = require('express');
	morgan = require('morgan');
	app = express();
	bodyParser = require('body-parser');
	methodOverride = require('method-override');
	uuid = require('uuid');
	//Integrating Mongoose with a REST API
	mongoose = require('mongoose');
	Models = require('./models.js');

	movie = Models.movie;
	user = Models.user;
	director = Models.director;
	genre = Models.genre;

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

// Adds an arry with the list of Top 10 Worldwide Box Office (2021)
let movies = [
	{
		id: 1,
		ratings: 7,
		title:'Hi, Mom',
		genre : [
			'Comedy', 
			'Drama', 
			'Fantasy'
		],
		director: 'Jia Ling'
	},
	{
		id: 2,
		ratings: 6,
		title:'Detective Chinatown 3',
		genre: [ 
			'Action',
			'Adventure',
			'Comedy',
			'Mystery'
		],
		director: 'Sicheng Chen'
	},
	{
		id: 3,
		ratings: 7,
		title:'Godzilla vs. Kong',
		genre: [
			'Action', 
			'Sci-Fi', 
			'Thriller'
		],
		director: 'Adam Wingard'
	},
	{
		id: 4,
		ratings: 7,
		title:'A Writers Odyssey',
		genre: '-',
		director: '-'
	},
	{
		id: 5,
		ratings: 7,
		title:'Sister',
		genre: '-',
		director: '-'
	},
	{
		id: 6,
		ratings: 7,
		title:'Tom and Jerry',
		genre: '-',
		director: '-'
	},
	{
		id: 7,
		ratings: 7,
		title:'Raya and the Last Dragon',
		genre: '-',
		director: '-' 
	},
	{
		id: 8,
		ratings: 7,
		title:'Endgame',
		genre: '-',
		director: '-' 
	},
	{
		id: 9,
		ratings: 7,
		title:'Boonie Bears: The Wild Life',
		genre: '-',
		director: '-'
	},
	{
		id: 10,
		ratings: 7,
		title:'Evangelion: 3.0+1.0 Thrice Upon a Time',
		genre: '-',
		director: 'Hideaki Anno'
	}
];

let users = [
	{
		username: 'User1',
		password: 'Password1',
		favorites: 'Endgame'
	},
	{
		username: 'User2',
		password: 'Password2',
		favorites: '-'
	},
	{
		username: 'User3',
		password: 'Password3',
		favorites: '-'
	},
];

let directors = [
	{
		name: 'Hideaki Anno',
		bio: 'Hideaki Anno (born May 22, 1960) is a Japanese animator and filmmaker. He is best known for creating the anime series Neon Genesis Evangelion. His style has become defined by his postmodernist approach and the extensive portrayal of characters',
		birthYear: '1960',
		deathYear: '-'
	},
	{
		name: 'Jia Ling',
		bio: 'Jia was born Jia Yuling in 1982 in Xiangyang, Hubei. After graduating from the Central Academy of Drama in 2003 where she studied Xiangsheng performance, she worked with crosstalk performer Feng Gong appearing a series of short sketches.',
		birthYear: '1982',
		deathYear: '-'
	},
	{
		name: 'Adam Wingard',
		bio: 'At 19 Adam got his start in feature film making early with his directorial debut Home Sick, a slasher horror film starring Bill Moseley and Tom Toweles. However it was his second effort at 24 years old with the film Pop Skull that garnered him a talent to watch. Made for a budget of around 2000 dollars he managed to capture the attention of French Distribution company The Wild Bunch. The film went on to premiere at the prestigious Rome Film Festival and the American Film Institute Film Festival. His dark and sometimes abrasive directing/editing style has been compared to directors such as David Lynch, Darren Aronofsky, and Shinya Tsukamoto.',
		birthYear: '1982',
		deathYear: '-'
	},
	{
		name: 'Sicheng Chen',
		bio: 'Sicheng Chen was born on February 22, 1978 in Shenyang, Liaoning, China. He is an actor and writer, known for Detective Chinatown (2015), Beijing Love Story (2014) and Detective Chinatown 2 (2018). He has been married to Liya Tong since January 16, 2014.',
		birthYear: '1978',
		deathYear: '-'
	}
];

let genres = [
	{
		name: 'Comedy',
		description: 'Comedy is a genre of fiction consisting of discourses or works intended to be humorous or amusing by inducing laughter, especially in theatre, film, stand-up comedy, television, radio, books, or any other entertainment medium. The term originated in Ancient Greece: in Athenian democracy, the public opinion of voters was influenced by political satire performed by comic poets in theaters.'
	},
	{
		name: 'Fantasy',
		description: '-'
	},
	{
		name: 'Drama',
		description: '-'
	},
	{
		name: 'Fantasy',
		description: '-'
	},
	{
		name: 'Action',
		description: '-'
	},
	{
		name: 'Sci-Fi',
		description: '-'
	},
	{
		name: 'Drama',
		description: '-'
	},
	{
		name: 'Mystery',
		description: '-'
	},
	{
		name: 'Adventure',
		description: '-'
	},
	{
		name: 'Thriller',
		description: '-'
	},
]

// Adds a GET route located at the endpoint “/” that returns a default textual response
app.get('/', (req, res) => {
	res.send('Welcome to the movies-API');
});

//Implements Express.static to serve the “documentation.html” file
app.use('/documentation', express.static('public'));

/* Implements an Express GET route located at the endpoint “/movies” that returns a JSON object containing data with Top 10 Worldwide Box Office (2021) */
app.get('/movies', (req, res) => {
	res.json(movies);
});

// Gets the data about a single movie, by title.
app.get('/movies/:title', (req, res) => {
  let movie = res.json(movies.find((movie) =>
    { return movie.title === req.params.title}));
});

// Gets the data about all genres.
app.get('/genres', (req, res) => {
	res.json(genres);
});

// Gets the data about genre (description), by name.
app.get('/genres/:name', (req, res) => {
  let genre = res.json(genres.find((genre) =>
    { return genre.name === req.params.name}));
});

// Gets the data about all directores.
app.get('/directors', (req, res) => {
	res.json(directors);
});

// Gets the data about a single director, by name.
app.get('/directors/:name', (req, res) => {
let director = res.json(directors.find((director) =>
    { return director.name === req.params.name}));
});

// Gets the data about all users.
app.get('/users', (req, res) => {
	res.json(users);
});

// Gets the data about a single user, by username.
app.get('/users/:username', (req, res) => {
  let user = res.json(users.find((user) =>
    { return user.username === req.params.username}));
});

// Adds a new user to the list of Users.
app.post('/users', (req, res) => {
  let newUser = req.body;

  if (!newUser.username) {
    const message = 'Missing "username" in request body';
    res.status(400).send(message);
  } else {
    newUser.id = uuid.v4();
    users.push(newUser);
    res.status(201).send(newUser);
  }
});

// Deletes the user from the list of Users, by username.
app.delete('/users/:username', (req, res) => {
  let user = users.find((user) => { return user.username === req.params.username});

  if (user) {
    users.filter((obj) => { return obj.username !== req.params.username});
    res.status(201).send('User ' + req.params.username + ' has been deleted.');
   } else {
    res.status(404).send('User with the name ' + req.params.username + ' was not found.');
  }
});

// Updates username from the list of Users.
app.put('/users/:username', (req, res) => {
  let user = users.find((user) => { return user.username === req.params.username});

  if (user) {
  	users.filter((obj) => { return obj.username !== req.params.username});
    res.status(201).send('User information ' + req.params.username + ' has been updated.');
  } else {
    res.status(404).send('User with the name ' + req.params.username + ' was not found.');
  }
});

// Adds the favorite movies to the list of favorites
app.post('/users/:username/add-favorites', function(req, res) {
   res.status(201).send('The favorite movie has been added to the list of favorites');
});

// Removes the favorite movies from the list of favorites
app.delete('/users/:username/remove-favorites', function(req, res) {
	res.status(201).send('The favorite movie has been deleted from the list of favorites');
});	

//Error-handling after the last endpoint
app.use((err, req, res, next) => {
	console.error(err.stack);
	res.status(500).send('Error!' + err)
});

//Listens for requests on port 8080
app.listen(8080, () => {
	console.log('This app is listening on port 8080.');
});