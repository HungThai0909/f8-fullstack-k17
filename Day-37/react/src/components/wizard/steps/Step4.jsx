import React, { useState } from "react";
import { Button } from "../../Button";

export const Step4 = ({ onNext, onBack }) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleNext = async () => {
    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 2000));

    setIsLoading(false);
    onNext();
  };

  return (
    <div className="max-w-4xl mx-auto px-8">
      <h2 className="text-3xl font-bold text-white mb-4">Async</h2>
      <p className="text-gray-400 mb-8">
        Pressing "Next" does async operation that takes 2 seconds before we
        proceed to the next step.
      </p>

      <div className="space-y-6">
        <div className="flex justify-center gap-4 mt-12">
          <Button
            onClick={onBack}
            variant="primary"
            disabled={isLoading}
            icon="fas fa-arrow-left"
            iconPosition="left"
          >
            PREVIOUS
          </Button>
          <Button
            onClick={handleNext}
            variant="primary"
            isLoading={isLoading}
            icon="fas fa-arrow-right"
            iconPosition="right"
          >
            NEXT
          </Button>
        </div>
      </div>
    </div>
  );
};
