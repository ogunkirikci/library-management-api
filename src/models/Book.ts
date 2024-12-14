import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/database';

interface BookAttributes {
  id?: number;
  name: string;
  averageRating?: number;
}

class Book extends Model<BookAttributes, Omit<BookAttributes, 'id'>> {}

Book.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  averageRating: {
    type: DataTypes.FLOAT,
    defaultValue: 0
  }
}, {
  sequelize,
  modelName: 'Book'
});

export default Book;