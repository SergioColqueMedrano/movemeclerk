
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, } from 'react-native';
import { router } from 'expo-router';

import * as WebBrowser from "expo-web-browser"

import { useOAuth } from '@clerk/clerk-expo';
import { Button } from '../../../components/Button';


WebBrowser.maybeCompleteAuthSession()


export default function SingIn() {

  const [isLoading, setIsLoding] = useState(false)

  const googleOAuth = useOAuth({ strategy: "oauth_google"})
  
  async function onGoogleSignIn() {
    try{
      setIsLoding(true)

      const oAuthFlow = await googleOAuth.startOAuthFlow()

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


  {/*useEffect(() => {
    WebBrowser.warmUpAsync() No se puede en WEB!!!

    return () => {
      WebBrowser.coolDownAsync()
    }
  })*/}
  
  
  return (
    
    <View style={styles.container}>
      <Text style={styles.title}>Entrar</Text>
      <Button icon="logo-google" title="Entrar con Google" onPress={onGoogleSignIn} isLoading={isLoading} />
    </View>
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
    backgroundColor: '#1a1a1a', // Fondo oscuro
    padding: 20,
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
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  linkText: {
    color: '#8f8f8f',
    marginTop: 10,
  },
});