import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { BudgetEntity, BudgetItemEntity, CategoryEntity } from '@entities';
import { DeleteResponse, BudgetDto, BudgetItemDto } from '@dto';

@Injectable()
export class BudgetService {
  constructor(
    @Inject('BUDGET_REPOSITORY')
    private readonly _budgetRepository: typeof BudgetEntity,
    @Inject('BUDGET_ITEM_REPOSITORY')
    private readonly _budgetItemRepository: typeof BudgetItemEntity
  ) {}

  async create(input: BudgetDto, idUser: number): Promise<BudgetEntity> {
    return await this._budgetRepository.create({
      ...input,
      idUser,
    });
  }

  async findAll(idUser: number): Promise<BudgetEntity[]> {
    return await this._budgetRepository.findAll({
      where: { idUser },
      include: [{ model: BudgetItemEntity, as: 'budgetItems' }],
    });
  }

  async findByDate(
    year: number,
    month: number,
    idUser: number
  ): Promise<BudgetEntity> {
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
    });
    if (!budget) {
      budget = await this.create(
        { year, month, name: month + ' ' + year, totalAmount: 0 },
        idUser
      );
    }
    return budget;
  }

  async findOne(id: number, idUser: number): Promise<BudgetEntity> {
    return await this._budgetRepository.findOne({
      where: { id, idUser },
    });
  }

  async delete(id: number, idUser: number): Promise<DeleteResponse> {
    const response = await this._budgetRepository.destroy({
      where: { id, idUser },
    });
    return { success: !!response, id };
  }

  async update(id: number, input: any, idUser: number): Promise<BudgetEntity> {
    let budget = await this.findOne(id, idUser);
    if (!budget) throw new NotFoundException('Budget not found');

    budget = await budget.update({ ...input });
    return budget;
  }

  async createBudgetItem(
    input: BudgetItemDto,
    idUser: number
  ): Promise<BudgetItemEntity> {
    try {
      const budget = await this._budgetRepository.findOne({
        where: { id: input.idBudget, idUser },
        attributes: ['id', 'totalAmount'],
      });
      if (!budget) throw new NotFoundException('Budget not found');
      await budget.update({ totalAmount: budget.totalAmount + input.amount });
      return await this._budgetItemRepository.create({
        ...input,
        idBudget: input.idBudget,
        idUser,
      });
    } catch (error) {
      console.log({ error });
      throw error;
    }
  }
}
