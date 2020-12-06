import React, {FC, useRef, useState} from "react";
import {SafeAreaView, StyleSheet, TouchableOpacity, View, Text} from "react-native";
import {Transition, Transitioning} from 'react-native-reanimated'

const data = [
    {
        name: 'firstList',
        items: [
            {
                name: 'firstItem',
            },
            {
                name: 'secondItem',
            },
            {
                name: 'thirdItem',
            },
            {
                name: 'fourthItem',
            },
            {
                name: 'fifthItem',
            },
            {
                name: 'sixthItem',
            },
            {
                name: 'seventhItem',
            },
        ],
        bg: 'red',
    },
    {
        name: 'secondList',
        items: [
            {
                name: 'firstItem',
            },
            {
                name: 'secondItem',
            },
            {
                name: 'thirdItem',
            },
            {
                name: 'fourthItem',
            },
            {
                name: 'fifthItem',
            },
            {
                name: 'sixthItem',
            },
            {
                name: 'seventhItem',
            },
        ],
        bg: 'green'
    },
    {
        name: 'thirdList',
        items: [
            {
                name: 'firstItem',
            },
            {
                name: 'secondItem',
            },
            {
                name: 'thirdItem',
            },
            {
                name: 'fourthItem',
            },
            {
                name: 'fifthItem',
            },
            {
                name: 'sixthItem',
            },
            {
                name: 'seventhItem',
            },
        ],
        bg: 'blue'
    },

];

const transition = (
    <Transition.Together>
        <Transition.In type={'fade'} durationMs={200}/>
        <Transition.Change/>
        <Transition.Out type={'fade'} durationMs={200}/>
    </Transition.Together>
);

const AccordionAnimationScreen: FC<{}> = ({}) => {
    const [currentIndex, setCurrentIndex] = useState('');
    const ref = useRef(null);
    return (
        <Transitioning.View
            style={styles.container}
            transition={transition}
            ref={ref}
        >
            {data.map((list) => <View style={[styles.list, {backgroundColor: list.bg}]} key={list.name}>
                <TouchableOpacity
                    activeOpacity={0.6}
                    onPress={() => {
                        // @ts-ignore
                        ref.current?.animateNextTransition();
                        setCurrentIndex(list.name === currentIndex ? '' : list.name)
                    }}
                >
                    <Text style={styles.listHeader}>{list.name}</Text>

                </TouchableOpacity>
                {(currentIndex === list.name) && <View style={{flexGrow: 1}}>
                    {list.items.map((item) => <View style={styles.item} key={item.name}>
                        <Text style={styles.itemText}>{item.name}</Text>
                    </View>)}
                </View>}
            </View>)}

        </Transitioning.View>)
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white'
    },
    list: {
        paddingVertical: 15,
        paddingHorizontal: 10,
        overflow: 'hidden'
    },
    listHeader: {
        fontSize: 25,
        color: 'white'
    },
    item: {
        paddingVertical: 10,
        paddingHorizontal: 20
    },
    itemText: {
        marginRight: 10
    }
});

export default AccordionAnimationScreen;
