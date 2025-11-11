import React, { useState } from "react";
import { View, Alert, Pressable } from "react-native";
import CustomText from "@/components/CustomText";
import CustomInput from "@/components/CustomInput";
import CustomButton from "@/components/CustomButton";
import { registerSchema, type RegisterFormData } from "@/lib/schema/TextSchema";
import "@/global.css";
import { ZodError } from "zod";

type RegisterFormProps = {
  onRegisterPress: () => void;
  onSwitchToLogin: () => void;
};

type FieldErrors = {
  [K in keyof RegisterFormData]?: string;
};

export default function RegisterForm({ onRegisterPress, onSwitchToLogin }: RegisterFormProps) {
  const [formData, setFormData] = useState<RegisterFormData>({
    username: "",
    email: "",
    password: "",
    confirmPassword: ""
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<FieldErrors>({});

  // Actualizar campo y limpiar su error
  const updateField = (field: keyof RegisterFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  const handleRegister = async () => {
    try {
      // Validar con Zod
      const validatedData = registerSchema.parse(formData);
      
      setLoading(true);
      
      // Simular llamada API (reemplazar con tu lógica real)
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      console.log("Registro exitoso:", validatedData);
      Alert.alert(
        "Éxito", 
        `Bienvenido ${validatedData.username}, tu cuenta ha sido creada exitosamente`
      );
      onRegisterPress();
      
    } catch (error) {
      if (error instanceof ZodError) {
        // Convertir errores de Zod a formato de objeto
        const fieldErrors: FieldErrors = {};
        error.errors.forEach((err) => {
          if (err.path[0]) {
            fieldErrors[err.path[0] as keyof RegisterFormData] = err.message;
          }
        });
        setErrors(fieldErrors);
      } else {
        Alert.alert("Error", "Hubo un problema al crear la cuenta");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <View className="bg-[#2D9966] w-screen h-screen flex justify-center items-center">
      <View className="m-2 shadow-2xl shadow-black p-4 rounded-lg bg-white border-black border-4 w-4/5 max-w-md">
        <View className="mb-8">
          <CustomText variant="large" dark={true}>
            Crear Cuenta
          </CustomText>
          <View className="h-2"></View>
          <CustomText variant="medium" dark={true}>
            Regístrate para comenzar
          </CustomText>
        </View>

        <View className="mb-4">
          <CustomText variant="small" dark={true}>
            Nombre de Usuario
          </CustomText>
          <View className="h-2"></View>
          <CustomInput
            placeholder="Tu nombre de usuario"
            value={formData.username}
            onChangeText={(text) => updateField("username", text)}
            autoCapitalize="none"
            error={!!errors.username}
            errorMessage={errors.username}
          />
        </View>

        <View className="mb-4">
          <CustomText variant="small" dark={true}>
            Correo Electrónico
          </CustomText>
          <View className="h-2"></View>
          <CustomInput
            placeholder="ejemplo@correo.com"
            value={formData.email}
            onChangeText={(text) => updateField("email", text)}
            keyboardType="email-address"
            autoCapitalize="none"
            error={!!errors.email}
            errorMessage={errors.email}
          />
        </View>

        <View className="mb-4">
          <CustomText variant="small" dark={true}>
            Contraseña
          </CustomText>
          <View className="h-2"></View>
          <CustomInput
            placeholder="••••••••"
            value={formData.password}
            onChangeText={(text) => updateField("password", text)}
            secureTextEntry={true}
            error={!!errors.password}
            errorMessage={errors.password}
          />
        </View>

        <View className="mb-6">
          <CustomText variant="small" dark={true}>
            Confirmar Contraseña
          </CustomText>
          <View className="h-2"></View>
          <CustomInput
            placeholder="••••••••"
            value={formData.confirmPassword}
            onChangeText={(text) => updateField("confirmPassword", text)}
            secureTextEntry={true}
            error={!!errors.confirmPassword}
            errorMessage={errors.confirmPassword}
          />
        </View>

        <CustomButton 
          onPress={handleRegister}
          loading={loading}
        >
          Registrarse
        </CustomButton>

        <View className="items-center mt-3">
          <Pressable onPress={onSwitchToLogin}>
            <CustomText variant="small" dark={true}>
              ¿Ya tienes una cuenta? Inicia Sesión
            </CustomText>
          </Pressable>
        </View>
      </View>
    </View>
  );
}