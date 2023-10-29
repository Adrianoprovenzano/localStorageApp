//still in work

const http = require('http');
const fs = require('fs');

const server = http.createServer((req, res) => {
    console.log(req.url, req.method);

    //set header content type
    res.setHeader('Content-Type', 'text/html');
     
    fs.readFile('dist/index.html', (err, data) => {
        if (err) {
            console.log(err); 
            res.end();   
        } else{
            res.end(data);   
        }
    }) 
});

server.listen(3000, 'localhost', () => {
    console.log('listening for request on port 3000');
});