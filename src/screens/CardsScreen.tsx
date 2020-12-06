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
    Image, ActivityIndicator
} from 'react-native';
import axios from 'axios';
import Card from "../components/Card";
import {R} from "../resourses/R";


const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;

const CardsScreen = () => {

    const [loading, setLoading] = useState(true);
    const cardWidth = screenWidth - 50;
    const cardHeight = screenHeight - 150;
    const startCoordinationX = (screenWidth / 2) - (cardWidth / 2);

    const startCoordinationY = ((screenHeight / 2) - (cardHeight / 2));
    const [cards, setCards] = useState<{
        image: any;
        id: number, text: string
    }[]>([]);

    let ballAnimatedValue = useRef(new Animated.ValueXY({x: startCoordinationX, y: startCoordinationY})).current;
    useEffect(() => {
        axios.get('https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?sol=1000&page=1&api_key=16fx0ZnQtVvfsRCELKDYqdQ9YgCLereZKkKjNMxL')
            .then((resp) => {
                setCards(resp.data.photos.map((item: {
                    img_src: any;
                    rover: {
                        id: number
                        landing_date: string;
                        launch_date: string
                        name: string
                    }
                }, index: any) => {
                    return {
                        id: index,
                        image: item.img_src,
                        text: item.rover.name
                    }
                }));
            }).catch((error) => {
            console.log(error.response);
        });
    }, []);
    return (<SafeAreaView style={styles.container}>
        {!cards.length ? <ActivityIndicator size={'large'}/> : <>
            {cards.map((item, index) => {
                    return (<Card text={item.text}
                                  image={item.image}
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
                                      if (direction !== 'center') {
                                          cards.pop();
                                          setCards([...cards])
                                      }
                                  }}
                                  key={item.id}
                        />
                    )
                }
            )}

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
                <Image source={R.images.dislike} style={{marginTop: 5}}/>
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
                <Image source={R.images.like}/>
            </Animated.View>
        </>}
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

export default CardsScreen;
