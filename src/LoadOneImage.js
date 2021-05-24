import React from 'react';
import { Text, ImageBackground, StyleSheet, View, ScrollView, Dimensions, Image, FlatList } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { AssetsSelector } from 'expo-images-picker';

export default ({navigation}) => {




    const onDone = (data) => {
        navigation.navigate('CreateBarForm', data)
    }

    const goBack = () => {
        navigation.navigate('CreateBarForm')
    }

    return (
        <View style={styles.content}>
            <AssetsSelector
                options={{
                    assetsType: ['photo'],
                    maxSelections: 1,
                    margin: 2,
                    portraitCols: 4,
                    landscapeCols: 5,
                    widgetWidth: 200,
                    widgetBgColor: 'white',
                    videoIcon: {
                        Component: Ionicons,
                        iconName: 'ios-videocam',
                        color: '#fff',
                        size: 20,
                    },
                    selectedIcon: {
                        Component: Ionicons,
                        iconName: 'ios-checkmark-circle-outline',
                        color: 'white',
                        bg: '#00095c73',
                        size: 26,
                    },
                    defaultTopNavigator: {
                        selectedText: 'select',
                        continueText: 'Finalizar',
                        goBackText: 'Volver',
                        midTextColor: '#4A056B',
                        buttonStyle: styles.buttonStyles,
                        buttonTextStyle: styles.buttonTextStyles,
                        backFunction:()=>goBack(),
                        doneFunction: (data) => onDone(data),
                    },
                    spinnerColor: 'black',
                    onError: () => { },
                    noAssets: () => <View></View>,
                }}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    buttonTextStyles: {
        color: 'white',
    },
    buttonStyles: {
        backgroundColor: '#00095E',
        width: '30%',
        justifyContent: 'center',
        borderRadius: 5
    },
    content: {
        paddingTop: 30,
        paddingBottom: 25,
        flex: 1,
        borderBottomWidth: 1,
        borderColor: '#DCDCDC'
    }
})
