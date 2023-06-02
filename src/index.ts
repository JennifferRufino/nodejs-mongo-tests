import dotenv from 'dotenv';
dotenv.config();
import config from 'config';
import connectToDatabase from './database';
import log from './utils/logger';
import createServer from './server';

const PORT = config.get<number>('port');

const app = createServer();

app.listen(3000, () => {
	log.info(`Server is listening at http://localhost:${3000}`);
	connectToDatabase();
});
