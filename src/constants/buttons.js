import React from 'react';
import { Text, ImageBackground, StyleSheet, Button } from 'react-native';

export default (props) => {

    const text = props.text


    return(
        <Button title={text} color="#00095E"  style={styles.Bottum}/>
    )
}


const styles = StyleSheet.create({
    Bottum: {
        color: '#fff',
    }
})