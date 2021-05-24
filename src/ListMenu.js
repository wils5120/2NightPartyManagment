import React, { Component } from 'react';
import { Text, ImageBackground, StyleSheet, View, ScrollView, Dimensions, Button, TextInput } from 'react-native';
import FormViewAdd from './formAddProduct';
import Products from './Products';
import AsyncStorage from '@react-native-async-storage/async-storage';

class ListMenu extends Component {


    constructor(props) {
        super(props);
        this.state = {
            menuImg: require('../assets/Rectangle24.png'),
            types: null,
            datas: [],
            datasVodka: [],
            datasWhisky: [],
            datasRon: [],
        };
    }

    componentDidMount = () => {
        let dataBeer = []
        let dataWhisky = []
        let dataVodka = []
        let dataRon = []

        AsyncStorage.getItem('createBarId').then(y => {
            fetch('https://social-party.herokuapp.com/api/clubs/' + y).then(response => response.json())
                .then((data) => {
                    data.products.map((data) => {
                        if (data.type == 'beer') {
                            dataBeer.push(data)
                            this.setState({ datas: dataBeer })
                        } else if (data.type == 'vodka') {
                            dataWhisky.push(data)
                            this.setState({ datasVodka: dataWhisky })
                        } else if (data.type == 'whisky') {
                            dataVodka.push(data)
                            this.setState({ datasWhisky: dataWhisky })
                        } else if (data.type == 'ron') {
                            dataRon.push(data)
                            this.setState({ datasRon: dataRon })
                        }
                    })
                })
        })
    }

    FormAddMenu = (type) => {
        if (type == this.state.types) {
            this.setState({ types: null })
        } else {
            this.setState({ types: type })
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <ScrollView contentContainerStyle={styles.contentContainer}>
                    <View>
                        <ImageBackground source={this.state.menuImg} style={styles.imgMenuClubs}>
                            <Text style={styles.text}>REGISTRO DE LA CARTA</Text>
                        </ImageBackground>
                    </View>
                    <View style={styles.body}>
                        <View style={styles.Button}>
                            <Button title="Añadir cervezas" color="#00095E" onPress={() => this.FormAddMenu('beer')} />
                        </View>
                        {this.state.types == 'beer' ? <FormViewAdd type={this.state.types} /> : null}
                        <Products dataMenuTop={this.state.datas} />
                        <View style={styles.Button}>
                            <Button title="Añadir Vodka" color="#00095E" onPress={() => this.FormAddMenu('vodka')} />
                        </View>
                        {this.state.types == 'vodka' ? <FormViewAdd type={this.state.types} /> : null}
                        <Products dataMenuTop={this.state.datasVodka} />
                        <View style={styles.Button}>
                            <Button title="Añadir Whisky" color="#00095E" onPress={() => this.FormAddMenu('whisky')} />
                        </View>
                        {this.state.types == 'whisky' ? <FormViewAdd type={this.state.types} /> : null}
                        <Products dataMenuTop={this.state.datasWhisky} />
                        <View style={styles.Button}>
                            <Button title="Añadir Ron" color="#00095E" onPress={() => this.FormAddMenu('ron')} />
                        </View>
                        {this.state.types == 'ron' ? <FormViewAdd type={this.state.types} /> : null}
                        <Products dataMenuTop={this.state.datasRon} />
                    </View>
                </ScrollView>
            </View>
        );
    }

}

const styles = StyleSheet.create({
    body: {
        paddingLeft: 15,
        paddingRight: 15
    },
    Button: {
        width: '50%',
        marginTop: 30
    },
    text: {
        color: '#fff',
        fontSize: 30
    },
    imgMenuClubs: {
        width: Dimensions.get('window').width,
        height: 150,
        justifyContent: 'center',
        alignItems: 'center'
    },
    contentContainer: {
        paddingBottom: 30
    },
    container: {
        flex: 1,
        backgroundColor: '#fff'
    }

})



export default ListMenu;