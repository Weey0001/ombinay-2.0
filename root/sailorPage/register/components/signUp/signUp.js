import React,{useRef,useContext} from 'react'
import { View, Text,Button, Dimensions, Keyboard } from 'react-native'
import { InputComp } from '../components/inputComp/inputComp'
import axios from 'axios';
import { StateContext } from '../../../context/stateContext'
import * as Animatable from 'react-native-animatable';

const {width,height} = Dimensions.get('screen')


export const SignUp = (props) => {
  let {Api,setSuccesLogIn} = useContext(StateContext)
  let {
    setLogIn 
  } = props
  let _pseudo = useRef(),
    _firstName = useRef(),
    _lastName = useRef(),
    _email = useRef(),
    _phone = useRef(),
    _pass = useRef();

  let onSubmitData = () => {
    let info = {
      pseudo:_pseudo.current._lastNativeText.trim(),
      firstName:_firstName.current._lastNativeText.trim(),
      lastName:_lastName.current._lastNativeText.trim(),
      email:_email.current._lastNativeText.trim(),
      phone:_phone.current._lastNativeText.trim(),
      pass:_pass.current._lastNativeText.trim(),
    }

    let arrayInfo = Object.values(info),
      validation=[];

    arrayInfo.forEach(ele=>{
      if(ele!==""){
        validation.push("ok")
      }
    })

    let {
      email,
      phone,
    } = info

    let tompon = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    test = tompon.test(email.trim());

    let len = validation.length;
    ((len===6)&&(test===true)&&(phone.length===10))? checkemailexistence(info):alert("Verifiez vos entrees")

  }

  let checkemailexistence = async (info) => {
     
    try {

      let item = {
        email:info.email,
        pseudo:info.pseudo,
        phone:info.phone
      }
      await 
        axios
          .post(Api+'/users/checkEmailExistence',item)
          .then(res=>{
            res.data=="exist"? emailExist():createShop(item,info)
          })
        
    } catch (error) {
      alert("error")
    }

  }

  let emailExist = () => {
    alert("Email deja utilise")
    setLogIn(true)
  }

  let createShop = async (item,info) => {
    await
      axios
        .post(Api+'/shops/addShop',item)
        .then(res=>{
          info.shopId=res.data
          axios
            .post(Api+'/users/add',info)
            .then(res=>{
              if(res.data=='done'){
                setLogIn(true)
                alert('Identifiez-vous')
              }
            })
        })

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
                color:'white',
                backgroundColor:'black',
                fontSize:width/8,
                // borderWidth:1,
                // borderColor:"#ffffff82",
                // paddingLeft:5
              }}
            >
              Sign 
            </Text>  
            <Text style={{
              color:'black',
              backgroundColor:'white',
              fontSize:width/8,
              top:-10,
              // borderWidth:1,
              // borderColor:"#000000a8",
            }}>
              Up
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
          ref={_pseudo}
          placeHolder="Donnez un nom a votre boutique"
          index={1}
          onSubmitEditing={()=>{
            _firstName.current.focus()
          }}
        />
        <InputComp
          ref={_firstName}
          placeHolder="Nom"
          index={2}
          onSubmitEditing={()=>{
            _lastName.current.focus()
          }}
        />
        <InputComp
          ref={_lastName}
          placeHolder="Prenom"
          index={3}
          onSubmitEditing={()=>{
            _email.current.focus()
          }}
        />
        <InputComp
          ref={_email}
          placeHolder="email"
          index={4}
          onSubmitEditing={()=>{
            _phone.current.focus()
          }}
        />
        <InputComp
          ref={_phone}
          placeHolder="Telephone"
          index={5}
          onSubmitEditing={()=>{
            _pass.current.focus()
          }}
          np={true}
        />
        <InputComp
          ref={_pass}
          placeHolder="Mot de pass"
          index={6}
          onSubmitEditing={()=>{
            Keyboard.dismiss()
          }}
        />
        <View style={{
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
          
        }}> 

          <Btn
            someFunction={()=>{
              setLogIn(true)
            }}
            color='#00d4ff9e'
            title='Se Connecter'
            index={7}
          />

          <Btn
            someFunction={()=>{
              onSubmitData()
            }}
            color='#00ff409e'
            title='Valider'
            index={8}
          />
      
        </View>
      

      </View>

    </Animatable.View>
  )
}

export const Btn = (props) =>{

  let countainer = useRef();
  let {
    someFunction,
    color,
    title,
    index,
    animation
  } = props

  let handleAnim = () => {

    countainer
      .current
      .rubberBand(500)
      .then(end=>{
        if(end.finished){
          someFunction()
        }
      })
  }
  return(
    <Animatable.View
      useNativeDriver={true}
      ref={countainer}
      style={{
        margin:10
      }}
      animation="flipInY"
      duration={1000}
      delay={index*100+600}
    >
    
      <Button 
        color={color} 
        title={title}
        onPress={()=>{
          handleAnim()
        }} 
      /> 
    </Animatable.View>
  )
}