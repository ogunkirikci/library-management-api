import { Router } from 'express';
import { BookController } from '../controllers/bookController';

const router = Router();
const bookController = new BookController();

router.post('/', (req, res) => bookController.createBook(req, res));
router.get('/', (req, res) => bookController.getAllBooks(req, res));
router.get('/:id', (req, res) => bookController.getBookById(req, res));

export default router;