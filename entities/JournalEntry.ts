import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, BaseEntity } from "typeorm";
import { User } from "./User";

@Entity()
export class JournalEntry extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ default: "" })
  title!: string;

  @Column("text")
  content!: string;

  @Column()
  category!: string;

  @Column()
  date!: Date;

  @ManyToOne(() => User, (user) => user.entries)
  user!: User;
}
