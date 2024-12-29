import React from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import { WebView } from 'react-native-webview';
import { useEffect } from 'react';
import { useState } from 'react';
import { useLocalSearchParams } from 'expo-router';
const Compliler = () => {
  const { videoname } = useLocalSearchParams();
  console.log(videoname);

    const [url, seturl] = useState('');
    

    useEffect(() => {
      if (videoname === 'Basic HTML Course'||videoname === 'Advance HTML Course') {
        seturl('https://www.codechef.com/html-online-compiler');
     } else{
    seturl('https://www.codechef.com/ide');
  }
       
        Alert.alert('Plz turn on the internet to to run the complier if already on ignore  ');
        
        
    }, []);
    

   
    



  return (
    <View style={styles.container}>
      <WebView
        originWhitelist={['*']}
        source={{ uri: url }}
        javaScriptEnabled={true}
        domStorageEnabled={true}
        startInLoadingState={true}
        style={styles.webview}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  webview: {
    flex: 1,
  },
});

export default Compliler;
