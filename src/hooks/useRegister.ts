import { NavigationProp, useNavigation } from '@react-navigation/native';
import React, { useState } from 'react'
import { RootStackParamList } from '../types/NavigationTypes';
import { Usuario } from '../interfaces/UserInterface';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const useRegister = () => {

    const navigation = useNavigation<NavigationProp<RootStackParamList>>();
    const [incrementId, setIncrementId] = useState<number>(1)
    const [usuario, setUsuario] = useState<Usuario>({
        IdUsuario: incrementId,
        Correo: '',
        Contraseña: '',
        Notas: [{
            IdNota: 0,
            Titulo: '',
            Descripcion: '',
            Estado: false,
            Fecha: ''
        }]
    })

    const [usuarios, setUsuarios] = useState<Usuario[]>([])

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
            } else {
                setIncrementId(1);
            }
        } catch (error) {
            console.error("error al guardar datos", error)
        }
    }

    const handleRegisterUsuario = (field: string, value: string) => {
        setUsuario((prevloginusuario) => ({
            ...prevloginusuario,
            [field]: value
        }))
    }

    const handleSend = async () => {
        if (usuario.Correo && usuario.Contraseña) {
            // Crea un nuevo usuario con el ID incrementado
            const newUser: Usuario = {
                IdUsuario: incrementId,
                Correo: usuario.Correo,
                Contraseña: usuario.Contraseña,
                Notas: [{
                    IdNota: 0,
                    Titulo: '',
                    Descripcion: '',
                    Estado: false,
                    Fecha: '',
                }],
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
                Notas: [{
                    IdNota: 0,
                    Titulo: '',
                    Descripcion: '',
                    Estado: false,
                    Fecha: '',
                }],
            });

            // Navega a la pantalla de login
            navigation.navigate('Login');
        } else {
            console.log('Por favor, complete todos los campos');
        }
    }
    return (
        {
            navigation,
            getLocalStorage,
            handleSend,
            usuario,
            handleRegisterUsuario
        }
    )
}
