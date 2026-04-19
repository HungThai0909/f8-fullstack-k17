import { useWizardStore } from "../../store/useWizardStore";
import { ProgressBar } from "./ProgressBar";
import { Step1 } from "./steps/Step1";
import { Step2 } from "./steps/Step2";
import { Step4 } from "./steps/Step4";
import { Step5 } from "./steps/Step5";

export const WizardForm = () => {
  const { currentStep, setCurrentStep } = useWizardStore();
  const totalSteps = 5;

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      if (currentStep === 4) {
        setCurrentStep(2);
      } else {
        setCurrentStep(currentStep - 1);
      }
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return <Step1 onNext={handleNext} onBack={handleBack} />;
      case 2:
        return <Step2 onNext={handleNext} onBack={handleBack} />;
      case 4:
        return <Step4 onNext={handleNext} onBack={handleBack} />;
      case 5:
        return <Step5 onBack={handleBack} />;
      default:
        return <Step1 onNext={handleNext} onBack={handleBack} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 py-8">
      <div className=" mx-auto">
        <div className="flex justify-between items-center px-8 mb-4">
          <h1 className="text-xl font-semibold text-white">Wizard</h1>
          <div className="flex items-center gap-3">
            <span className="text-white">
              Step {currentStep} / {totalSteps}
            </span>
            <div className="text-gray-900 w-10 h-10 bg-white rounded-full flex items-center justify-center">        
                <img
                  src="/images/github.png"
                  alt="Github"
                />
            </div>
          </div>
        </div>

        <ProgressBar currentStep={currentStep} totalSteps={totalSteps} />

        <div className="mt-16">{renderStep()}</div>
      </div>
    </div>
  );
};
