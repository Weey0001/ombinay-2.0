import React,{useRef,useContext, useState} from 'react'
import * as Animatable from "react-native-animatable";
import { Dimensions, TouchableWithoutFeedback, Animated } from 'react-native';
import { StateContext } from '../../../../../../../../../../../../context/stateContext';
import Axios from 'axios';

let {width,height} = Dimensions.get('screen')

export const Item = (props) => {

  const {Api,loadTypes} = useContext(StateContext)
  let btndel = useRef()
  let contRef = useRef()
  let refCat = useRef()
  let [customHeight] = useState(new Animated.Value(27))

  let {
    index,
    data
  } = props,
  {
    TypeItem,
    _id
  } = data

  let Delete = async () => {
    btndel
      .current
      .zoomOut(200)
    contRef
      .current
      .rotate(200)
    refCat
      .current
      .zoomOut(300)
      .then(end=>{
        if(end.finished){
          delType()
        }
        
      })
    animDel()
  }

  let animDel = () => {
    Animated.timing(
      customHeight,
      {
        toValue:0,
        duration:400,
      }
    ).start()
  }

  let delType = async () => {
    let result = await Axios.post(Api+"/types/deletetypeid/"+_id)
    if(result.status===200){
      loadTypes(true)
    }
  }

  return (
    <Animated.View
      style={{
        marginBottom:10,
        height:customHeight,
      }}
    >
      <Animatable.View
        useNativeDriver={true}
        animation='zoomIn'
        duration={200}
        delay={index*100}
        style={{
          width:width-20,

          flexDirection: 'row',

        }}

      >
        <Animatable.Text
          style={{
            color:'white',
            fontSize:20,
            backgroundColor:'#619eff',
            flexGrow:1,
            marginRight:10,
            textAlign:'center',
            borderRadius:20,
            elevation:2
          }}
          animation='bounceIn'
          useNativeDriver={true}
          ref={refCat}
        >
          {TypeItem}
        </Animatable.Text>
        <Animatable.View
          animation='bounceIn'
          useNativeDriver={true}
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            width:27,
            height:27,
            backgroundColor:'#bd004b',
            borderRadius:10,
            elevation:2
            
          }}
          ref={btndel}
        >
          <TouchableWithoutFeedback
            onPress={()=>{
              Delete()
            }}
          >
            <Animatable.Text 
              useNativeDriver={true}
              style={{
                color:'white',
                fontSize:20
              }}
              
              ref={contRef}
            >
              X
            </Animatable.Text>
          </TouchableWithoutFeedback>
        </Animatable.View>
      </Animatable.View>
    </Animated.View>
   
  )
}
