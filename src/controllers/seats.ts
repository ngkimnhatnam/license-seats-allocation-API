// Service import
import * as seatService from '../services/seats';

// Dependencies import
import { Request, Response } from 'express';

export const addNewSeat = async (req: Request, res: Response) => {
  const user_payload = {
    license_key: req.body.license_key,
    user_email: req.body.email,
  };
  try {
    const result = await seatService.handleSeatReservation(user_payload);
    res.status(result.status).json({ ...result });
  } catch (err) {
    res.status(err.status).json({ message: err.message });
  }
};
