"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const index_1 = __importDefault(require("./index"));
class User extends sequelize_1.Model {
    id;
    username;
    password;
    async validPassword(password) {
        return bcryptjs_1.default.compare(password, this.password);
    }
}
User.init({
    username: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    password: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    }
}, {
    sequelize: index_1.default,
    modelName: 'User',
    hooks: {
        beforeCreate: async (user) => {
            user.password = await bcryptjs_1.default.hash(user.password, 10);
        },
        beforeUpdate: async (user) => {
            if (user.changed('password')) {
                user.password = await bcryptjs_1.default.hash(user.password, 10);
            }
        }
    }
});
exports.default = User;
