import { Application } from 'express';
import expressLoader from './express';

export default async (expressApp: Application): Promise<Application> => {
  const app = expressLoader(expressApp);
  console.log('Express initialized');
  return app;
};
