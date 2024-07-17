
////////////////////////////////////////////////////////////////////        READ
// read file asynchronously, callback function is called eventually
var http = require('http');
var fs = require('fs');
http.createServer(function (req, res) {

  fs.readFile('index.html', function(err, data) {
    console.log('Executing the readFile callback');
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write(data);
    return res.end();
  });

  console.log('This logging is not blocked by the file read!');
}).listen(8080);


// read file synchronously
var http = require('http');
var fs = require('fs');
http.createServer(function (req, res) {

  let data = fs.readFileSync('index.html');
  console.log('This logging executes after the file is read');

  res.writeHead(200, { 'Content-Type': 'text/html' });
  res.write(data);
  return res.end();

}).listen(8080);


////////////////////////////////////////////////////////////////////        CREATE
// create new file using appendFile()
var fs = require('fs');

fs.appendFile('mynewfile1.txt', 'Hello content!', function (err) {
  if (err) throw err;
  console.log('Saved!');
});


// create new, empty file using open()
var fs = require('fs');

fs.open('mynewfile2.txt', 'w', function (err, file) {
  if (err) throw err;
  console.log('Saved!');
});


// create new file using writeFile()
var fs = require('fs');

fs.writeFile('mynewfile3.txt', 'Hello content!', function (err) {
  if (err) throw err;
  console.log('Saved!');
});


////////////////////////////////////////////////////////////////////        UPDATE
// update uing appendFile()
var fs = require('fs');

fs.appendFile('mynewfile1.txt', ' This is my text.', function (err) {
  if (err) throw err;
  console.log('Updated!');
});


// update using writefile()
var fs = require('fs');

fs.writeFile('mynewfile3.txt', 'This is my text', function (err) {
  if (err) throw err;
  console.log('Replaced!');
});


////////////////////////////////////////////////////////////////////        DELETE
// delete using unlink()
var fs = require('fs');

fs.unlink('mynewfile2.txt', function (err) {
  if (err) throw err;
  console.log('File deleted!');
});


////////////////////////////////////////////////////////////////////        RENAME
// rename using rename()
var fs = require('fs');

fs.rename('mynewfile1.txt', 'myrenamedfile.txt', function (err) {
  if (err) throw err;
  console.log('File Renamed!');
});


////////////////////////////////////////////////////////////////////        EXPRESS       /////////////////////////////////////
// terminal 'npm install express' first
import express from 'express';
const app = express();
const port = 8080;

app.get('/', (req, res) => res.send('Hello World!'))

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))


////////////////////////////////////////////////////////////////////        ROUTING

let moviesArr = [
  {
      "id": 1,
      "title": "Midnight In Paris",
      "runtime": 96,
      "release_year": 2011,
      "director": "Woody Allen",
  },
  {
      "id": 2,
      "title": "Titanic",
      "runtime": 210,
      "release_year": 1997,
      "director": "James Cameron",
  },
  {
      "id": 3,
      "title": "From Paris With Love",
      "runtime": 94,
      "release_year": 2010,
      "director": "Pierre Morel",
  },
]

////////////////////////////////////////////////////////////////////        GET
// route that resopnds with a list of all of the movies in the data set
app.get('/movies', (req, res) => {
  res.send(moviesArr)
})


////////////////////////////////////////////////////////////////////        POST
// route that responds on the route '/movies' on the app's homepage

app.use(express.json())         // need to include at the top in order to JSONify the req.body
app.post('/movies', (req, res) => {
  let movieToAdd = req.body;    // Access the body (payload) of the request
  moviesArr.push(movieToAdd);
  res.send(moviesArr);
})


////////////////////////////////////////////////////////////////////        PATCH
// route that responds to a request to the the '/movies/4' endpoint, to correct the spelling
app.patch('/movies/:id', (req, res) => {
  var { id } = req.params;
  let { title } = req.body;

  moviesArr.forEach((movie, index) => {
      if(movie.id == id) moviesArr[index].title = title;
  });
  var justAdded = moviesArr.find(movie => movie.id == id);
  res.send(justAdded);
})


////////////////////////////////////////////////////////////////////        PUT
// route that responds to a request to the '/movies/4' endpoint to replace the movie with another
app.put('/movies/:id', (req, res) => {
  var { id } = req.params;

  moviesArr.forEach((movie, index) => {
      if(movie.id == id) moviesArr[index] = {
          "id": id,
          "title": "Home Alone",
          "runtime": 103,
          "release_year": 1990,
          "director": "Chris Columbus"
      }
  });

  res.send(moviesArr);
})


////////////////////////////////////////////////////////////////////        DELETE
// route that responds to a request to the '/movies/4' endpoint to delete the movie added
app.delete('/movies/:id', (req, res) => {
  var { id } = req.params;
  var updatedMovies = moviesArr.filter(movie => movie.id != id);
  moviesArr = updatedMovies;

  res.send("Resource has been deleted.")
})


////////////////////////////////////////////////////////////////////        EXPRESS ex
// npm init
// npm install express
// npm install --globalnodemon
// npm start

// app.js
const express = require('express');
const app = express();
const port = 8080;

// node syntax
app.listen(port, () => console.log(`Express server listening on port ${port}.`))

// nodemon syntax (can be tested in postman)

app.use(express.json());

app.get('/', (req, res) => {
  res.status(200).send('Response from root route!')
})

app.post('/api', (req, res) => {
  console.log(req.body);
  res.status(201).send(`Body received: ${req.body.name}`)
})


// package.json
"scripts": {
  "start": "node / nodemon app.js"
}