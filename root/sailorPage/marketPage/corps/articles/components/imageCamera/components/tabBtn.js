import React from 'react'
import * as Animatable from 'react-native-animatable';
import * as ImagePicker from 'expo-image-picker';
import { ImgBtn } from "./imgBtn";

export const TabButton = (props) => {

  let {
    setUri
  } = props

  let pickImage = async () => {
    
    let options = {
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing:true,
      aspect:[1,1],
      quality:0.1,
      base64:true,
      exif:true
    };

    try {

      await 
        ImagePicker
          .launchImageLibraryAsync(options)
          .then(res=>{
            setUri(res)
          })
          
    } catch (error) {
      console.log(error)
    }

  }

  let launchCamera = async() => {
    
    let options = {
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing:true,
      aspect:[1,1],
      quality:0.1,
      base64:true,
      exif:true
    };

    try {

      await 
        ImagePicker
          .launchCameraAsync(options)
          .then(res=>{
            setUri(res)
          }) 

    } catch (error) {
      console.log(error)
    }

  }

  return (
    <Animatable.View
      useNativeDriver={true}
      animation='zoomIn'
      style={{
        position: 'absolute',
        bottom:100,
        right:-10,
        flexDirection: 'column-reverse',
        justifyContent: "space-around",
        alignItems: "center",
      }}
    >
    
      <ImgBtn
        index={3}
        source={require('./img/021.png')}
        onPress={()=>{
          launchCamera()
        }}
      />
      <ImgBtn
        index={4}
        source={require('./img/020.png')}
        onPress={()=>{
          pickImage()
        }}
      />

    </Animatable.View>
  )
}
