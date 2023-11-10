import { SimpleRepository } from 'src/core/domain/repository/base-simple.repository';
import { UserModel } from '../model/user.model';

export interface UserRepository extends SimpleRepository<UserModel> {}

export const UserRepository = Symbol('UserRepository');
