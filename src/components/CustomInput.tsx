import React from 'react'
import { Text, TextInput } from 'react-native'

interface Props {
    title: string
    value: string
    onChange: (value:string) => void
}

export const CustomInput = ({
    title, value, onChange
}: Props) => {
    return (
        <>
            <Text style={{ fontSize: 35, textAlign: 'center', fontWeight: 'bold' }} >{title}</Text>
            <TextInput style={{
                borderRadius: 4,
                paddingHorizontal: 15,
                width: '96%',
                fontSize: 30,
                backgroundColor: 'coral',
                marginHorizontal: 8,
                marginVertical: 10
            }} editable multiline numberOfLines={2} 
            maxLength={30} 
            inputMode='text' 
            onChangeText={onChange} 
            value={value}></TextInput>

        </>
    )
}
