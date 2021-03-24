const http = require('http');

const hostname = 'localhost';
const port = 5000;

const server = http.createServer((req, res) => {
    console.log(`Request for ${req.url} by method ${req.method}`);
    if (req.method === 'GET'){
        if (req.url == '/') {
            res.statusCode = 200;
            res.setHeader('Content-Type','text/html');
            res.end(`<html><body><h1>Home Page.</h1></body></html>`)
        } 
        else if (req.url == '/about') {
            res.statusCode = 200;
            res.setHeader('Content-Type','text/html');
            res.end(`<html><body><h1>About Page.</h1></body></html>`) 
        }  
        else if (req.url == '/contact') {
            res.statusCode = 200;
            res.setHeader('Content-Type','text/html');
            res.end(`<html><body><h1>Contact Page.</h1></body></html>`) 
        } 
        else{
            res.statusCode = 404;
            res.setHeader('Content-Type','text/html');
            res.end(`<html><body><h1>Invalid Request!</h1></body></html>`);
        }
    }
    else {
        res.statusCode = 404;
        res.setHeader('Content-Type','text/html');
        res.end(`<html><body><h1>Invalid Request!</h1></body></html>`);   
    }
});

server.listen(port, hostname, () => {
    console.log(`The NodeJS server on port 5000 is now running....`);
});