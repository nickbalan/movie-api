const express = require('express');
	morgan = require('morgan');
	app = express();
	bodyParser = require('body-parser');
	methodOverride = require('method-override');
	uuid = require('uuid');

// Adds an arry with the list of Top 10 Worldwide Box Office (2021)
let movies = [
	{
		id: 1,
		ratings: 7,
		title:'Hi, Mom',
		director:'Jia Ling'
	},
	{
		id: 2,
		ratings: 7,
		title:'Detective Chinatown 3',
		director:'Chen Sicheng'
	},
	{
		id: 3,
		ratings: 7,
		title:'Godzilla vs. Kong',
		director:'Adam Wingard'
	},
	{
		id: 4,
		ratings: 7,
		title:'A Writers Odyssey',
		director:'Lu Yang'
	},
	{
		id: 5,
		ratings: 7,
		title:'Sister',
		director:'Ruoxin Yin'
	},
	{
		id: 6,
		ratings: 7,
		title:'Tom and Jerry',
		director:'William Hanna'
	},
	{
		id: 7,
		ratings: 7,
		title:'Raya and the Last Dragon',
		director:'Don Hall'
	},
	{
		id: 8,
		ratings: 7,
		title:'Endgame',
		director:'Anthony Russo'
	},
	{
		id: 9,
		ratings: 7,
		title:'Boonie Bears: The Wild Life',
		director:'Leon Ding'
	},
	{
		id: 10,
		ratings: 7,
		title:'Evangelion: 3.0+1.0 Thrice Upon a Time',
		director:'Hideaki Anno'
	}
];

// Adds a GET route located at the endpoint “/” that returns a default textual response
app.get('/', (req, res) => {
	res.send('Welcome to the movies-API');
});

//Implements Express.static to serve the “documentation.html” file
app.use(express.static('public'));

/* Implements an Express GET route located at the endpoint “/movies” that returns a JSON object containing data with Top 10 Worldwide Box Office (2021) */
app.get('/movies', (req, res) => {
	res.json(movies);
});

// Gets the data about a single movie, by title.
app.get('/movies/:title', (req, res) => {
  res.json(movies.find((movies) =>
    { return movies.title === req.params.title }));
});

// Adds data for a new movie to the list of movies.
app.post('/movies', (req, res) => {
  let newMovie = req.body;

  if (!newMovie.title) {
    const message = 'Missing name in request body';
    res.status(400).send(message);
  } else {
    newMovie.id = uuid.v4();
    movies.push(newMovie);
    res.status(201).send(newMovie);
  }
});

// Deletes a movie from the list by ID.
app.delete('/movies/:id', (req, res) => {
  let movie = movies.find((movie) => { return movie.id === req.params.id });

  if (movie) {
    movies = movies.filter((obj) => { return obj.id !== req.params.id });
    res.status(201).send('Movie ' + req.params.id + ' was deleted.');
  }
});

//Error-handling after the last endpoint
app.use((err, req, res, next) => {
	console.error(err.stack);
	res.status(500).send('Error!')
});

//Implements the Logs with Morgan in Express
app.use(morgan('common'));

//Implements Error Handling in Express
app.use(bodyParser.urlencoded({
	extended: true
}));

app.use(bodyParser.json());
app.use(methodOverride());

//Listens for requests on port 8080
app.listen(8080, () => {
	console.log('This app is listening on port 8080.');
});