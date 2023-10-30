import React,{useRef,useState} from 'react'
import * as Animatable from 'react-native-animatable';
import {
  View,
  Text,
  TouchableWithoutFeedback,
  Dimensions,
  Button,
  ScrollView
} from 'react-native';
import Modal from 'react-native-modal';
import * as Communications from "react-native-communications";

const {width,height} = Dimensions.get('screen')

export const ProgPage = (props) => {

  let [isVisible,setVisible] = useState(false)

  return (
    <View>

      <IconProg
        setVisible={setVisible}
      />

      <ModalPageProg
        isVisible={isVisible}
        setVisible={setVisible}
      />
      
    </View>
  )
}

const IconProg = (props) => {

  let IconRef = useRef()
  let {setVisible} = props
  let handlAnim = () => {
    IconRef
      .current
      .rubberBand(500)
      .then(end=>{
        if(end.finished){
          setVisible(true)
        }
      })
  }

  return(
    <Animatable.View
      useNativeDriver={true}
      ref={IconRef}
      style={{
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <TouchableWithoutFeedback
        onPress={()=>{
          handlAnim()
        }}
      >
        <View
          style={{
            backgroundColor:'#000000b8',
            borderRadius:30
          }}
        >
          <Animatable.Image
            useNativeDriver={true}
            source={require("./img/11.png")}
            style={{
              width:width/8,
              height:width/8
            }}
            animation='pulse'
            duration={500}
            iterationCount='infinite'
            iterationDelay={2000}
          />          
        </View>

      </TouchableWithoutFeedback>
      <Text style={{
        color:"white",
        width:width/7
      }}>
        ORCHID
      </Text>
    </Animatable.View>
  )
}

const ModalPageProg = (props) => {

  let {
    setVisible 
  } = props

  return(
    <Modal
      {...props}
      animationIn='bounceIn'
      animationInTiming={500}
      animationOutTiming={500}
      animationOut='flipOutY'
      useNativeDriver={true}
    >

      <ScrollView
        contentContainerStyle={{
          justifyContent: 'center',
          alignItems: 'center',        
        }}
        style={{
          flex:1
        }}
      >
        <View style={{
          justifyContent: 'center',
          alignItems: 'center',
        }}>
          <Animatable.Image
            useNativeDriver={true}
            source={require('./img/11.png')}
            style={{
              width:width/4*2,
              height:width/4*2
            }}
            animation='pulse'
            duration={10000}
            iterationCount='infinite'
          />  
          <Animatable.Image
            useNativeDriver={true}
            source={require('./img/10.png')}
            style={{
              width:width/3*2,
              height:width/3,
              position: 'absolute',
            }}
            animation='swing'
            duration={1000}
            iterationCount='infinite'
            iterationDelay={4000}
          />     
        </View>

        <View style={{
          justifyContent: 'center',
          alignItems: 'center',
        }}>
          <Text style={{
            color:'white',
            fontSize:width/15,
            margin:10,
            textAlign:'center'
          }}>
            Bienvenue sur ORCHID
          </Text>
          <Text 
            style={{
              color:'white',
              textAlign:'center',
              margin:20
            }}
          >
            ORCHID est un reseau d'informations mise en place par nos programmeurs offrant a nos Clients des articles et des services provenant de toutes la grande Ile.
          </Text>
          <Text 
            style={{
              color:'white',
              textAlign:"center",
              margin:20
            }}
          >
            Nous offrons egalement des services de creation d'applications Mobiles et de sitse Web,  en offline ou online.
          </Text>

          <Text style={{
            color:'white',
            fontSize:width/20
          }}>
            Nos Contacts:
          </Text>
          <View style={{
            flexDirection:'row',
            width:width/2,
            justifyContent: "space-around",
            alignItems: 'center',
            margin:20
          }}>
            <SocialIcon
              source={require('./img/0.png')}
              animation='wobble'
              duration={4000}
              someAction={()=>{
                Communications.email(
                  ["weedy1aina@gmail.com"],
                  null,
                  null,
                  null,
                  null
                )
              }}
            />
            <SocialIcon
              source={require('./img/1.png')}
              animation='rubberBand'
              duration={3000}
              someAction={()=>{
                Communications.phonecall('0322631774',true)
              }}
            />
          </View>

        </View>

        <Button 
          color="#5200f596" 
          title="Retour" 
          onPress={()=>{
            setVisible(false)
          }} 
        />      
      </ScrollView>

    
    </Modal>
  )
}

const SocialIcon = (props) => {

  let {
    animation,
    duration,
    someAction,
    source
  } = props

  let iconRef = useRef()
  let handlAnim = () => {
    iconRef
      .current
      .swing(500)
      .then(end=>{
        if(end.finished){
          someAction()
        }
      })
  }

  return(
    <Animatable.View
      useNativeDriver={true}
      ref={iconRef}
    >
      <TouchableWithoutFeedback
        onPress={()=>{
          handlAnim()
        }}
      >
        <Animatable.Image
          source={source}
          style={{
            width:width/8,
            height:width/8
          }}
          useNativeDriver={true}
          animation={animation}
          duration={duration}
          iterationCount='infinite'
        />
      </TouchableWithoutFeedback>
    </Animatable.View>
  )
}