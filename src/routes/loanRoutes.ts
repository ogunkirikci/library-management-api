import { Router } from 'express';
import { LoanController } from '../controllers/loanController';

const router = Router();
const loanController = new LoanController();

router.post('/users/:userId/borrow/:bookId', (req, res) => loanController.borrowBook(req, res));
router.post('/users/:userId/return/:bookId', (req, res) => loanController.returnBook(req, res));

export default router;