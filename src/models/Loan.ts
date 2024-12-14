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
}

class Loan extends Model<LoanAttributes> implements LoanAttributes {
  public id!: number;
  public userId!: number;
  public bookId!: number;
  public borrowDate!: Date;
  public returnDate!: Date | null;
  public rating!: number | null;
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
    type: DataTypes.FLOAT,
    allowNull: true,
    validate: {
      min: 1,
      max: 5
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