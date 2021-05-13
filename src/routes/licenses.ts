// Dependencies import
import express from 'express';

// Controller import
import * as licenseController from '../controllers/licenses';

const router = express.Router();

router.post('/licenses', licenseController.addNewLicense);

router.post('/licenses/reservation', licenseController.reserveFromLicense);

export default router;
