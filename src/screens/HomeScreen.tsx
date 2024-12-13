import React, { useEffect } from 'react'
import { Button, FlatList, StyleSheet, Text, View } from 'react-native';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { CustomInput } from '../components/CustomInput';
import { useNotas } from '../hooks/useNotas';


export const HomeScreen = () => {
    const {
        isDatePickerVisible,
        getNotasFromMemory,
        getIdFromMemory,
        handleSend,
        handleChange,
        showDatePicker,
        handleConfirm,
        handleDelete,
        handleCheck,
        nota,
        hIdNotaeDatePicker,
        editbutton,
        notas,
        handleUpdate
    } = useNotas()
    useEffect(() => {
        getNotasFromMemory(),
            getIdFromMemory()
    }, [])

    return (
        <View style={{ flex: 1 }}>
            
                <CustomInput title={'Tarea'}
                    value={nota.Titulo}
                    onChange={value => handleChange('Titulo', value)} />
                <CustomInput title={'Descripción'}
                    value={nota.Descripcion}
                    onChange={value => handleChange('Descripcion', value)} />
                <View style={styles.Button}>
                    <Button title="Seleccionar Fecha" color='#Ff7f50' onPress={showDatePicker} />
                    <DateTimePickerModal
                        isVisible={isDatePickerVisible}
                        mode="date"
                        onChange={(date) => handleChange('Fecha', date.toISOString())}
                        onConfirm={(date) => handleConfirm(date)}
                        onCancel={hIdNotaeDatePicker}
                    />
                </View>
                <View style={styles.Button}>
                    <Button title={editbutton ? 'Enviar' : 'Editar'} color='#Ff7f50' onPress={handleSend} />
                
            </View>

            <FlatList
                data={notas}
                keyExtractor={item => item.IdNota.toString()}
                renderItem={
                    ({ item }) => (
                        <View style={styles.CardView}>
                            <Text style={{ fontSize: 20, textAlign: 'left' }} >{item.IdNota}</Text>
                            <Text style={{ fontSize: 20, textAlign: 'left', fontWeight: 'bold' }}>{item.Titulo}</Text>
                            <Text style={{ fontSize: 20, textAlign: 'justify', height: 'auto' }}>{item.Descripcion}</Text>
                            <Text style={{ fontSize: 20, textAlign: 'left', fontWeight: 'bold' }}>{item.Fecha}</Text>
                            <Text style={{ fontSize: 20, textAlign: 'center' }}>{item.Estado}</Text>
                            <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center', width: '100%' }}>
                                <View style={{ width: '20%' }}>
                                    <Button title='Delete' onPress={() => handleDelete(item.IdNota)}></Button>
                                </View>
                                <View style={{ width: '20%' }}>
                                    <Button title='Update' onPress={() => handleUpdate(item.IdNota)}></Button>
                                </View>
                                <View style={{ width: '20%' }}>
                                    <Button title={item.Estado ? '✓' : 'x'} onPress={() => handleCheck(item.IdNota, item.Estado)}></Button>
                                </View>
                            </View>
                        </View>
                    )
                }
            />
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
        backgroundColor: 'coral',
        marginHorizontal: 10,
        marginVertical: 10
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



