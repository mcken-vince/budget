export const ProgressBar = ({
  progress = 0,
  uncategorizedBudgetOverride,
}: {
  progress?: number;
  uncategorizedBudgetOverride?: boolean;
}) => {
  if (uncategorizedBudgetOverride) {
    return (
      <div>
        <span id="ProgressLabel" className="sr-only">
          Loading
        </span>

        <span
          role="progressbar"
          aria-labelledby="ProgressLabel"
          aria-valuenow={100}
          className="block rounded-full bg-gray-200"
        >
          <span
            className="block h-3 rounded-full bg-[repeating-linear-gradient(45deg,_var(--tw-gradient-from)_0,_var(--tw-gradient-from)_20px,_var(--tw-gradient-to)_20px,_var(--tw-gradient-to)_40px)] from-indigo-400 to-indigo-500"
            style={{ width: '100%' }}
          ></span>
        </span>
      </div>
    );
  }

  const percentageProgress = !progress ? 0 : progress > 100 ? 100 : progress;

  return (
    <div>
      <span id="ProgressLabel" className="sr-only">
        Loading
      </span>

      <span
        role="progressbar"
        aria-labelledby="ProgressLabel"
        aria-valuenow={percentageProgress}
        className="block rounded-full bg-gray-200"
      >
        <span
          className={`block h-3 rounded-full ${
            progress > 100 ? 'bg-rose-500' : 'bg-sky-500'
          }`}
          style={{ width: `${percentageProgress}%` }}
        ></span>
      </span>
    </div>
  );
};
