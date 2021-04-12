import { createServer } from 'http';
import { InitObj } from './type.d';

(async () => {
    const { useApp, useRequest } = (await import(`./${process.argv[2].replace('module=', '')}`)).default as InitObj;
    const app = createServer((req, res) => {
        if (req.url === '/healthcheck') {
            res.write('OK');
            res.end();
        }
        useRequest?.(req, res);
    });
    app.listen(16003, () => {
        console.log('server start');
        useApp?.(app);
    })
    .on('error', e => console.log(`server error: ${JSON.stringify(e)}`));
})();
