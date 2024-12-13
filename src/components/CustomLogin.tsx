import React from 'react'
import { Button, StyleSheet, View } from 'react-native'
import { CustomInput } from './CustomInput'

interface Props {
    title: string
    valeCorreo: string
    valueContrasena: string
    onChangeCorreo: (value: string) => void
    onChangeContrasena: (value: string) => void
}

export const CustomLogin = ({ title,valeCorreo,valueContrasena, onChangeContrasena, onChangeCorreo}: Props) => {

    return (

        <View style={{ width: '98%' }}>
            <CustomInput title={'Correo'} value={valeCorreo} onChange={onChangeCorreo}></CustomInput>
            <CustomInput title={'Contraseña'} value={valueContrasena} onChange={onChangeContrasena}></CustomInput>
            <View style={styles.Button}>
                <Button title={title} color='#Ff7f50' />
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