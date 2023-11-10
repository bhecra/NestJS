import { Module } from '@nestjs/common';
import { UserController } from './adapter/api/user.controller';
import { UserService } from './domain/ports/user.service';
import { userServiceProvider } from './domain/user.provider';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './adapter/data/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity])],
  controllers: [UserController],
  providers: [UserService, userServiceProvider],
})
export class UserModule {}
