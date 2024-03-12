import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CategoryEntity, TransactionEntity } from '@entities';
import { TransactionDto, DeleteResponse } from '@dto';
import { Op } from 'sequelize';
@Injectable()
export class TransactionService {
  constructor(
    @Inject('TRANSACTION_REPOSITORY')
    private readonly _transactionRepository: typeof TransactionEntity
  ) {}

  async create(
    input: TransactionDto,
    idUser: number
  ): Promise<TransactionEntity> {
    return await this._transactionRepository.create({
      ...input,
      idUser,
    });
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

    transaction = await transaction.update({ ...input });
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
