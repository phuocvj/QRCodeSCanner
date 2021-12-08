import * as React from 'react';
import { View, Text,Button } from 'native-base';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

 import HomeScreen from "./HomeScreen";
 import ScanQRScreen from './ScanQRScreen';


function DetailsScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Details Screen</Text>
      <Button
        onPress={() => navigation.navigate('Details')}
      >Về HOme</Button>
    </View>
  );
}

const Stack = createNativeStackNavigator();

export default function RootStackScreen(){
    return(
        <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen options={{title:"QR Covid Location Scanner"}} name="Home" component={HomeScreen}/>
        <Stack.Screen options={{title:"QR Code"}} name="Scan" component={ScanQRScreen} />
      </Stack.Navigator>
    </NavigationContainer>
    )
}