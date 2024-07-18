
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


////////////////////////////////////////////////////////////////////        EXPRESS ex2
// GET request that receives an array of objects with info about books
// POST request that adds a new book object to the array of books and sends a confimration message
// PATCH request that updates the book that matches the title of the book send in the body
// object and sends back the updates book object

const express = require('express');
const app = express();
const port = 8080;
app.use(express.json()); // basically, do this every time; no idea why it's not in the boilerplate

const books = [
  {
    id: 1,
    title: 'Dune',
    author: 'Frank Herbert',
    rating: 5
  },
  {
    id: 2,
    title: 'Foundation',
    author: 'Isaac Asimov',
    rating: 5
  }
];

app.get('/api/books/', (req, res) => {
  res.status(200).send(books);
})

app.post('/api/books/', (req, res) => {
  const { title, author, } = req.body;  // replaces req.body.author, req.body.title, and req.body.id in newBook
  const newBook = {                     // this has no practical value; do not try to implement
    id: books.length +1,
    title, // replaced
    author, // replaced
    rating // replaced
  }
  books.push(newBook);
  res.status(201).send(`${title}'Added to library.`);
})

app.patch('/api/books/', (req, res) => {
  let foundFlag = false;
  let foundBook = {};
  books.forEach(book => {
    if (book.title === req.body.title) {
      foundFlag = true;
      book.rating = req.body.rating
      foundBook = book;
    }
  })
  if (foundFlag) {
    res.status(200).send(foundBook)
  } else {
    res.status(404).send('Book not found in library.')
  }
})

app.listen(port, () => console.log(`Express server listening on port ${port}.`))


////////////////////////////////////////////////////////////////////        EXPRESS PARAMS        /////////////////////////////
//
// http:...some-website.com/path/parameter?someQueryParamater=myVariable
//                   |  path param  |  query param (everything after ?)

// if the variable is required for the function, use path param   *** path params are part of URL
// if it is not, use the query param                              *** query params only extend URL

// practically: if a function requires changing the URL to the left of the '?' use path
// otherwise, use query for anything to the right of the '?'

// by using a colon ':' as a prefix in the route, path params can be mapped and paths made available from req.params

// a query param starts with the first '?' and ends with the first '#' (if any)
//
// http: //site.com/page.html?param1=[@field:fieldname1]&param2=[@field:fieldname2]
// |          URL           | |    | |   param value   | |    | |   param value
//                          param name                 param name

////////////////////////////////////////////////////////////////////        EXPRESS ex1
// npm start after boilerplate

const express = require('express');
const app = express();
const port = 8080;
app.use(express.json()); // basically, do this every time; no idea why it's not in the boilerplate

let myPlantData = [
  { id: 0, name: 'Lilac', fullSun: true },
  { id: 1, name: 'Sunflower', fullSun: true },
  { id: 2, name: 'Palm', fullSun: true },
  { id: 3, name: 'Lily', fullSun: false }
]

app.listen(port, () => console.log(`Express server listening on port ${port}.`)) // boilerplate that goes at the bottom

app.get('/', (req, res) => {

})

// get all plants
app.get('/plants', (req, res) => {
  res.status(200).send(myPlantData)
})

// get plant based on id being placed in the URL
// in essense, functions when http: .../plants/*user input*
app.get('/plants/:plantId', (req, res) => {
  var { plantId } = req.params;                 // still unnecessary, just pretty; don't implement
  let myPlant = myPlantData.find(element => {
    return element.id === parseInt(plantId);    // parseInt neededelse will search for a string
  })
  res.status(200).send(myPlant);
})

// get plants based on query in URL
// in essense, http:.../plants?fullSun=true
app.get('/plants', (req, res) => {
  let { fullSun } = request.query;

  if(fullSun !== undefined) {
    fullSun = fullSun === 'true';   // parses boolean in array into the if logic for use in filter
    let myPlants = myPlantData.filter(element => element.fullSun === fullSun);
    res.status(200).send(myPlants);
  } else {
    res.status(200).send(myPlantData);
  }
})

// post a new plant based on URL (data input in postman app)
// using postman (or something; see videos in express parameters content; might be irrelevant)
app.post('/plants', (req, res) => {
  let myPlant = request.body;

  let newPlant = {
    "id": myPlantData.length,
    ...myPlant
  }
  myPlantData.push(newPlant);
  res.status(201).send(newPlant);
})


// put endpoint to update a plant in the collection
// data coming from postman input
app.put('/plants/:plantId', (req, res) => {   // uses id as path param
  var { plantId } = req.params;   // this is still confusing and irrelevant, but with more complex data can have benefits

  let myPlantIndex = myPlantData.findIndex(element => {   // determines index of input plant in current array
    return element.id === parseInt(plantId);    // assigns determined index to myPlantIndex
  })

  if(myPlantIndex < 0) {    // above will return -1 if plant not found
    res.status(404).send(`Plant ID: ${plantId} does not exist in the database.`);
  } else {
    let updatedPlant = req.body;    // assigns value of request body to a variable
    myPlantData[myPlantIndex].name = updatedPlant.name;   // updates current array with request body (updatedPlant)
    myPlantData[myPlantIndex].fullSun = updatedPlant.fullSun;   // uses index determined above
    res.status(204).send(myPlantData[myPlantIndex]);
  }
})

