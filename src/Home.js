import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ImageBackground, ScrollView, Button, Dimensions, TextInput, ActivityIndicator } from 'react-native';
import ButtomCusmtom from './constants/buttons';
import Map from './Map';
import RadioForm, { RadioButton, RadioButtonInput, RadioButtonLabel } from 'react-native-simple-radio-button';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SliderBox } from "react-native-image-slider-box";
import DateTimePicker from '@react-native-community/datetimepicker';
import { Ionicons } from '@expo/vector-icons';
import Menu from './Menu';

export default ({ route: { params }, navigation }) => {

    const [promo, setPromo] = useState(false)
    const [event, setEvent] = useState(false)
    const [datas, setDatas] = useState([]);
    const [loading, setLoading] = useState(true)
    const [locations, setLocations] = useState(null);
    /* const idClub = params */
    const [descripEVent, setDescripEvent] = useState(null)
    const [descriPromo, setDescriPromo] = useState(null)
    const [submitTo, setsubmitTo] = useState(null);
    const [date, setDate] = useState(new Date());
    const [dateEvent, setdateEvent] = useState(new Date());
    const [datePromo, setDatePromo] = useState(new Date());
    const [datePromoEnd, setdatePromoEnd] = useState(new Date());
    const [endEvento, setEndEvento] = useState(new Date());

    const [nameEvent, setNameEvent] = useState(null);
    const [namePromo, setnamePromo] = useState(null);

    const [image, setImage] = useState(null);
    const [mode, setMode] = useState('date');
    const [show, setShow] = useState(false);
    const [imgbarMain, setimgbarMain] = useState({});
    const [idClub, setIdClub] = useState(null);
    const [newDescrip, setnewDescrip] = useState(null);
    const [imgData, setimgData] = useState([]);


    var addImgMain = 'Agregar Galeria de imagenes'
    /*   useEffect(() => {
          AsyncStorage.getItem('createBarId').then(y => {
              setIdClub(y)
              fetch('https://social-party.herokuapp.com/api/clubs/' + y).then(response => response.json())
                  .then(data => {
                      setDatas(data)
                      setLoading(false)
                      setimgbarMain({ uri: datas.background })
                      let longitude = parseFloat(data.longitud, 10)
                      let latitude = parseFloat(data.latitud, 10)
                      let dataLocation = { "coordinate": { latitude, longitude } }
                      setLocations(dataLocation)
                      if (data.sales.length > 0) {
                          setPromo(true)
                      }
                      if (data.events.length > 0) {
                          setEvent(true)
                      }
  
                  })
          })
  
      }, []) */

    useEffect(() => {
        const dataLoad = []
        AsyncStorage.getItem('createBarId').then(y => {
            setIdClub(y)
            fetch('https://social-party.herokuapp.com/api/clubs/' + y).then(response => response.json())
                .then(data => {
                    setDatas(data)
                    setLoading(false)
                     if (data.gallery.length > 0) {
                         for (let i = 0;i < data.gallery.length; i++) {
                             dataLoad.push(data.gallery[i].imageURL)
                             setimgData(dataLoad)
                         }
                     }
                    setimgbarMain({ uri: datas.background })
                    let longitude = parseFloat(data.longitud, 10)
                    let latitude = parseFloat(data.latitud, 10)
                    let dataLocation = { "coordinate": { latitude, longitude } }
                    setLocations(dataLocation)
                    if (data.sales.length > 0) {
                        setPromo(true)
                    }
                    if (data.events.length > 0) {
                        setEvent(true)
                    }

                })
        })

    }, [params])


    if (loading) {
        return <View style={styles.containerLoad}>
            <Text style={styles.textLoad}>Espera un momento</Text>
            <ActivityIndicator size="large" color="#00000" />
        </View>
    }


    const changeAddress = 'Cambiar'

    var Promotion = [
        { label: 'Si', value: 0 },
        { label: 'No', value: 1 },
    ];

    var events = [
        { label: 'Si', value: 0 },
        { label: 'No', value: 1 },
    ];

    const dataImg = [
        require('../assets/bar1.jpg'),
        require('../assets/bar2.jpg'),
        require('../assets/bar3.jpeg'),
        require('../assets/bar1.jpg'),
    ]

    const changeEvent = (event) => {
        if (event == 0) {
            setEvent(true)
        } else {
            setEvent(false)
        }
    }

    const changePromo = (event) => {
        if (event == 0) {
            setPromo(true)
        } else {
            setPromo(false)
        }
    }

    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setShow(Platform.OS === 'ios');
        if (submitTo == 'initialEvent') {
            setdateEvent(event.nativeEvent.timestamp);
        } else if (submitTo == 'endEvent') {
            setEndEvento(event.nativeEvent.timestamp);
            console.log("llega ca event ENDD", endEvento)
        } else if (submitTo == 'inicialPromo') {
            setDatePromo(event.nativeEvent.timestamp)
        } else if (submitTo == 'endPromo') {
            setdatePromoEnd(event.nativeEvent.timestamp)
        }
    };


    const showMode = (currentMode) => {
        setShow(true);
        setMode(currentMode);
    };

    const showDatepicker = (text) => {
        setsubmitTo(text)
        showMode('date');
    };

    const showTimepicker = () => {
        showMode('time');
    };

    const handleSubmit = () => {
        if (descripEVent != null) {
            createEvent()
        }
        if (descriPromo != null) {
            createPromo()
        }

    }


    const createEvent = async () => {
        let data = {
            method: 'POST',
            credentials: 'same-origin',
            mode: 'same-origin',
            body: JSON.stringify({
                name: nameEvent,
                desc: descripEVent,
                date_init: dateEvent,
                date_end: endEvento
            }),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            }
        }

        return fetch('https://social-party.herokuapp.com/api/events', data)
            .then(response => {
                console.log("eres", response)
                if (response.status == 200) {
                    response.json().then(data => {
                        assignetEvent(idClub, data._id)
                    })
                }
            })
            .catch(error => {
                console.log("errpr", error)
            });

    }

    const assignetEvent = async (id, idEvent) => {
        const requestOptions = {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ events: idEvent })
        };
        return await fetch('https://social-party.herokuapp.com/api/clubs/assingEvent/' + id, requestOptions)
            /* .then(response => response.json())
            .then(data => this.setState({ postId: data.id })); */
            .then(response => {
                console.log("se creo eventooooooo", response)
            })
    }


    const assignetPromo = async (id, idPromo) => {
        const requestOptions = {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ sales: idPromo })
        };
        return await fetch('https://social-party.herokuapp.com/api/clubs/assingSale/' + id, requestOptions)
            /* .then(response => response.json())
            .then(data => this.setState({ postId: data.id })); */
            .then(response => {
                console.log("ac veeeeeeeeeer promooo", response)
            })
    }


    const createPromo = async () => {

        console.log('event', descriPromo)
        let data = {
            method: 'POST',
            credentials: 'same-origin',
            mode: 'same-origin',
            body: JSON.stringify({
                name: namePromo,
                desc: descriPromo,
                date_init: datePromo,
                date_end: datePromoEnd
            }),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            }
        }

        return fetch('https://social-party.herokuapp.com/api/sales', data)
            .then(response => {
                console.log("eres", response)
                if (response.status == 200) {
                    response.json().then(data => {
                        console.log("ataaaaas promooo", data._id)
                        assignetPromo(idClub, data._id)

                    })
                }
            })
            .catch(error => {
                console.log("errpr", error)
            });
    }

    const goBack = () => {
        console.log('Going back use Navigator goBack() hook');
    };

    return (
        <View style={styles.container}>
            <ScrollView contentContainerStyle={styles.contentContainer} showsVerticalScrollIndicator={false}>
                <View>
                    <ImageBackground source={{ uri: datas.background }} style={styles.imgMenuClubs}>
                        <Button title="Cambiar imagen" color="#4A056B" style={styles.Buttons} onPress={() => navigation.navigate('LoadImage', 1)} />
                    </ImageBackground>
                </View>
                <View style={styles.body}>
                    <View style={styles.directionRow}>
                        <Text style={styles.titles}>Nombre del BAR</Text>
                        <Text style={styles.titles}>Genero del bar</Text>
                    </View>
                    <View style={styles.directionRow}>
                        <Text style={styles.text}>{datas.name}</Text>
                        <Text style={styles.text}>{datas.musical_genre}</Text>
                    </View>
                    <View style={styles.boxDescription}>
                        <Text style={styles.titles}>Descripción</Text>
                        <TextInput style={styles.textInputDescription} placeholder={datas.desc} multiline={true} numberOfLines={5} value={newDescrip} onChangeText={setnewDescrip} />
                    </View>
                    <View style={styles.directionRow}>
                        <Text style={styles.titles}>Ambiente del bar</Text>
                        <Text style={styles.titles}>Certificado covid</Text>
                    </View>
                    <View style={styles.directionRow}>
                        <Text style={styles.text}>{datas.type}</Text>
                        <Text style={styles.text}> {datas.covid ? 'si' : 'no'}</Text>
                    </View>
                    <View style={styles.directionRow}>
                        <Text style={styles.titles}>Dirección</Text>
                        <View style={styles.boxButtom}>
                            <ButtomCusmtom text={changeAddress} />
                        </View>
                    </View>
                </View>
                <Map locations={locations} />
                <View style={styles.body}>
                    <Text style={styles.titles}>Promoción</Text>
                    <View style={styles.formRadio}>
                        <RadioForm
                            radio_props={Promotion}
                            initial={0}
                            onPress={(value) => { changePromo(value) }}
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
                    {promo ?
                        <View style={styles.boxDescription}>
                            <Text style={styles.titlesEvents}>Nombre de la Promoción</Text>
                            <TextInput style={styles.textInput} value={namePromo} onChangeText={setnamePromo} placeholder={datas.sales[0].name} />
                            <Text style={styles.titlesEvents}>Descripción de la Promoción</Text>
                            <TextInput style={styles.textInputDescription} multiline={true} numberOfLines={5} value={descriPromo} onChangeText={setDescriPromo} placeholder={datas.sales[0].desc} />
                            <View style={styles.buttons}>
                                <Button onPress={() => { showDatepicker('inicialPromo') }} title="Ingresa la fecha inicial" color="#00095E" />
                            </View>
                            {show && (
                                <DateTimePicker
                                    testID="dateTimePicker"
                                    value={date}
                                    mode={mode}
                                    is24Hour={true}
                                    display="default"
                                    onChange={onChange}
                                />
                            )}
                            <View style={styles.buttons}>
                                <Button onPress={() => showDatepicker('endPromo')} title="Ingresa la fecha Final" color="#00095E" />
                            </View>
                        </View>
                        : null
                    }

                </View>
                {
                    imgData.length > 0 ? <View style={styles.contes}>
                         <SliderBox
                         images={imgData}
                         sliderBoxHeight={250}
                         dotColor="#fff"
                         dotStyle={{
                             marginBottom: 10,
                             height: 13,
                             width: 12,
                             borderRadius: 100,
                         }}
                     />
                    </View>
                        :
                        null
                }

                <View>
                    <Button title="Ingrese las imagenes del bar" color="#00095E" style={styles.Bottum} onPress={() => navigation.navigate('LoadImage', 4)} />
                </View>
                <View style={styles.body}>
                    <Text style={styles.titles}>Eventos</Text>
                    <View style={styles.formRadio}>
                        <RadioForm
                            radio_props={events}
                            initial={-1}
                            onPress={(value) => { changeEvent(value) }}
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
                    {event ?
                        <View style={styles.boxDescription}>
                            <Text style={styles.titlesEvents}>Nombre del Evento</Text>
                            <TextInput style={styles.textInput} value={nameEvent} onChangeText={setNameEvent} />
                            <Text style={styles.titlesEvents}>Descripción del evento</Text>
                            <TextInput style={styles.textInputDescription} multiline={true} numberOfLines={1} value={descripEVent} onChangeText={setDescripEvent} />
                            <View style={styles.buttons}>
                                <Button onPress={() => showDatepicker('initialEvent')} color="#00095E" title="Ingresa la fecha inicial" />
                            </View>
                            {show && (
                                <DateTimePicker
                                    testID="dateTimePicker"
                                    value={date}
                                    mode={mode}
                                    is24Hour={true}
                                    display="default"
                                    onChange={onChange}
                                />
                            )}
                            <View style={styles.buttons}>
                                <Button onPress={() => showDatepicker('endEvent')} title="Ingresa la fecha Final" style={styles.buttons} color="#00095E" />
                            </View>
                        </View>
                        : null
                    }
                </View>

                <Menu navigation={navigation} />
                <View style={styles.body}>
                    <View style={styles.buttonSave}>
                        <Button title="Guardar" color="#00095E" onPress={handleSubmit} />
                    </View>
                </View>
            </ScrollView>
        </View>
    )

}

