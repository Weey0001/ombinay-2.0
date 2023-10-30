import React from 'react'
import * as Animatable from "react-native-animatable";

export const TextWeb = () => (
  <Animatable.Text
    animation='bounceIn'
    duration={500}
    useNativeDriver={true}
    style={{
      color:"#ffffff",
      textAlign: 'center',
      margin:16
    }}
    
  >
    Appuyer sur "Connect" pour acceder a la base de donnee Web
  </Animatable.Text>
)
