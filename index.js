// var http = require('http');
// var fs = require('fs');
// http.createServer(function (req, res) {

//   // Read file asynchronously, callback function is called eventually
//   fs.readFile('index.html', function(err, data) {
//     console.log('Executing the readFile callback');
//     res.writeHead(200, {'Content-Type': 'text/html'});
//     res.write(data);
//     return res.end();
//   });

var http = require('http');
var fs = require('fs');
http.createServer(function (req, res) {

  // Read file synchronously
  let data = fs.readFileSync('index.html');
  console.log('This logging executes after the file is read');

  res.writeHead(200, { 'Content-Type': 'text/html' });
  res.write(data);
  return res.end();

}).listen(8080);