const styles = StyleSheet.create({
    contes: {
        marginTop: 40
    },
    buttons: {
        marginTop: 10,
        marginBottom: 20,
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
    buttonSave: {
        paddingTop: 30,
        width: '100%',
        alignItems: 'flex-end',
    },
    titlesEvents: {
        color: '#4A056B',
        fontWeight: '700',
        fontSize: 15,
        paddingBottom: 10,
        marginTop: 10
    },
    formRadio: {
        marginTop: 20,
        marginBottom: 20,
    },
    boxButtom: {
        justifyContent: 'flex-end',
        alignContent: 'flex-end',
        paddingTop: 20,
        width: '50%'
    },
    textInputDescription: {
        borderWidth: 1,
        borderColor: '#381F9F',
        borderRadius: 5,
        marginTop: 10,
        paddingLeft: 10,
        paddingRight: 10,
        color: '#00095E',
        height: 90
    },
    boxDescription: {
        marginTop: 10,
        marginBottom: 20
    },
    text: {
        color: '#00095E',
        fontSize: 14,
        fontWeight: '500',
        width: '50%',
        paddingTop: 5,
        textTransform: 'uppercase'
    },
    titles: {
        color: '#4A056B',
        fontWeight: '700',
        fontSize: 15,
        width: '50%',
        paddingTop: 30
    },
    directionRow: {
        flexDirection: 'row',
    },
    Buttons: {
        borderRadius: 10
    },
    body: {
        flex: 1,
        paddingLeft: 20,
        paddingRight: 20,
    },
    imgMenuClubs: {
        width: Dimensions.get('window').width,
        height: 300,
        justifyContent: 'flex-end',
        alignItems: 'flex-end'
    },
    contentContainer: {
        paddingBottom: 30
    },
    container: {
        flex: 1
    }
})