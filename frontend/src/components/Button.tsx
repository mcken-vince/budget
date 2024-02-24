export type ButtonProps = {
  children: any;
  onClick?: (e: any) => void;
  className?: string;
};

export function Button({ children, onClick, className }: ButtonProps) {
  return (
    <button className={'' + className} onClick={onClick}>
      {children}
    </button>
  );
}
