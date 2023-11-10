import {
  IsEmail,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  MinLength,
} from 'class-validator';
import { UserModel } from 'src/user/domain/model/user.model';

export class CreateUserDto extends UserModel {
  @IsString()
  @MinLength(1)
  userName: string;

  @IsString()
  @IsEmail()
  @MinLength(1)
  email: string;

  @IsOptional()
  id?: string;

  @IsOptional()
  loginsCount: number;

  @IsOptional()
  emailVerified: boolean;

  @IsString()
  familyName: string;

  @IsString()
  givenName: string;

  @IsString()
  name: string;

  @IsString()
  nickname: string;

  @IsString()
  picture: string;

  @IsOptional()
  updatedAt: string;

  @IsNumber()
  @IsPositive()
  companyId: number;
}
