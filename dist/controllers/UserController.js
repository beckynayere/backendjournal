"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const User_1 = require("../entities/User");
const bcrypt = __importStar(require("bcryptjs"));
const jwt = __importStar(require("jsonwebtoken"));
class UserController {
    static register = async (req, res) => {
        const { username, email, password } = req.body;
        const user = new User_1.User();
        user.username = username;
        user.email = email;
        user.password = bcrypt.hashSync(password, 8);
        await user.save();
        res.status(201).send(user);
    };
    static login = async (req, res) => {
        const { email, password } = req.body;
        const user = await User_1.User.findOne({ where: { email } });
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
    static getProfile = async (req, res) => {
        const userId = res.locals.jwtPayload.userId;
        const user = await User_1.User.findOne({ where: { id: userId } });
        if (!user) {
            return res.status(404).send("User not found");
        }
        res.send(user);
    };
    static updateProfile = async (req, res) => {
        const userId = res.locals.jwtPayload.userId;
        const { username, password } = req.body;
        const user = await User_1.User.findOne({ where: { id: userId } });
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
exports.UserController = UserController;
