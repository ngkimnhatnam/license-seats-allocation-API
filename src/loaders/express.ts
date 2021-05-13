// Dependencies import
import express from 'express';
import { Request, Response, NextFunction, Application } from 'express';

// Routes import
import licenseRoutes from '../routes/licenses';

const ExpressLoaders = (app: Application): Application => {
  app.use(express.urlencoded({ extended: true }));

  //@ts-ignore
  app.use((req: Request, res: Response, next: NextFunction) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, authorization');
    next();
  });

  app.use(express.json({ limit: '10kb' }));
  app.use('/api/v1', licenseRoutes);

  return app;
};

export default ExpressLoaders;
