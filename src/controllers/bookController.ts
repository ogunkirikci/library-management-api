import { Request, Response } from 'express';
import { BookService } from '../services/bookService';

export class BookController {
  private bookService = new BookService();

  async createBook(req: Request, res: Response) {
    try {
      const book = await this.bookService.createBook(req.body);
      res.status(201).json(book);
    } catch (error: any) {
      if (error.message === 'A book with this name already exists') {
        res.status(409).json({ error: error.message });
      } else {
        res.status(500).json({ error: 'Error creating book' });
      }
    }
  }

  async getAllBooks(req: Request, res: Response) {
    try {
      const books = await this.bookService.getAllBooks();
      res.json(books);
    } catch (error) {
      res.status(500).json({ error: 'Error fetching books' });
    }
  }

  async getBookById(req: Request, res: Response) {
    try {
      const book = await this.bookService.getBookById(Number(req.params.id));
      res.json(book);
    } catch (error) {
      res.status(404).json({ error: 'Book not found' });
    }
  }
}