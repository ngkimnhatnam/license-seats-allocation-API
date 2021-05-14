// Dependencies import
import express from 'express';

// Controller import
import * as seatController from '../controllers/seats';

const router = express.Router();

/**
 * @swagger
 * paths:
 *  /api/v1/seats:
 *   post:
 *     tags:
 *       - Seats
 *     name: Reserve A Seat
 *     summary: Reserve A Seat
 *     description: "This API is used for a user to reserve a seat with provided license key and email"
 *     consumes:
 *       - application/json
 *     produces:
 *       - application/json
 *     parameters:
 *       - in: body
 *         name: body
 *         description: "Seat Data Payload"
 *         schema:
 *           type: object
 *           properties:
 *             license_key:
 *               type: string
 *               example: ABC-DEF
 *             email:
 *               type: string
 *               example: 'tester@io.io'
 *         required: true
 *     responses:
 *       '200':
 *         description: OK
 *         schema:
 *           type: object
 *           properties:
 *             message:
 *               type: string
 *               example: Seat for license renewed successfully
 *             status:
 *               type: int
 *               example: 200
 *       '201':
 *         description: Created
 *         schema:
 *           type: object
 *           properties:
 *             message:
 *               type: string
 *               example: Seat for license reserved
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
 *               example: Non-existing license | Your domain is not entitled to any license key | No more free slots now
 *       '500':
 *         description: Internal error
 *         schema:
 *           type: object
 *           properties:
 *             message:
 *               type: string
 *               example: Something went wrong
 */
router.post('/seats', seatController.addNewSeat);

/**
 * @swagger
 * paths:
 *  /api/v1/seats/release:
 *   post:
 *     tags:
 *       - Seats
 *     name: Release A Seat
 *     summary: Release A Seat
 *     description: "This API is used for a user to release a seat with provided email before the lease time expires"
 *     consumes:
 *       - application/json
 *     produces:
 *       - application/json
 *     parameters:
 *       - in: body
 *         name: body
 *         description: "Seat Data Payload"
 *         schema:
 *           type: object
 *           properties:
 *             email:
 *               type: string
 *               example: 'tester@io.io'
 *         required: true
 *     responses:
 *       '200':
 *         description: OK
 *         schema:
 *           type: object
 *           properties:
 *             message:
 *               type: string
 *               example: Seat released successfully
 *             status:
 *               type: int
 *               example: 200
 *       '500':
 *         description: Internal error
 *         schema:
 *           type: object
 *           properties:
 *             message:
 *               type: string
 *               example: Something went wrong
 */
router.post('/seats/release', seatController.releaseSeat);

export default router;
