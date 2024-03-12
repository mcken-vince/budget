import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CategoryEntity } from '@entities';
import { DeleteResponse, CategoryDto } from '@dto';

@Injectable()
export class CategoryService {
  constructor(
    @Inject('CATEGORY_REPOSITORY')
    private readonly _categoryRepository: typeof CategoryEntity
  ) {}

  async create(input: CategoryDto, idUser: number): Promise<CategoryEntity> {
    return await this._categoryRepository.create({
      ...input,
      idUser,
    });
  }

  async findAll(idUser: number): Promise<CategoryEntity[]> {
    return await this._categoryRepository.findAll({
      where: { idUser },
      include: [{ model: CategoryEntity, as: 'parent' }],
    });
  }

  async findOne(id: number, idUser: number): Promise<CategoryEntity> {
    return await this._categoryRepository.findOne({
      where: { id, idUser },
    });
  }

  async delete(id: number, idUser: number): Promise<DeleteResponse> {
    const response = await this._categoryRepository.destroy({
      where: { id, idUser },
    });
    return { success: !!response, id };
  }

  async update(
    id: number,
    input: CategoryDto,
    idUser: number
  ): Promise<CategoryEntity> {
    let category = await this.findOne(id, idUser);
    if (!category) throw new NotFoundException('Category not found');

    category = await category.update({ ...input });
    return category;
  }
}
