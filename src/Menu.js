import React from 'react';
import { Text, ImageBackground, StyleSheet, TouchableHighlight } from 'react-native';
import { Ionicons } from '@expo/vector-icons';


export default ({navigation}) => {

    var menuImg = require('../assets/Rectangle24.png')
    /* onPress={() => navigation.navigate('MenuClub')} */
    return (
        <TouchableHighlight  onPress={() => navigation.navigate('ListMenu')}>
            <ImageBackground style={styles.imgMenu} source={menuImg}>
                <Text style={styles.titleBoxMap}>Carta</Text>
                <Ionicons name="chevron-forward-sharp" color={'#ffff'} size={33} />
            </ImageBackground>
        </TouchableHighlight>
    )
}


const styles = StyleSheet.create({
    titleBoxMap: {
        color: '#fff',
        fontSize: 18,
        paddingLeft: 20,
        paddingTop: 10,
        width: '80%',
        paddingBottom: 10,
        fontWeight: 'bold',
        textTransform: 'uppercase'
    },
    imgMenu: {
        width: '100%',
        height: 80,
        marginTop: 10,
        flexDirection: 'row',
        alignItems: 'center'
    },
})