// import JournalEntry from '../models/journalEntry';
// models/User.ts
import { Entity, PrimaryGeneratedColumn, Column, OneToMany, BaseEntity } from 'typeorm';
import { JournalEntry } from './journalEntry'; 

@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar' })
  username: string;

  @Column({ type: 'varchar' })
  password: string;

  @OneToMany(() => JournalEntry, (entry) => entry.user)
  entries: JournalEntry[];
}

export default User; 

// import { DataTypes, Model } from 'sequelize';
// import bcrypt from 'bcryptjs';
// import sequelize from './index';

// class User extends Model {
//     public id!: number;
//     public username!: string;
//     public password!: string;

//     public async validPassword(password: string): Promise<boolean> {
//         return bcrypt.compare(password, this.password);
//     }
// }

// User.init({
//     username: {
//         type: DataTypes.STRING,
//         allowNull: false,
//         unique: true
//     },
//     password: {
//         type: DataTypes.STRING,
//         allowNull: false
//     }
// }, {
//     sequelize,
//     modelName: 'User',
//     hooks: {
//         beforeCreate: async (user) => {
//             user.password = await bcrypt.hash(user.password, 10);
//         },
//         beforeUpdate: async (user) => {
//             if (user.changed('password')) {
//                 user.password = await bcrypt.hash(user.password, 10);
//             }
//         }
//     }
// });

// export default User;
