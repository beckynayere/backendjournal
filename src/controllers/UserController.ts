import { Request, Response } from 'express';
import User from '../models/user';

export const getUserProfile = async (req: Request, res: Response) => {
    try {
        const user = await User.findByPk(req.user.id);
        res.json(user);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch user profile' });
    }
};

export const updateUserProfile = async (req: Request, res: Response) => {
    const { username, password } = req.body;

    try {
        const user = await User.findByPk(req.user.id);

        if (user) {
            user.username = username || user.username;
            if (password) {
                user.password = password;
            }

            await user.save();
            res.json(user);
        } else {
            res.status(404).json({ error: 'User not found' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Failed to update user profile' });
    }
};
