import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useState } from 'react'
import { Nota } from '../interfaces/NotaInterface';
import { Usuario } from '../interfaces/UserInterface';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../types/NavigationTypes';


export const useNotas = () => {
    const [incrementId, setIncrementId] = useState<number>(1)

    const [editbutton, setEditButton] = useState<boolean>(true)
    const [notas, setNotas] = useState<Nota[]>([])
    const [isDatePickerVisible, setDatePickerVisibility] = useState<boolean>(false);
    const [usuarios, setUsuarios] = useState<Usuario[]>([])
    //LocalStorage
    const getLocalStorage = async (id: number) => {
        try {
            const jsondata = await AsyncStorage.getItem('pruebas000030');
            if (jsondata !== null) {
                const obj: Usuario[] = JSON.parse(jsondata);
                const fin_user = obj.find(x => x.IdUsuario == id)
                setUsuarios(obj)
                console.log("prueba usuarios", obj)
            }
        } catch (error) {
            console.error("error al guardar datos", error)
        }

    }

    const getLocalStorageById = async <T>(key: string, id: number): Promise<T | null> => {
        try {
            const jsonData = await AsyncStorage.getItem(key);
            if (jsonData !== null) {
                const dataArray: T[] = JSON.parse(jsonData);
                const element = dataArray.find((item: any) => item.Id === id); 
                return element || null;  // Retorna el elemento o null si no se encuentra
            }
            return null; 
        } catch (error) {
            console.error("Error al obtener datos del almacenamiento local: ", error);
            return null;  // En caso de error, retorna null
        }
    };


    const saveLocalStorage = async (loginuser: Usuario[]) => {
        await AsyncStorage.setItem('pruebas000030', JSON.stringify(loginuser));
    }

    const handleChangeNota = <T,>(field: keyof Nota, value: T) => {
        setUsuarios(prevUsuarios =>
            [...prevUsuarios, {
                ...prevUsuarios[0],
                Notas: [...prevUsuarios[0].Notas, {
                    ...prevUsuarios[0].Notas[0],
                    [field]: value
                }]
            }]

        )
    }
    //funciones
    const handleSend = () => {

    }

    //Ver Fecha
    const showDatePicker = () => {
        setDatePickerVisibility(true);
    };

    const hIdNotaeDatePicker = () => {
        setDatePickerVisibility(false);
    };
    return (
        {
            getLocalStorage,
            handleChangeNota,
            editbutton,
            isDatePickerVisible,
            showDatePicker,
            hIdNotaeDatePicker,
            handleSend,
            getLocalStorageById
        }
    )
}
