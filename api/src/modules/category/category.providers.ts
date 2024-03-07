import { CategoryEntity } from '@entities';

export const categoryProviders = [
  {
    provide: 'CATEGORY_REPOSITORY',
    useValue: CategoryEntity,
  },
];
