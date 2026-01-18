import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useWizardStore } from '../../../store/useWizardStore';
import { step1Schema } from '../../../schemas/validationSchemas';
import { Input } from '../../Input';
import { Button } from '../../Button';

export const Step1 = ({ onNext, onBack }) => {
  const { formData, setFormData } = useWizardStore();
  
  const { 
    register, 
    handleSubmit, 
    formState: { errors, touchedFields, isValid } 
  } = useForm({
    resolver: zodResolver(step1Schema),
    defaultValues: formData,
    mode: 'onChange',
  });

  const onSubmit = (data) => {
    setFormData(data);
    onNext();
  };

  return (
    <div className="max-w-4xl mx-auto px-8">
      <h2 className="text-3xl font-bold text-white mb-6">Contact Info</h2>
      
      <div className="space-y-6">
        <div className="grid grid-cols-2 gap-6">
          <Input
            {...register('firstName')}
            label="First Name"
            placeholder="e.g. John"
            error={errors.firstName?.message}
            touched={touchedFields.firstName}
          />
          
          <Input
            {...register('lastName')}
            label="Last Name"
            placeholder="e.g. Doe"
            error={errors.lastName?.message}
            touched={touchedFields.lastName}
          />
        </div>

        <div className="grid grid-cols-2 gap-6">
          <Input
            {...register('age')}
            label="Age"
            placeholder="e.g. 18"
            error={errors.age?.message}
            touched={touchedFields.age}
          />
          
          <Input
            {...register('email')}
            label="Email"
            placeholder="e.g. john@doe.com"
            error={errors.email?.message}
            touched={touchedFields.email}
          />
        </div>

        <div className="flex justify-center gap-4 mt-12">
          <Button 
            onClick={onBack} 
            disabled 
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