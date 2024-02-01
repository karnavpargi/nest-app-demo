import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
@Entity()
export class CompanyEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({})
  uin: string;

  @Column()
  businessName: string;

  @Column()
  fullName: string;

  @Column()
  position: string;

  @Column()
  email: string;

  @Column()
  mobile: string;

  @Column({})
  file: string;
}
