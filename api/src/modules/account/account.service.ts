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
      currentBalance: input.initialBalance,
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
    const newBalance = account.currentBalance - amount;
    account = await account.update({ currentBalance: newBalance });
    return newBalance;
  }

  async transfer(
    fromAccount: number,
    toAccount: number,
    amount: number
  ): Promise<boolean> {
    const from = await this._accountRepository.findOne({
      where: { id: fromAccount },
    });
    const to = await this._accountRepository.findOne({
      where: { id: toAccount },
    });

    if (!from || !to) throw new NotFoundException('Account not found');
    // if (from.balance < amount) throw new Error('Insufficient funds');

    from.currentBalance -= amount;
    to.currentBalance += amount;
    await from.save();
    await to.save();

    return true;
  }

  // async findOne(id: number, idUser: number): Promise<CategoryEntity> {
  //   return await this._categoryRepository.findOne({
  //     where: { id, idUser },
  //   });
  // }

  async delete(id: number, idUser: number): Promise<DeleteResponse> {
    const response = await this._accountRepository.destroy({
      where: { id, idUser },
    });
    return { success: !!response, id };
  }

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
