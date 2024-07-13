import { Request, Response } from 'express';
import User from 'src/models/User';
import generateToken from '../utils/generateToken';

export const register = async (req: Request, res: Response) => {
    const { username, password } = req.body;

    try {
        const user = await User.create({ username, password });
        res.status(201).json({
            id: user.id,
            username: user.username,
            token: generateToken(user.id)
        });
    } catch (error) {
        res.status(500).json({ error: 'Failed to register user' });
    }
};

export const login = async (req: Request, res: Response) => {
    const { username, password } = req.body;

    try {
        const user = await User.findOne({ where: { username } });

        if (user && (await user.validPassword(password))) {
            res.json({
                id: user.id,
                username: user.username,
                token: generateToken(user.id)
            });
        } else {
            res.status(401).json({ error: 'Invalid credentials' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Failed to login user' });
    }
};
