import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { Audio } from 'expo-av';

const MusicInterfaceComponent = () => {
  // Estado para la música actual (inicia con 'Reggaeton')
  const [musicaActual, setMusicaActual] = useState('Reggaeton');

  // Estado para el estado de reproducción (inicia reproduciendo)
  const [isPlaying, setIsPlaying] = useState(false);

  // Estado para la posición de la música
  const [posicion, setPosicion] = useState(0);
  const [duracion, setDuracion] = useState(0);

  // Referencia al objeto de sonido
  const sound = useRef<Audio.Sound | null>(null);

  // Array de tipos de música disponibles
  const tiposMusica = ['Reggaeton', 'Cumbia', 'Salsa'];

  // Objeto con las imágenes para cada tipo de música
  const imagenesMusica: { [key: string]: any } = {  // Ajuste temporal para evitar errores; usa ImageSourcePropType si está definido
    'Reggaeton': require('@/assets/images/PlanB.png'),
    'Cumbia': require('@/assets/images/Cumbia.png'),
    'Salsa': require('@/assets/images/Salsa.png')
  };

  // Objeto con las canciones para cada tipo de música
  const cancionesMusica: { [key: string]: any } = {
    'Reggaeton': require('@/assets/audio/Plan B - Candy [Official Audio].mp3'),
    'Cumbia': require('@/assets/audio/Don Medardo y sus Players  - Solo tu.mp3'),
    'Salsa': require('@/assets/audio/Tu Con El.mp3')
  };

  // Configurar audio al montar el componente
  useEffect(() => {
    configurarAudio();
    return () => {
      // Limpiar al desmontar
      if (sound.current) {
        sound.current.unloadAsync();
      }
    };
  }, []);

  // Cargar nueva música cuando cambia el tipo
  useEffect(() => {
    cargarMusica();
  }, [musicaActual]);

  // Actualizar posición cada segundo
  useEffect(() => {
    let intervalo: number;  // Cambio aquí: de NodeJS.Timeout a number
    if (isPlaying && sound.current) {
      intervalo = setInterval(async () => {
        const status = await sound.current?.getStatusAsync();
        if (status && status.isLoaded) {
          setPosicion(status.positionMillis);
          setDuracion(status.durationMillis || 0);
        }
      }, 1000);
    }
    return () => {
      if (intervalo) clearInterval(intervalo);
    };
  }, [isPlaying]);

  const configurarAudio = async () => {
    await Audio.setAudioModeAsync({
      playsInSilentModeIOS: true,
      staysActiveInBackground: true,
    });
  };

  const cargarMusica = async () => {
    try {
      // Descargar música anterior si existe
      if (sound.current) {
        await sound.current.unloadAsync();
      }

      // Cargar nueva música
      const { sound: nuevoSound } = await Audio.Sound.createAsync(
        cancionesMusica[musicaActual],
        { shouldPlay: isPlaying }
      );

      sound.current = nuevoSound;

      // Obtener duración
      const status = await nuevoSound.getStatusAsync();
      if (status.isLoaded) {
        setDuracion(status.durationMillis || 0);
      }
    } catch (error) {
      console.error('Error cargando música:', error);
    }
  };

  // Función para seleccionar un tipo de música directamente
  const seleccionarMusica = async (tipo: string) => {
    setMusicaActual(tipo);
    setPosicion(0);
  };

  // Función para ir al siguiente tipo de música
  const siguienteMusica = () => {
    const indiceActual = tiposMusica.indexOf(musicaActual);
    const siguienteIndice = (indiceActual + 1) % tiposMusica.length;
    setMusicaActual(tiposMusica[siguienteIndice]);
    setPosicion(0);
  };

  // Función para ir al tipo de música anterior
  const musicaAnterior = () => {
    const indiceActual = tiposMusica.indexOf(musicaActual);
    const indiceAnterior = (indiceActual - 1 + tiposMusica.length) % tiposMusica.length;
    setMusicaActual(tiposMusica[indiceAnterior]);
    setPosicion(0);
  };

  // Función para togglear la reproducción
  const toggleReproduccion = async () => {
    if (!sound.current) return;

    if (isPlaying) {
      await sound.current.pauseAsync();
    } else {
      await sound.current.playAsync();
    }
    setIsPlaying(!isPlaying);
  };

  // Formatear tiempo en mm:ss
  const formatearTiempo = (milisegundos: number) => {
    const totalSegundos = Math.floor(milisegundos / 1000);
    const minutos = Math.floor(totalSegundos / 60);
    const segundos = totalSegundos % 60;
    return `${minutos}:${segundos.toString().padStart(2, '0')}`;
  };

  // Calcular porcentaje de progreso
  const progreso = duracion > 0 ? (posicion / duracion) * 100 : 0;

  return (
    <View className="p-5 bg-gray-800 flex-1 justify-center items-center">
      {/* Imagen grande de la música actual */}
      <View className="mb-6">
        <Image 
          source={imagenesMusica[musicaActual]}
          className="w-64 h-64 rounded-2xl"
          style={{ width: 256, height: 256 }}
          resizeMode="cover"
        />
      </View>

      {/* Sección para mostrar la música reproduciendo */}
      <Text className="text-white text-lg mb-3">
        Reproduciendo: {musicaActual}
      </Text>
      <Text className="text-gray-400 text-sm mb-5">
        {isPlaying ? '▶️ Reproduciendo' : '⏸️ Pausado'}
      </Text>

      {/* Barra de progreso */}
      <View className="w-full px-4 mb-3">
        <View className="w-full h-2 bg-gray-600 rounded-full overflow-hidden">
          <View 
            className="h-full bg-green-500"
            style={{ width: `${progreso}%` }}
          />
        </View>
        <View className="flex-row justify-between mt-2">
          <Text className="text-gray-400 text-xs">{formatearTiempo(posicion)}</Text>
          <Text className="text-gray-400 text-xs">{formatearTiempo(duracion)}</Text>
        </View>
      </View>

      {/* Sección de botones para seleccionar tipo de música */}
      <View className="flex-row mb-5">
        {tiposMusica.map((tipo) => (
          <TouchableOpacity
            key={tipo}
            onPress={() => seleccionarMusica(tipo)}
            className={`p-4 m-2 rounded-lg ${musicaActual === tipo ? 'bg-green-500' : 'bg-gray-600'}`}
          >
            <Text className="text-white text-base">{tipo}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Sección de controles */}
      <View className="flex-row justify-around w-full">
        <TouchableOpacity onPress={musicaAnterior} className="p-4">
          <Text className="text-white text-2xl">⬅️</Text>
        </TouchableOpacity>
        
        <TouchableOpacity onPress={toggleReproduccion} className="p-4 bg-green-500 rounded-full">
          <Text className="text-white text-2xl">
            {isPlaying ? '⏸️' : '▶️'}
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity onPress={siguienteMusica} className="p-4">
          <Text className="text-white text-2xl">➡️</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default MusicInterfaceComponent;
