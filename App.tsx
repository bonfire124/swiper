import React, {FC, useCallback, useEffect, useRef, useState} from 'react';
import {
    SafeAreaView,
    View,
    StyleSheet,
    PanResponder,
    Animated,
    Text,
    TouchableOpacity,
    Dimensions,
    Image
} from 'react-native';
import axios from 'axios';
import Card from "./src/components/Card";

const RatingButton: FC<{ text: string }> = ({text}) => {
    return (
        <View style={{borderRadius: 100, backgroundColor: '#000'}}>
            <Text>

            </Text>
        </View>
    )
};

const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;

const App = () => {

    const cardWidth = screenWidth - 50;
    const cardHeight = screenHeight - 150;
    const startCoordinationX = (screenWidth / 2) - (cardWidth / 2);

    const startCoordinationY = ((screenHeight / 2) - (cardHeight / 2));
    const [cards, setCards] = useState<{ id: number, text: string }[]>([]);

    let ballAnimatedValue = useRef(new Animated.ValueXY({x: startCoordinationX, y: startCoordinationY})).current;

    useEffect(() => {
        let newCards = [
            {id: 1, text: 'Привет'},
            {id: 2, text: 'Пока'},
            {id: 3, text: 'И снова привет'},
            {id: 4, text: 'Как'},
            {id: 5, text: 'Дела'},
            {id: 6, text: 'Сладких '},
            {id: 7, text: 'Снов'},
        ].reverse();
        setCards(newCards)
    }, []);

    return (<SafeAreaView style={styles.container}>
        {cards.map((item) =>
            <Card text={item.text}
                  onCapture={(x, y) => {
                      ballAnimatedValue.setValue({x, y})
                  }}
                  cardWidth={cardWidth}
                  cardHeight={cardHeight}
                  onMove={(x, y) => {
                      ballAnimatedValue.setValue({x, y})
                  }}
                  onRelease={(direction) => {
                      Animated.timing(ballAnimatedValue, {
                          duration: 300,
                          useNativeDriver: false,
                          toValue: {x: startCoordinationX, y: startCoordinationY}
                      }).start();
                  }}
                  key={item.id}
            />)}

        <Animated.View style={[
            styles.button, styles.leftButton, {
                width: ballAnimatedValue.x.interpolate({
                    inputRange: [
                        screenWidth * -2.5,
                        0 - cardWidth / 2,
                        startCoordinationX,
                        screenWidth - cardWidth / 2,
                        screenWidth * 2.5],
                    outputRange: [72, 68, 56, 56, 56]
                }),
                height: ballAnimatedValue.x.interpolate({
                    inputRange: [
                        screenWidth * -2.5,
                        0 - cardWidth / 2,
                        startCoordinationX,
                        screenWidth - cardWidth / 2,
                        screenWidth * 2.5],
                    outputRange: [72, 68, 56, 56, 56]
                }),
                opacity: ballAnimatedValue.x.interpolate({
                    inputRange: [screenWidth * -2.5,
                        0 - cardWidth / 2,
                        startCoordinationX,
                        screenWidth - cardWidth / 2,
                        screenWidth * 2.5],
                    outputRange: [1, 1, 1, 0.4, 0.3]
                })
            }]}>
            <Image source={require('./src/img/dislike.png')} style={{marginTop: 5}}/>
        </Animated.View>
        <Animated.View style={[
            styles.button, styles.rightButton, {
                width: ballAnimatedValue.x.interpolate({
                    inputRange: [
                        screenWidth * -2.5,
                        0 - cardWidth / 2,
                        startCoordinationX,
                        screenWidth - cardWidth / 2,
                        screenWidth * 2.5],
                    outputRange: [56, 56, 56, 68, 72]
                }),
                height: ballAnimatedValue.x.interpolate({
                    inputRange: [
                        screenWidth * -2.5,
                        0 - cardWidth / 2,
                        startCoordinationX,
                        screenWidth - cardWidth / 2,
                        screenWidth * 2.5],
                    outputRange: [56, 56, 56, 68, 72]
                }),
                opacity: ballAnimatedValue.x.interpolate({
                    inputRange: [screenWidth * -2.5,
                        0 - cardWidth / 2,
                        startCoordinationX,
                        screenWidth - cardWidth / 2,
                        screenWidth * 2.5],
                    outputRange: [0.3, 0.4, 1, 1, 1]
                })
            }]}>
            <Image source={require('./src/img/like.png')}/>
        </Animated.View>
    </SafeAreaView>);
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    button: {
        width: 56,
        height: 56,
        backgroundColor: '#000',
        borderRadius: 50,
        position: 'absolute',
        bottom: 45,
        justifyContent: 'center',
        alignItems: 'center'
    },
    leftButton: {
        left: 70
    },
    rightButton: {
        right: 70,
        backgroundColor: '#EB5757'
    },
    box: {
        height: 150,
        width: 150,
        backgroundColor: "blue",
        borderRadius: 5
    }
});

export default App;
