// models/journal.ts
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, BaseEntity } from 'typeorm';
import { User } from './User'; 

@Entity()
export class JournalEntry extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', default: '' })
  title: string;

  @Column('text')
  content: string;

  @Column({ type: 'varchar' })
  category: string;

  @Column({ type: 'timestamp' })
  date: Date;

  @ManyToOne(() => User, (user) => user.entries)
  user: User;
}

export default JournalEntry; 



// import { DataTypes, Model } from 'sequelize';
// import sequelize from './index';

// class Journal extends Model {
//     public id!: number;
//     public title!: string;
//     public content!: string;
//     public userId!: number;
// }

// Journal.init({
//     title: {
//         type: DataTypes.STRING,
//         allowNull: false
//     },
//     content: {
//         type: DataTypes.TEXT,
//         allowNull: false
//     },
//     userId: {
//         type: DataTypes.INTEGER,
//         allowNull: false
//     }
// }, {
//     sequelize,
//     modelName: 'Journal'
// });

// export default Journal;
