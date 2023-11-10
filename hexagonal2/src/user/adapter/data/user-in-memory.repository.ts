import { Injectable } from '@nestjs/common';
import { MemoryRepository } from 'src/core/domain/repository/memory.repository';
import { UserModel } from 'src/user/domain/model/user.model';

@Injectable()
export class UserInMemory extends MemoryRepository<UserModel> {
  /**
   *
   */
  constructor() {
    super([
      {
        userName: 'string',
        email: 'cburbano@ubits.co',
        emailVerified: true,
        familyName: 'string',
        givenName: 'string',
        name: 'string',
        nickname: 'string',
        picture: 'string',
        updatedAt: 'string',
        companyId: 25,
      },
    ]);
  }
}
