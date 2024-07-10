import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, OneToMany } from "typeorm";
import { Length, IsEmail } from "class-validator";
import { JournalEntry } from "./JournalEntry";

@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;  

  @Column()
  @Length(4, 20)
  username: string = '';

  @Column()
  @IsEmail()
  email: string = '';

  @Column()
  @Length(8, 100)
  password: string = '';

  @OneToMany(() => JournalEntry, (entry) => entry.user)
  entries: JournalEntry[] = [];
}
