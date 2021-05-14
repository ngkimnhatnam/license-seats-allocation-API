// Dependencies import
import express from 'express';

// Controller import
import * as licenseController from '../controllers/licenses';

const router = express.Router();

/**
 * @swagger
 * paths:
 *  /api/v1/licenses:
 *   post:
 *     tags:
 *       - Licenses
 *     name: Register A New license
 *     summary: Register A New license
 *     description: "This API is used to register a new license into the system"
 *     consumes:
 *       - application/json
 *     produces:
 *       - application/json
 *     parameters:
 *       - in: body
 *         name: body
 *         description: "License Data Payload"
 *         schema:
 *           type: object
 *           properties:
 *             license_key:
 *               type: string
 *               example: ABC-DEF
 *             email_domain:
 *               type: string
 *               example: '@io.io'
 *             user_count:
 *               type: int
 *               example: 5
 *             lease_time:
 *               type: int
 *               example: 5
 *         required: true
 *     responses:
 *       '201':
 *         description: Created
 *         schema:
 *           type: object
 *           properties:
 *             message:
 *               type: string
 *               example: License inserted successfully
 *             status:
 *               type: int
 *               example: 201
 *             id:
 *               type: int
 *               example: 10
 *       '400':
 *         description: Bad request
 *         schema:
 *           type: object
 *           properties:
 *             message:
 *               type: string
 *               example: This license key already exists
 *       '500':
 *         description: Internal error
 *         schema:
 *           type: object
 *           properties:
 *             message:
 *               type: string
 *               example: Something went wrong
 */
router.post('/licenses', licenseController.addNewLicense);

export default router;
