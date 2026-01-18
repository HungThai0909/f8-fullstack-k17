import { useWizardStore } from "../../../store/useWizardStore";
import { Button } from "../../Button";

export const Step5 = ({ onBack }) => {
  const { formData } = useWizardStore();

  return (
    <div className="max-w-4xl mx-auto px-8">
      <h2 className="text-3xl font-bold text-white mb-4">Congratulations!</h2>
      <p className="text-white mb-2">You did it {formData.firstName}! </p>
      <p className="text-white mb-6">Here's your input:</p>

      <div className="bg-black rounded-lg p-6 mb-8">
        <pre className="text-green-400 text-sm font-mono">
          {`{
  "firstName": "${formData.firstName}",
  "lastName": "${formData.lastName}",
  "age": "${formData.age}",
  "email": "${formData.email}",
  "username": "${formData.username}"
}`}
        </pre>
      </div>

      <div className="flex justify-center gap-4">
        <Button
          onClick={onBack}
          variant="primary"
          icon="fas fa-arrow-left"
          iconPosition="left"
        >
          PREVIOUS
        </Button>
        <Button
          disabled
          variant="primary"
          icon="fas fa-arrow-right"
          iconPosition="right"
        >
          NEXT
        </Button>
      </div>
    </div>
  );
};
