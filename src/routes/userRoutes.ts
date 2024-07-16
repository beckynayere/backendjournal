// import { Router } from "express";
// import { UserController } from "../controllers/UserController";
// import { checkJwt } from "../middlewares/checkJwt";


// const router = Router();

// router.post("/register", UserController.register);
// router.post("/login", UserController.login);
// router.get("/profile", [checkJwt], UserController.getProfile);
// router.put("/profile", [checkJwt], UserController.updateProfile);

// export default router;


import { UserController } from "../controllers/UserController";
import { checkJwt } from "../middlewares/checkJwt";
import { Router } from 'express';
import bcrypt from 'bcryptjs';
import User from '../models/User';
import generateToken from '../utils/generateToken';

const router = Router();

router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ where: { username } });
    
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = generateToken(user.id);
    res.json({ token });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;
