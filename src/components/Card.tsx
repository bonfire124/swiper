import React, {FC, useRef} from 'react';
import {View, StyleSheet, Animated, PanResponder, Text, Dimensions, Image} from "react-native";

interface IProps {
    text: string;
    image?: string;
    cardWidth?: number;
    cardHeight?: number;
    onCapture?: (xCoordinate: number, yCoordinate: number) => any;
    onMove?: (xCoordinate: number, yCoordinate: number) => any;
    onRelease?: (direction: 'left' | 'right' | 'center') => any;
}

const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;

const Card: FC<IProps> = ({text, image, cardHeight = 400, cardWidth = 250, onCapture, onMove, onRelease}) => {

    const startCoordinationX = (screenWidth / 2) - (cardWidth / 2);

    const startCoordinationY = ((screenHeight / 2) - (cardHeight / 2));

    const animatedValue = useRef(new Animated.ValueXY({
        x: startCoordinationX,
        y: startCoordinationY
    })).current;

    const panResponder = useRef(PanResponder.create({
        onStartShouldSetPanResponder: () => true,
        onPanResponderGrant: (event, gesture) => {
            if (onCapture) {
                // @ts-ignore
                onCapture(animatedValue.x._value, animatedValue.y._value);
            }
            animatedValue.setOffset({
                // @ts-ignore
                x: animatedValue.x._value,
                // @ts-ignore
                y: animatedValue.y._value
            });
        },
        onPanResponderMove: (event, gesture) => {
            animatedValue.setValue({x: gesture.dx, y: gesture.dy});
            // @ts-ignore
            onMove(gesture.dx + animatedValue.x._offset, animatedValue.y._value);
        },
        onPanResponderRelease: (e, gestureState) => {
            if (onRelease) {
                onRelease('right');
            }
            if (gestureState.dx > screenWidth / 4) {

                swipeAway('right');
            } else if (gestureState.dx < -(screenWidth / 4)) {
                swipeAway('left');
            } else {
                animatedValue.flattenOffset();
                returnCardToCenter();
            }
        }
    })).current;

    const returnCardToCenter = () => {
        Animated.timing(animatedValue, {
            toValue: {x: startCoordinationX, y: startCoordinationY},
            duration: 300,
            useNativeDriver: false
        }).start();
    };

    const swipeAway = (direction: 'right' | 'left') => {
        const x = direction === 'right' ? screenWidth * 2.5 : screenWidth * -2.5;
        Animated.timing(animatedValue, {
            toValue: {
                x,
                // @ts-ignore
                y: animatedValue.y._value
            },
            duration: 300,
            useNativeDriver: false
        }).start();
    };

    return (
        <Animated.View style={[styles.card,
            animatedValue.getLayout(), {
            width: cardWidth,
                height: cardHeight,
                transform: [{
                    // @ts-ignore
                    rotate: animatedValue.x.interpolate({
                        inputRange: [-(cardWidth), startCoordinationX, cardWidth],
                        outputRange: ['-35deg', '0deg', '35deg']
                    })
                }]
            }
        ]} {...panResponder.panHandlers}>
            {!!image && <Image source={{uri: image}}
                               style={{width: cardWidth, height: cardHeight,borderRadius: 14}}
            />}
            {!!text &&
            <Text style={styles.cardText}>
                {text}
            </Text>}
        </Animated.View>
    );
};

const styles = StyleSheet.create({
    card: {
        position: 'absolute',
        width: 250,
        height: 400,
        borderRadius: 14,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FFF',
    },
    cardText: {
        position: 'absolute',
        color: '#fff',
        fontSize: 20,
        fontWeight: '500',
        top: 24,
        left: 24
    }
});

export default Card;
