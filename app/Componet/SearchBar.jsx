import { StyleSheet, Text, TextInput, View } from 'react-native'
import React from 'react'
import { FontAwesome } from '@expo/vector-icons';

export default function SearchBar() {
  return (
    <View style={styles.container}>
      <FontAwesome name="search" size={24} color="gray" style ={styles.icon} />
      <TextInput placeholder="Search For the Course"  />
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection:'row',
        backgroundColor: '#fff',
        padding: 10,
        borderRadius: 10,
        elevation: 2,
        marginTop: 10,
        alignItems: 'center',
        marginHorizontal: 10,
    },
    icon: {
        marginRight: 10,
        
    },
})