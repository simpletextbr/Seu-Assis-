import React, { useState, useEffect } from 'react';
import { View, KeyboardAvoidingView, AsyncStorage, Platform, Image, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';

import api from '../services/api';

import logo from '../assets/logo.png';



export default function Login({ navigation }){
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    useEffect(() => {
        AsyncStorage.getItem('user').then(user =>{
            if(user){
                navigation.navigate('Home');
               

            }
        })
    }, []);


    async function handleSubmit({ navigation }){
        
        const response = await api.post('/mobiles', { name, phone })

        const { _id } = response.data;
      
        await AsyncStorage.setItem('user', _id );

         navigation.navigate('Home');


    }

    return (
    <KeyboardAvoidingView enabled={Platform.OS === 'ios' } behavior="padding" style={styles.container}>
        <Image source={logo} />
            <View style={styles.form}>
                <Text style={styles.present}>  Olá eu sou o Seu Assis o seu suporte expecializado virtual e Agora preciso que se apresente
                 para melhor atende-lo, Por favor preencha os dados abaixo para nos conhecermos melhor.</Text>
                <Text style={styles.label}>Qual é o seu nome ?</Text>
                < TextInput
                    style={styles.input}
                    placeholder="Seu Assis"
                    placeholderTextColor="#999"
                    autoCapitalize="words"
                    autoCorrect={false}
                    value={name}
                    onChangeText={setName}
                    />
            </View>

            <View style={styles.form}>
                <Text style={styles.label}>Agora um numero de contato.</Text>
                < TextInput
                    style={styles.input}
                    placeholder="(31)9 8248 0793"
                    placeholderTextColor="#999"
                    keyboardType="phone-pad"
                    value={phone}
                    onChangeText={setPhone}
                    />

            <TouchableOpacity onPress={handleSubmit} style={styles.button} >
                <Text style={styles.buttonText}>Cadastrar </Text>
            </TouchableOpacity>
            </View>
    </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#732673'
    },

    present:{
        fontSize: 14,
        fontWeight: 'bold',
        backgroundColor: '#ddd',
        borderRadius: 15,
        width: 436,
        paddingBottom: 20,
        paddingTop: 20,
        paddingLeft: 20,
        paddingRight: 20,
        position: 'relative',
        marginBottom: 20
    },

    logo: {
        height: 60,
        width: 60,

    },

    form: {
        alignSelf: 'stretch',
        paddingHorizontal: 30,
        marginTop: 30,
    },

    label: {
        fontWeight: 'bold',
        fontSize: 16,
        color: '#ddd',
        marginBottom: 3,
    },

    input:{
        borderBottomWidth: 1,
        borderRightWidth:1,
        borderLeftWidth:1,
        borderTopWidth:1,
        borderColor: '#ddd',
        backgroundColor: 'white',
        paddingHorizontal: 20,
        fontSize: 16,
        color:'#000',
        height: 44,
        marginBottom: 6,
        borderRadius: 6
    },

    button: {
        height: 42,
        backgroundColor: 'darkviolet',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10,
        borderRadius: 20
    },

    buttonText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 16,
    },

});