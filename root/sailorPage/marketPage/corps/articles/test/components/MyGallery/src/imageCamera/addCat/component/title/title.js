import React from 'react'
import * as Animatable from 'react-native-animatable';
import { Dimensions } from 'react-native';

const {width,height} = Dimensions.get('screen')

export const Title = () => {
  return (
    <Animatable.View
      useNativeDriver={true}
      animation="bounceIn"
      style={{
        width:width/3*2,
        height:height/8,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom:20
      }}
    >
      <Animatable.Image
        useNativeDriver={true}
        animation='pulse'
        duration={2000}
        source={require('./img/11.png')}
        style={{
          height:height/8+20,
          width:"80%",
          position: 'absolute',
        }}
      />
      <Animatable.Image
        useNativeDriver={true}
        animation='pulse'
        duration={2000}
        source={require('./img/cat.png')}
        style={{
          height:height/8-5,
          width:"100%",
          left:0
        }}
      />
    
    </Animatable.View>
  )
}
