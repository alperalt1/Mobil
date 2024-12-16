import React from 'react'
import { Button, StyleSheet, Text, View } from 'react-native'
import { useNotas } from '../hooks/useNotas'

interface Props {
    itemIdNota: number
    itemTitulo: string
    itemDescripcion: string
    itemFecha: string
    itemEstado: boolean
}


export const CustomCard = ({itemIdNota, itemTitulo, itemDescripcion, itemFecha, itemEstado}:Props) => {
    const {
        handleDelete,
        handleCheck,
        handleUpdate
    } = useNotas()

    return (
        <View style={styles.CardView}>
            <Text style={{ fontSize: 20, textAlign: 'left' }} >{itemIdNota}</Text>
            <Text style={{ fontSize: 20, textAlign: 'left', fontWeight: 'bold' }}>{itemTitulo}</Text>
            <Text style={{ fontSize: 20, textAlign: 'justify', height: 'auto' }}>{itemDescripcion}</Text>
            <Text style={{ fontSize: 20, textAlign: 'left', fontWeight: 'bold' }}>{itemFecha}</Text>
            <Text style={{ fontSize: 20, textAlign: 'center' }}>{itemEstado}</Text>
            <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center', width: '100%' }}>
                <View style={{ width: '20%' }}>
                    <Button title='Delete' onPress={() => handleDelete(itemIdNota)}></Button>
                </View>
                <View style={{ width: '20%' }}>
                    <Button title='Update' onPress={() => handleUpdate(itemIdNota)}></Button>
                </View>
                <View style={{ width: '20%' }}>
                    <Button title={itemEstado ? '✓' : 'x'} onPress={() => handleCheck(itemIdNota, itemEstado)}></Button>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
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
