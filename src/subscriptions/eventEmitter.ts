import eventEmitter from 'events';
import('./logger');

const events = new eventEmitter.EventEmitter();

export default events;
