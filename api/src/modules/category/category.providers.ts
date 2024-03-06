import { CategoryEntity } from '../../core/entities/category.entity';

export const categoryProviders = [
  {
    provide: 'CATEGORY_REPOSITORY',
    useValue: CategoryEntity,
  },
];
