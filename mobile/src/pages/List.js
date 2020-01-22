import React , { useState, useEffect } from 'react';
import socketio from 'socket.io-client';
import { SafeAreaView, ScrollView, Image, StyleSheet, AsyncStorage, TouchableOpacity, Text } from 'react-native';

import SpotList from '../components/SpotList';
import logo from '../assets/logo.png';


export default function List({navigation}){
    const [ services, setServices ] = useState([]);

    useEffect(() => {
        AsyncStorage.getItem('user').then(user_id => {
            const socket = socketio('http://192.168.1.12:3333', {
                query: { user_id }
            })

            socket.on('request_response', request => {
                Alert.alert(`Sua solicitação de Assistencia em ${request.spot.service} foi ${request.approved ? 'APROVADA' : 'REJEITADA'} aguarde o contato de nosso suporte.`);
            })

        });
    }, []);

    useEffect(() => {
        AsyncStorage.getItem('service').then(storageservices => {
            const serviceArray = storageservices.split(',').map(serv => serv.trim());

            setServices(serviceArray);
        })
    },[]);

    async function search(){
        navigation.navigate('Home')
    }
  
    return ( 
    <SafeAreaView style={styles.container}>
        
       <Image style={styles.logo} source={logo}/>
       <TouchableOpacity style={styles.search} onPress={search} >
           <Text style={{color: '#ddd',alignSelf: 'center', fontSize: 16}}>P</Text>
       </TouchableOpacity>
       <ScrollView>
       {services.map(serv => <SpotList key={serv} service={serv} />)}
       </ScrollView>
    </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: Platform.OS === 'android' ? 40 : 0,
    },

    logo: {
        height: 50,
        resizeMode: 'contain',
        alignSelf: 'center',
        marginTop: 10
    },

    search: {
        height: 32,
        width: 32,
        color: '#ddd1d1e0',
        left: 440,
        bottom: 50,
        borderTopWidth:6,
        borderLeftWidth:6,
        borderColor: '#ddd',
        backgroundColor: 'darkblue',
        marginTop: 10,
        borderRadius: 20,
    },


});