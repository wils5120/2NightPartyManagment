import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, ScrollView, Modal, Image, ActivityIndicator } from 'react-native';

export default ({ navigation }) => {

    const [name, setName] = useState(null)
    const [lastName, setPlastName] = useState(null)
    const [email, setEmail] = useState(null)
    const [password, setPassword] = useState(null)
    const [confirmPassword, setConfirmPassword] = useState(null)
    const [badPassword, setbadPassword] = useState(null)
    const [modal, setmodal] = useState(false)
    const [messsageModal, setmesssageModal] = useState(null)
    const [productImg, setProductImg] = useState(null)
    const [loader, setLoader] = useState(false)
    const [correctemail, setCorrectemail] = useState(null)




    const onSubmit = async () => {
        if (password == confirmPassword) {
            setLoader(true)
            let data = {
                method: 'POST',
                credentials: 'same-origin',
                mode: 'same-origin',
                body: JSON.stringify({
                    firstName: name,
                    lastName: lastName,
                    email: email,
                    password: password,
                    confirmPassword: confirmPassword
                }),
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                }
            }

            return fetch('https://social-party.herokuapp.com/api/users/signup', data)
                .then(response => {
                    response.json().then(data => {
                        console.log('eeesasd', data)
                        setmodal(true)
                        setLoader(false)
                        if (response.status == 200) {
                            setmesssageModal("Se ha creado tu usuario exitosamente!")
                            setProductImg(require('../assets/success.png'))
                        } else {
                            setmesssageModal("Este usuario ya esta registrado")
                            setProductImg(require('../assets/error.png'))

                        }
                    })
                })
                .catch(error => {
                    console.log("errpr", error)
                });
        }
        else {
            console.log("ejj")
            setbadPassword('Las contraseñas no son iguales')
        }
    }

    const closeModal = () => {
        if (messsageModal == "Este usuario ya esta registrado") {
            setmodal(false)
        } else {
            navigation.navigate('Login')
        }
    }

    if (loader) {
        return <View style={styles.containerLoad}>
            <Text style={styles.textLoad}>Espera un momento</Text>
            <ActivityIndicator size="large" color="#00000" />
        </View>
    }

    const validate = (text) => {
        console.log(text);
        let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
        if (reg.test(text) === false) {
            console.log("Email is Not Correct");
            setCorrectemail(false)
            setEmail(text)
        }
        else {
            setCorrectemail(true)
            console.log("Email is Correct");
        }
    }


    return (
        <View style={styles.contentForm}>
            <ScrollView contentContainerStyle={styles.contentContainer} showsVerticalScrollIndicator={false}>
                <View>
                    <Text>Bienvenido a 2NightParty!</Text>
                </View>
                <View style={styles.bottomTop}>
                    <Text style={styles.textGeneral}>Nombre</Text>
                    <TextInput style={styles.textInput} value={name} onChangeText={setName} />
                </View>
                <View style={styles.bottomTop}>
                    <Text style={styles.textGeneral}>Apellido</Text>
                    <TextInput style={styles.textInput} value={lastName} onChangeText={setPlastName} />
                </View>
                <View style={styles.bottomTop}>
                    <Text style={styles.textGeneral}>Email</Text>
                    <TextInput style={styles.textInput} value={email} onChangeText={setEmail} />
                </View>
                {correctemail == false ?
                    <View style={styles.bottomTop}>
                        <Text style={styles.badpass}>Ingrese un correo valido</Text>
                    </View>
                    :
                    null
                }
                <View style={styles.bottomTop}>
                    <Text style={styles.textGeneral}>Contraseña</Text>
                    <TextInput style={styles.textInput} secureTextEntry={true} value={password} onChangeText={setPassword} />
                </View>
                <View style={styles.bottomTop}>
                    <Text style={styles.textGeneral}>Confirma la contraseña</Text>
                    <TextInput style={styles.textInput} secureTextEntry={true} value={confirmPassword} onChangeText={setConfirmPassword} />
                </View>
                {
                    badPassword != null ?
                        <View style={styles.bottomTop}>
                            <Text style={styles.badpass}> {badPassword} </Text>
                        </View>
                        :
                        null
                }
                <View style={styles.buttonImg}>
                    <Button title="Guardar" color="#00095E" onPress={() => onSubmit()} />
                </View>
                <Modal animationType="slide" transparent={false} visible={modal}>
                    <View style={styles.center}>
                        <View style={styles.content}>
                            <Image source={productImg} style={styles.img} />
                            <Text style={styles.textModal}> {messsageModal} </Text>
                            <View style={styles.buttonImg}>
                                <Button title="Continuar" color="#00095E" onPress={() => closeModal()} />
                            </View>
                        </View>
                    </View>
                </Modal>
            </ScrollView>
        </View>
    )
}


const styles = StyleSheet.create({
    textModal: {
        color: '#00095E',
        fontSize: 25,
        fontWeight: '700',
        paddingLeft: 10,
        paddingRight: 10
    },
    img: {
        width: 70,
        height: 70,
        marginBottom: 15
    },
    content: {
        backgroundColor: '#fff',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        margin: 35,
        borderRadius: 5
    },
    center: {
        flex: 1,
        alignItems: 'stretch',
        justifyContent: 'center',
        backgroundColor: 'rgba(0,0,0,0.3)'
    },
    badpass: {
        color: '#FF1A35',
        fontSize: 12,
        fontWeight: '500',
        marginTop: 10
    },
    contentContainer: {
        paddingBottom: 30
    },
    buttonImg: {
        marginTop: 20,
        alignItems: 'flex-start'
    },
    contentForm: {
        marginTop: 15,
        paddingLeft: 15,
        paddingRight: 15,
    },
    textGeneral: {
        color: '#4A056B',
        fontSize: 14,
        fontWeight: '700',
        textTransform: 'uppercase',
        paddingTop: 15
    },
    textInput: {
        borderWidth: 1,
        borderColor: '#381F9F',
        borderRadius: 5,
        marginTop: 10,
        paddingLeft: 10,
        paddingRight: 10,
        color: '#00095E',
    },
    containerLoad: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    textLoad: {
        fontSize: 30
    },
})