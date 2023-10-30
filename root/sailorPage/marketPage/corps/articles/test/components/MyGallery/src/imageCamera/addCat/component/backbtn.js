import React,{useRef} from 'react'
import * as Animatable from 'react-native-animatable'
import { TouchableWithoutFeedback } from 'react-native'

export const BackBtn = (props) => {

  let btnClose = useRef()
  let containerClose = useRef()
  let {onPress,source} = props
  let handleAnim = () => {
    containerClose
      .current
      .zoomOut(300)


    btnClose
      .current
      .rotate(300)
      .then(end=>{
        if(end.finished){
          onPress()        
        }

      })
  }
  return (
    <Animatable.View
      useNativeDriver={true}
      animation="zoomIn"
      duration={300}
      delay={500}
      ref={containerClose}
    >
      <TouchableWithoutFeedback
        onPress={()=>{
          handleAnim()
        }}
      >
        <Animatable.Image
          useNativeDriver={true}
          ref={btnClose}
          style={{
            margin:5,
            width:40,
            height:40
          }}
          source={source}
          animation='rotate'
        />
      </TouchableWithoutFeedback>
    </Animatable.View>
  )
  
}
