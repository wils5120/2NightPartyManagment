import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, ScrollView, Button, ActivityIndicator } from 'react-native';
import ButtomCusmtom from './constants/buttons';
import RadioForm, { RadioButton, RadioButtonInput, RadioButtonLabel } from 'react-native-simple-radio-button';
import AsyncStorage from '@react-native-async-storage/async-storage';
import useForm from './hoocks/form';
import Map from './Map';


export default ({ route: { params }, navigation }) => {

    var addImgMain = 'Agregar Imagen Principal'
    const [image, setImage] = useState(null);
    const [locations, setLocations] = useState(null);
    const [loadData, setLoadData] = useState(false);
    const [newLoad, setNewLoad] = useState(true);

    newLoad
    const initialState = {
        name: '',
        desc: '',
        imgMain: image,
        genre: '',
        ambient: '',
        covid: '',
        type: 'Club',
        state: false,
        cover: ''
    }
    const onSubmit = async Values => {
        setLoadData(true)
        let long = locations.coordinate.longitude.toString()
        let lat = locations.coordinate.latitude.toString()
        let formData = new FormData();
        formData.append('name', Values.name)
        formData.append('image', { uri: image[0].uri, name: 'bar1.jpg', type: 'image/jpeg' })
        formData.append('desc', Values.desc)
        formData.append('cover', Values.cover)
        formData.append('longitud', long)
        formData.append('latitud', lat)
        formData.append('musical_genre', Values.genre)
        formData.append('type', Values.ambient)
        formData.append('covid', Values.covid)
        formData.append('state', 'close')
        console.log("asdasd aca fomr", formData)
        return await fetch("https://social-party.herokuapp.com/api/clubs",
            {
                method: "post",
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
                body: formData
            }).then(response => {
                setLoadData(false)
                response.json()
                    .then(datas => {
                        if (response.status == 200) {
                            navigation.navigate('Home', { id: datas._id })
                            AsyncStorage.setItem('createBarId', datas._id)
                        }
                    })
            }).catch(error => {
                console.log("errpr", error)
            });
    }

    const { subscribe, inputs, handleSubmit } = useForm(initialState, onSubmit)

    var radio_Gen = [
        { label: 'CrossOver', value: 'CrossOver' },
        { label: 'Salsa', value: 'Salsa' },
        { label: 'Electronica', value: 'Electronica' },
        { label: 'Vallenato', value: 'Vallenato' },
        { label: 'Urbano', value: 'Urbano' },
        { label: 'Salsa', value: 'Salsa' },

    ];

    var radio_ambi = [
        { label: 'De Todo', value: 'De Todo' },
        { label: 'LGTB', value: 'LGTB' },
        { label: 'Bar/Cantina', value: 'Bar/Cantina' },
        { label: 'Internacional', value: 'Internacional' },
        { label: 'Cocteles', value: 'Cocteles' },
    ];

    var radio_covi = [
        { label: 'Si', value: 0 },
        { label: 'No', value: 1 },
    ];

    const pressMap = ({ nativeEvent }) => {
        setLocations(nativeEvent)
    }

    if (loadData) {
        return <View style={styles.containerLoad}>
            <Text style={styles.textLoad}>Espera un momento</Text>
            <ActivityIndicator size="large" color="#00000" />
        </View>
    }

    if (params != undefined && newLoad) {
        setImage(params)
        setNewLoad(false)
    }

    return (
        <View style={styles.content}>
            <ScrollView contentContainerStyle={styles.contentContainer} showsVerticalScrollIndicator={false}>
                <Text style={styles.textForm}>Bienvenido a 2NightParty por favor diligenciar el formulario</Text>
                <View style={styles.contentNameBar}>
                    <Text style={styles.textGeneral}>Nombre del BAR</Text>
                    <TextInput style={styles.textInput} value={inputs.name} onChangeText={subscribe('name')} />
                </View>
                {
                    image != null ?
                        <View>
                            <Text style={styles.textForm}>Se ha cargado la imagen exitosamente!</Text>
                        </View>
                        :
                        <View>
                            <Button title={addImgMain} color="#00095E" style={styles.Bottum} onPress={() => navigation.navigate('OneImage')} />
                        </View>

                }
                <View style={styles.boxDescription}>
                    <Text style={styles.textGeneral}>Descripción</Text>
                    <TextInput style={styles.textInputDescription} multiline={true} numberOfLines={5} value={inputs.desc} onChangeText={subscribe('desc')} />
                </View>
                <Text style={styles.textGeneral}>Genero del bar</Text>
                <View style={styles.formRadio}>
                    <RadioForm
                        radio_props={radio_Gen}
                        initial={-1}
                        onPress={subscribe('genre')}
                        labelHorizontal={true}
                        selectedButtonColor={'#00095E'}
                        selectedLabelColor={'#4A056B'}
                        labelColor={'#4A056B'}
                        buttonColor={'#4A056B'}
                        buttonSize={15}
                    />
                </View>
                <View style={styles.boxAddress}>
                    <Text style={styles.textGeneral}>Dirección</Text>
                    <Map onPress={pressMap} locations={locations} />
                </View>
                <Text style={styles.textGeneral}>Ambiente del bar</Text>
                <View style={styles.formRadio}>
                    <RadioForm
                        radio_props={radio_ambi}
                        initial={-1}
                        onPress={subscribe('ambient')}
                        labelHorizontal={true}
                        selectedButtonColor={'#00095E'}
                        selectedLabelColor={'#4A056B'}
                        labelColor={'#4A056B'}
                        buttonColor={'#4A056B'}
                        buttonSize={15}
                    />
                </View>
                <View style={styles.contentNameBar}>
                    <Text style={styles.textGeneral}>Valor Cover</Text>
                    <TextInput style={styles.textInput} value={inputs.cover} onChangeText={subscribe('cover')} placeholder="0" />
                </View>
                <Text style={styles.textGeneral}>
                    Cuenta con el certificado covid que ha dado la alcaldia,
                    con el cual certifica que tu establecimiento cumple con los
                    protocolos de bioseguridad
                </Text>
                <View style={styles.formRadio}>
                    <RadioForm
                        radio_props={radio_covi}
                        initial={-1}
                        onPress={subscribe('covid')}
                        labelHorizontal={true}
                        selectedButtonColor={'#00095E'}
                        selectedLabelColor={'#4A056B'}
                        labelColor={'#4A056B'}
                        labelStyle={{ marginRight: 10 }}
                        buttonColor={'#4A056B'}
                        buttonSize={15}
                        formHorizontal={true}
                    />
                </View>
                <View style={styles.boxButtomSave}>
                    <View style={styles.buttonSave}>
                        <Button title="Guardar" color="#00095E" onPress={handleSubmit} />
                    </View>
                </View>

            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    containerLoad: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 5
    },
    boxAddress: {
        paddingTop: 20
    },
    formRadio: {
        marginTop: 20,
        marginBottom: 20,
    },
    boxButtomSave: {
        alignItems: 'flex-end'
    },
    buttonSave: {
        width: 100,
        alignItems: 'flex-end'
    },
    buttomCort: {
        width: 220
    },
    textInputDescription: {
        borderWidth: 1,
        borderColor: '#381F9F',
        borderRadius: 5,
        marginTop: 10,
        paddingLeft: 10,
        paddingRight: 10,
        color: '#00095E',
        height: 133
    },
    boxDescription: {
        marginTop: 20,
        marginBottom: 20
    },
    textInput: {
        borderWidth: 1,
        borderColor: '#381F9F',
        borderRadius: 5,
        marginTop: 10,
        paddingLeft: 10,
        paddingRight: 10,
        color: '#00095E'
    },
    contentNameBar: {
        marginBottom: 20,
        marginTop: 20
    },
    textGeneral: {
        color: '#4A056B',
        fontSize: 14,
        fontWeight: '700',
        textTransform: 'uppercase'
    },
    textForm: {
        color: '#00095E',
        fontSize: 14
    },
    contentContainer: {
        paddingBottom: 30
    },
    content: {
        flex: 1,
        backgroundColor: '#fff',
        paddingTop: 30,
        paddingLeft: 30,
        paddingRight: 30
    },
    textLoad: {
        fontSize: 30
    }
})