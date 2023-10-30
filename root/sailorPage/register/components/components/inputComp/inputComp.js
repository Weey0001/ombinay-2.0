import React,{forwardRef} from 'react'
import { TextInput,View, Dimensions } from 'react-native'
import * as Animatable from 'react-native-animatable'

const {width,height} = Dimensions.get('screen')

export const InputComp = forwardRef((props,ref)=>{
  let {
    placeHolder,
    index,
    onSubmitEditing,
    np
  } = props
  return(
    <Animatable.View 
      style={{
        backgroundColor:'white',
        margin:width/75,
        borderRadius:20,
        elevation:2
      }}
      useNativeDriver={true}
      duration={800}
      animation='flipInY'
      delay={index*100+500}
    >
      <Animatable.View
        useNativeDriver={true}
        iterationDelay={2000}
        duration={500}
        animation='pulse'
        iterationCount='infinite'
      >
        <TextInput
          ref={ref}
          placeholder={placeHolder}
          style={{
            width:width/3*2,
            textAlign:'center'
          }}
          onSubmitEditing={()=>{
            onSubmitEditing()
          }}
          keyboardType={np? "phone-pad":"default"}
        />      
      </Animatable.View>
      
    </Animatable.View>

  )
})