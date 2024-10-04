import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import { initialRenderState, Render, Timeline } from './models';
import selfsigned from 'selfsigned';
import https from 'https';

const app = express();
app.use(bodyParser.json());

const attrs = [{ name: 'commonName', value: 'localhost' }];
const pems = selfsigned.generate(attrs, { days: 365 });

let sequenceState: any;
let playbackState: Timeline = { length: 2000, paused: false, seeking: false, speed: 1, time: 150 };
let renderState: Render = initialRenderState;

app.post('/replay/render', (req: Request, res: Response) => {
	renderState = { ...renderState, ...req.body };
	console.log("Render Post: " + JSON.stringify(req.body));
	return res.status(200);
});

app.get('/replay/render', (req: Request, res: Response) => {
	res.json(renderState);
	console.log("Render Get: " + JSON.stringify(req.body));
})

app.post('/replay/playback', (req: Request, res: Response) => {
	playbackState = { ...playbackState, ...req.body };
	return res.status(200);
});

app.get('/replay/playback', (req: Request, res: Response) => {
	res.json(playbackState);
	console.log("Playback get: " + JSON.stringify(req.body));
})

app.post('/replay/sequence', (req: Request, res: Response) => {
	sequenceState = req.body;
	console.log("Sequence post: " + JSON.stringify(req.body));
	return res.status(200);
});

app.get('/replay/sequence', (req: Request, res: Response) => {
	res.json(sequenceState);
	console.log("Sequence Get: " + JSON.stringify(req.body));
})

https.createServer({
	key: pems.private,
	cert: pems.cert
}, app).listen(2999, () => {
	console.log(`HTTPS server running at https://localhost:2999`);
});
