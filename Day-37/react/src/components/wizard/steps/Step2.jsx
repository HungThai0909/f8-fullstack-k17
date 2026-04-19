import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useWizardStore } from '../../../store/useWizardStore';
import { step2Schema } from '../../../schemas/validationSchemas';
import { Input } from '../../Input';
import { Button } from '../../Button';

export const Step2 = ({ onBack }) => {
  const { formData, setFormData, setCurrentStep } = useWizardStore(); 
  
  const { 
    register, 
    handleSubmit, 
    formState: { errors, isValid }, 
    setError 
  } = useForm({
    resolver: zodResolver(step2Schema),
    defaultValues: formData,
    mode: 'onChange',
  });

  const onSubmit = (data) => {
    if (!data.username.toLowerCase().includes(formData.firstName.toLowerCase())) {
      setError('username', {
        type: 'manual',
        message: 'Invalid input',
      });
      return;
    }
    
    setFormData(data);
    setCurrentStep(4);
  };

  return (
    <div className="max-w-4xl mx-auto px-8">
      <h2 className="text-3xl font-bold text-white mb-4">Username</h2>
      <p className="text-gray-400 mb-8">
        Username should include your first name. This step is to demonstrate that we can validate field based on what user typed in the previous step.
      </p>
      
      <div className="space-y-6">
        <Input
          {...register('username')}
          label="Username"
          error={errors.username?.message}
          touched={true}
        />

        <div className="flex justify-center gap-4 mt-12">
          <Button 
            onClick={onBack} 
            variant="primary" 
            icon="fas fa-arrow-left" 
            iconPosition="left"
          >
            PREVIOUS
          </Button>
          <Button 
            onClick={handleSubmit(onSubmit)} 
            variant={isValid ? "success" : "default"} 
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