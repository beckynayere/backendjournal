import { Request, Response } from "express";
import { User } from "../entities/User";
import * as bcrypt from "bcryptjs";
import * as jwt from "jsonwebtoken";

export class UserController {
  static register = async (req: Request, res: Response) => {
    const { username, email, password } = req.body;
    const user = new User();
    user.username = username;
    user.email = email;
    user.password = bcrypt.hashSync(password, 8);
    await user.save();
    res.status(201).send(user);
  };

  static login = async (req: Request, res: Response) => {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(404).send("User not found");
    }
    const isValid = bcrypt.compareSync(password, user.password);
    if (!isValid) {
      return res.status(401).send("Invalid password");
    }
    const token = jwt.sign({ userId: user.id }, "jwt_secret", {
      expiresIn: "1h",
    });
    res.send({ token });
  };

  static getProfile = async (req: Request, res: Response) => {
    const userId = res.locals.jwtPayload.userId;
    const user = await User.findOne({ where: { id: userId } });
    if (!user) {
      return res.status(404).send("User not found");
    }
    res.send(user);
  };

  static updateProfile = async (req: Request, res: Response) => {
    const userId = res.locals.jwtPayload.userId;
    const { username, password } = req.body;
    const user = await User.findOne({ where: { id: userId } });
    if (!user) {
      return res.status(404).send("User not found");
    }
    user.username = username || user.username;
    if (password) {
      user.password = bcrypt.hashSync(password, 8);
    }
    await user.save();
    res.send(user);
  };
}
