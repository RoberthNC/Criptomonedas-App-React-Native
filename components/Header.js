import React from "react"
import { Platform, StyleSheet, Text, View } from 'react-native'

const Header = () => {
    return (
        <View>
            <Text style={syles.encabezado}>Criptomonedas</Text>
        </View>
    )
}

const syles = StyleSheet.create({
    encabezado:{
        paddingTop:Platform.OS === 'ios' ? 50 : 10,
        fontFamily:'Lato-Black',
        backgroundColor:'#5E49E2',
        paddingBottom:10,
        textAlign:'center',
        textTransform:'uppercase',
        fontSize:20,
        color:'#FFF',
        marginBottom:30
    }
})

export default Header