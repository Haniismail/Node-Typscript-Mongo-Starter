import express, { Request, Response, NextFunction } from 'express';
import swaggerUI from 'swagger-ui-express';
import Logger from './core/Logger';
import cors from 'cors';
import { corsUrl, environment } from './config/envVar';
import './database'; // initialize database
import { NotFoundError, ApiError, InternalError } from './core/ApiError';
import routesV1 from './routes/v1';
import { specs } from './docs';

process.on('uncaughtException', (e) => {
  Logger.error(e);
});

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({ origin: corsUrl, optionsSuccessStatus: 200, credentials: true }));

app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(specs));

// Routes
app.use('/api/v1', routesV1);
app.use(express.static('media'));
app.use('/public', express.static('public'));

// catch 404 and forward to error handler
app.use((req, res, next) => next(new NotFoundError()));

// Middleware Error Handler
// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof ApiError) {
    ApiError.handle(err, res);
  } else {
    if (environment === 'development') {
      Logger.error(err);
      return res.status(500).send({ status: 'fail', message: err.message });
    }
    ApiError.handle(new InternalError(), res);
  }
});

export default app;
