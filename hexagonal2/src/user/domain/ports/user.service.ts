import { Inject, Injectable } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { UserModel } from '../model/user.model';
import { IUbitsFilter } from 'src/core/utils';

@Injectable()
export class UserService {
  constructor(
    @Inject(UserRepository)
    private readonly userRepository: UserRepository,
  ) {}

  async create(user: UserModel) {
    this.userRepository.create(user);
  }
  async get(id: string) {
    return this.userRepository.get(id);
  }

  async search(initFilter: IUbitsFilter) {
    const users = this.userRepository.search(initFilter);
    return users;
  }
  async update(user: Partial<UserModel>, args: any) {
    const users = this.userRepository.update(user, args);
    return users;
  }
  async delete(id: string) {
    return this.userRepository.delete(id);
  }
}
