import React, { forwardRef } from 'react'
import * as Animatable from "react-native-animatable";
import { TextInput, Dimensions } from 'react-native';

const {width} = Dimensions.get('screen')

export const InputIp = forwardRef((props,ref) => 
  (
    <Animatable.View
      
      style={{
        marginTop:20,
        marginBottom:20
      }}
      animation='bounceIn'
      duration={500}
      useNativeDriver={true}
    >
      <TextInput
        ref={ref}
        placeholder="Entrez une addresse Ip"
        placeholderTextColor="#616161db"
        style={{
          width:width/2,
          textAlign:'center',
          borderRadius:20,
          backgroundColor:"#ffffffb8"
        }}
      />    
    </Animatable.View>
  )
)

