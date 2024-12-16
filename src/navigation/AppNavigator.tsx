import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack'; 
import { NavigationContainer } from '@react-navigation/native';
import { RootStackParamList } from '../types/NavigationTypes'; // Importar los tipos de navegación
import { LoginScreen } from '../screens/LoginScreen';
import { RegisterScreen } from '../screens/RegisterScreen';

const Stack = createNativeStackNavigator<RootStackParamList>();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Login" component={LoginScreen} options={{
            headerShown: false, 
          }} />
        <Stack.Screen name="Register" component={RegisterScreen} options={{
            headerShown: false,  
          }}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;