import express, { Request, Response, json, NextFunction } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import config from 'config';
import morgan from 'morgan';
import routes from './route';
import log from './utils/logger';

const createServer = () => {
	const app = express();

	app.use(json());
	app.use(cors());
	app.use(helmet());
	app.use(morgan(config.get<string>('env') == 'production' ? 'prod' : 'dev'));

	app.get('/', (_req, res) => {
		return res.send('Hello, visitor!');
	});

	app.use('/api', routes);

	app.use((_req, res) => {
		return res.status(404).json({
			message: 'API not found!',
		});
	});

	app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
		if (process.env.NODE_ENV !== 'test') {
			log.error(err);
		}
		const type = err?.type;
		const message = err.message || 'INTERNAL SERVER ERROR';
		const stack = err?.stack;
		const statusCode = err.status || err.statusCode || 500;

		return res.status(statusCode).json({
			type,
			message,
			stack,
		});
	});

	return app;
};

export default createServer;
