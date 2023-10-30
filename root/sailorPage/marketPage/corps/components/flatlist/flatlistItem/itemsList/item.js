import React, { useContext,useRef, useEffect, useState } from 'react'
import * as Animatable from "react-native-animatable";
import { 
  Dimensions, 
  View,
  TouchableWithoutFeedback,
  Animated,
  Text
} from 'react-native';
import { MyModalInfo } from './myModalInfo/MyModalInfo';
import axios from 'axios'
import {ViewComp} from './components/viewComp/viewComp'
import { StateContext } from '../../../../../../context/stateContext';

const {width,height} = Dimensions.get("screen")

export const Item = (props) => {

  let {
    Api,
    newFromNum,
    loadItems,
    isLoadingItems,
    load,
    setLoad
  } = useContext(StateContext)
  let {data,index} = props;
  let {
    _id,
    promotion,
    ShopId,
    Name,
    Price,
    MobilImg,
    view,
    TypeItem
  } = data;
  let containerRef= useRef()  
  let imgAnim = useRef()
  let [isProm,setProm] = useState(promotion)
  let [isModal,setModal] = useState(false)
  let [aniHeight] = useState(new Animated.Value(width/3))
  let [aniborder] = useState(new Animated.Value(5))

  let handleAnim = () => {
    imgAnim
      .current
      .swing(500)
      .then(_=>{
        setModal(true)
      })
  }

  let Delete = async () =>{

    let item = {
      Name:Name,
      Id:_id,
      MobilImg:MobilImg,
      type:TypeItem
    }

    try{

      let res = await axios.post(Api+"/items/delete/"+ShopId,item)
      if(res.status===200) animDelete()

    }catch(error){
      alert(error)
    }

  }

  let animDelete = () =>{
    containerRef
      .current
      .zoomOut(500)

    Animated.parallel([
      Animated.timing(
        aniHeight,
        {
          toValue:0,
          duration:500
        }
      ),
      Animated.timing(
        aniborder,
        {
          toValue:0,
          duration:500
        }
      )
    ]).start(()=>{
      loadItems(true)
    })
  }

  let handleConnection = async (bool) => {
    let item = {
      bool:bool
    }
    try {

      let response = await axios.post(Api+"/items/promotions/"+_id,item)
      if(response.status===200){
        setProm(bool)
        setLoad(!load)
      }

    } catch (error) {
      alert(error)
    }
  }

  return (
    <Animated.View
      style={{
        height:aniHeight,
        // margin:aniborder,
        marginBottom:aniborder,
      }}
    >
        <Animatable.View
          useNativeDriver={true}        
          animation='bounceIn'
          duration={1000}
          delay={index*100}
          style={{
            backgroundColor:"transparent",
            width:width/3+10,
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 5,
          }}
          ref={containerRef}
        >
          <Animatable.View
            useNativeDriver={true}
            animation='pulse'
            iterationCount="infinite"
            duration={500}
            delay={index*300}
            iterationDelay={2000}
            
          >
            <TouchableWithoutFeedback
              onPress={()=>{
                handleAnim()
              }}
            >
              <View>
                <Animatable.Image
                  
                  source={{uri:Api+`/static/images/${ShopId}/items/${MobilImg}/win.jpg`}}
                  style={{
                    width:width/3,
                    height:width/3,
                    margin:5,
                    borderRadius:10,
                    borderWidth:1,
                    borderColor:'#ffffff29'
                  }}
                  animation='bounceIn'
                  useNativeDriver={true}
                  ref={imgAnim}
                />  

                {
                  promotion
                  &&
                  <Animatable.View
                    useNativeDriver={true}
                    animation='swing'
                    duration={800}
                    iterationCount='infinite'
                    iterationDelay={2000}
                    style={{
                      position: 'absolute',
                      top:width/25,
                    }}
                  >
                    <Text style={{
                      color:"#ffffff",
                      textShadowColor:'#00000080',
                      textShadowRadius:3,
                      transform: [{ rotate: '-45deg' }],
                      fontWeight:'bold',
                      backgroundColor:'#b3000080',
                      fontSize:width/15,
                      borderRadius:20
                    }}>
                    
                      Solde
                    </Text>                   
                  </Animatable.View>
                
                } 

                <View style={{
                  flexDirection: 'row',
                  justifyContent: 'space-around',
                  alignItems: 'center',
                  position: 'absolute',
                  bottom:0

                }}>
                  <ViewComp
                    view={view}
                  />
                  <MyModalInfo
                    isVisible={isModal}
                    setVisible={setModal}
                    data={data}
                  />

                  <View style={{
                    width:width/12,
                    height:width/12,
                    margin:5,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                    {
                      !isProm
                      &&
                      <MyIcon
                        source={require('./img/gris.png')}
                        onPress={()=>{
                          handleConnection(true)
                        }}
                        style={{
                          width:width/15,
                          height:width/15,
                          margin:5,
                        }}
                        keyControl = "prom"
                      />            
                    }
                    {
                      isProm
                      &&
                      <MyIcon
                        source={require('./img/red.png')}
                        onPress={()=>{
                          handleConnection(false)
                        }}
                        style={{
                          width:width/15,
                          height:width/15,
                          margin:5,
                        }}
                        keyControl = "prom"
                      />            
                    }            
                  </View>
                  <View  
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}
                  >

                    <MyIcon
                      source={require('./img/x.png')}
                      onPress={()=>{
                        Delete()
                      }}
                      style={{
                        width:width/15,
                        height:width/15,
                        margin:5
                      }}
                      keyControl = "delete"
                    />
                  </View>
        
                </View>
              </View>
            </TouchableWithoutFeedback>

          </Animatable.View>
        </Animatable.View>
    </Animated.View>
    
  )
}

const MyIcon = (props) => {

  let animBtn = useRef()
  let animImg = useRef()
  let {source,onPress,style,keyControl} = props
  let anim = () => {

    switch (keyControl) {
      case "delete":
        del()
        break;
      case "prom":
        prom()
        break;
      default:
        break;
    }

  }

  let del = () => {
    animBtn
      .current
      .rotate(500)
    animImg
      .current
      .zoomOut(400)
      .then(end=>{
        end.finished?
          onPress():
          null
      })
    setTimeout(() => {
      animImg
        .current
        .zoomIn(500)
      animBtn
        .current
        .rotate(500)
      }, 500);
  }

  let prom = () =>{
    animBtn
      .current
      .bounceOut(200)
      .then(end=>{
        if(end.finished){
          onPress()
        }
      })
  }

  return(
    <Animatable.View
      ref={animBtn}
      animation='bounceIn'
      delay={500}
      useNativeDriver={true}
    >
      <TouchableWithoutFeedback 
        onPress={()=>{
          anim()
        }}
      >
        <Animatable.Image
          ref={animImg}
          source={source}
          useNativeDriver={true}
          style={{...style}}
        />
      </TouchableWithoutFeedback>
    </Animatable.View>
  )
}
