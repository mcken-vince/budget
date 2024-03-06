export const InputErrorMessage = ({ error }: { error?: string }) => {
  if (!error) return null;
  return <p className="text-rose-600 sm:text-sm">{error}</p>;
};
