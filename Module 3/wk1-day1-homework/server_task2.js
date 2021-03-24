const http = require('http');

const hostname = 'localhost';
const port = 5000;

const path = require(`path`);
const fs = require(`fs`);

const server = http.createServer((req, res) => {
    console.log(`Request for ${req.url} by method ${req.method}`);
    if (req.method === 'GET'){
        let fileUrl = req.url;
        if(fileUrl === '/home' || fileUrl === '/'){
            fileUrl = '/home.html';
        }
        else if(fileUrl === '/about'){
            fileUrl = '/about.html';
        }
        else if(fileUrl === '/contact'){
            fileUrl = '/contact.html';
        }
        
        const filePath = path.resolve('./public' + fileUrl);
        const fileExt = path.extname(filePath);

        if (fileExt === '.html') {
            fs.access(filePath, err => {
                if (err) {
                    res.statusCode = 404;
                    res.setHeader('Content-Type','text/html');
                    res.end(`<html><body><h1>Invalid Request!</h1></body></html>`);   
                    return;
                }
                res.statusCode = 200;
                res.setHeader('Content-Type','text/html');

                fs.createReadStream(filePath).pipe(res);
            });
        } 
        else {
            res.statusCode = 404;
            res.setHeader('Content-Type','text/html');
            res.end(`<html><body><h1>Error 404:${fileUrl} is not an HTML file</h1></body></html>`);   
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