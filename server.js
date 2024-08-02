import mysql from 'mysql';
import config from './config.js';
import fetch from 'node-fetch';
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import bodyParser from 'body-parser';
import response from 'express';
import cors from 'cors';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
app.use(cors());
app.use(express.static(path.join(__dirname, "client/build")));

const connection = mysql.createConnection(config);

connection.connect((err) => {
	if (err) {
	  console.error('Error connecting to the database:', err);
	  return;
	}
	console.log('Connected to the database');
  });

app.post('/api/loadUserSettings', (req, res) => {

	let userID = req.body.userID;

	let sql = `SELECT mode FROM user WHERE userID = ?`;
	console.log(sql);
	let data = [userID];
	console.log(data);

	connection.query(sql, data, (error, results, fields) => {
		if (error) {
			return console.error(error.message);
		}

		let string = JSON.stringify(results);
		res.send({ express: string });
	});
});


// Endpoint to get movies
app.post('/api/getMovies', (req, res) => {

	let sql = 'SELECT * FROM movies';

	connection.query(sql, (error, results) => {
	  if (error) {
		return console.error('Error fetching movies:', error);
	  }
	  res.send(results);
	});
  });

// Endpoint to add reviews
app.post('/api/addReview', (req, res) => {

	const { movieID, userID, reviewTitle, reviewContent, reviewScore } = req.body;
	
	let sql = `
		INSERT INTO Review (reviewTitle, reviewContent, reviewScore, userID, movieID)
		VALUES (?, ?, ?, ?, ?)
		`;
	
	let values = [reviewTitle, reviewContent, reviewScore, userID, movieID];

	connection.query(sql, values, (error, results) => {
		if (error) {
			return console.error('Error adding review:', error);
		}
		res.json('Success!');
	});
});

// Endpoint to find movies
app.post('/api/findMovie', (req, res) => {
	let movieSearchTerm = req.body.movieSearchTerm;
	let actorSearchTerm = req.body.actorSearchTerm;
	let directorSearchTerm = req.body.directorSearchTerm;

	console.log("movieSearchTerm: ", movieSearchTerm);
	console.log("actorSearchTerm: ", actorSearchTerm);
	console.log("directorSearchTerm: ", directorSearchTerm);

	let sql = `
    SELECT 
    m.name AS movie, 
    GROUP_CONCAT(DISTINCT CONCAT(d.first_name, ' ', d.last_name) SEPARATOR ', ') AS director, 
    r_agg.average_rating,
    r_agg.reviewTitles,
    r_agg.reviewContents,
    r_agg.reviewScores
FROM 
    movies m
    JOIN movies_directors md ON md.movie_id = m.id
    JOIN directors d ON md.director_id = d.id
    JOIN roles r ON r.movie_id = m.id
    JOIN actors a ON a.id = r.actor_id
    LEFT JOIN (
        SELECT 
            movieID,
            GROUP_CONCAT(reviewTitle SEPARATOR ', ') AS reviewTitles,
            GROUP_CONCAT(reviewContent SEPARATOR ', ') AS reviewContents,
            GROUP_CONCAT(reviewScore SEPARATOR ', ') AS reviewScores,
            AVG(reviewScore) AS average_rating
        FROM
            Review
        GROUP BY
            movieID
    ) r_agg ON r_agg.movieID = m.id
	WHERE
    	1 = 1`;

	let data = [];
	
	if (movieSearchTerm) {
		sql += ` AND m.name LIKE ?`;
		data.push(`%${movieSearchTerm}%`);
	  }

	if (actorSearchTerm) {
		sql += ` AND CONCAT(a.first_name, ' ', a.last_name) LIKE ?`;
		data.push(`%${actorSearchTerm}%`);
	  }
	
	if (directorSearchTerm) {
		sql += ` AND CONCAT(d.first_name, ' ', d.last_name) LIKE ?`;
		data.push(`%${directorSearchTerm}%`);
	  }
	
	sql += ` GROUP BY m.id, r_agg.average_rating, r_agg.reviewTitles, r_agg.reviewContents, r_agg.reviewScores;`;
	console.log(sql);
	console.log(data);

	connection.query(sql, data, (error, results) => {
		if (error) {
			return console.error(error.message);
		}
		console.log(results);
		res.send(results);
	});
});

// Endpoint to find user
app.post('/api/findUser', (req, res) => {
	let username = req.body.username;
	let userPassword = req.body.userPassword;

	let data = [username, userPassword]

	let sql = `SELECT * 
	FROM User
	WHERE
	username = ?
	AND userPassword = ?
	`;

	console.log(sql);
	console.log(data);

	connection.query(sql, data, (error, results) => {
		if (error) {
			return console.error(error.message);
		}
		console.log(results);
		res.send(results);
	});
});

// Endpoint to find info
app.post('/api/findUserInfo', (req, res) => {
	let userID = req.body.userID;

	let data = [userID]

	let sql = `SELECT
	    GROUP_CONCAT(m.name SEPARATOR ', ') AS movies,
		GROUP_CONCAT(r.reviewTitle SEPARATOR ', ') AS reviewTitles,
        GROUP_CONCAT(r.reviewContent SEPARATOR ', ') AS reviewContents,
        GROUP_CONCAT(r.reviewScore SEPARATOR ', ') AS reviewScores
	FROM Review r
	JOIN movies m ON r.movieID = m.id
	WHERE
		userID = ?;
	`;

	console.log(sql);
	console.log(data);

	connection.query(sql, data, (error, results) => {
		if (error) {
			return console.error(error.message);
		}
		console.log(results);
		res.send(results);
	});
});

// Endpoint to add user
app.post('/api/addUser', (req, res) => {

	const { username, userPassword, firstName, lastName, email, phone, dateOfBirth } = req.body;
	
	let sql = `
		INSERT INTO User (username, userPassword, firstName, lastName, email, phone, dateOfBirth)
		VALUES (?, ?, ?, ?, ?, ?, ?)
		`;
	
	let values = [username, userPassword, firstName, lastName, email, phone, dateOfBirth];

	connection.query(sql, values, (error, results) => {
		if (error) {
			return console.error('Error adding user:', error);
		}
		res.json('Success!');
	});
});

app.listen(port, () => console.log(`Listening on port ${port}`)); //for the dev version
//app.listen(port, '172.31.31.77'); //for the deployed version, specify the IP address of the server