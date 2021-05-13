import express from 'express';
import loaders from './loaders/index';

const port = process.env.PORT || 3001;

const startServer = async () => {
  const application = express();

  const app = await loaders(application);

  app.listen(port);
  console.log('Server running at port ', port);
};

startServer();
