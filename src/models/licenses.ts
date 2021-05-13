// Configs import
import SQL from '../configs/database';
import eventBus from '../subscriptions/eventEmitter';

export interface LicenseCreationInput {
  license_key: string;
  email_domain: string;
  user_count: number;
  lease_time: number;
}

interface License {
  id: number;
  license_key: string;
  email_domain: string;
  user_count: number;
  lease_time: number;
}

export const insertOne = (payload: LicenseCreationInput): Promise<number> => {
  return new Promise((resolve, reject) => {
    const { license_key, email_domain, user_count, lease_time } = payload;

    const sqlQuery = `INSERT INTO licenses (license_key, email_domain, user_count, lease_time) 
      VALUES ($1,$2,$3,$4) 
      RETURNING id`;
    const queryValues = [license_key, email_domain, user_count, lease_time];

    SQL.query(sqlQuery, queryValues, (err, res) => {
      if (err) {
        eventBus.emit('database-error', err);
        reject(err);
      }
      resolve(res.rows[0].id);
    });
  });
};

export const getOneByKeyName = (license_key: string): Promise<License[]> => {
  return new Promise((resolve, reject) => {
    const sqlQuery = `SELECT * FROM licenses 
      WHERE license_key = $1`;
    const queryValues = [license_key];

    SQL.query(sqlQuery, queryValues, (err, res) => {
      if (err) {
        eventBus.emit('database-error', err);
        reject(err);
      }
      resolve(res.rows);
    });
  });
};
