// Dependencies import
import express from 'express';

// Controller import
import * as seatController from '../controllers/seats';

const router = express.Router();

router.post('/seats', seatController.addNewSeat);

router.post('/seats/release', seatController.releaseSeat);

export default router;
