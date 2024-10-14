import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, TextInput, TouchableOpacity, Alert } from 'react-native';
import { router } from 'expo-router';
import * as WebBrowser from "expo-web-browser";
import { useOAuth } from '@clerk/clerk-expo';
import { Button } from '../../../components/Button';
import { useDispatch, useSelector } from 'react-redux'; 
import { RootState } from '@/store/store'; // Estado global tipado correctamente
import { loginAsync } from "@/redux/actions/userActions"; // Acciones de login
import ParallaxScrollView from '../../../components/ParallaxScrollView';
import DumbbellIcon from '../../../components/DumbbellIcon';
import { ThemedView } from '../../../components/ThemedView';
import { ThemedText } from '../../../components/ThemedText';

WebBrowser.maybeCompleteAuthSession();

export default function SignIn() {
  const [isLoading, setIsLoding] = useState(false);
  const googleOAuth = useOAuth({ strategy: "oauth_google" });

  const dispatch = useDispatch(); // Inicializa el dispatch
  const userId = useSelector((state: RootState) => state.user.userId); // Accede al estado de usuario
  const isSignedIn = useSelector((state: RootState) => state.user.isAuthenticated); // Asegúrate de que esto es correcto

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  async function onGoogleSignIn() {
    try {
      setIsLoding(true);
      const oAuthFlow = await googleOAuth.startOAuthFlow({});
      if (oAuthFlow.authSessionResult?.type === "success") {
        if (oAuthFlow.setActive) {
          await oAuthFlow.setActive({ session: oAuthFlow.createdSessionId });
        }
      } else {
        setIsLoding(false);
      }
    } catch (error) {
      console.log(error);
      setIsLoding(false);
    }
  }

  const handleLogin = async () => {
    const success = await dispatch(loginAsync(email, password) as any); // Usa la acción de login
    if (success) {
      // Verifica si el email es de administrador
      if (email === "admin@admin.com") {
        router.replace("/(exerciseHome)");  // Redirige a la página del administrador
      } else {
        router.replace("/(category)");  // Redirige a la página regular
      }
      Alert.alert('Éxito', 'Inicio de sesión exitoso');
    } else {
      Alert.alert('Error', 'Credenciales inválidas o falló el inicio de sesión');
    }
  };

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#121214', dark: '#121214' }}
      headerImage={
        <Image source={require("@/app/assets/image.png")} style={styles.reactLogo} />
      }>
      <View style={styles.container}>
        <ThemedView style={styles.titleContainer}>
          <DumbbellIcon />
          <ThemedText type="title">MoveMe</ThemedText>
        </ThemedView>
        <ThemedView style={styles.stepContainer}>
          <ThemedText type="subtitle">Acceder</ThemedText>
        </ThemedView>
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
        />
        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Ingresar</Text>
        </TouchableOpacity>
        <Button icon="logo-google" title="Entrar con Google" onPress={onGoogleSignIn} isLoading={isLoading} />
        <Text style={styles.linkText}>¿Has olvidado tu contraseña?</Text>
      </View>
      <TouchableOpacity onPress={() => router.replace("/(register)")}>
        <Text style={styles.linkText2}>¿No tienes cuenta? Registrate</Text>
      </TouchableOpacity>
    </ParallaxScrollView>
  );
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
    height: '65%',
    width: '100%',
    position: 'absolute',
    bottom: 0,
    left: 0,
    top: '50%',
    marginTop: '-32.5%',
    alignSelf: 'center',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000000',
  },
  input: {
    width: '100%',
    padding: 15,
    marginVertical: 10,
    backgroundColor: '#121214',
    borderRadius: 5,
    color: '#fff',
  },
  button: {
    width: '100%',
    padding: 15,
    backgroundColor: '#00b894',
    borderRadius: 5,
    alignItems: 'center',
    marginVertical: 10,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  linkText2: {
    color: '#8f8f8f',
    textAlign: "center",
    alignSelf: "center",
    marginTop: 150,
  },
  linkText: {
    color: '#8f8f8f',
    textAlign: "left",
    marginTop: 30,
  },
});
