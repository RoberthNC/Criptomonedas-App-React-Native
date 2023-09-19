import React, { useEffect, useState } from 'react'
import { Alert, Pressable, StyleSheet, Text, View } from 'react-native'
import { Picker } from '@react-native-picker/picker'
import axios from 'axios'

const Formulario = ({moneda, criptomoneda, setMoneda, setCriptomoneda, guardarConsultarAPI}) => {

    const [ criptomonedas, setCriptomonedas ] = useState([])

    useEffect(()=>{
        const consultarAPI = async() => {
            const url = 'https://min-api.cryptocompare.com/data/top/mktcapfull?limit=10&tsym=USD'
            const resultado = await axios.get(url)
            setCriptomonedas(resultado.data.Data)
        }
        consultarAPI()
    }, [])

    const cotizarPrecio = () => {
        if(moneda.trim() === '' || criptomoneda.trim() === ''){
            mostrarAlerta()
            return
        }
        guardarConsultarAPI(true)
    }

    const mostrarAlerta = () => {
        Alert.alert(
            'Error',
            'Ambos campos son obligatorios',
            [{text:'OK'}]
        )
    }

    return (
        <View>
            <Text style={styles.label}>Moneda</Text>
            <Picker
                onValueChange={setMoneda}
                selectedValue={moneda}
            >
                <Picker.Item label='-- Seleccione --' value='' />
                <Picker.Item label='Dolar de Estados Unidos' value='USD' />
                <Picker.Item label='Peso Mexicano' value='MXN' />
                <Picker.Item label='Euro' value='EUR' />
                <Picker.Item label='Libra Esterlina' value='GBP' />
            </Picker>
            <Text style={styles.label}>Criptomoneda</Text>
            <Picker
                selectedValue={criptomoneda}
                onValueChange={setCriptomoneda}
            >
                <Picker.Item label='' value='-- Seleccione --' />
                {criptomonedas.map((cripto,idx) => (
                    <Picker.Item
                        key={idx}
                        label={cripto.CoinInfo.FullName}
                        value={cripto.CoinInfo.name}
                    />
                ))}
            </Picker>

            <Pressable
                style={styles.btnCotizar}
                onPress={cotizarPrecio}
            >
                <Text style={styles.textoCotizar}>Cotizar</Text>
            </Pressable>
        </View>
    )
}

const styles = StyleSheet.create({
    label:{
        fontFamily:'Lato-Black',
        fontSize:22,
        marginVertical:20,
        textTransform:'uppercase'
    },
    btnCotizar:{
        backgroundColor:'#5E49E2',
        padding:10,
        marginTop:20
    },
    textoCotizar:{
        color:'#FFF',
        fontSize:18,
        fontFamily:'Lato-Black',
        textTransform:'uppercase',
        textAlign:'center'
    }
})

export default Formulario