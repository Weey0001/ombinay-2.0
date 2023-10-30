import React, { useRef,useContext } from 'react'
import * as Animatable from 'react-native-animatable'
import { TextInput, Dimensions, TouchableWithoutFeedback } from 'react-native'
import Axios from 'axios'
import { StateContext } from '../../../../../../../../context/stateContext'
const {width,height} = Dimensions.get('screen')

export const InptCat = (props) => {

  const {Api,loadTypes,info} = useContext(StateContext)

  let {shopId} = info

  let inpAdd = useRef();
  let btnAdd = useRef()

  let newCat = async () => {

    

    let itemType = {
      TypeItem:inpAdd.current._lastNativeText,
      ShopId:shopId
    }

    if(itemType.TypeItem===undefined||itemType.TypeItem.length>30){
      alert("Champ vide ou trop long")
      inpAdd
        .current
        .clear()
    }else{
      try {
        await 
          Axios
            .post(Api+"/types/addType",itemType)
            .then(_=>{
              inpAdd
                .current
                .clear()
              loadTypes(true)
            })
      } catch (error) {
        console.log(error)
      }      
    }

  }

  let handleCat = () => {
    btnAdd
      .current
      .zoomOut(300)
    setTimeout(() => {
      btnAdd
        .current
        .zoomIn(300)
      newCat()
    }, 300);
  }

  return (
    <Animatable.View
      useNativeDriver={true}
      style={{
        width:width/8*7,
        borderRadius:10,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
      }}
      delay={500}
      animation='zoomIn'
      duration={500}
    >
      <Animatable.View
        useNativeDriver={true}
        animation='bounceIn'
        duration={1000}
        style={{
          flexGrow:1,
          backgroundColor:'#ffffffc4',
          borderRadius:20,
          elevation:2
        }}
        delay={1000}
      >
        <TextInput
          ref={inpAdd}
          style={{
            textAlign:'center',
          }}
          placeholder='Ajouter Catigorie'
          placeholderTextColor='#808080a8'
        />    

      </Animatable.View>

      <Animatable.View
        useNativeDriver={true}
        animation='bounceIn'
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          width:30,
          height:30,
          elevation:2,
          borderRadius:20
        }}
        duration={1000}
        delay={1000}
        ref={btnAdd}
      >
        <TouchableWithoutFeedback
          onPress={()=>{
            handleCat()
          }}
        >
          <Animatable.Image
            useNativeDriver={true}
            source={require('./img/0.png')}
            animation='rotate'
            style={{
              width:30,
              height:30,
              top:2
            }}
          />
        </TouchableWithoutFeedback>
      </Animatable.View>
    </Animatable.View>
  )
}
