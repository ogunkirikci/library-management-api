import { Router } from 'express';
import { LoanController } from '../controllers/loanController';

const router = Router();
const loanController = new LoanController();

/**
 * @swagger
 * /loans/borrow:
 *   post:
 *     summary: Borrow a book
 *     tags: [Loans]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - userId
 *               - bookId
 *             properties:
 *               userId:
 *                 type: integer
 *               bookId:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Book borrowed successfully
 *       400:
 *         description: Invalid input
 *       404:
 *         description: User or Book not found
 *       409:
 *         description: Book is already borrowed
 */
router.post('/borrow', loanController.borrowBook);

/**
 * @swagger
 * /loans/return:
 *   post:
 *     summary: Return a book
 *     tags: [Loans]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - userId
 *               - bookId
 *               - rating
 *             properties:
 *               userId:
 *                 type: integer
 *               bookId:
 *                 type: integer
 *               rating:
 *                 type: integer
 *                 minimum: 1
 *                 maximum: 10
 *     responses:
 *       200:
 *         description: Book returned successfully
 *       400:
 *         description: Invalid input
 *       404:
 *         description: Loan not found
 */
router.post('/return', loanController.returnBook);

export default router;