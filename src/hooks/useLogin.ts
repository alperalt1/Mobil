import { NavigationProp, useNavigation } from '@react-navigation/native';
import React, { useState } from 'react'
import { RootStackParamList } from '../types/NavigationTypes';
import { Usuario } from '../interfaces/UserInterface';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const useLogin = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const [usuario, setUsuario] = useState<Usuario>({
    IdUsuario: 0,
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

  const handleChange = (field: string, value: string) => {
    setUsuario((prevloginusuario) => ({
      ...prevloginusuario,
      [field]: value
    }))
  }


  const handleVerificar = () => {
    const user_exist = usuarios.find(x => x.Correo == usuario.Correo && x.Contraseña == usuario.Contraseña)
    if (user_exist) {
      console.log("usuario Valido")
      setUsuario({
        IdUsuario: 0,
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
      navigation.navigate('Home',{id: user_exist.IdUsuario})
    } else {
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
  return (
    {
      navigation,
      handleVerificar,
      getLocalStorage,
      handleChange,
      usuario
    }
  )
}
