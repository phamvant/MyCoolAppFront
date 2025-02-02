const ProgressBar: React.FC<{ progress: number }> = ({ progress }) => {
  return (
    <div className="flex flex-col items-start w-full gap-1">
      <div className="text-xs text-gray-500">{progress}% completed</div>
      <div className="w-full h-2 bg-gray-200 rounded-full">
        <div
          className="h-full bg-primary rounded-full transition-all duration-300"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
};

export default ProgressBar;
