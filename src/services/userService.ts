import User from '../models/User';
import Loan from '../models/Loan';
import Book from '../models/Book';
import { Op } from 'sequelize';
import { CreateUserDto } from '../types/user.types';

export class UserService {
  async getAllUsers() {
    const users = await User.findAll();
    if (users.length === 0) {
      throw new Error('No users found');
    }
    return users;
  }

  async getUserById(id: number) {
    const user = await User.findByPk(id);
    if (!user) {
      throw new Error('User not found');
    }

    // Get past loans
    const pastLoans = await Loan.findAll({
      where: {
        userId: id,
        returnDate: { [Op.not]: null }
      },
      include: [{
        model: Book,
        attributes: ['name']
      }]
    });

    // Get currently borrowed books
    const presentLoans = await Loan.findAll({
      where: {
        userId: id,
        returnDate: null
      },
      include: [{
        model: Book,
        attributes: ['name']
      }]
    });

    // Create the desired format response
    return {
      id: user.id || 0,
      name: user.name || 'Unknown',
      books: {
        past: pastLoans.map(loan => ({
          name: loan.Book?.name || 'Unknown',
          userScore: loan.rating
        })),
        present: presentLoans.map(loan => ({
          name: loan.Book?.name || 'Unknown'
        }))
      }
    };
  }

  async createUser(data: CreateUserDto) {
    return await User.create(data);
  }
}