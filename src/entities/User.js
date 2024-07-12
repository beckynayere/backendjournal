"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const typeorm_1 = require("typeorm");
const class_validator_1 = require("class-validator");
const JournalEntry_1 = require("./JournalEntry");
let User = class User extends typeorm_1.BaseEntity {
    constructor() {
        super(...arguments);
        this.username = '';
        this.email = '';
        this.password = '';
        this.entries = [];
    }
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)()
], User.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: "" }),
    (0, class_validator_1.Length)(4, 20)
], User.prototype, "username", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: "" }),
    (0, class_validator_1.IsEmail)()
], User.prototype, "email", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: "" }),
    (0, class_validator_1.Length)(8, 100)
], User.prototype, "password", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => JournalEntry_1.JournalEntry, (entry) => entry.user)
], User.prototype, "entries", void 0);
User = __decorate([
    (0, typeorm_1.Entity)()
], User);
exports.User = User;
