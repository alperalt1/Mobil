import React, { useEffect, useState } from 'react'
import { Button, StyleSheet, Text, View } from 'react-native'
import { CustomInput } from '../components/CustomInput'
import { NavigationProp, useNavigation } from '@react-navigation/native'
import { RootStackParamList } from '../types/NavigationTypes'
import AsyncStorage from '@react-native-async-storage/async-storage'

type Usuario = {
    IdUsuario: number,
    Correo: string,
    Contraseña: string,
    Nota: {
        IdNota: number,
        Titulo: string,
        Descripcion: string,
        Estado: boolean,
        Fecha: string
    }
}

export const LoginScreen = () => {

    const navigation = useNavigation<NavigationProp<RootStackParamList>>();
    const [usuario, setUsuario] = useState<Usuario>({
        IdUsuario: 0,
        Correo: '',
        Contraseña: '',
        Nota: {
            IdNota: 0,
            Titulo: '',
            Descripcion: '',
            Estado: false,
            Fecha: ''
        }
    })
    const [usuarios, setUsuarios] = useState<Usuario[]>([])

    const handleChange = (field: string, value: string) => {
        setUsuario((prevloginusuario) => ({
            ...prevloginusuario,
            [field]: value
        }))
    }

    const handleVerificar = ()=>{
        const user_exist = usuarios.find(x => x.Correo == usuario.Correo && x.Contraseña == usuario.Contraseña)
        if(user_exist){
            console.log("usuario Valido")
        }else{
            console.log("usuario invalido")
        }
    }

    const getLocalStorage = async () => {
        try {
            const jsondata = await AsyncStorage.getItem('pruebas000030');
            if (jsondata !== null) {
                const obj: Usuario[] = JSON.parse(jsondata);
                setUsuarios(obj)
                console.log(obj);
            }
        } catch (error) {
            console.error("error al guardar datos", error)
        }

    }

    useEffect(() => {
        getLocalStorage()
        }, [])
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <View style={{ width: '98%' }}>
                <CustomInput title={'Correo'} value={usuario.Correo} onChange={value => handleChange('Correo', value)}></CustomInput>
                <CustomInput title={'Contraseña'} value={usuario.Contraseña} onChange={value => handleChange('Contraseña', value)}></CustomInput>
                <View style={styles.Button}>
                    <Button title='Ingresar' color='#Ff7f50' onPress={handleVerificar}/>
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

function omit(initialState: any, arg1: string[]): Usuario | (() => Usuario) {
    throw new Error('Function not implemented.')
}
