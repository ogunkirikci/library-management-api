import { Op } from 'sequelize';
import moment from 'moment';
import Loan from '../models/Loan';
import Book from '../models/Book';
import User from '../models/User';
import { NotFoundError, ConflictError, ValidationError } from '../utils/errors';

export class LoanService {
  async borrowBook(userId: number, bookId: number) {
    // Check if the user exists
    const user = await User.findByPk(userId);
    if (!user) {
      throw new NotFoundError('User');
    }

    // Check if the book exists
    const book = await Book.findByPk(bookId);
    if (!book) {
      throw new NotFoundError('Book');
    }

    // Check if the book is already borrowed
    const existingLoan = await Loan.findOne({
      where: {
        bookId,
        returnDate: {
          [Op.is]: null
        }
      }
    });

    // Check if the book is already borrowed
    if (existingLoan) {
      throw new ConflictError('Book is already borrowed');
    }

    // Check if the user has reached the maximum active loans limit
    const activeLoans = await Loan.count({
      where: {
        userId,
        returnDate: {
          [Op.is]: null
        }
      }
    });

    if (activeLoans >= 3) {
      throw new ValidationError('User has reached maximum active loans limit');
    }

    // Create a new loan record
    return await Loan.create({
      userId,
      bookId,
      borrowDate: moment().toDate()
    });
  }

  async returnBook(userId: number, bookId: number, rating: number) {
    // Check if the loan exists
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
      throw new NotFoundError('Active loan');
    }

    // Check if the rating is valid
    if (rating && (rating < 1 || rating > 10)) {
      throw new ValidationError('Rating must be between 1 and 10');
    }

    loan.returnDate = moment().toDate();
    loan.rating = rating;
    await loan.save();

    // Update the book's average rating
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