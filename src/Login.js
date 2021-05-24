import React, { useState } from 'react';
import { StyleSheet, Text, View, Button, ImageBackground, TextInput, ScrollView, ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from '@expo/vector-icons';

const user = false;
const imgBg = require('../assets/bgLogin.png')

export default ({ navigation }) => {

    const [user, setUser] = useState(null)
    const [password, setPassword] = useState(null)
    const [loader, setLoader] = useState(false)
    const [faildSesion, setFaildSesion] = useState(null)


    const onSubmit = async () => {
        setLoader(true)
        let data = {
            method: 'POST',
            credentials: 'same-origin',
            mode: 'same-origin',
            body: JSON.stringify({
                email: user,
                password: password
            }),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            }
        }
        try {
            const response = await fetch('https://social-party.herokuapp.com/api/users/signin', data);;
            setLoader(false)
            if (response.status == 200) {
                response.json().then(dataRes => {
                    console.log('eeesasd', dataRes);
                    AsyncStorage.setItem('token', dataRes.token)
                    AsyncStorage.setItem('idUser', dataRes.result._id)
                    navigation.navigate('AddBar')
                });
            } else if (response.status == 400) {
                /* credenciales */
                setFaildSesion('Contraseña incorrecta')
            } else {
                /* No existe */
                setFaildSesion('Este usario no existe')
            }

        } catch (error) {
            console.log("errpr", error);
        }
    }



    if (loader) {
        return <View style={styles.containerLoad}>
            <Text style={styles.textLoad}>Espera un momento</Text>
            <ActivityIndicator size="large" color="#00000" />
        </View>
    }

    return (
        <View style={styles.container}>
            <ImageBackground style={styles.img} source={imgBg}>
                <ScrollView showsVerticalScrollIndicator={false}>
                    <View style={styles.bottomPos}>
                        <Text style={styles.testParty}>2NightParty Management</Text>
                    </View>
                    <View style={styles.bottomTop}>
                        <Text style={styles.textGeneral}>Usuario</Text>
                        <TextInput style={styles.textInput} value={user} onChangeText={setUser} />
                    </View>
                    <View style={styles.bottomTop}>
                        <Text style={styles.textGeneral}>Contraseña</Text>
                        <TextInput secureTextEntry={true} style={styles.textInput} value={password} onChangeText={setPassword} />
                    </View>
                    {
                        faildSesion != null ?
                            <View style={styles.bottomTop}>
                                <Text style={styles.alerText}>{faildSesion}</Text>
                            </View>
                            : null
                    }
                    <View style={styles.bottomBot}>
                        <Button title="Iniciar Sesión" style={styles.textButton} color="#00095E" onPress={onSubmit} />
                    </View>
                    <View style={styles.bottomTop}>
                        <Button title="Crear Cuenta" style={styles.textGeneral} color="#00095E" onPress={() => navigation.navigate('CreateUser')} />
                    </View>
                    {/* <View style={styles.bottomTop}>
                    <Ionicons name="logo-google" size={60} color="#fff" onPress={() => navigation.navigate('AddBar')} />
                </View> */}
                </ScrollView>
            </ImageBackground>

        </View>
    )
}

const styles = StyleSheet.create({
    alerText: {
        fontSize: 13,
        color: '#FF1A35',
        fontWeight: '700',
    },
    containerLoad: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    textLoad: {
        fontSize: 30
    },
    textButton: {
        width: '70%'
    },
    bottomBot: {
        marginTop: 30,
        width: '70%',
        marginLeft: '15%'
    },
    textInput: {
        backgroundColor: 'white',
        borderWidth: 1,
        borderColor: '#381F9F',
        borderRadius: 5,
        marginTop: 10,
        paddingLeft: 10,
        paddingRight: 10,
        color: '#00095E',
        width: '70%'
    },
    textGeneral: {
        color: '#fff',
        fontSize: 14,
        fontWeight: '700',
        textTransform: 'uppercase'
    },
    bottomTop: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 30
    },
    bottomPos: {
        justifyContent: 'center',
        alignItems: 'center',
        paddingBottom: 30,
        marginTop: 40
    },
    testParty: {
        /*  color: '#e44d4d', */
        color: '#fff',
        fontSize: 56,
        textAlign: 'center'
    },
    img: {
        width: '100%',
        height: '100%',
        flex: 1,
    },
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
    },
});
