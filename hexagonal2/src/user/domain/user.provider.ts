import { UserInMemory } from '../adapter/data/user-in-memory.repository';
import { UserRepository } from './ports/user.repository';

enum EnvironmentEnum {
  Mocked = 'mocked',
  Local = 'local',
  Development = 'development',
  Test = 'test',
  Production = 'production',
}

export const userServiceProvider = {
  provide: UserRepository,
  useClass:
    process.env.NODE_ENV === EnvironmentEnum.Mocked
      ? UserInMemory
      : UserInMemory,
};
