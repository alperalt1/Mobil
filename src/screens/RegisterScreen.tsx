import React, { useEffect, useState } from 'react'
import { Button, StyleSheet, View } from 'react-native'
import { CustomInput } from '../components/CustomInput'
import { Usuario } from '../interfaces/UserInterface'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { NavigationProp, useNavigation } from '@react-navigation/native'
import { RootStackParamList } from '../types/NavigationTypes'

export const RegisterScreen = () => {
    const navigation = useNavigation<NavigationProp<RootStackParamList>>();
    const [incrementId, setIncrementId] = useState<number>(1)
    const [usuario, setUsuario] = useState<Usuario>({
        IdUsuario: incrementId,
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
    const handleIncrement = () => {
        setIncrementId((previncrementId) => previncrementId + 1);
    }

    const handleRegisterUsuario = (field: string, value: string) => {
        setUsuario((prevloginusuario) => ({
            ...prevloginusuario,
            [field]: value
        }))
    }

    const saveLocalStorage = async (loginuser: Usuario[]) => {
        await AsyncStorage.setItem('pruebas000030', JSON.stringify(loginuser));
    }

    const getLocalStorage = async () => {
        try {
            const jsondata = await AsyncStorage.getItem('pruebas000030');
            if (jsondata !== null) {
                const obj: Usuario[] = JSON.parse(jsondata);
                setUsuarios(obj)
                console.log(obj);
                const lastUser = obj[obj.length - 1];
                setIncrementId(lastUser ? lastUser.IdUsuario + 1 : 1);
            }else {
                setIncrementId(1);  
            }
        } catch (error) {
            console.error("error al guardar datos", error)
        }

    }
    const handleSend = async() => {
        // handleIncrement()
        // setUsuarios((prevusuarios)=>{
        //     const usuarios = [...prevusuarios, usuario]
        //     saveLocalStorage(usuarios)
        //     console.log("Usuario registrado")
        //     return usuarios
        // })
        // setUsuarios((prevusuarios) => [...prevusuarios, {
        //     IdUsuario: incrementId+1,
        //     Correo: usuario.Correo,
        //     Contraseña: usuario.Contraseña,
        //     Nota: {
        //         IdNota: 0,
        //         Titulo: '',
        //         Descripcion: '',
        //         Estado: false,
        //         Fecha: ''
        //     }
        // }]);
        // saveLocalStorage([...usuarios, {
        //     IdUsuario: incrementId,
        //     Correo: '',
        //     Contraseña: '',
        //     Nota: {
        //         IdNota: 0,
        //         Titulo: '',
        //         Descripcion: '',
        //         Estado: false,
        //         Fecha: ''
        //     }

        // }])
        // setUsuario({
        //     IdUsuario: incrementId,
        //     Correo: '',
        //     Contraseña: '',
        //     Nota: {
        //         IdNota: 0,
        //         Titulo: '',
        //         Descripcion: '',
        //         Estado: false,
        //         Fecha: ''
        //     }
        // })
        // navigation.navigate('Login')
        // handleIncrement();
        if (usuario.Correo && usuario.Contraseña) {
            // Crea un nuevo usuario con el ID incrementado
            const newUser: Usuario = {
                IdUsuario: incrementId,
                Correo: usuario.Correo,
                Contraseña: usuario.Contraseña,
                Nota: {
                    IdNota: 0,
                    Titulo: '',
                    Descripcion: '',
                    Estado: false,
                    Fecha: '',
                },
            };

            // Actualiza el estado de usuarios con el nuevo usuario
            const updatedUsuarios = [...usuarios, newUser];
            setUsuarios(updatedUsuarios);

            // Guarda la lista de usuarios actualizada en AsyncStorage
            await saveLocalStorage(updatedUsuarios);

            // Resetea el formulario
            setUsuario({
                IdUsuario: incrementId + 1,
                Correo: '',
                Contraseña: '',
                Nota: {
                    IdNota: 0,
                    Titulo: '',
                    Descripcion: '',
                    Estado: false,
                    Fecha: '',
                },
            });

            // Navega a la pantalla de login
            navigation.navigate('Login');
        } else {
            console.log('Por favor, complete todos los campos');
        }
    }

    useEffect(() => {
        getLocalStorage()
    }, [])


    return (
        <View style={{ width: '98%' }}>
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