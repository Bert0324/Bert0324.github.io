import { createSecureServer } from 'http2';
import { readFileSync } from 'fs';

createSecureServer({
    key: readFileSync('./server/key.pem'),
    cert: readFileSync('./server/cert.pem')
}, (req, res) => {
    if (req.url === '/ajax') {
        res.setHeader("Access-Control-Allow-Origin", "*");
        res.setHeader("Access-Control-Allow-Methods","GET");
        res.setHeader('Access-Control-Expose-Headers', 'Location');
        res.setHeader('Location', 'https://www.qxwz.com');
        res.setHeader('Content-Type', 'text/html');
        res.writeHead(302);
    }
    res.end('response');
})
.on('listening', () => console.log('start'))
.on('error', e => console.log(e))
.listen(16003);


