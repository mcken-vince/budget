import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CategoryEntity, TransactionEntity } from '@entities';
import { TransactionDto, DeleteResponse } from '@dto';
import { Op } from 'sequelize';
import { AccountService } from '../account/account.service';
@Injectable()
export class TransactionService {
  constructor(
    @Inject('TRANSACTION_REPOSITORY')
    private readonly _transactionRepository: typeof TransactionEntity,
    private _accountService: AccountService
  ) {}

  async create(
    input: TransactionDto,
    idUser: number
  ): Promise<TransactionEntity> {
    const newTransaction = await this._transactionRepository.create({
      ...input,
      idUser,
    });
    if (newTransaction.idAccount) {
      let amount = input.amount;
      if (input.type === 'income') amount = -amount;
      await this._accountService.updateBalance(
        newTransaction.idAccount,
        amount,
        idUser
      );
    }

    return newTransaction;
  }

  async findAll(idUser: number): Promise<TransactionEntity[]> {
    return await this._transactionRepository.findAll({
      where: { idUser },
      include: [
        { model: CategoryEntity, as: 'category', attributes: ['id', 'name'] },
      ],
    });
  }

  async findAllByDateRange(
    input: { startDate: string; endDate: string },
    idUser: number
  ): Promise<TransactionEntity[]> {
    return await this._transactionRepository.findAll({
      where: {
        idUser,
        date: { [Op.between]: [input.startDate, input.endDate] },
      },
    });
  }

  async findOne(id: number, idUser: number): Promise<TransactionEntity> {
    return await this._transactionRepository.findOne({
      where: { id, idUser },
    });
  }

  async delete(id: number, idUser: number): Promise<DeleteResponse> {
    const response = await this._transactionRepository.destroy({
      where: { id, idUser },
    });
    return { success: !!response, id };
  }

  async update(
    id: number,
    input: TransactionDto,
    idUser: number
  ): Promise<TransactionEntity> {
    let transaction = await this.findOne(id, idUser);
    if (!transaction) throw new NotFoundException('Transaction not found');
    const prevAccount = transaction.idAccount;
    const prevAmount = transaction.amount;
    transaction = await transaction.update({ ...input });
    const newAccount = transaction.idAccount;
    const newAmount = transaction.amount;
    if (prevAccount === newAccount) {
      // update account balance
      await this._accountService.updateBalance(
        transaction.idAccount,
        prevAmount - transaction.amount,
        idUser
      );
    } else {
      // different account
      if (prevAmount === newAmount) {
        await this._accountService.transfer(prevAccount, newAccount, newAmount);
      } else {
        await this._accountService.updateBalance(
          prevAccount,
          prevAmount,
          idUser
        );
        await this._accountService.updateBalance(newAccount, newAmount, idUser);
      }
    }
    return transaction;
  }

  async updateCategory(
    id: number,
    input: { idCategory: string },
    idUser: number
  ): Promise<TransactionEntity> {
    let transaction = await this.findOne(id, idUser);
    if (!transaction) throw new NotFoundException('Transaction not found');

    transaction = await transaction.update({ ...input });
    return transaction;
  }
}
