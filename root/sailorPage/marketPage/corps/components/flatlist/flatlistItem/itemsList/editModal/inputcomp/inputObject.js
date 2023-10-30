import React, { forwardRef } from 'react'
import * as Animatable from 'react-native-animatable';
import { Text, Dimensions,TextInput } from 'react-native';

const {width} = Dimensions.get("screen")

export const InputObject = forwardRef((props,ref) => {

  let {
    value,
    index,
    style,
    type,
    onParentChange,
    onSub,
    kb
  } = props;

  return (
    <Animatable.View
      useNativeDriver={true}
      animation="zoomIn"
      delay={index*200}
      style={{
        margin:10,
        flexDirection: 'column',
        width:"100%",
      }}
      duration={500}
    >
      <Text
        style={{
          color:"white",
          fontSize:15,
          borderBottomColor:"white",
          borderBottomWidth:1,
          margin:10,
          alignSelf: 'flex-start',

        }}

      >
        {type}
      </Text>
    
      <TextInput
        value={value}
        style={{...style}}
        onChangeText={(text)=>{
          onParentChange(text)
        }}
        ref={ref}
        onSubmitEditing={()=>{
           onSub()
        }}
        keyboardType={kb}
      />
    
    </Animatable.View>
  )
})


export const InputDesc = forwardRef((props,ref) => {

  let {value,line,index,style,type,onParentChange,ml} = props;

  return (
    <Animatable.View
      useNativeDriver={true}
      animation="zoomIn"
      delay={index*200}
      style={{
        margin:10,
        flexDirection: 'column',
      }}

    >
    
      <TextInput
        value={value}
        multiline={ml}  
        numberOfLines={line} 
        style={{...style}}
        onChangeText={(text)=>{
          onParentChange(text)
        }}
        ref={ref}
      />
    
    </Animatable.View>
  )
})