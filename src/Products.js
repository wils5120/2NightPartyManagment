import React from 'react';
import { Text, ImageBackground, StyleSheet, View, ScrollView, Dimensions, Image, FlatList } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default (props) => {
    const dataMenuTop = props

    return (
        <View style={styles.content}>
            <FlatList
                horizontal
                showsHorizontalScrollIndicator={false}
                data={dataMenuTop.dataMenuTop}
                renderItem={({ item }) =>
                    <View style={styles.boxProducts} id={item.key}>
                        <Image style={styles.img} source={{uri: item.imageURL}} />
                        <View style={styles.boxText}>
                            <Text style={styles.texts}> ${item.price} </Text>
                            {
                                item.status > 0 ||item.status != undefined ?
                                    <View style={styles.boxDesc}>
                                        <Text style={styles.textDest}>-{item.status}%</Text>
                                    </View>
                                    :
                                    null
                            }
                            <Text style={styles.texts}>{item.name}</Text>
                        </View>
                    </View>
                }
                keyExtractor={(item, index) => index.toString()}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    boxText: {
        flex: 1,
        alignItems: 'center',
        paddingBottom: 20
    },
    texts: {
        color: '#00095E',
        fontSize: 11,
        textAlign: 'center'
    },
    textDest: {
        color: '#fff',
        fontSize: 10
    },
    boxDesc: {
        backgroundColor: '#4A056B',
        borderRadius: 5,
        width: 40,
        paddingLeft: 10
    },
    img: {
        width: 50,
        height: 60,
        marginBottom: 15
    },
    boxProducts: {
        paddingLeft: 10,
        paddingRight: 10,
        paddingEnd: 20,
        paddingTop: 30,
        marginLeft: 10,
        marginRight: 10,
        width: 90,
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1
    },
    textTitle: {
        color: '#4A056B',
        fontSize: 18,
        textTransform: 'uppercase',
        fontWeight: 'bold'
    },
    content: {
        marginLeft: 15,
        marginRight: 15,
        paddingTop: 30,
        paddingBottom: 25,
        flex: 1,
        borderBottomWidth: 1,
        borderColor: '#DCDCDC'
    }
})
