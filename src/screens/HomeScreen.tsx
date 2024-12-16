import React, { useEffect } from 'react'
import { Button, FlatList, StyleSheet, Text, View } from 'react-native';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { CustomInput } from '../components/CustomInput';
import { useNotas } from '../hooks/useNotas';
import { CustomCard } from '../components/CustomCard';

export const HomeScreen = () => {
    const {
        isDatePickerVisible,
        getNotasFromMemory,
        getIdFromMemory,
        handleSend,
        handleChange,
        showDatePicker,
        handleConfirm,
        nota,
        hIdNotaeDatePicker,
        editbutton,
        notas,
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
                        <CustomCard itemIdNota={item.IdNota} itemTitulo={item.Titulo} itemDescripcion={item.Descripcion} itemFecha={item.Fecha} itemEstado={item.Estado} ></CustomCard>
                    )
                }
            />
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



