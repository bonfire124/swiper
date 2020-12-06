import 'react-native-gesture-handler';
import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from "@react-navigation/stack";
import CardsScreen from "../screens/CardsScreen";

const Stack = createStackNavigator();

export default function App() {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name={'CardsScreen'} component={CardsScreen}/>
            </Stack.Navigator>
        </NavigationContainer>
    );
}
