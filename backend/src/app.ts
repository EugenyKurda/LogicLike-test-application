import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import { ipMiddleware } from './middleware/ip.middleware';
import { errorHandler, notFound } from './middleware/error.middleware';
import routes from './routes';

const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(ipMiddleware);

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
    message: {
        success: false,
        error: 'Too many requests from this IP, please try again later.'
    }
});
app.use('/api', limiter);
app.use('/api', routes);
app.use(notFound);
app.use(errorHandler);

export default app;