import { Text, TouchableOpacity, ActivityIndicator } from 'react-native';
import React from 'react';

interface CustomButtonProps {
  children: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary';
  loading?: boolean;
  disabled?: boolean;
}

const CustomButton = ({ 
  children, 
  onPress, 
  variant = 'primary',
  loading = false,
  disabled = false
}: CustomButtonProps) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled || loading}
      className={`${
        variant === 'primary' ? 'bg-[#0F626F]' : 'bg-gray-200'
      } rounded-lg p-4 items-center ${
        (disabled || loading) ? 'opacity-50' : ''
      }`}
      activeOpacity={0.8}
    >
      {loading ? (
        <ActivityIndicator color={variant === 'primary' ? 'white' : '#0F626F'} />
      ) : (
        <Text className={`${
          variant === 'primary' ? 'text-white' : 'text-gray-800'
        } text-base font-semibold`}>
          {children}
        </Text>
      )}
    </TouchableOpacity>
  );
};

export default CustomButton;