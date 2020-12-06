import 'react-native-gesture-handler';
import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from "@react-navigation/stack";
import CardsScreen from "../screens/CardsScreen";
import MenuScreen from "../screens/MenuScreen";
import AccordionAnimationScreen from "../screens/AccrodionAnimationScreen";

const Stack = createStackNavigator();

export default function App() {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName={'MenuScreen'}>
                <Stack.Screen name={'MenuScreen'} component={MenuScreen} options={() => ({
                    headerShown: false
                })}/>
                <Stack.Screen name={'CardsScreen'} component={CardsScreen} options={() => ({
                    headerBackTitle: ' '
                })}/>
                <Stack.Screen name={'AccordionAnimationScreen'} component={AccordionAnimationScreen} options={() => ({
                    headerBackTitle: ' '
                })}/>
            </Stack.Navigator>
        </NavigationContainer>
    );
}
