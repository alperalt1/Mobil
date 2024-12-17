import React, { useEffect, useState } from 'react'
import { Button, StyleSheet, Text, View } from 'react-native'
import { CustomInput } from '../components/CustomInput'
import { useLogin } from '../hooks/useLogin'

export const LoginScreen = () => {

    const {
        getLocalStorage,
        handleChange,
        handleVerificar,
        navigation,
        usuario
    } = useLogin()

    useEffect(() => {
        getLocalStorage()
    }, [])
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <View style={{ width: '98%' }}>
                <CustomInput title={'Correo'} value={usuario.Correo} onChange={value => handleChange('Correo', value)}></CustomInput>
                <CustomInput title={'Contraseña'} value={usuario.Contraseña} onChange={value => handleChange('Contraseña', value)}></CustomInput>
                <View style={styles.Button}>
                    <Button title='Ingresar' color='#Ff7f50' onPress={handleVerificar} />
                </View>
                <View style={styles.ButtonNav}>
                    <Button title="Registrar Usuario" onPress={() => navigation.navigate('Register')} />
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    TextInput: {
        borderRadius: 4,
        paddingHorizontal: 15,
        width: '96%',
        fontSize: 30,
        backgroundColor: 'coral',
        marginHorizontal: 8,
        marginVertical: 10
    },

    Button: {
        width: '96%',
        fontSize: 30,
        marginHorizontal: 10,
        marginTop: 10
    },

    ButtonNav: {
        width: '96%',
        fontSize: 30,
        marginHorizontal: 10,
        marginTop: 100
    },

    CardView: {
        width: '96%',
        height: 210,
        fontSize: 30,
        backgroundColor: 'coral',
        marginHorizontal: 10,
        marginVertical: 10,
        paddingTop: 20,
        paddingHorizontal: 30,
        borderRadius: 20,
    }



});


