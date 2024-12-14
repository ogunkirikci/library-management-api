import Loan from '../models/Loan';
import Book from '../models/Book';
import User from '../models/User';
import { Op } from 'sequelize';

export class LoanService {
  async borrowBook(userId: number, bookId: number) {
    // Önce user ve book'un var olduğunu kontrol et
    const user = await User.findByPk(userId);
    if (!user) {
      throw new Error('User not found');
    }

    const book = await Book.findByPk(bookId);
    if (!book) {
      throw new Error('Book not found');
    }

    // Kitap zaten ödünç alınmış mı kontrol et
    const existingLoan = await Loan.findOne({
      where: {
        bookId,
        returnDate: {
          [Op.is]: null
        }
      }
    });

    if (existingLoan) {
      throw new Error('Book is already borrowed');
    }

    return await Loan.create({
      userId,
      bookId,
      borrowDate: new Date()
    });
  }

  async returnBook(userId: number, bookId: number, rating: number) {
    const loan = await Loan.findOne({
      where: {
        userId,
        bookId,
        returnDate: {
          [Op.is]: null
        }
      }
    });

    if (!loan) {
      throw new Error('No active loan found for this user and book');
    }

    loan.returnDate = new Date();
    loan.rating = rating;
    await loan.save();

    // Kitabın ortalama puanını güncelle
    const allRatings = await Loan.findAll({
      where: {
        bookId,
        rating: {
          [Op.not]: null
        }
      }
    });

    const averageRating = allRatings.reduce((acc, curr) => acc + (curr.rating || 0), 0) / allRatings.length;
    
    await Book.update(
      { averageRating },
      { where: { id: bookId } }
    );

    return loan;
  }
}