import { Model, DataTypes, Sequelize } from 'sequelize';
import sequelize from '../config/database';

interface UserAttributes {
  id?: number;
  name: string;
}

class User extends Model<UserAttributes, Omit<UserAttributes, 'id'>> {}

User.init({
  name: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  sequelize,
  modelName: 'User'
});

export default User;
