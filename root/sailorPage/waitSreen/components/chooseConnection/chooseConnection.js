import React, {useRef, useState, useContext } from 'react'
import { View, Dimensions } from 'react-native';
import { InputIp } from './components/inputIp';
import { BtnComp } from './components/btnComp';
import { TextWeb } from './components/text';
import {StateContext} from '../../../context/stateContext'

const {width} = Dimensions.get('screen')

export const ChooseConnection = (props) => {

  let {
    setConnection,
    setLocal,
    setLocalIpAddress
  } = useContext(StateContext)
  let [isIp,setIp] = useState(true)
  let inputRef = useRef()

  return (
    <View
      style={{
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      {
        isIp?
        <InputIp ref={inputRef}/>:
        <TextWeb/>  
      }

      <View style={{
        flexDirection: 'row',
        justifyContent: 'space-around',
        width:width/4*3,
      }}>
        {
          isIp
          &&
          <BtnComp
            backgroundColor="#1273a1c7"
            title="Web"
            onPress={()=>{
              setIp(false)
            }}
          />

        }

        {
          !isIp
          &&
          <BtnComp
            backgroundColor="#a11212c7"
            title="Local"
            onPress={()=>{
              setIp(true)
            }}
          />          
        }

        <BtnComp
          backgroundColor="#2fae24c7"
          title='Connect'
          onPress={()=>{
            if(isIp){
              setLocalIpAddress(inputRef.current._lastNativeText)
            }
            setLocal(isIp)
            setConnection(true)
          }}
        />        
      </View>

    </View>
  )
}
