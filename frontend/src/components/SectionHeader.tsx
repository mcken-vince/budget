import { SectionTitle } from './SectionTitle';

export interface SectionHeaderProps {
  title: string;
  children: React.ReactNode;
}

export const SectionHeader = ({ title, children }: SectionHeaderProps) => {
  return (
    <div className="flex flex-col sm:flex-row justify-between mb-5 sm:items-center">
      <SectionTitle>{title}</SectionTitle>
      <div className="flex flex-col gap-2 md:flex-row">{children}</div>
    </div>
  );
};
