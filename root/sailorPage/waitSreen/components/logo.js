import React, { useContext, useEffect } from 'react';
import * as Animatable from "react-native-animatable"
import { Dimensions } from "react-native"
import { StateContext } from "../../context/stateContext";

const {width,height} = Dimensions.get("screen")

export const Logo = () => {

  let {isConnection} = useContext(StateContext)
  
  return(
    <Animatable.View
      animation='bounceIn'
      duration={1000}
      useNativeDriver={true}
    >
      {
        isConnection&&
        <Animatable.Image
          source={require("./img/11.png")}
          style={{
            width:width/2,
            height:width/2
          }}
          animation="pulse"
          duration={500}
          iterationCount="infinite"
          useNativeDriver={true}
        />         
      }
      {
        !isConnection
        &&
        <Animatable.Image
          source={require("./img/11.png")}
          style={{
            width:width/2,
            height:width/2
          }}
          animation="pulse"
          duration={8000}
          iterationCount="infinite"
          useNativeDriver={true}
        /> 
      }
 
    </Animatable.View>

  )
}