import express, { Application, Request, Response } from 'express';
const app: Application = express();
import cors from 'cors';
import { userRouets } from './app/moduels/user.rouets';

//parser
app.use(express.json());
app.use(cors());

//routes
app.use('/api/users', userRouets);

app.get('/', (req: Request, res: Response) => {
  res.send('Hello World!');
});

export default app;
