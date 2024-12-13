import React, { useEffect, useState } from 'react'
import { Button, StyleSheet, Text, View } from 'react-native'
import { CustomInput } from '../components/CustomInput'
import AsyncStorage from '@react-native-async-storage/async-storage';

type LoginUsuario = {
    IdLoginUsuario: number,
    Correo: string,
    Contraseña: string,
}

type Usuario = {
    IdUsuario: number,
    Correo: string,
    Contraseña: string,
    
}

type Screen = 'Login' | 'Other';

export const LoginScreen = () => {
    const [currentScreen, setCurrentScreen] = useState<Screen>('Login');
    const navigateToScreen = (screen: Screen) => {
        setCurrentScreen(screen);
    };
    const [loginusuario, setLoginUsuario] = useState<LoginUsuario>({
        IdLoginUsuario: 0,
        Correo: '',
        Contraseña: '',
    })

    const [usuario, setUsuario] = useState<Usuario>({
        IdUsuario: 0,
        Correo: '',
        Contraseña: '',
    })

    const [usuarios, setUsuarios] = useState<Usuario[]>([])
    // const [loginusers, setLoginUsers] = useState<LoginUsuario[]>([])

    const handleChangeUsuario = (field: string, value: string) => {
        setUsuario((prevusuario) => ({
            ...prevusuario,
            [field]: value
        }))
    }

    const handleChange = (field: string, value: string) => {
        setLoginUsuario((prevloginusuario) => ({
            ...prevloginusuario,
            [field]: value
        }))
    }

    const memorylocalStorage = async (loginuser: Usuario[]) => {
        await AsyncStorage.setItem('pruebas0020', JSON.stringify(loginuser));
    }

    const getNotasFromMemory = async () => {
        try {
            const jsondata = await AsyncStorage.getItem('pruebas0020');
            if (jsondata !== null) {
                const obj: Usuario[] = JSON.parse(jsondata);
                setUsuarios(obj)
                console.log(obj);
            }
        } catch (error) {
            console.error("error al guardar datos", error)
        }

    }
    const handleSend = ()=>{
        setUsuarios((prevusuarios)=>{
            const usuarios = [...prevusuarios, usuario]
            memorylocalStorage(usuarios)
            return usuarios})
    }
    console.log(usuarios)

    const handleVerificar = ()=>{
        const user_exist = usuarios.find(usuario => usuario.Correo == loginusuario.Correo)
        if(user_exist){
            console.log("usuario ingresado")
        }
    }


    useEffect(() => {
            getNotasFromMemory()
        }, [])
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            {currentScreen == 'Login' ? (<View style={{ width: '98%' }}>
                <CustomInput title={'Correo'} value={loginusuario.Correo} onChange={value => handleChange('Correo', value)}></CustomInput>
                <CustomInput title={'Contraseña'} value={loginusuario.Contraseña} onChange={value => handleChange('Contraseña', value)}></CustomInput>
                <View style={styles.Button}>
                    <Button title='Ingresar' color='#Ff7f50' onPress={handleVerificar}/>
                </View>
                <View style={styles.ButtonNav}>
                <Button title="Registrar Usuario" onPress={() => navigateToScreen('Other')} />
                </View>
            </View>) : (<View style={{ width: '98%' }}>
                <CustomInput title={'Correo'} value={usuario.Correo} onChange={value => handleChangeUsuario('Correo', value)}></CustomInput>
                <CustomInput title={'Contraseña'} value={usuario.Contraseña} onChange={value => handleChangeUsuario('Contraseña', value)}></CustomInput>
                <View style={styles.Button}>
                    <Button title='Registrar Usuario' color='#Ff7f50' onPress={handleSend}/>
                </View>
                <View style={styles.ButtonNav}>
                    <Button title="Iniciar Sesión" onPress={() => navigateToScreen('Login')} />
                </View>
            </View>
            )
        }
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