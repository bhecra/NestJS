import { Injectable } from '@nestjs/common';
import { IUbitsFilter } from 'src/core/utils';
import { UserModel } from 'src/user/domain/model/user.model';
import { UserRepository } from 'src/user/domain/ports/user.repository';

@Injectable()
export class UserInMemory implements UserRepository {
  private users: UserModel[] = [];

  async get(id?: string): Promise<UserModel> {
    return this.users.find((user) => user.id == id);
  }
  async search(filter?: IUbitsFilter): Promise<UserModel[]> {
    console.log(filter);

    return this.users;
  }
  async update(item: Partial<UserModel>): Promise<any> {
    return item;
  }
  async delete(id?: string | UserModel): Promise<any> {
    this.users = this.users.filter((user) => user != id);
    return true;
  }

  async create(user: UserModel): Promise<UserModel> {
    this.users.push(user);
    return user;
  }
}
