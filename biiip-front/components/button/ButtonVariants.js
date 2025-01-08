// src/components/ButtonVariants.js
export const BUTTON_VARIANTS = {
  primary: {
    container: 'bg-brand-darkBlue-500-main',
    text: 'text-white',
    icon: 'text-white',
    hover: 'bg-brand-darkBlue-600',
    pressed: 'bg-brand-darkBlue-700',
  },
  secondary: {
    container: 'bg-brand-yellow-500-main',
    text: 'text-white',
    icon: 'text-white',
    hover: 'bg-brand-yellow-600',
    pressed: 'bg-brand-yellow-700',
  },
  tertiary: {
    container: 'bg-transparent border border-blue-500',
    text: 'text-blue-500',
    icon: 'text-blue-500',
    hover: 'bg-blue-50',
    pressed: 'bg-blue-100',
  },
  danger: {
    container: 'bg-red-500',
    text: 'text-white',
    icon: 'text-white',
    hover: 'bg-red-600',
    pressed: 'bg-red-700',
  },
  success: {
    container: 'bg-green-500',
    text: 'text-white',
    icon: 'text-white',
    hover: 'bg-green-600',
    pressed: 'bg-green-700',
  },
};
