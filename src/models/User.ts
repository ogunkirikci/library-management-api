import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/database';

interface UserAttributes {
  id?: number;
  name: string;
}

class User extends Model<UserAttributes> implements UserAttributes {
  public id!: number;
  public name!: string;
}

User.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  sequelize,
  modelName: 'User'
});

export default User;
