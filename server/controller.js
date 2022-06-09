const movies = require("./db.json");

// include and initialize the rollbar library with your access token
var Rollbar = require('rollbar')
var rollbar = new Rollbar({
  accessToken: '1c74a569323244b580f89a1ca5fef461',
  captureUncaught: true,
  captureUnhandledRejections: true,
})

// record a generic message and send it to Rollbar
rollbar.log('Hello world!')

let globalId = 11;

module.exports = {
    getMovies: (req, res) => {
        res.status(200).send(movies);
    },
    deleteMovie: (req, res) => {
        let index = movies.findIndex((elem) => elem.id === +req.params.id);
        movies.splice(index, 1);
        console.log(movies);
        res.status(200).send(movies);
    },
    createMovies: (req, res) => {
        console.log(req.body);
        let { title, rating, imageURL } = req.body;

        let newMovie = {
          title: globalId,
          rating,
          imageURL,
        };

        movies.push(newMovie)
        globalId++ //globalId = globalId + 1
        res.status(200).send(movies);
    },
    updateMovie: (req, res) => {
        console.log(req.body, req.params, req.query);
        let id = req.params.id;
        let type = req.body.type;

        let index = movies.findIndex((elem) => +elem.id === +id);

        if (movies[index].rating === 5 && type === 'plus'){
            res.status(400).send('cannot set a rating above 5')
        } else if (moves[index].rating === 0 & type === 'minus'){
            res.status(400).send("cannot set a rating below a 0");
        } else if (type === 'plus') {
            movies[index].rating++
            res.status(200).send(movies)
        } else if (type === 'minus'){
            movies[index].rating--
            res.status(200).send(movies)
        } else {
            res.sendStatus(400);
        }
    },
};


