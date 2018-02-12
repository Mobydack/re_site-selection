const http = require('http');
const fs = require('fs');
const path = require('path');
const url = require('url');
const execFile = require("child_process").execFile;
const zlib = require('zlib');

let mimeType = {
    ".html": "text/html;charset=utf-8", 
    ".png": "image/png", 
    ".svg": "image/svg+xml;charset=utf-8",
    ".jpeg": "image/jpeg",
    ".jpg": "image/jpeg",
    ".css": "text/css;charset=utf-8",
    ".js": "text/javascript;charset=utf-8",
    ".ttf": "application/x-font-ttf",
    ".otf": "application/x-font-opentype",
    ".woff": "application/font-woff",
    ".woff2": "application/font-woff2",
    ".eot": "application/vnd.ms-font-object"
}
let PORT = process.env.PORT || 3000;

const basePath = "./app"
http.createServer((req, res)=>{
    let urlPath = url.parse(req.url).pathname;
    let pathName = path.normalize(basePath + ((urlPath === "/") ? "/index.html" : urlPath));
    console.log(`urlPath: ${urlPath}\npathName: ${pathName}`);
    fs.stat(pathName, (err, stats) => {
        if(err) {
            res.writeHead(404)
            res.write('Error 404');
            res.end();
        }
        else if(stats.isFile()) {
                console.log(mimeType[path.parse(pathName).ext])
                res.setHeader('Content-Type', mimeType[path.parse(pathName).ext]);
                res.setHeader('Content-Encoding', "gzip");
                res.setHeader('Cache-Control', "no-cache")
                let file = fs.createReadStream(pathName);
                file.on('open', ()=>{
                    res.statusCode = 200;
                    // file.pipe(res);
                    file.pipe(zlib.createGzip()).pipe(res);
                });
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
    });
}).listen(PORT);

console.log(`Server running at ${PORT} port`);