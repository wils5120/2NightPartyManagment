import React, { useState, useEffect } from 'react';
import { Text, ImageBackground, StyleSheet, View, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { AssetsSelector } from 'expo-images-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default ({ route: { params }, navigation }) => {

    /*   const NumImag = params */
    const [idClub, setIdClub] = useState(null);
    const [loading, setLoading] = useState(false)


    console.log("praaams", params)

    useEffect(() => {
        AsyncStorage.getItem('createBarId').then(y => {
            setIdClub(y)
        })

    }, [])

    const onDone = async (data) => {
        console.log("DATTAA", data)
        if (params == 4) {
            setLoading(true)
            let formData = new FormData();
            /*   formData.append('image', { uri: data.uri, name: data.filename, type: 'image/jpeg' })
              const datas = await fetch('https://social-party.herokuapp.com/api/gallery/' + idClub,
                  {
                      method: "post",
                      headers: {
                          'Content-Type': 'multipart/form-data',
                      },
                      body: formData
                  }
              ).then(res => {
                  if (i == data.length) {
                      setLoading(false)
                      navigation.navigate('Home', true)
                  }
                  console.log("asdds", res)
              }).catch(err => console.log(err));
              console.log("ee", data.length) */
            /*    for (let i = 0; i < data.length; i++) {
                   formData.append('image', { uri: data[i].uri, name: data[i].filename, type: 'image/jpeg' })
                   const datas = await fetch('https://social-party.herokuapp.com/api/gallery/' + idClub,
                       {
                           method: "post",
                           headers: {
                               'Content-Type': 'multipart/form-data',
                           },
                           body: formData
                       }
                   ).then(res => {
                       if (i == data.length) {
                           setLoading(false)
                           navigation.navigate('Home', true)
                       }
                       console.log("asdds", res)
                   }).catch(err => console.log(err));
               } */

            data.forEach(element => {
                formData.append('image', { uri: element.uri, name: element.filename, type: 'image/jpeg' })
            });
            const datas = await fetch('https://social-party.herokuapp.com/api/gallery/' + idClub,
                {
                    method: "post",
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                    body: formData
                }
            ).then(res => {
                setLoading(false)
                navigation.navigate('Home', true)
                console.log("asdds", res)
            }).catch(err => console.log(err));
        }
        /*  data.map(async imageSubmit => {
 
 
         } */
    }

    const goBack = () => {
        navigation.navigate('Home')
    }


    if (loading) {
        return <View style={styles.containerLoad}>
            <Text style={styles.textLoad}>Espera un momento</Text>
            <ActivityIndicator size="large" color="#00000" />
        </View>
    }
    return (
        <View style={styles.content}>
            <AssetsSelector
                options={{
                    assetsType: ['photo'],
                    maxSelections: params,
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
                        continueText: 'Guardar',
                        goBackText: 'Volver',
                        midTextColor: '#4A056B',
                        buttonStyle: styles.buttonStyles,
                        buttonTextStyle: styles.buttonTextStyles,
                        backFunction: () => goBack(),
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
    },
    containerLoad: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    textLoad: {
        fontSize: 30
    }
})
