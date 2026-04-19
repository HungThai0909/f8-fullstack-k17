import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useWizardStore } from '../../../store/useWizardStore';
import { step3Schema } from '../../../schemas/validationSchemas';
import { Input } from '../../Input';
import { Button } from '../../Button';

export const Step3 = ({ onNext, onBack }) => {
  const { formData, setFormData } = useWizardStore();
  
  const { 
    register, 
    handleSubmit, 
    formState: { errors, touchedFields, isValid } 
  } = useForm({
    resolver: zodResolver(step3Schema),
    defaultValues: formData,
    mode: 'onChange',
  });

  const onSubmit = (data) => {
    setFormData(data);
    onNext();
  };

  return (
    <div className="max-w-4xl mx-auto px-8">
      <h2 className="text-3xl font-bold text-white mb-6">Password</h2>
      
      <div className="space-y-6">
        <Input
          {...register('password')}
          type="password"
          label="Password"
          error={errors.password?.message}
          touched={touchedFields.password}
        />

        <Input
          {...register('confirmPassword')}
          type="password"
          label="Confirm Password"
          error={errors.confirmPassword?.message}
          touched={touchedFields.confirmPassword}
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