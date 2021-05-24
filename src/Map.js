import React, { useState, useEffect } from 'react'
import { StyleSheet, Alert, Dimensions } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import Constants from 'expo-location';


export default ({onPress, locations}) => {
    const [location, setLocation] = useState({})

    const Searchlocation = async () => {
        const { status } = await Location.requestForegroundPermissionsAsync()
        if (status !== 'granted') {
            return Alert.alert('No tienes los permisos necesarios para acceder al mapa, por favor acepta los permisos de localización')
        }
        const location = await Location.getCurrentPositionAsync({})
        setLocation(location)
    }


    useEffect(() => {
        Searchlocation()
    })


    return (
        <MapView style={styles.map} onPress={onPress}>
            { locations != null
                ?
                    <Marker
                        coordinate={locations.coordinate}
                    />
                :
                    null
            }
        </MapView>
    )
}

const styles = StyleSheet.create({
    map: {
        width: Dimensions.get('window').width,
        height: 360,
        marginTop: 20,
        marginBottom:20
    }
})