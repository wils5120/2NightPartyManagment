import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Modal, ActivityIndicator, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default (type) => {

    /* onPress={() => navigation.navigate('MenuClub')} */
    const [image, setImage] = useState(null);
    const [name, setName] = useState(null);
    const [value, setValue] = useState(null);
    const [discount, setDiscount] = useState(null);
    const [idClub, setIdClub] = useState(null);
    const [modal, setmodal] = useState(false)
    const [loader, setLoader] = useState(false)
    const [messsageModal, setmesssageModal] = useState(null)

    const productImg = require('../assets/success.png')

    useEffect(() => {
        console.log("type=", type)
        AsyncStorage.getItem('createBarId').then(y => {
            setIdClub(y)
        })
    }, [])

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: false,
            allowsMultipleSelection: true,
            maxSelections: 4,
            /* para que tenga una medida la foto */
            /* aspect: [4, 3], */
            quality: 1,
        });
        setImage(result)
        if (!result.cancelled) {
            setImage(result.uri);
        }
    };


    const saveProduct = async () => {
        setLoader(true)
        let formData = new FormData();
        formData.append('name', name)
        formData.append('image', { uri: image, name: 'bar1.jpg', type: 'image/jpeg' })
        formData.append('status', discount)
        formData.append('price', value)
        formData.append('type', type.type)
        console.log("imageeee", formData)

        return await fetch("https://social-party.herokuapp.com/api/products/" + idClub,
            {
                method: "post",
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
                body: formData
            }).then(response => {
                console.log(response)
                response.json()
                    .then(datas => {
                        if (response.status == 200) {
                            setmodal(true)
                            setmesssageModal("Se ha creado este producto con exito!")
                            setName(null)
                            setValue(null)
                            setDiscount(null)
                            setImage(null)
                            setLoader(false)
                        }
                    })
            }).catch(error => {
                console.log("errpr", error)
            });
    }

    if (loader) {
        return <View style={styles.containerLoad}>
            <Text style={styles.textLoad}>Estamos creando tu producto...</Text>
            <ActivityIndicator size="large" color="#00000" />
        </View>
    }

    return (
        <View style={styles.contentForm}>
            <View>
                <Text style={styles.textGeneral}>Nombre del producto</Text>
                <TextInput style={styles.textInput} value={name} onChangeText={setName} />
            </View>
            {
                image != null ?
                    <View>
                        <Text style={styles.textForm}>Se ha cargado la imagen exitosamente!</Text>
                    </View>
                    :
                    <View style={styles.buttonImg}>
                        <Button title="Añadir imagen del producto" color="#00095E" onPress={pickImage} />
                    </View>
            }
            <View>
                <Text style={styles.textGeneral}>Valor del producto</Text>
                <TextInput style={styles.textInput} value={value} onChangeText={setValue} />
                <Text style={styles.textGeneral}>Cuenta con descuento el producto</Text>
                <TextInput style={styles.textInput} value={discount} onChangeText={setDiscount} />
            </View>
            <View style={styles.buttonImg}>
                <Button title="Añadir" color="#00095E" onPress={saveProduct} />
            </View>
            <Modal animationType="slide" transparent={false} visible={modal}>
                <View style={styles.center}>
                    <View style={styles.content}>
                        <Image source={productImg} style={styles.img} />
                        <Text style={styles.textModal}> {messsageModal} </Text>
                        <View style={styles.buttonImg}>
                            <Button title="Continuar" color="#00095E" onPress={() => setmodal(false)} />
                        </View>
                    </View>
                </View>
            </Modal>
        </View>
    )
}


const styles = StyleSheet.create({
    textModal: {
        color: '#00095E',
        fontSize: 25,
        fontWeight: '700',
        textAlign: 'center'
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
    buttonImg: {
        marginTop: 20
    },
    textGeneral: {
        color: '#4A056B',
        fontSize: 14,
        fontWeight: '700',
        textTransform: 'uppercase',
        paddingTop: 15
    },
    contentForm: {
        marginTop: 15
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
})