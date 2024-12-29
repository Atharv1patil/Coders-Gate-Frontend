import { View, Text } from 'react-native'
import React from 'react'
import Login from './Componet/Login'
import { Redirect } from 'expo-router'
import { SearchBar } from 'react-native-screens'
import { NavigationContainer } from '@react-navigation/native'
import Toast from 'react-native-toast-message';



const index = () => {
  return (
    <View>
     <Login/>
     <Toast/>
     
    </View>
    

   


  )
}

export default index