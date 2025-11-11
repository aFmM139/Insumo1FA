import React from 'react'
import { Tabs } from 'expo-router'
import Ionicons from '@expo/vector-icons/Ionicons';


const _layout = () => {
  return (
    <Tabs screenOptions={{
      tabBarActiveTintColor: '#8FCC9A',
      headerStyle: {
        backgroundColor: '#25292e',
      },
      headerShadowVisible: false,
      headerTintColor: '#8FCC9A',
      tabBarStyle: {
        backgroundColor: '#25292e',
      },
    }}>
        <Tabs.Screen name="HomeScreen" options={{
            title:"Home",
            tabBarIcon: ({ color, focused }) => (
              <Ionicons name={'home'} color={color} size={24} />
            ),
        }}/>
        <Tabs.Screen name="SettingsScreen" options={{
            title:"Configuraciones",
            tabBarIcon: ({ color, focused }) => (
              <Ionicons name={'settings'} color={color} size={24} />
            ),
        }}/>
        <Tabs.Screen name="NowPlaying" options={{
            title:"Now Playing",
            tabBarIcon: ({ color, focused }) => (
              <Ionicons name={'play'} color={color} size={24} />
            ),
        }}/>
    </Tabs>
  )
}

export default _layout