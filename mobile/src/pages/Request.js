import React, { useState } from 'react';
import { SafeAreaView, Text, StyleSheet, TextInput, TouchableOpacity, AsyncStorage, Alert } from 'react-native';

import api from '../services/api';

export default function Request({ navigation }){
    const [ problem, setProblem ] = useState('');
    const [ detail, setDetail ] = useState('');
    const [ anynumber, setAnynumber] = useState('');

    const id = navigation.getParam('id');


    async function handleSubmit() {
        const user_id = await AsyncStorage.getItem('user');

        await api.post(`/spots/${id}/requests`, {
            problem,
            detail,
            anynumber
        }, {
            headers: {user_id}
        })

        Alert.alert('Sua solicitação de suporte foi enviada com sucesso.')

        navigation.navigate('Lists');
    }
    async function handleCancel() {
        navigation.navigate('List');
    }

    return (

    <SafeAreaView style={styles.container}>
         <Text style={styles.label}>Qual problema você vem enfrentando ?</Text>
                < TextInput
                    style={styles.input}
                    placeholder="Acrescentar memoria "
                    placeholderTextColor="#999"
                    autoCapitalize="words"
                    autoCorrect={true}
                    value={problem}
                    onChangeText={setProblem}
                    />
                     <Text style={styles.label}>Descreva o seu problema.</Text>
                < TextInput
                    style={styles.inputdescription}
                    placeholder="Quero acrescentar a memoria de meu notebook pessoal "
                    placeholderTextColor="#999"
                    autoCapitalize="words"
                    autoCorrect={true}
                    value={detail}
                    onChangeText={setDetail}
                    />
                     <Text style={styles.label}>Numero Anydesk <Text style={styles.labelwarn}>(apenas os numeros)</Text></Text> 
                < TextInput
                    style={styles.input}
                    placeholder="000 800 123"
                    placeholderTextColor="#999"
                    keyboardType="number-pad"
                    autoCorrect={false}
                    value={anynumber}
                    onChangeText={setAnynumber}
                    />
            <TouchableOpacity onPress={handleSubmit} style={styles.button} >
                <Text style={styles.buttonText}>Solicitar Suporte </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleCancel} style={styles.buttoncancel} >
                <Text style={styles.buttonText}>Cancelar </Text>
            </TouchableOpacity>
    </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container:{
       margin: 30
    },

    label: {
        fontWeight: 'bold',
        fontSize: 16,
        color: '#000',
        marginTop: 60,
        marginBottom: 3,
    },
    labelwarn: {
        fontSize: 14,
        color: '#999999',
        marginBottom: 3,
    },

    input:{
        borderBottomWidth: 4,
        // borderRightWidth:4,
        // borderLeftWidth:4,
        // borderTopWidth:4,
        borderColor: '#ddd',
        backgroundColor: 'white',
        paddingHorizontal: 20,
        fontSize: 16,
        color:'#000',
        height: 44,
        marginBottom: 20,
        borderRadius: 6
    },
    inputdescription:{
        borderBottomWidth: 4,
        borderRightWidth:4,
        borderLeftWidth:4,
        borderTopWidth:4,
        borderColor: '#ddd',
        backgroundColor: 'white',
        paddingHorizontal: 20,
        fontSize: 16,
        color:'#000',
        height: 100,
        marginBottom: 6,
        borderRadius: 6
    },

    button: {
        height: 42,
        backgroundColor: 'darkblue',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 6,
        borderRadius: 2
    },
    buttoncancel: {
        height: 40,
        backgroundColor: '#ccc',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 2,
        marginTop: 4
    },

    buttonText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 16,
    }
})