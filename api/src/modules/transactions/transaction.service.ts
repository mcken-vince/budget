import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { TransactionEntity } from '../../core/entities';

@Injectable()
export class TransactionService {
  constructor(
    @Inject('TRANSACTION_REPOSITORY')
    private readonly _transactionRepository: typeof TransactionEntity
  ) {}

  async create(transaction: any, idUser: number): Promise<TransactionEntity> {
    return await this._transactionRepository.create({
      ...transaction,
      idUser,
    });
  }

  async findAll(idUser: number): Promise<TransactionEntity[]> {
    return await this._transactionRepository.findAll({
      where: { idUser },
    });
  }

  async findOne(id: number, idUser: number): Promise<TransactionEntity> {
    return await this._transactionRepository.findOne({
      where: { id, idUser },
    });
  }

  async delete(id: number, idUser: number) {
    return await this._transactionRepository.destroy({ where: { id, idUser } });
  }

  async update(
    id: number,
    input: any,
    idUser: number
  ): Promise<TransactionEntity> {
    let transaction = await this.findOne(id, idUser);
    if (!transaction) throw new NotFoundException('Transaction not found');

    transaction = await transaction.update({ ...input });
    return transaction;
  }
}
