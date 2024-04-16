import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { BudgetEntity, BudgetItemEntity, CategoryEntity } from '@entities';
import { DeleteResponse, BudgetDto, BudgetItemDto } from '@dto';
import { Sequelize } from 'sequelize-typescript';
import { Transaction } from 'sequelize';

@Injectable()
export class BudgetService {
  constructor(
    @Inject('BUDGET_REPOSITORY')
    private readonly _budgetRepository: typeof BudgetEntity,
    @Inject('BUDGET_ITEM_REPOSITORY')
    private readonly _budgetItemRepository: typeof BudgetItemEntity,
    @Inject('SEQUELIZE')
    private _sequelize: Sequelize
  ) {}

  async create(
    input: BudgetDto,
    idUser: number,
    transaction?: Transaction
  ): Promise<BudgetEntity> {
    return await this._budgetRepository.create({
      ...input,
      idUser,
      transaction,
    });
  }

  async findAll(idUser: number): Promise<BudgetEntity[]> {
    const transaction = await this._sequelize.transaction();
    try {
      return await this._budgetRepository.findAll({
        where: { idUser },
        include: [{ model: BudgetItemEntity, as: 'budgetItems' }],
        transaction,
      });
    } catch (error) {
      console.log({ error });
      await transaction.rollback();
      throw error;
    }
  }

  async findByDate(
    year: number,
    month: number,
    idUser: number
  ): Promise<BudgetEntity> {
    const transaction = await this._sequelize.transaction();
    try {
      let budget = await this._budgetRepository.findOne({
        where: {
          idUser,
          year,
          month,
        },
        include: [
          {
            model: BudgetItemEntity,
            as: 'budgetItems',
            include: [
              {
                model: CategoryEntity,
                as: 'category',
                attributes: ['id', 'name'],
              },
            ],
          },
        ],
        transaction,
      });
      if (!budget) {
        budget = await this.create(
          { year, month, name: month + ' ' + year, totalAmount: 0 },
          idUser,
          transaction
        );
      }
      await transaction.commit();
      return budget;
    } catch (error) {
      console.log({ error });
      transaction.rollback();
      throw error;
    }
  }

  async findOne(
    id: number,
    idUser: number,
    transaction?: Transaction
  ): Promise<BudgetEntity> {
    return await this._budgetRepository.findOne({
      where: { id, idUser },
      transaction,
    });
  }

  async delete(id: number, idUser: number): Promise<DeleteResponse> {
    const transaction = await this._sequelize.transaction();
    try {
      const response = await this._budgetRepository.destroy({
        where: { id, idUser },
        transaction,
      });
      await transaction.commit();
      return { success: !!response, id };
    } catch (error) {
      console.log({ error });
      await transaction.rollback();
      throw error;
    }
  }

  async update(id: number, input: any, idUser: number): Promise<BudgetEntity> {
    const transaction = await this._sequelize.transaction();
    try {
      let budget = await this.findOne(id, idUser, transaction);
      if (!budget) throw new NotFoundException('Budget not found');

      budget = await budget.update({ ...input }, { transaction });
      await transaction.commit();
      return budget;
    } catch (error) {
      console.log({ error });
      transaction.rollback();
      throw error;
    }
  }

  async createBudgetItem(
    input: BudgetItemDto,
    idUser: number
  ): Promise<BudgetItemEntity> {
    const transaction = await this._sequelize.transaction();
    try {
      const budget = await this._budgetRepository.findOne({
        where: { id: input.idBudget, idUser },
        attributes: ['id', 'totalAmount'],
        transaction,
      });
      if (!budget) throw new NotFoundException('Budget not found');
      await budget.update(
        { totalAmount: budget.totalAmount + input.amount },
        { transaction }
      );
      const budgetItem = await this._budgetItemRepository.create(
        {
          ...input,
          idBudget: input.idBudget,
          idUser,
        },
        { transaction }
      );
      await transaction.commit();
      return budgetItem;
    } catch (error) {
      console.log({ error });
      await transaction.rollback();
      throw error;
    }
  }

  async deleteBudgetItem(id: number, idUser: number): Promise<DeleteResponse> {
    const transaction = await this._sequelize.transaction();
    try {
      const response = await this._budgetItemRepository.destroy({
        where: { id, idUser },
        transaction,
      });
      return { success: !!response, id };
    } catch (error) {
      console.log({ error });
      await transaction.rollback();
      throw error;
    }
  }
}
