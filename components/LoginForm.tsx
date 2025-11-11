import CustomButton from "@/components/CustomButton";
import CustomInput from "@/components/CustomInput";
import CustomText from "@/components/CustomText";
import { loginSchema, type LoginFormData } from "@/lib/schema/TextSchema";
import "@/global.css";
import React, { useState } from "react";
import { Alert, Pressable, View } from "react-native";
import { ZodError } from "zod";

type LoginFormProps = {
  onLoginPress: () => void;
  onSwitchToRegister: () => void;
};

type FieldErrors = {
  [K in keyof LoginFormData]?: string;
};

export default function LoginForm({ onLoginPress, onSwitchToRegister }: LoginFormProps){
  const [formData, setFormData] = useState<LoginFormData>({
    email: "",
    password: ""
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<FieldErrors>({});

  // Actualizar campo y limpiar su error
  const updateField = (field: keyof LoginFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  const handleLogin = async () => {
    try {
      // Validar con Zod
      const validatedData = loginSchema.parse(formData);
      
      setLoading(true);
      
      // Simular llamada API (reemplazar con tu lógica real)
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      console.log("Login exitoso:", validatedData);
      Alert.alert("Éxito", `Bienvenido ${validatedData.email}`);
      onLoginPress();
      
    } catch (error) {
      if (error instanceof ZodError) {
        // Convertir errores de Zod a formato de objeto
        const fieldErrors: FieldErrors = {};
        error.errors.forEach((err) => {
          if (err.path[0]) {
            fieldErrors[err.path[0] as keyof LoginFormData] = err.message;
          }
        });
        setErrors(fieldErrors);
      } else {
        Alert.alert("Error", "Hubo un problema al iniciar sesión");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <View className="bg-[#2D9966] w-screen h-screen flex justify-center items-center">
      <View className="m-2 border-black border-4 shadow-2xl shadow-black p-4 rounded-lg bg-white w-4/5 max-w-md">
        <View className="mb-8">
          <CustomText variant="large" dark={true}>
            Bienvenido
          </CustomText>
          <View className="h-2"></View>
          <CustomText variant="medium" dark={true}>
            Inicia sesión para continuar
          </CustomText>
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

        <View className="mb-6">
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

        <CustomButton 
          onPress={handleLogin}
          loading={loading}
        >
          Iniciar Sesión
        </CustomButton>

        <View className="mt-4 items-center">
          <Pressable>
            <CustomText variant="small" dark={true}>
              ¿Olvidaste tu contraseña?
            </CustomText>
          </Pressable>
        </View>

        <View className="items-center mt-3">
          <Pressable onPress={onSwitchToRegister}>
            <CustomText variant="small" dark={true}>
              ¿No tienes cuenta? Regístrate
            </CustomText>
          </Pressable>
        </View>
      </View>
    </View>
  );
}