import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TextInput, TouchableOpacity, Alert } from 'react-native';
import { router } from 'expo-router';
import * as WebBrowser from "expo-web-browser";
import { useOAuth } from '@clerk/clerk-expo';
import ParallaxScrollView from '../../../components/ParallaxScrollView';
import { ThemedView } from '../../../components/ThemedView';
import DumbbellIcon from '../../../components/DumbbellIcon';
import { ThemedText } from '../../../components/ThemedText';
import { Picker } from '@react-native-picker/picker';

WebBrowser.maybeCompleteAuthSession();

export default function SignIn() {
  const [isLoading, setIsLoding] = useState(false);
  const googleOAuth = useOAuth({ strategy: "oauth_google" });

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [gender, setGender] = useState('male'); // Default to 'male'
  const [birthDate, setBirthDate] = useState(); // Default date in correct format

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
    // Validación del formato de la fecha de nacimiento
    const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
    if (!dateRegex.test(birthDate)) {
      Alert.alert('Error', 'La fecha debe estar en el formato "YYYY-MM-DD".');
      return;
    }

    try {
      const response = await fetch('https://jz420zgh-3000.brs.devtunnels.ms/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({
          name,
          email,
          password,
          gender,
          birthDate, // Enviamos la fecha tal como está
        }),
      });

      if (response.ok) {
        const jsonResponse = await response.json();
        Alert.alert('Éxito', 'Registro exitoso');
      } else {
        Alert.alert('Error', 'Falló el registro');
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
          value={name}
          onChangeText={setName}
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
        />

        {/* Picker para seleccionar sexo */}
        <Picker
          selectedValue={gender}
          style={styles.input}
          onValueChange={(itemValue) => setGender(itemValue)}
        >
          <Picker.Item label="Hombre" value="male" />
          <Picker.Item label="Mujer" value="female" />
        </Picker>

        {/* Campo de texto para la fecha de nacimiento */}
        <TextInput
          placeholder="Fecha de nacimiento (YYYY-MM-DD)"
          placeholderTextColor="#ccc"
          style={styles.input}
          value={birthDate}
          onChangeText={setBirthDate}
          keyboardType="numeric"
        />

        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Crear Cuenta</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.buttonblack, styles.selectedButton]} onPress={() => router.replace("/(public)")}>
          <Text style={styles.buttonTextgreen}>Ya tienes cuenta</Text>
        </TouchableOpacity>
      </View>
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
  buttonblack: {
    width: '100%',
    padding: 15,
    backgroundColor: '#121214',
    borderRadius: 5,
    alignItems: 'center',
    marginVertical: 10,
  },
  selectedButton: {
    borderWidth: 2,
    borderColor: "#00B37E",
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  buttonTextgreen: {
    color: '#00B37E',
    fontWeight: 'bold',
  }
});
