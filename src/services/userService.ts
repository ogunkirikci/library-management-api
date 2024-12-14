import User from '../models/User';
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
    const user = await User.findByPk(id, {
      include: ['loans']
    });
    if (!user) throw new Error('User not found');
    return user;
  }

  async createUser(data: CreateUserDto) {
    return await User.create(data);
  }
}