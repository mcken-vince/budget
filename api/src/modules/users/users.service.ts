import { Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from '../../models';

@Injectable()
export class UsersService {
  constructor(
    @Inject('USER_REPOSITORY') private readonly _userRepository: typeof User
  ) {}

  async create(user: any): Promise<any> {
    return await this._userRepository.create(user);
  }

  async findOneByEmail(email: string): Promise<any> {
    return await this._userRepository.findOne({ where: { email } });
  }

  async findOneById(id: number): Promise<any> {
    return await this._userRepository.findOne({ where: { id } });
  }
}
