import { app } from './app.js';
import { env } from './env.js';

const port = env('PORT');

app.listen(port, () => {
	console.log(`Server running in: http://localhost:${port}`);
});

app.get('/', (req, res) => {
	res.send('Server online');
});
