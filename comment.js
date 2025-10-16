//create web server
const http = require('http');
const fs = require('fs');
const path = require('path');

//create server object
http.createServer((req, res) => {
    //check if request is for favicon.ico
    if (req.url === '/favicon.ico') {
        res.writeHead(204);
        res.end();
        return;
    }

    //set response header
    res.writeHead(200, { 'Content-Type': 'text/html' });

    //read html file
    fs.readFile(path.join(__dirname, 'index.html'), (err, data) => {
        if (err) {
            res.writeHead(500);
            res.end('Error loading index.html');
            return;
        }
        //send html file to client
        res.end(data);
    });
}).listen(8080, () => {
    console.log('Server running at http://localhost:8080/');
});