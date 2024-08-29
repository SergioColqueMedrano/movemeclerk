
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, TextInput, TouchableOpacity, Alert, } from 'react-native';
import { router } from 'expo-router';

import * as WebBrowser from "expo-web-browser"

import { useOAuth } from '@clerk/clerk-expo';
import { Button } from '../../../components/Button';

import * as Liking from "expo-linking"
import ParallaxScrollView from '../../../components/ParallaxScrollView';
import { ThemedView } from '../../../components/ThemedView';
import DumbbellIcon from '../../../components/DumbbellIcon';
import { ThemedText } from '../../../components/ThemedText';




WebBrowser.maybeCompleteAuthSession()


export default function SingIn() {

  const [isLoading, setIsLoding] = useState(false)

  const googleOAuth = useOAuth({ strategy: "oauth_google"})
  
  async function onGoogleSignIn() {
    try{
      setIsLoding(true)

      //const redirectUrl = Liking.createURL("/")

      const oAuthFlow = await googleOAuth.startOAuthFlow({  })

      if(oAuthFlow.authSessionResult?.type === "success"){
        if(oAuthFlow.setActive){
          await oAuthFlow.setActive({ session: oAuthFlow.createdSessionId })
        }
      } else {
        setIsLoding(false)
      }

    } catch (error) {
      console.log(error)
      setIsLoding(false)
    }
  } 

  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      const response = await fetch('https://jz420zgh-3000.brs.devtunnels.ms/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          // Otras cabeceras que puedas necesitar
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      });
  
      if (response.ok) {
        const jsonResponse = await response.json();
        Alert.alert('Éxito', 'Inicio de sesión exitoso');
      } else {
        Alert.alert('Error', 'Falló el inicio de sesión');
      }
    } catch (error) {
      Alert.alert('Error', 'Ocurrió un error. Por favor intenta nuevamente.');
    }
  };
  

  
  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#121214', dark: '#121214' }}
      headerImage={
        <Image
          source={require("@/app/assets/image.png")}
          style={styles.reactLogo}
        />
      }>
      <View style={styles.container}>
        <ThemedView style={styles.titleContainer}>
          <DumbbellIcon />
          <ThemedText type="title">MoveMe</ThemedText>
        </ThemedView>
        <ThemedView style={styles.stepContainer}>
         <ThemedText type="subtitle">Crear Cuenta</ThemedText>
        </ThemedView>
        <TextInput
          placeholder="Nombre"
          placeholderTextColor="#ccc"
          style={styles.input}
          keyboardType="email-address"
          autoCapitalize="none"
          value={email}
          onChangeText={setEmail}
        />
        <TextInput
          placeholder="E-mail"
          placeholderTextColor="#ccc"
          style={styles.input}
          keyboardType="email-address"
          autoCapitalize="none"
          value={email}
          onChangeText={setEmail}
        />
        <TextInput
          placeholder="Password"
          placeholderTextColor="#ccc"
          style={styles.input}
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        /><TextInput
        placeholder="Sexo"
        placeholderTextColor="#ccc"
        style={styles.input}
        keyboardType="email-address"
        autoCapitalize="none"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        placeholder="Fecha de Nacimiento"
        placeholderTextColor="#ccc"
        style={styles.input}
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Crear Cuenta</Text>
        </TouchableOpacity>
      
        <TouchableOpacity style={[styles.buttonblack, styles.selectedButton]} onPress={() =>  router.replace("/(public)")}>
          <Text style={styles.buttonTextgreen}>Ya tienes cuenta</Text>
        </TouchableOpacity>
     
      
      </View>        

         
         
    </ParallaxScrollView>
    
    
  )
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: '65%',       // Ajusta la altura al 65%
    width: '100%',       // Mantiene el ancho al 100%
    position: 'absolute',
    bottom: 0,
    left: 0,
    top: '50%',
    marginTop: '-32.5%', // Ajusta el margen superior para centrar verticalmente
    alignSelf: 'center',
},
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000000', // Fondo oscuro
  },
  title: {
    fontSize: 24,
    color: '#fff',
    fontWeight: 'bold',
    marginVertical: 10,
  },
  subtitle: {
    fontSize: 18,
    color: '#fff',
    marginBottom: 20,
  },
  input: {
    width: '100%',
    padding: 15,
    marginVertical: 10,
    backgroundColor: '#121214', // Color negro para los inputs
    borderRadius: 5,
    color: '#fff',
  },
  button: {
    width: '100%',
    padding: 15,
    backgroundColor: '#00b894', // Botón verde
    borderRadius: 5,
    alignItems: 'center',
    marginVertical: 10,
  },
  buttonblack: {
    width: '100%',
    padding: 15,
    backgroundColor: '#121214', // Botón verde
    borderRadius: 5,
    alignItems: 'center',
    marginVertical: 10,
  },
  selectedButton: {
    borderWidth: 2,
    borderColor: "#00B37E", // Color del borde del botón seleccionado
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  buttonTextgreen: {
    color: '#00B37E',
    fontWeight: 'bold',
  },
  linkText2: {
    color: '#8f8f8f',         // Mantiene el color gris para el texto del enlace
    textAlign: "center",      // Centra el texto horizontalmente
    alignSelf: "center",      // Asegura que el texto esté centrado dentro de su contenedor
    marginTop: 150,            // Mantén este margen si deseas un espacio por encima del texto
  },
  linkText: {
    color: '#8f8f8f',         // Mantiene el color gris para el texto del enlace
    textAlign: "left",
    marginTop: 30,         // Mantén este margen si deseas un espacio por encima del texto
  }
});