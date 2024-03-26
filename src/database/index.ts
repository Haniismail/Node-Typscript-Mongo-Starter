import mongoose from 'mongoose';
import Logger from '../core/Logger';
import { db, environment } from '../config/envVar';
import { EMOJIS } from '../constants/emojis';

// Build the connection string
const dbURI = db.uri;
mongoose.set('strictQuery', false);

// Create the database connection
export async function connect() {
  await mongoose
    .connect(dbURI)
    .then(() => {
      Logger.info('Mongoose connection done');
    })
    .catch((e) => {
      Logger.info('Mongoose connection error');
      Logger.error(e);
    });
}

environment !== 'test' && connect(); // Connect to database only if not in test mode

// CONNECTION EVENTS

// When successfully connected
mongoose.connection.on('connected', () => {
  Logger.info(
    'Mongoose default connection open to ' + db.host + EMOJIS.SUCCESS
  );
});

// If the connection throws an error
mongoose.connection.on('error', (err) => {
  Logger.error('Mongoose default connection error: ' + err + EMOJIS.NO_ENTRY);
});

// When the connection is disconnected
mongoose.connection.on('disconnected', () => {
  Logger.info(
    'Mongoose default connection disconnected ' +
      EMOJIS.RAISED_HAND_WITH_FINGERS_SPLAYED
  );
});

// If the Node process ends, close the Mongoose connection
process.on('SIGINT', () => {
  mongoose.connection.close(() => {
    Logger.info(
      'Mongoose default connection disconnected through app termination'
    );
    process.exit(0);
  });
});
