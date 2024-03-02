import { Inject, Injectable } from '@nestjs/common';
import { UserEntity } from '../../core/entities';
import { UserDto } from '../../core/dto/user.dto';

@Injectable()
export class UsersService {
  constructor(
    @Inject('USER_REPOSITORY')
    private readonly _userRepository: typeof UserEntity
  ) {}

  async create(user: UserDto): Promise<UserEntity> {
    return await this._userRepository.create({ ...user });
  }

  async findOneByEmail(email: string): Promise<UserEntity> {
    return await this._userRepository.findOne({ where: { email } });
  }

  async findOneById(id: number): Promise<UserEntity> {
    return await this._userRepository.findOne({ where: { id } });
  }
}
