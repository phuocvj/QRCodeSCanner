import { StatusBar } from 'expo-status-bar';
import React from 'react';
import {NativeBaseProvider  } from 'native-base';
import RootStackScreen  from './Screens/RootStackScreen';
export default function App() {
  return (
    <NativeBaseProvider
      >
       <RootStackScreen />
    </NativeBaseProvider>
  );
}

