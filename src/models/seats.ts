// Configs import
import SQL from '../configs/database';
import eventBus from '../subscriptions/eventEmitter';

export interface SeatCreationInput {
  license_id: number;
  user_email: string;
  lease_start: number;
  lease_end: number;
}

export const addOne = (payload: SeatCreationInput): Promise<number> => {
  return new Promise((resolve, reject) => {
    const { license_id, user_email, lease_start, lease_end } = payload;
    const sqlQuery = `INSERT INTO seats (license_id, user_email, lease_start, lease_end) 
    VALUES ($1,$2,$3,$4) 
    RETURNING id`;
    const queryValues = [license_id, user_email, lease_start, lease_end];

    SQL.query(sqlQuery, queryValues, (err, res) => {
      if (err) {
        eventBus.emit('database-error', err);
        reject(err);
      }
      resolve(res.rows[0].id);
    });
  });
};

export const countCurrentLicenseSeat = (license_id: number): Promise<string> => {
  return new Promise((resolve, reject) => {
    const sqlQuery = `SELECT COUNT(id) AS current_seats FROM seats 
      WHERE license_id = $1 AND lease_end > (SELECT EXTRACT(EPOCH FROM NOW()))`;
    const queryValues = [license_id];

    SQL.query(sqlQuery, queryValues, (err, res) => {
      if (err) {
        eventBus.emit('database-error', err);
        reject(err);
      }
      resolve(res.rows[0].current_seats);
    });
  });
};

export const findOneByLicenseIdAndEmail = (license_id: number, user_email: string): Promise<any[]> => {
  return new Promise((resolve, reject) => {
    const sqlQuery = `SELECT * FROM seats 
      WHERE license_id = $1 AND user_email = $2 AND lease_end > (SELECT EXTRACT(EPOCH FROM NOW()))`;
    const queryValues = [license_id, user_email];

    SQL.query(sqlQuery, queryValues, (err, res) => {
      if (err) {
        eventBus.emit('database-error', err);
        reject(err);
      }
      resolve(res.rows);
    });
  });
};

export const extendOne = (new_lease_end: number, seat_id: number) => {
  //@ts-ignore
  return new Promise((resolve, reject) => {
    const sqlQuery = `UPDATE seats SET lease_end = $1 
      WHERE id = $2`;
    const queryValues = [new_lease_end, seat_id];

    SQL.query(sqlQuery, queryValues, (err, res) => {
      if (err) {
        eventBus.emit('database-error', err);
        reject(err);
      }
      resolve(res);
    });
  });
};
