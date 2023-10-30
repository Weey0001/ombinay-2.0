import React,{useRef,useContext} from 'react'
import { View, Text,Button,AsyncStorage, Keyboard, Dimensions,TouchableOpacity } from 'react-native'
import { InputComp } from '../components/inputComp/inputComp'
import axios from 'axios'
import { StateContext } from '../../../context/stateContext'
import * as Animatable from 'react-native-animatable';
import {Btn} from '../signUp/signUp';

const {width,height} = Dimensions.get('screen')

export const LogIn = (props) => {
  let {Api,setSuccesLogIn} = useContext(StateContext)
  let {
    setLogIn
  } = props
  let _email = useRef()
  let _pass = useRef()

  let toCheckEmail = async() => {
    let info = {
      email:_email.current._lastNativeText.trim(),
      pass:_pass.current._lastNativeText.trim()
    }
    try {
      await
        axios
          .post(Api+"/users/login",info)
          .then(async res=>{
            if(res.data=='false'){
              alert("votre email/mot de pass incorrect")
            }else{
              await AsyncStorage
                .setItem("User",JSON.stringify(res.data[0]))
                .then(async _=>{
                  setSuccesLogIn(true)
                })
            }
          })
    } catch (error) {
      alert(error)
    }
  }

  let forgotPassWord = async () => {
    let item ={
      email:_email.current._lastNativeText.trim()
    };
    let {
      email
    } = item;
    let tompon = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    test = tompon.test(email.trim());
    try {
      if(test){
        await 
          axios
            .post(Api+'/users/passSend',item)
            .then(res=>{
              alert(JSON.stringify(res.data))
            })
      }      
    } catch (error) {
      alert(error)
    }


  }

  return (
    <Animatable.View
      useNativeDriver={true}
      animation='bounceIn'
      duration={500}
      style={{
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-around',
        alignItems: 'center',
      }}
    >
    <View style={{
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
      }}>

        <Animatable.View
          useNativeDriver={true}
          animation='bounceIn'
          duration={800}
          delay={200}
          style={{
            position: 'absolute',
          }}
        >
          <Animatable.Image
            useNativeDriver={true}
            source={require('./img/11.png')}
            style={{
              width:width/2,
              height:width/2,

            }}
            animation='pulse'
            duration={500}
            iterationCount='infinite'
            iterationDelay={2000}
          />      
        </Animatable.View>

        <Animatable.View
          useNativeDriver={true}
          animation='bounceIn'
          duration={800}
          delay={300}
        >
        
          <Animatable.Image
            useNativeDriver={true}
            source={require('./img/10.png')}
            style={{
              width:width-50,
              height:width/2-25
            }}
            animation='wobble'
            duration={10000}
            iterationCount='infinite'
            easing='linear'
          />        
        </Animatable.View>

      </View>
      <Animatable.View
        useNativeDriver={true}
        animation="bounceIn"
        duration={800}
        delay={500}
      >
        <Animatable.View
          useNativeDriver={true}
          animation='swing'
          duration={1000}
          iterationCount='infinite'
          iterationDelay={3000}
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <View style={{
            transform: [{ rotate: '-15deg' }],
            flexDirection: 'row',
          }}>
            <Text
              style={{
                color:'black',
                backgroundColor:'white',
                fontSize:width/8,
                // borderWidth:1,
                // borderColor:"#ffffff82",
                // paddingLeft:5
              }}
            >
              Log 
            </Text>  
            <Text style={{
              color:'white',
              backgroundColor:'black',
              fontSize:width/8,
              top:-10,
              // borderWidth:1,
              // borderColor:"#000000a8",
            }}>
              In
            </Text>            
          </View>
    
        </Animatable.View>
      </Animatable.View>
      
      <View style={{
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
        <InputComp
          placeHolder='E-mail'
          ref={_email}
          index={1}
          onSubmitEditing={()=>{
            _pass.current.focus()
          }}
        />
        <InputComp
          placeHolder='Mot de pass'
          ref={_pass}
          index={2}
          onSubmitEditing={()=>{
            Keyboard.dismiss()
          }}
        />  
        <TouchableOpacity 
          style={{

          }} 
          onPress={()=>{
            forgotPassWord()
          }}>
          <Text style={{
            color:'#ffffff9e',
            borderBottomWidth:2,
            borderColor:'#ffffff9e'
          }}>
            Mot de pass oublier ?
          </Text>
        </TouchableOpacity>    
      </View>




      <View style={{
        flexDirection:'column',
        justifyContent: 'center',
        alignItems: 'center',
      }}>

        <View style={{
          flexDirection:'row',
          justifyContent:'space-around',
          alignItems: 'center',
        }}>
          <Btn
            someFunction={()=>{
              setLogIn(false)
            }}
            color='#00a82ab8'
            title="S'inscrire"
            index={3}
          />
          <Btn
            someFunction={()=>{
              toCheckEmail()
            }}
            color='#a82700b8'
            title="Check"
            index={3}
          />

        </View>  

          
      </View>


    </Animatable.View>
  )
}
