export const ProgressBar = ({ currentStep, totalSteps }) => {
  const progress = (currentStep / totalSteps) * 100;

  return (
    <div className="w-full h-1 bg-gray-700 mb-8">
      <div
        className="h-full bg-green-500 transition-all duration-300"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
};
