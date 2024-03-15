import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { AccountEntity } from '@entities';
import { DeleteResponse, AccountDto } from '@dto';

@Injectable()
export class AccountService {
  constructor(
    @Inject('ACCOUNT_REPOSITORY')
    private readonly _accountRepository: typeof AccountEntity
  ) {}

  async create(input: AccountDto, idUser: number): Promise<AccountEntity> {
    return await this._accountRepository.create({
      ...input,
      idUser,
    });
  }

  async findAll(idUser: number): Promise<AccountEntity[]> {
    return await this._accountRepository.findAll({
      where: { idUser },
    });
  }

  async updateBalance(
    id: number,
    amount: number,
    idUser: number
  ): Promise<number> {
    let account = await this._accountRepository.findOne({
      where: { id, idUser },
    });
    if (!account) throw new NotFoundException('Account not found');
    const newBalance = account.balance - amount;
    account = await account.update({ balance: newBalance });
    return newBalance;
  }

  // async findOne(id: number, idUser: number): Promise<CategoryEntity> {
  //   return await this._categoryRepository.findOne({
  //     where: { id, idUser },
  //   });
  // }

  // async delete(id: number, idUser: number): Promise<DeleteResponse> {
  //   const response = await this._categoryRepository.destroy({
  //     where: { id, idUser },
  //   });
  //   return { success: !!response, id };
  // }

  // async update(
  //   id: number,
  //   input: CategoryDto,
  //   idUser: number
  // ): Promise<CategoryEntity> {
  //   let category = await this.findOne(id, idUser);
  //   if (!category) throw new NotFoundException('Category not found');

  //   category = await category.update({ ...input });
  //   return category;
  // }
}
