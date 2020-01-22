import React, { useState, useEffect } from 'react';
import { withNavigation } from 'react-navigation'
import { Text, View, StyleSheet, TouchableOpacity, FlatList, Image } from 'react-native';


import api from '../services/api';

function SpotList({ service, navigation  }) {
    const [spots, setSpots] = useState([]);



    useEffect(() => {
        async function loadSpots() {
            const response = await api.get('/spots' , {
                params: { service }
            })

            setSpots(response.data);

        }
        loadSpots();
    },[]);


    function handleNavigate(id){
        
        navigation.navigate('Request', { id });
    }


    return (
        <View style={styles.container}>
            <Text style={styles.title}>Soluções em <Text style={styles.bold}>{service} que o Seu Assis</Text> oferece.</Text>
            <FlatList 
            style={styles.list}
            data={spots}
            keyExtractor={spot => spot._id}
            horizontal
            showsHorizontalScrollIndicator={false}
            renderItem={({ item }) => (
                <View styles={styles.listItem}>
                    <Image style={styles.thumbnail} source={{ uri: item.thumbnail_url}} />
                    <Text style={styles.type}>{item.type}</Text>
                    {/* <Text style={styles.service}>{item.service}</Text> */}
                    <Text style={styles.price}>{item.price ? `R$${item.price},00` : 'REQUER AVALIAÇÃO'}</Text>
                    <TouchableOpacity onPress={() => handleNavigate(item._id)} style={styles.button}>
                        <Text style={styles.buttonText}>Solicitar</Text>
                    </TouchableOpacity>
                </View>
            )}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        marginTop: 15
    },
    title: {
        fontSize: 20,
        color: '#444',
        paddingHorizontal: 20,
        marginBottom: 15,
    },

    bold:{
        fontWeight:'bold',
    },

    list:{
        paddingHorizontal: 20,
    },

    listItem:{
        marginRight: 15,
        marginLeft: 15,
    },

    thumbnail: {
        width: 260,
        height: 140,
        resizeMode: 'cover',
        borderRadius: 2,
        marginLeft: 5,
        marginRight: 5,
    },

    type: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#333',
        marginTop: 10,
    },
    price: {
        fontSize: 16,
        color: '#999',
        marginTop: 5,
    },
    
    button: {
            height: 32,
            backgroundColor: 'darkblue',
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: 10,
            marginRight: 10,
            borderRadius: 6,
            color: '#ddd1d1e0',
            borderTopWidth:2,
            borderLeftWidth:2,
            borderColor: '#ddd'
    },

    buttonText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 14,
    },

})

export default withNavigation(SpotList);
