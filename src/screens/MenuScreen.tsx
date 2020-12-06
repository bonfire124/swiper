import React, {FC} from "react";
import {SafeAreaView, StyleSheet, Text, TouchableOpacity} from "react-native";
import {
    StackNavigationConfig, StackNavigationEventMap,
    StackNavigationOptions,
    StackNavigationProp
} from "@react-navigation/stack/lib/typescript/src/types";

const MenuButton = ({text, onPress}: { text: string, onPress: any }) => {
    return (<TouchableOpacity style={styles.menuButton} onPress={onPress}>
        <Text style={styles.menuButtonText}>{text}</Text>
    </TouchableOpacity>)
};

const MenuScreen: FC<{ navigation: any }> = ({navigation}) => {
    return (<SafeAreaView>
        <MenuButton
            text={'Cards'}
            onPress={() => navigation.navigate('CardsScreen', {})}/>
        <MenuButton
            text={'AccordionAnimation'}
            onPress={() => navigation.navigate('AccordionAnimationScreen')}/>
    </SafeAreaView>)
};

const styles = StyleSheet.create({
    menuButton: {
        borderBottomWidth: 1,
        paddingVertical: 10,

    },
    menuButtonText: {}
});

export default MenuScreen;
