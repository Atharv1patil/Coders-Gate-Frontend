import { View, Text, Image, Alert, ActivityIndicator, TouchableHighlight } from 'react-native';
import React, { useState, useEffect } from 'react';
import { Redirect } from 'expo-router';
import * as WebBrowser from 'expo-web-browser';
import { useAuth, useOAuth } from '@clerk/clerk-expo';
import * as Linking from 'expo-linking';
import { LinearGradient } from 'expo-linear-gradient';
import { Dimensions, StyleSheet, TouchableOpacity } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

const { width, height } = Dimensions.get('window');

export const useWarmUpBrowser = () => {
  useEffect(() => {
    void WebBrowser.warmUpAsync();
    return () => {
      void WebBrowser.coolDownAsync();
    };
  }, []);
};

WebBrowser.maybeCompleteAuthSession();

const Login = () => {
  useWarmUpBrowser();
  const [isLoading, setIsLoading] = useState(false);
  const [redirect, setRedirect] = useState(false); // For redirecting to home
  const { isSignedIn } = useAuth();
  const { startOAuthFlow } = useOAuth({ strategy: 'oauth_google' });

  // Redirect if already signed in
  useEffect(() => {
    if (isSignedIn) {
      Alert.alert('Already Signed In', 'Redirecting to Home.');
      setRedirect(true); // Trigger redirect
    }
  }, [isSignedIn]);

  const handleLogin = React.useCallback(async () => {
    try {
      setIsLoading(true);
      const { createdSessionId, setActive } = await startOAuthFlow({
        redirectUrl: Linking.createURL('Componet/Home', { scheme: 'myapp' }),
      });

      if (createdSessionId) {
        await setActive!({ session: createdSessionId });
        Alert.alert('Login Success', 'Redirecting to Home.');
        setRedirect(true); // Trigger redirect after login
      }
    } catch (err) {
      if (err?.message?.includes('session already exists')) {
        Alert.alert('Session Exists', 'You are already signed in.');
        setRedirect(true); // Redirect if session exists
      } else {
        console.error(err);
        Alert.alert('Error', err?.message || 'An error occurred during login.');
      }
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Redirect to Home if necessary
  if (redirect) {
    return <Redirect href='Componet/Home' />;
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <LinearGradient colors={['#2563eb', '#1d4ed8']} style={styles.gradient}>
          <Image
            source={{ uri: 'https://storage.googleapis.com/a1aa/image/0zUC19sKdoo6MlXTe1h254ZFxglpPma5BCQKuumxddoWsG9JA.jpg' }}
            style={styles.image}
          />
        </LinearGradient>
      </View>
      <View style={styles.content}>
        <Text style={styles.title}>Welcome to Coders 😈 App</Text>
        <Text style={styles.subtitle}>Login/Signup</Text>
        <TouchableOpacity style={styles.button} onPress={handleLogin} disabled={isLoading}>
          <FontAwesome name="google" size={24} color="white" style={styles.icon} />
          {isLoading ? <ActivityIndicator size="small" color="white" /> : null}
          <Text style={styles.buttonText}>Sign In with Google</Text>
        </TouchableOpacity>
        
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    width: '100%',
    height: height * 0.3,
    alignItems: 'center',
    justifyContent: 'center',
  },
  gradient: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    borderRadius: 30,
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
    opacity: 0.8,
  },
  content: {
    backgroundColor: 'white',
    width: '90%',
    borderRadius: 30,
    padding: 30,
    alignItems: 'center',
    marginTop: -height * 0.05,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 6,
  },
  title: {
    fontSize: width * 0.09,
    fontWeight: '600',
    textAlign: 'center',
    color: '#000000',
    marginBottom: height * 0.02,
  },
  subtitle: {
    fontSize: width * 0.06,
    fontWeight: '700',
    color: '#000000',
    marginBottom: height * 0.02,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#0A58CA',
    paddingVertical: height * 0.025,
    paddingHorizontal: width * 0.1,
    borderRadius: 10,
    width: '80%',
    justifyContent: 'center',
  },
  icon: {
    marginRight: width * 0.02,
  },
  buttonText: {
    color: 'white',
    fontWeight: '500',
    fontSize: width * 0.05,
  },
});

export default Login;
