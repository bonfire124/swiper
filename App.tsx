import React, {FC, useCallback, useEffect, useRef, useState} from 'react';
import {SafeAreaView, View, StyleSheet, PanResponder, Animated, Text, TouchableOpacity, Dimensions} from 'react-native';
import axios from 'axios';

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

    const [image, setImage] = useState('');

    const [cards, setCards] = useState([]);

    let pan = useRef(new Animated.ValueXY({x: 0, y: 0}));

    const currentWidth = screenWidth / 2;

    const createPanResponder = (animatedValue: any, index: number, cards: any) => {
        return (PanResponder.create({
            onStartShouldSetPanResponder: () => true,
            onPanResponderGrant: (event, gesture) => {
                animatedValue.setOffset({
                    // @ts-ignore
                    x: animatedValue.x._value,
                    // @ts-ignore
                    y: animatedValue.y._value
                });
            },
            onPanResponderMove: (event, gesture) => {
                animatedValue.setValue({x: gesture.dx, y: gesture.dy});
            },
            onPanResponderRelease: (e, gestureState) => {
                if (gestureState.dx > (currentWidth / 2)) {
                    moveAwayRight(animatedValue);
                } else if (gestureState.dx < -(currentWidth / 2)) {
                    moveAwayLeft(animatedValue);
                } else {
                    moveCardToCenter(animatedValue);
                }

            }
        }))
    };

    useEffect(() => {
        let newCards = [{id: 1, text: 'Привет'}, {id: 2, text: 'Пока'}, {id: 3, text: 'И снова привет'}].reverse();
        newCards = newCards.map((item, index) => {
            const animatedValue = new Animated.ValueXY({x: currentWidth - 125, y: screenHeight / 2 - 200});
            return {
                ...item,
                index,
                animatedValue,

            }
        });

        newCards = newCards.map((item, index) => {
            return {
                ...item,
                // @ts-ignore
                panHandlers: createPanResponder(item.animatedValue, index, newCards).panHandlers
            }
        });


        // @ts-ignore
        setCards(newCards);
        console.log('before', {...pan});
        // @ts-ignore
        pan.current = newCards[newCards.length - 1].animatedValue
        console.log('after', {...pan});


    }, []);
    const moveCardToCenter = (animatedValue: any) => {
        Animated.timing(animatedValue, {
            toValue: {x: 0, y: 0},
            duration: 300,
            useNativeDriver: false
        }).start(() => {
            animatedValue.flattenOffset()
        });
    };

    const moveAwayRight = (animatedValue: any) => {
        Animated.timing(animatedValue, {
            toValue: {
                x: currentWidth * 4,
                // @ts-ignore
                y: animatedValue.y._value
            },
            duration: 100,
            useNativeDriver: false
        }).start(() => {
            console.log('cards', {...cards});
            //pan.current = cards[cards.length - 2].animatedValue
        });
    };


    const moveAwayLeft = (animatedValue: any) => {

        Animated.timing(animatedValue, {
            toValue: {
                x: -(currentWidth * 4),
                // @ts-ignore
                y: animatedValue.y._value
            },
            duration: 100,
            useNativeDriver: false
        }).start();
    };


    return <SafeAreaView style={styles.container}>

        {cards.map((item, index) => <Animated.View
            style={[
                styles.square,

                // @ts-ignore
                item.animatedValue.getLayout(),
                {
                    transform: [{
                        // @ts-ignore
                        rotate: item.animatedValue.x.interpolate({
                            inputRange: [-125, currentWidth - 125, screenWidth],
                            outputRange: ['-35deg', '0deg', '35deg']
                        })
                    }]
                }
            ]}
            // @ts-ignore
            {...item.panHandlers}
        >

            <Text
                style={{color: '#000'}}>{
                // @ts-ignore
                item.text
            }</Text>
        </Animated.View>)}


        <Animated.View style={[{
            width: pan.current.x.interpolate({
                inputRange: [-(currentWidth * 4), 0, currentWidth - 125, currentWidth + currentWidth / 2, currentWidth * 4],
                outputRange: [60, 60, 50, 50, 50]
            }),
            height: pan.current.x.interpolate({
                inputRange: [-(currentWidth * 4), 0, currentWidth - 125, currentWidth + currentWidth / 2, currentWidth * 4],
                outputRange: [60, 60, 50, 50, 50]
            }),
            borderRadius: 40,
            backgroundColor: '#000',
            position: 'absolute',
            bottom: 20,
            left: 20,
            justifyContent: 'center',
            alignItems: 'center'
        }]}>
            <Text style={{color: '#fff'}}>
                1
            </Text>
        </Animated.View>
        <Animated.View style={{
            width: pan.current.x.interpolate({
                inputRange: [-(currentWidth * 4), 0, currentWidth - 125, currentWidth + currentWidth / 2, currentWidth * 4],
                outputRange: [50, 50, 50, 60, 60]  // 0 : 150, 0.5 : 75, 1 : 0
            }),
            height: pan.current.x.interpolate({
                inputRange: [-(currentWidth * 4), 0, currentWidth - 125, currentWidth + currentWidth / 2, currentWidth * 4],
                outputRange: [50, 50, 50, 60, 60]  // 0 : 150, 0.5 : 75, 1 : 0
            }),
            borderRadius: 100,
            backgroundColor: '#000',
            position: 'absolute',
            bottom: 20,
            right: 20,
            justifyContent: 'center',
            alignItems: 'center'
        }}>
            <Text style={{color: '#fff'}}>
                2
            </Text>
        </Animated.View>

        {/* {!!image && <Image source={{uri: image}}
                               style={{flex: 1, resizeMode: 'contain'}}/>}*/}

    </SafeAreaView>;
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    square: {
        position: 'absolute',
        width: 250,
        height: 400,
        borderRadius: 50,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: '#FF0000'
    }
});

export default App;
