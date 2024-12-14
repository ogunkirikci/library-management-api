import { Request, Response } from 'express';
import { UserService } from '../services/userService';

export class UserController {
  private userService = new UserService();

  async createUser(req: Request, res: Response) {
    try {
      const user = await this.userService.createUser(req.body);
      res.status(201).json(user);
    } catch (error) {
      res.status(500).json({ error: 'Error creating user' });
    }
  }

  async getAllUsers(req: Request, res: Response) {
    try {
      const users = await this.userService.getAllUsers();
      res.json(users);
    } catch (error: any) {
      if (error.message === 'No users found') {
        res.status(404).json({ error: 'No users found in the system' });
      } else {
        res.status(500).json({ error: 'Error fetching users' });
      }
    }
  }

  async getUserById(req: Request, res: Response) {
    try {
      const user = await this.userService.getUserById(Number(req.params.id));
      res.json(user);
    } catch (error) {
      res.status(404).json({ error: 'User not found' });
    }
  }
}