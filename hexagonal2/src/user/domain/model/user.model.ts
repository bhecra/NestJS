/* Info Auth0 */

import { injectProperties } from 'src/core/domain/model/inject-properties';

export class UserModel {
  public id?: string = '';
  public userName: string = '';
  public email: string = '';
  public emailVerified: boolean = false;
  public familyName: string = '';
  public givenName: string = '';
  public name: string = '';
  public nickname: string = '';
  public picture: string = '';
  public updatedAt: string = '';
  public loginsCount?: number = 0;
  public companyId: number = 0;

  constructor(init: Partial<UserModel> = {}) {
    injectProperties<UserModel>(this, init);
    this.companyId = Number(this.companyId);
  }
}
