import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/database';
import User from './User';
import Book from './Book';

interface LoanAttributes {
  id?: number;
  userId: number;
  bookId: number;
  borrowDate: Date;
  returnDate?: Date | null;
  rating?: number | null;
  Book?: {
    name: string;
  };
}

class Loan extends Model<LoanAttributes> implements LoanAttributes {
  public id!: number;
  public userId!: number;
  public bookId!: number;
  public borrowDate!: Date;
  public returnDate!: Date | null;
  public rating!: number | null;
  public Book?: {
    name: string;
  };
}

Loan.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    field: 'userId'
  },
  bookId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    field: 'bookId'
  },
  borrowDate: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  },
  returnDate: {
    type: DataTypes.DATE,
    allowNull: true
  },
  rating: {
    type: DataTypes.INTEGER,
    allowNull: true,
    validate: {
      min: 1,
      max: 10
    }
  }
}, {
  sequelize,
  modelName: 'Loan',
  underscored: false
});

// İlişkileri düzelt
User.hasMany(Loan, { foreignKey: 'userId' });
Loan.belongsTo(User, { foreignKey: 'userId' });
Book.hasMany(Loan, { foreignKey: 'bookId' });
Loan.belongsTo(Book, { foreignKey: 'bookId' });

export default Loan;