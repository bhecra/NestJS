import { UserModel } from 'src/user/domain/model/user.model';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'users' })
export class UserEntity extends UserModel {
  @PrimaryGeneratedColumn('uuid')
  id?: string;
  userName: string;
  @Column('text', {
    unique: true,
  })
  email: string;
  @Column('bool')
  emailVerified: boolean;
  @Column('text')
  familyName: string;
  @Column('text')
  givenName: string;
  @Column('text')
  name: string;
  @Column('text')
  nickname: string;
  @Column('text')
  picture: string;
  @Column('text')
  sub: string;
  @Column('timestamp')
  updatedAt: string;
  @Column('int', {
    default: 0,
  })
  loginsCount: number;
  @Column('int')
  companyId: number;
}
