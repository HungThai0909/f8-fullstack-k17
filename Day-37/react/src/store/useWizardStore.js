import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useWizardStore = create(
  persist(
    (set) => ({
      currentStep: 1,
      formData: {
        firstName: '',
        lastName: '',
        age: '',
        email: '',
        username: '',
        password: '',
        confirmPassword: '',
        country: '',
        city: '',
        address: '',
      },
      setCurrentStep: (step) => set({ currentStep: step }),
      setFormData: (data) => set((state) => ({ 
        formData: { ...state.formData, ...data } 
      })),
      resetWizard: () => set({ 
        currentStep: 1, 
        formData: {
          firstName: '',
          lastName: '',
          age: '',
          email: '',
          username: '',
          password: '',
          confirmPassword: '',
          country: '',
          city: '',
          address: '',
        }
      }),
    }),
    {
      name: 'wizard-storage',
    }
  )
);