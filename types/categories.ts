import { ReactNode } from 'react';

export interface CategoryType {
  id: string;
  title: string;
  icon: ReactNode;
  route: string;
}