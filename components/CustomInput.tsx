import { TextInput, View, Text } from 'react-native';
import React from 'react';

interface CustomInputProps {
  placeholder?: string;
  value: string;
  onChangeText: (text: string) => void;
  secureTextEntry?: boolean;
  keyboardType?: 'default' | 'email-address' | 'numeric' | 'phone-pad';
  autoCapitalize?: 'none' | 'sentences' | 'words' | 'characters';
  error?: boolean;
  errorMessage?: string;
}

const CustomInput = ({
  placeholder = '',
  value,
  onChangeText,
  secureTextEntry = false,
  keyboardType = 'default',
  autoCapitalize = 'sentences',
  error = false,
  errorMessage
}: CustomInputProps) => {
  return (
    <View>
      <TextInput
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
        secureTextEntry={secureTextEntry}
        keyboardType={keyboardType}
        autoCapitalize={autoCapitalize}
        className={`bg-white rounded-lg p-4 text-base border-2 ${
          error ? 'border-red-500' : 'border-black'
        }`}
        placeholderTextColor="#999"
      />
      {error && errorMessage && (
        <Text className="text-red-500 text-xs mt-1 ml-1">
          {errorMessage}
        </Text>
      )}
    </View>
  );
};

export default CustomInput;