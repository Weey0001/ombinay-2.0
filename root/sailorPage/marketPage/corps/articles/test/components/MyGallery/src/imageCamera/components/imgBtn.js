import React, { useRef } from 'react'
import * as Animatable from 'react-native-animatable'
import { 
  TouchableWithoutFeedback,
  Text
  } from 'react-native'

export const ImgBtn = (props) => {

  let imgRef = useRef();
  let containerBtn= useRef();
  let {
    onPress,
    index,
    source
  } = props;
  let handleAnim = () => {
    imgRef
      .current
      .bounceIn(200)
      .then(end=> {
        if(end.finished){
          onPress()
        }
      })
  }

  return (
    <Animatable.View
      useNativeDriver={true}
      animation='bounceIn'
      style={{
        margin:5,
        borderRadius:20,
        justifyContent: 'center',
        alignItems: 'center',
      }}
      delay={index*300}
      ref={containerBtn}
    >

      <TouchableWithoutFeedback
        onPress={()=>{
          handleAnim()
        }}
      >
      
        <Animatable.Image
          useNativeDriver={true}
          source={source}
          style={{
            width:40,
            height:40
          }}
          ref={imgRef}
        />

      </TouchableWithoutFeedback>
    
    </Animatable.View>
  )
}
