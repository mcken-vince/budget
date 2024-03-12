import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { BudgetEntity } from '@entities';
import { DeleteResponse, BudgetDto } from '@dto';

@Injectable()
export class BudgetService {
  constructor(
    @Inject('BUDGET_REPOSITORY')
    private readonly _budgetRepository: typeof BudgetEntity
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
    });
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
}
