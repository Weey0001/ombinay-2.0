import React, { createRef } from 'react'
import { 
  TouchableWithoutFeedback,
  Text,
  Image,
  Dimensions,
} from 'react-native'
import * as Animatable from "react-native-animatable";
import ReactNativeModal from "react-native-modal";

const {width} = Dimensions.get("screen")

export const NetError = (props) => {
  
  let {
    isShowModal,
    setShowModal
  }= props;

  let closeBtn = createRef()
  let closeModal = () =>{
    closeBtn
      .current
      .bounceOut(500)
      .then(end=>{
        end.finished?
          setShowModal(false):
          null
      })
  }

  return (
    
    <ReactNativeModal
      useNativeDriver={true}
      visible={isShowModal}
      animationIn='bounceIn'
      animationInTiming={500}
      animationOut="flipOutY"
      animationOutTiming={1000}
      coverScreen={true}
      style={{
        backgroundColor:'#000000b3',
        justifyContent: 'space-around',
        alignItems: 'center',
      }}
      
    >

      <Animatable.Text 
        style={{
          color:"white",
          fontSize:40
        }}
        animation='bounceIn'
        useNativeDriver={true}
      >
        Oups !
      </Animatable.Text>

      <Animatable.Image
        source={require('./img/0.png')}
        style={{
          width:width/3*2-20,
          height:width/3*2
        }}
        animation='bounceIn'
        useNativeDriver={true}
      />
      <Animatable.Text 
        style={{
          color:"white",
          fontSize:15,
          textAlign:"center"
        }}
        animation='bounceIn'
        useNativeDriver={true}
      >
        Une erreur est survenue lors de la connection
      </Animatable.Text>

      <Animatable.View
        ref={closeBtn}
        animation='bounceIn'
        delay={500}
        useNativeDriver={true}
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          margin:10,
          backgroundColor:"#0882c9b3",
          alignSelf: 'center',
          padding:6,
          borderBottomEndRadius:20,
          borderTopStartRadius:20
        }}
      >
        <TouchableWithoutFeedback
          onPress={()=>{
            closeModal()
          }}
        >
          <Text style={{
            color:"white",
            textShadowColor:"#000000",
            textShadowRadius:2,
            fontSize:20
          }}>
            Close
          </Text>
        </TouchableWithoutFeedback>      
      </Animatable.View>

    </ReactNativeModal>
  )
}
