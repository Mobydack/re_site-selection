const http = require('http');
const fs = require('fs');
const path = require('path');
const mime = require('mime');


http.createServer((req, res) => {
    let pathname = path.normalize(((req.url === "/") ? `${req.url}index.html` : req.url));
    fs.stat(pathname, (err, stats)=>{
        if(err) {
            res.writeHead(404);
            res.write('Resource missing 404');
            res.end();
        } else if(stats.isFile()) {
            let type = mime.getType(pathname);
            res.setHeader('Content-Type', type);
            let file = fs.createReadStream(pathname);
            file.on('open', () => {
                res.statusCode = 200;
                file.pipe(res);
            })
            file.on('error', (err) => {
                res.statusCode = 403;
                res.write('file permission');
                res.end();
            })
        } else {
            res.writeHead(403);
            res.write('Directory access is forbidden');
            res.end();
        }
    })
}).listen(process.env.PORT);


console.log(`server started on ${process.env.PORT} PORT`)