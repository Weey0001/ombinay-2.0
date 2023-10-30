import React, { useRef } from 'react'
import * as Animatable from 'react-native-animatable';
import { TouchableWithoutFeedback, Dimensions } from 'react-native';

const {width,height} = Dimensions.get('screen')

export const BtnToGallery = (props) => {

  let {setGallery} = props

  let imgRef = useRef()
  let handlAnim = () => {
    imgRef
      .current
      .rubberBand(500)
      .then(end=>{
        if(end.finished){
          setGallery(true)
        }
      })
  }

  return (
    <Animatable.View
      useNativeDriver={true}
      animation='bounceIn'
      duration={500}
      delay={500}
    >
      <TouchableWithoutFeedback
        onPress={()=>{
          handlAnim()
        }}
      >
        <Animatable.Image
          source={require("./img/020.png")}
          useNativeDriver={true}
          ref={imgRef}
          style={{
            width:width/8,
            height:height/12
          }}
        />   
      </TouchableWithoutFeedback>
    
    </Animatable.View>

  )
}
