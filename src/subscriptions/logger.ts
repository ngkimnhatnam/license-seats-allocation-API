// EventBus import
import event from './eventEmitter';

// Configs import
import logger from '../configs/logger';

/* General database error logging */
event.on('database-error', (err) => {
  const info = {
    level: 'error',
    subject: 'Database error',
    message: err,
  };
  logger(info);
});
