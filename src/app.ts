import express, { Application, Request, Response } from 'express';
import router from './routes/index';

const app: Application = express();

app.use(express.json());

app.use('/api', router);

app.use((req: Request, res: Response) => {
  res.status(200).json({
    message: 'Application is running OK!',
  });
});

function testType(message: unknown) {
  return message;
}

testType('This is a test message');

export default app;
