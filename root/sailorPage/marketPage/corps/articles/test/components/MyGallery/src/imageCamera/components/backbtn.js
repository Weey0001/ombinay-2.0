import React, { useRef } from 'react'
import * as Animatable from 'react-native-animatable'
import { 
  TouchableWithoutFeedback,
  Text
  } from 'react-native'

export const BackBtn = (props) => {

  let textRef = useRef();
  let {
    onPress,
    index,
    source
  } = props;
  let handleAnim = () => {
    textRef
      .current
      .bounceOut(100)
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
        elevation:2,
        margin:5,
        borderRadius:20
      }}
      delay={index*100}
      ref={textRef}
    >

      <TouchableWithoutFeedback
        onPress={()=>{
          handleAnim()
        }}
      >
      
        <Animatable.Image
          useNativeDriver={true}
          
          style={{

            margin:5,
            width:40,
            height:50
          }}
          source={require('./img/sucess.png')}
        />

      </TouchableWithoutFeedback>
    
    </Animatable.View>
  )
}
