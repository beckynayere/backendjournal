"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const User_1 = require("../entities/User");
const bcrypt = __importStar(require("bcryptjs"));
const jwt = __importStar(require("jsonwebtoken"));
class UserController {
}
exports.UserController = UserController;
_a = UserController;
UserController.register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, email, password } = req.body;
    const user = new User_1.User();
    user.username = username;
    user.email = email;
    user.password = bcrypt.hashSync(password, 8);
    yield user.save();
    res.status(201).send(user);
});
UserController.login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    const user = yield User_1.User.findOne({ where: { email } });
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
});
UserController.getProfile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = res.locals.jwtPayload.userId;
    const user = yield User_1.User.findOne({ where: { id: userId } });
    if (!user) {
        return res.status(404).send("User not found");
    }
    res.send(user);
});
UserController.updateProfile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = res.locals.jwtPayload.userId;
    const { username, password } = req.body;
    const user = yield User_1.User.findOne({ where: { id: userId } });
    if (!user) {
        return res.status(404).send("User not found");
    }
    user.username = username || user.username;
    if (password) {
        user.password = bcrypt.hashSync(password, 8);
    }
    yield user.save();
    res.send(user);
});
