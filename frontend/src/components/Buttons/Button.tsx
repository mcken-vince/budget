export type ButtonProps = {
  children: any;
  onClick?: (e: any) => void;
  variant?: 'solid' | 'border';
  type?: 'button' | 'reset' | 'submit';
};

export function Button({ children, onClick, variant, type }: ButtonProps) {
  return (
    <button
      type={type}
      className={`inline-block rounded border border-indigo-600 px-12 py-3 text-sm font-medium ${
        variant === 'border'
          ? 'text-indigo-600 hover:bg-indigo-600 hover:text-white focus:outline-none focus:ring active:bg-indigo-500'
          : 'bg-indigo-600 text-white hover:bg-transparent hover:text-indigo-600 focus:outline-none focus:ring active:text-indigo-500'
      }`}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
