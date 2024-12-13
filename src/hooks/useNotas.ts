import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useState } from 'react'
import { Nota } from '../interfaces/NotaInterface';


export const useNotas = () => {

    const [isDatePickerVisible, setDatePickerVisibility] = useState<boolean>(false);
    //LocalStorage
    const memorylocalStorage = async (notas: Nota[]) => {
        await AsyncStorage.setItem('pruebas020', JSON.stringify(notas));
    }

    const getNotasFromMemory = async () => {
        try {
            const jsondata = await AsyncStorage.getItem('pruebas020');
            if (jsondata !== null) {
                const obj: Nota[] = JSON.parse(jsondata);
                setNotas(obj)
                console.log(obj);
            }
        } catch (error) {
            console.error("error al guardar datos", error)
        }

    }

    const getIdFromMemory = async( ) =>{
        try {
            const jsondata = await AsyncStorage.getItem('pruebas020');
            if (jsondata !== null) {
                const obj: Nota[] = JSON.parse(jsondata);
                const ultimo_id = obj.slice(-1)[0].IdNota;
                if(ultimo_id == null){
                    console.log("id no obtenido")
                }
                setIncrementId(ultimo_id+1);
                console.log(ultimo_id);
            }
        } catch (error) {
            console.error("error al guardar datos", error)
        }
    }

    
    //Variables
    const [incrementId, setIncrementId] = useState<number>(1)
    const [nota, setNota] = useState<Nota>({
        IdNota: incrementId,
        Titulo: "",
        Descripcion: "",
        Estado: false,
        Fecha: ""
    })

    const [editbutton, setEditButton] = useState<boolean>(true)
    const [notas, setNotas] = useState<Nota[]>([])


    //Funciones
    const handleIncrement = () => {
        setIncrementId((previncrementId) => previncrementId + 1);
    }


    const handleSend = () => {
        if (editbutton) {
            handleIncrement()
            setNotas(prevNotas => [
                ...prevNotas,
                {
                    IdNota: incrementId,
                    Titulo: nota.Titulo,
                    Descripcion: nota.Descripcion,
                    Estado: false,
                    Fecha: nota.Fecha
                }
            ]);
            memorylocalStorage([...notas, {
                IdNota: incrementId,
                Titulo: nota.Titulo,
                Descripcion: nota.Descripcion,
                Estado: false,
                Fecha: nota.Fecha
            }])
        } else {
            setNotas((prevnotas)=> prevnotas.map(x => x.IdNota == nota.IdNota ? {...x, ...nota}: x ))
            handleUpdate(nota.IdNota)
            setEditButton(true)
            console.log("update nuevas notas: ",notas)
            memorylocalStorage(notas.map(x => x.IdNota == nota.IdNota ? {...x, ...nota}: x ))
            
        }
        setNota({
            IdNota: incrementId,
            Titulo: "",
            Descripcion: "",
            Estado: false,
            Fecha: ""
        })
        console.log("update nuevas notas: ",notas)
    }

    const handleChange = (field: string, value: string) => {
        setNota((prevnota) => ({
            ...prevnota,
            [field]: value
        }))
    }

    //Ver Fecha
    const showDatePicker = () => {
        setDatePickerVisibility(true);
    };

    const hIdNotaeDatePicker = () => {
        setDatePickerVisibility(false);
    };

    const handleConfirm = (date: Date) => {
        nota.Fecha = date.toDateString();
        hIdNotaeDatePicker();
    };

    const handleDelete = (id: number) => {
        setNotas((prevnotas) => prevnotas.filter((notas) => notas.IdNota !== id))
        memorylocalStorage([...notas.filter(x => x.IdNota !== id)])
    };

    const handleUpdate = (id: number) => {
        setEditButton(false)
        const nue = notas.find((notas) => notas.IdNota == id)
        if (nue == null) {
            return console.log("La tarea no existe")
        }
        setNota({...nue})
    }

    const handleCheck = (id: number, stat: boolean)=>{
        const nue = notas.find((notas) => notas.IdNota == id)
        setNotas((prevnotas)=> prevnotas.map( x => x.IdNota == id ? {...x, Estado: !stat} : x ))
        memorylocalStorage(notas.map( x => x.IdNota == id ? {...x, Estado: !stat} : x ))
    }
  return (
  {
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

  }
  )
}
