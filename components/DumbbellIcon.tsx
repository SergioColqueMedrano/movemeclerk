import React from 'react';
import { View, Image, StyleSheet } from 'react-native';

const DumbbellIcon: React.FC = () => {
  return (
    <View style={styles.container}>
      <Image source={require("@/app/assets/Dumbbellcon.png")} style={styles.icon} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10, // Puedes ajustar el padding si es necesario
  },
  icon: {
    width: 40, // Ancho de la imagen
    height: 40, // Altura de la imagen
    resizeMode: 'contain', // Ajusta la imagen dentro de su contenedor
  },
});

export default DumbbellIcon;