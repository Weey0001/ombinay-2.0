import React from 'react';
import * as Animatable from "react-native-animatable"
import { Dimensions } from "react-native"

const {width,height} = Dimensions.get("screen")

export const Title = () => (
  <Animatable.Image
    source={require("./img/10.png")}
    style={{
      width:width,
      height:width/3
    }}
    animation="pulse"
    iterationCount="infinite"
    duration={4000}
    useNativeDriver={true}
  />
)