import React, { useState } from 'react';
import { View, TouchableOpacity } from 'react-native';
import CustomText from "@/components/CustomText";
import CustomButton from "@/components/CustomButton";
import { useRouter } from 'expo-router';  // Importa useRouter para navegación programática

const ConfiguracionScreen = () => {
  const router = useRouter();  // Usa el hook para obtener el router
  const [mostrarIdiomas, setMostrarIdiomas] = useState(true);  // Cambiado a true para que aparezca abierto por defecto
  const [idioma, setIdioma] = useState('Español');

  const idiomas = ['Español', 'English', 'Français', 'Deutsch', 'Português'];

  return (
    <View className="bg-black h-full w-full">
      
      {/* Header */}
      <View className="pt-12 pb-6 px-6">
        <CustomText variant="title" dark={false}>
          Ajustes
        </CustomText>
      </View>

      {/* Contenido */}
      <View className="px-6">
        
        {/* Opción Idioma */}
        <TouchableOpacity 
          onPress={() => setMostrarIdiomas(!mostrarIdiomas)}  // Aún togglea el menú
          className="py-4 border-b border-gray-800"
        >
          <CustomText variant="small" dark={false}>
            Idioma
          </CustomText>
          <CustomText variant="small" dark={false}>
            {idioma}
          </CustomText>
        </TouchableOpacity>

        {/* Lista de idiomas */}
        {mostrarIdiomas && (
          <View className="bg-gray-900 rounded-lg mt-2 mb-4">
            {idiomas.map((lang) => (
              <TouchableOpacity
                key={lang}
                onPress={() => {
                  setIdioma(lang);  // Solo actualiza el idioma, no cierra el menú
                }}
                className={`p-4 ${lang === idioma ? 'bg-[#7BF1A8]' : ''}`}
              >
                <CustomText variant="small" dark={false}>
                  {lang}
                </CustomText>
              </TouchableOpacity>
            ))}
          </View>
        )}

        {/* Opción Vincular */}
        <TouchableOpacity 
          onPress={() => alert('Vinculando cuenta...')}
          className="py-4 border-b border-gray-800"
        >
          <CustomText variant="small" dark={false}>
            Vincular cuenta
          </CustomText>
        </TouchableOpacity>
      </View>
      
      {/* Botón para cerrar sesión con navegación corregida */}
      <CustomButton 
        variant="primary" 
        onPress={() => router.push('/')}  // Navega a la ruta raíz
      >
        Cerrar Sesion
      </CustomButton>
    </View>
  );
};

export default ConfiguracionScreen;
