// Dependencies import
import express from 'express';

// Controller import
import * as seatController from '../controllers/seats';

const router = express.Router();

router.post('/seats', seatController.addNewSeat);

export default router;
