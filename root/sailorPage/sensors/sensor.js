import React, { useState, useEffect, Children, useRef } from 'react';
import { 
    View,
    Dimensions,
  } from 'react-native';
import { Gyroscope } from 'expo-sensors';
import * as Animatable from 'react-native-animatable';

const {width,height} = Dimensions.get("screen")

export const Background3D= (props) => {
  const [data, setData] = useState({});
  let imgMoveRef = useRef()
  let [toSubscrib,setToSubscrib] = useState(false)
  let backRef = useRef()

  useEffect(() => {
    _subscribe();
  }, [toSubscrib]);

  const _subscribe = () => {

    this._subscription = Gyroscope.addListener(gyroscope => {
      Gyroscope.setUpdateInterval(200);
      setData(gyroscope);
    });

  };

  const _unsubscribe = (EtaT) => {
    this._subscription && this._subscription.remove();
    this._subscription = null;
    if(EtaT==="forP"&&this._subscription===null){
      setYMoving(true)      
    }else if(EtaT==="forM"&&this._subscription===null){
      setYMoving(false)
    }
    
  };

  let { x, y, z } = data;
  let [isYMoving,setYMoving] = useState(false)
  let [posY,setPosY] = useState(0)

  let reConfigY = () =>{
    let newY = Math.round(y*3/4)
    return newY
  }

  useEffect(() => {
    let newY = Math.round(y*3/4)
    if(newY>=1){
      _unsubscribe("forP")
    }else if(newY<=-1){
      _unsubscribe("forM")
    }
  }, [y])

  useEffect(() => {
    if(isYMoving){
      setPosY(15)

    }
    if(!isYMoving){
      setPosY(-15)

    }
  }, [isYMoving])

  useEffect(() => {
    imgMoveRef
      .current
      .animate({
        from:{
          transform: [{ 
            translateY: posY,
          }],
        },
        to:{
          transform: [{ 
            translateY: -posY,
          }],
        }
      })
      .then(async end=>{
        if(end.finished){
          setToSubscrib(!toSubscrib)
        }
      })
    backRef
      .current
      .animate({
        from:{
          transform: [{ 
            translateY: posY/2,
          }],
        },
        to:{
          transform: [{ 
            translateY: -posY/2,
          }],
        }
      })
  }, [posY])

  return (
    <View
      style={{
        flex:1,
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >

      <Animatable.Image
        useNativeDriver={true}
        source={require('./img/3.jpg')}
        style={{
          width:width/6*7,
          height:height/5*6,
          position: 'relative',
        }}
        ref={backRef}
      />
      <Animatable.Image
        useNativeDriver={true}
        source={require("./img/8.png")}
        style={{
          width:width/6*7,
          height:height/5*6,
          position: 'absolute',
        }}
        ref={imgMoveRef}
      />

      <View style={{
        position: 'absolute',
        width:width,
        height:height
      }}>
        {props.children}
      </View>
       
    </View>

  );
}