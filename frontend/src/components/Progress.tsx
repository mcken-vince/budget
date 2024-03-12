export const ProgressBar = ({ progress = 0 }: { progress?: number }) => {
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
