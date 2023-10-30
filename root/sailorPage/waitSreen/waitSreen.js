import React from 'react'
import * as Animatable from "react-native-animatable";
import { Title } from './components/title';
import { Logo } from './components/logo';
import { ChooseConnection } from "./components/chooseConnection/chooseConnection";

export const WaitSreen = () => {
  
  return (
    <Animatable.View
      animation="fadeIn"
      style={{
        backgroundColor:"#00000066",
        flex:1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }}
      useNativeDriver={true}
    >
    
     <Title/>
     <Logo/>
     <ChooseConnection/>
    
    </Animatable.View>
  )
}
