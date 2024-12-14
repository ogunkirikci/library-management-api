import { Request, Response } from 'express';
import { LoanService } from '../services/loanService';

export class LoanController {
  private loanService = new LoanService();

  async borrowBook(req: Request, res: Response) {
    try {
      const userId = parseInt(req.params.userId);
      const bookId = parseInt(req.params.bookId);
      
      const loan = await this.loanService.borrowBook(userId, bookId);
      res.status(201).json(loan);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  async returnBook(req: Request, res: Response) {
    try {
      const userId = parseInt(req.params.userId);
      const bookId = parseInt(req.params.bookId);
      const rating = req.body.rating || 5; // Default rating is 5
      
      const loan = await this.loanService.returnBook(userId, bookId, rating);
      res.json(loan);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }
}