import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

export default ({ navigation }) => {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>Bienvenido a Social Party Socios</Text>
            <TouchableOpacity style={styles.botton} onPress={() => navigation.navigate('CreateBarForm')}>
                <Text style={styles.textButtom}>
                    CREAR BAR
                </Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    text: {
        textAlign: 'center',
        fontWeight: 'bold',
        color: '#00095E',
        fontSize: 26,
        marginBottom: 60,
    },
    botton: {
        width: 250,
        backgroundColor: '#00095E',
        borderRadius: 10
    },
    textButtom: {
        color: '#fff',
        fontSize: 25,
        padding: 40,
        textAlign: 'center'
    },
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
