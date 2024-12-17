import React, { useEffect, useState } from 'react'
import { Button, StyleSheet, Text, View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Usuario } from '../interfaces/UserInterface';
import { RouteProp} from '@react-navigation/native';
import { RootStackParamList } from '../types/NavigationTypes';
import { Nota } from '../interfaces/NotaInterface';
import { CustomInput } from '../components/CustomInput';

interface Props {
    route: RouteProp<RootStackParamList, 'Home'>;
}

export const HomeScreen = ({ route }: Props) => {
    const { id } = route.params;
    
    const [editbutton, setEditButton] = useState<boolean>(true)
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

    useEffect(() => {
        getLocalStorageById('pruebas000030',id)
    }, [])
    return (
        <View style={{ flex: 1 }}>
            <CustomInput title={'Tarea'}
                value={nota.Titulo}
                onChange={(value) => handleChangeNota<string>("Titulo", value)} />
            <CustomInput title={'Descripción'}
                value={nota.Descripcion}
                onChange={value => handleChangeNota('Descripcion', value)} />
            <View style={styles.Button}>
                <Button title="Seleccionar Fecha" color='#Ff7f50' onPress={showDatePicker} />
                <DateTimePickerModal
                    isVisible={isDatePickerVisible}
                    mode="date"
                    onConfirm={(date) => {
                        hIdNotaeDatePicker()
                        handleChangeNota<Date>("Fecha", date)
                    }}
                    onCancel={hIdNotaeDatePicker}
                />
            </View>
            <View style={styles.Button}>
                <Button title={editbutton ? 'Enviar' : 'Editar'} color='#Ff7f50' onPress={handleSend} />

            </View>
            {/* <FlatList
                data={notas}
                keyExtractor={item => item.IdNota.toString()}
                renderItem={
                    ({ item }) => (
                        <CustomCard itemIdNota={item.IdNota} itemTitulo={item.Titulo} itemDescripcion={item.Descripcion} itemFecha={item.Fecha} itemEstado={item.Estado} ></CustomCard>
                    )
                }
            /> */}
        </View>
    )
}

const styles = StyleSheet.create({
    Button: {
        width: '96%',
        fontSize: 30,
        backgroundColor: 'coral',
        marginHorizontal: 10,
        marginVertical: 10
    },
});


