import { View, Text, Image, Button, Alert, ScrollView, ToastAndroid } from 'react-native';
import React, { useEffect, useState  } from 'react';
import { useUser } from '@clerk/clerk-expo';
import { SignedIn, SignedOut, useClerk } from '@clerk/clerk-react';
import { Redirect } from 'expo-router';
import { StyleSheet } from 'react-native';
import SearchBar from './SearchBar';
import Api from '../Api';
import Slider from './Slider';
import Videocourse from './Videocourse';
import CourseLIst from './CourseLIst';
import { Link } from 'expo-router';
import { SafeAreaView } from 'react-native';
import Compliler from './Compliler';
import { FontAwesome } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native';

const Home = () => {
  const { user } = useUser();
  const { signOut } = useClerk();
  const [isSignedOut, setIsSignedOut] = useState(false);
  
 
  const handleSignOut = async () => {  
    try {
      await signOut(); // Sign out the user
      setIsSignedOut(true); // Trigger redirection
    } catch (err) {
      console.error('Error signing out:', err);
    }
  };

  // Redirect to the login page after signing out
  if (isSignedOut) {
    Alert.alert('You have been signed out');
    return <Redirect href="../Componet/Login" />;
  }
 

 

  

  return (
   <ScrollView>
    <View>
    <View style={styles.container}>
      <SignedIn>
        <View>
          <Text> Hello,</Text>
          <Text style= {{fontSize:20, fontWeight:'bold'}}>{user?.firstName} {user?.lastName}</Text>
        </View>
         <TouchableOpacity onLongPress={() => {
          ToastAndroid.show('Chetan is chyu', ToastAndroid.SHORT);
         }}>
        <Image source={{ uri: user?.imageUrl }} style={{ width: 50, height: 50  ,borderRadius:100 } } />
        </TouchableOpacity>
        <Button title="Sign Out" onPress={handleSignOut} />
       </SignedIn>
    </View>
      <SearchBar />
      <Slider />
      <Videocourse />
      <CourseLIst type={"Basic"}/>
      <CourseLIst type={"Advance"}/>
       
        
        
      
      
      
    </View>
    </ScrollView>
    
  );
}


const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection:'row',
    backgroundColor: '#fff',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
  },
})

export default Home;
