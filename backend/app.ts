import express, { Express, Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

import authRoutes from './routes/authRoutes';
import gymRoutes from './routes/gymRoutes';
import memberRoutes from './routes/memberRoutes';
import slotRoutes from './routes/slotRoutes';
import subscriptionRoutes from './routes/subscriptionRoutes';
import paymentRoutes from './routes/paymentRoutes';
import webhookRoutes from './routes/webhookRoutes';

import { errorHandler } from './utils/errorHandler';

dotenv.config();

const app: Express = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/health', (req: Request, res: Response) => {
  res.json({ status: 'OK', message: 'Gymholic backend is running' });
});

app.use('/api/auth', authRoutes);
app.use('/api/gyms', gymRoutes);
app.use('/api/members', memberRoutes);
app.use('/api/slots', slotRoutes);
app.use('/api/subscriptions', subscriptionRoutes);
app.use('/api/payments', paymentRoutes);
app.use('/api/webhooks', webhookRoutes);

app.use((req: Request, res: Response) => {
  res.status(404).json({ error: 'Route not found' });
});

app.use(errorHandler);

export default app;
