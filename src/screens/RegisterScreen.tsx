import React, { useEffect, useReducer, useState } from 'react'
import { Button, StyleSheet, View } from 'react-native'
import { CustomInput } from '../components/CustomInput'
import { useRegister } from '../hooks/useRegister'

export const RegisterScreen = () => {
    const {
        getLocalStorage,
        handleSend,
        handleRegisterUsuario,
        navigation,
        usuario
    } = useRegister()
    useEffect(() => {
        getLocalStorage()
    }, [])

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <CustomInput title={'Correo'} value={usuario.Correo} onChange={value => handleRegisterUsuario('Correo', value)}></CustomInput>
            <CustomInput title={'Contraseña'} value={usuario.Contraseña} onChange={value => handleRegisterUsuario('Contraseña', value)}></CustomInput>
            <View style={styles.Button}>
                <Button title='Registrar Usuario' color='#Ff7f50' onPress={handleSend} />
            </View>
            <View style={styles.ButtonNav}>
                <Button title="Iniciar Sesión" onPress={() => navigation.navigate('Login')} />
            </View>
        </View>
    )
}


const styles = StyleSheet.create({
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

});