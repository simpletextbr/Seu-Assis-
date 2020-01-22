import React, { useState } from 'react';
import { View, KeyboardAvoidingView, TextInput, Text, StyleSheet, Image, TouchableOpacity, AsyncStorage} from 'react-native';

import logo from '../assets/logo.png';


export default function Home({ navigation }) {
    const[service, setService] = useState('');

    async function handleSubmit(){
        
        await AsyncStorage.setItem('service', service );

         navigation.navigate('List');


    }


    return (
        <KeyboardAvoidingView enabled={Platform.OS === 'ios' } behavior="padding" style={styles.container}>
        <Image source={logo} />
            <View style={styles.form}>
                <Text style={styles.label}> Que tipo de suporte esta buscando </Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Manutenção, Suporte, Remoto, Celular"
                        placeholderTextColor="#999"
                        autoCapitalize="words"
                        autoCorrect={true}
                        value={service}
                        onChangeText={setService}
                        />
                <TouchableOpacity onPress={handleSubmit} style={styles.button} >
                    <Text style={styles.buttonText}>Pesquisar Suporte </Text>
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

    input:{
        borderBottomWidth: 1,
        borderColor: '#ddd',
        backgroundColor: 'white',
        paddingHorizontal: 20,
        fontSize: 16,
        color:'#000',
        height: 44,
        marginBottom: 6,
        borderRadius: 6
    },

    label: {
        fontWeight: 'bold',
        left: 80,
        fontSize: 20,
        color: '#000',
        marginBottom: 3,
    },

    button: {
        height: 42,
        backgroundColor: 'darkblue',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10,
        borderRadius: 20,
        color: '#ddd1d1e0',
        borderTopWidth:10,
        borderLeftWidth:10,
        borderColor: '#ddd'
    },

    buttonText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 16,
    },
})
