import React, { useContext,useRef,useState } from 'react'
import * as Animatable from 'react-native-animatable';
import { Text,Dimensions, View,TouchableWithoutFeedback,Animated } from 'react-native';
import { MyModalInfo } from './myModalInfo/MyModalInfo';
import axios from 'axios'
import { StateContext } from '../../../../../../context/stateContext';
import {Rating,AirbnbRating} from 'react-native-ratings'

const {width,height} = Dimensions.get("screen")


export const ListItem = (props) => {

  let {Api,newFromNum,loadItems,setLoad,load} = useContext(StateContext)
  let {
    data,
    index,
    catKey,
    
  } = props
  let {
    _id,
    ShopId,
    Name,
    Price,
    promotion,
    MobilImg,
    updatedAt,
    Description,
    createdAt,
    view,
    rating,
    userRated,
    TypeItem
  } = data
  let containerRef = useRef()
  let [isModal,setModal] = useState(false);
  let [aniHeight] = useState(new Animated.Value(width/3*2+20))
  let [aniborder] = useState(new Animated.Value(20))
  let [isProm,setProm] = useState(promotion)

  let formatDate = () => {
    let dateNow = new Date();
    let dateModified = new Date(createdAt)


    let deltaDate = dateNow.getTime() - dateModified.getTime()
    let newDate = Math.round(deltaDate/1000/60/60/24)
    if(newDate<30){
      return(
        <Text
          style={{
            color:'#ffffffe3',
            textAlign:'left',
            textShadowColor:'black',
            textShadowRadius:1,
            backgroundColor:'#4a4a4a85',
            borderRadius:10,
            padding:3

          }}
        >
          Ajouter il y a {JSON.stringify(newDate)} jour{newDate>1? "s":""}
        </Text>
      )
    }else if(newDate>=30&&newDate<365){
      let newMounthFull = newDate/30
      let newMounth = Math.round(newMounthFull)
      return(
        <Text
          style={{
            color:'#ffffffe3',
            textAlign:'left',
            textShadowColor:'black',
            textShadowRadius:1,
            backgroundColor:'#4a4a4a85',
            borderRadius:10,
            padding:3

          }}
        >
          Ajouter il y a {JSON.stringify(newMounth)} mois
        </Text>
      )
    }else if(newDate>=365){
      let newYearFull = newDate/365;
      let newYear = Math.round(parseFloat(newYearFull))
      return(
        <Text
          style={{
            color:'#ffffffe3',
            textAlign:'left',
            textShadowColor:'black',
            textShadowRadius:1,
            backgroundColor:'#4a4a4a85',
            borderRadius:10,
            padding:3
          }}
        >
          Ajouter il y a {JSON.stringify(newYear)} an{newYear>1? "s":""}
        </Text>
      )
    }


  }

  let handlAnim = () => {
    containerRef
      .current
      .rubberBand(500)
      .then(end=>{
        if(end.finished){
          setModal(true)
        }
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
      alert(errrr)
    }
  }
  
  return (
    <Animated.View
      style={{
        height:aniHeight,
        marginBottom:aniborder,
      }}
    >
      <MyModalInfo
        isVisible={isModal}
        setVisible={setModal}
        data={data}
      />
      <Animatable.View
        useNativeDriver={true}
        style={{
          width:width/3*2+30,
          height:width/3*2+20,
          margin:5,
          justifyContent: 'flex-start',
          alignItems: 'center',
          flexDirection: 'column',

        }}
        ref={containerRef} 
        animation='bounceIn'
        duration={1000}
        delay={index*100}
      >

        <TouchableWithoutFeedback
          onPress={()=>{
            handlAnim()
          }}
        >
          <Animatable.View
            useNativeDriver={true}
            animation='pulse'
            duration={promotion?500:2000}
            iterationCount='infinite'
            iterationDelay={2000}
            delay={index*100}
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              flexDirection: 'column',
              height:width/3*2+20,
            }}
          >
            <View>
              <Animatable.Image
                useNativeDriver={true}
                source={{uri:Api+`/static/images/${ShopId}/items/${MobilImg}/org.jpg`}}
                style={{
                  width:width/3*2+20,
                  height:width/3*2+20,
                  borderRadius:10,
                  borderWidth:1,
                  borderColor:'#ffffff4d'
                }}
              />
              {
                promotion
                &&
                <Animatable.View
                  useNativeDriver={true}
                  animation='bounceIn'
                  duration={1000}
                  style={{
                    position:'absolute',
                    top:15,
                  }}
                >
                  <Animatable.View
                    useNativeDriver={true}
                    animation='swing'
                    duration={1000}
                    iterationCount='infinite'
                    iterationDelay={2000}
                    delay={index*300}
                  >
                    <Text 

                      style={{
                        color:"#ffffff",
                        textShadowColor:'#00000080',
                        textShadowRadius:3,
                        transform: [{ rotate: '-45deg' }],
                        fontWeight:'bold',
                        backgroundColor:'#b3000080',
                        fontSize:width/15,
                        borderRadius:20,
                        borderWidth:1,
                        borderColor:"#ffffff29",
                        elevation:2
                      }}
                    >
                    
                      Solde
                    </Text>                  
                  </Animatable.View>
             
                </Animatable.View>

              }
            </View>

            <Text style={{
              color:"#ffffff",
              fontSize:width/20,
              textAlign:'center',
              fontWeight:'bold',
              height:width/13,
              overflow:'hidden',
              position: 'absolute',
              top:0,
              margin:5,
              width:width/3,
              textShadowColor:'black',
              textShadowRadius:1
            }}>
              {Name}
            </Text>   
            
            <View
              style={{
                position: 'absolute',
                top:width/20,
                right:0,
                margin:10
              }}
            >

              {
                promotion
                &&
                <Animatable.View
                  useNativeDriver={true}
                  animation='bounceIn'
                  duration={1000}
                >
                  <Animatable.Text 
                    style={{
                      color:'#f5e400',
                      fontSize:width/10,
                      fontWeight:'bold',
                      textShadowColor:"#ff0000",
                      textShadowRadius:10,
                      textAlign:'right',
                      alignSelf:'flex-end',

                    }}
                    useNativeDriver={true}
                    animation='tada'
                    duration={1000}
                    iterationCount='infinite'
                    iterationDelay={2000}
                  >
                    {newFromNum(Price)} .ar
                  </Animatable.Text>                
                </Animatable.View>
 
              }        
              {
                !promotion
                &&
                <Animatable.Text 
                  useNativeDriver={true}
                  style={{
                    color:'#ffffff',
                    textAlign:'right',
                    alignSelf:'flex-end',
                    fontSize:width/15,
                    textShadowColor:'black',
                    textShadowRadius:2
                  }}
                  animation='bounceIn'
                  duration={1000}

                >
                  {newFromNum(Price)} .ar
                </Animatable.Text>
              } 
    
            </View>
            
            <View
              style={{
                position: 'absolute',
                bottom:0,
                left:0,
                margin:5,
                width:width/4*2
              }}
            >
              <Text
                style={{
                  color:'#ffffffe3',
                  textAlign:'center',
                  textShadowColor:'black',
                  textShadowRadius:1,
                  backgroundColor:'#4a4a4a59',
                  borderRadius:10,
                  padding:3,
                  marginBottom:5
                }}
              >
                {userRated} vote{userRated>1? "s":""}
              </Text>
               
              <View style={{
                backgroundColor:'#00000045',
                borderRadius:20,
                borderWidth:1,
                borderColor:"#ffffff1f",
                marginBottom:5
              }}>
                <AirbnbRating
                  showRating={false}
                  starStyle={{
                    width:width/15,
                    height:width/15,
                  }}
                  isDisabled={true}
                  defaultRating={rating}
                />             
              </View>
              {formatDate()}

              <View style={{
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: 'row',
                backgroundColor:'#4a4a4a85',
                borderRadius:10,
                paddingRight:5,
                marginTop:5
              }}>
                {
                  !isProm
                  &&
                  <MyIcon
                    source={require('./img/gris.png')}
                    onPress={()=>{
                      handleConnection(true)
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

                    keyControl = "prom"
                  />            
                }  
                <Text 
                  style={{
                    color:"white",
                    textShadowColor:'black',
                    textShadowRadius:1,

                  }}
                >
                  Promotion {promotion?'active':'inactive'}
                </Text>          
              </View>
            </View>

            <View  
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                position: 'absolute',
                bottom:0,
                right:0
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

            <View style={{
              position: 'absolute',
              right:0,
              top:width/3,
              margin:5,
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor:'#00b5c24f',
              borderRadius:5,
              borderWidth:1,
              borderColor:"#ffffff42"

            }}>
              <Text style={{
                color:"#ffffff",
                fontSize:width/15,
                textShadowColor:'black',
                textShadowRadius:1,
              }}>
                {view}
              </Text>
              <View style={{
                height:2,
                backgroundColor:'#ffffff',
                width:'80%'
              }}/>
              <Text style={{
                color:"#ffffff",
                textShadowColor:'black',
                textShadowRadius:1,
                fontWeight:'bold',
                margin:5
              }}>
                Views
              </Text>            
            </View>

          </Animatable.View>
        </TouchableWithoutFeedback>
      </Animatable.View>
    </Animated.View>
  )
}

const MyIcon = (props) => {

  let animBtn = useRef()
  let animImg = useRef()
  let {source,onPress,keyControl} = props
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
          style={{
            width:width/10,
            height:width/10,
            margin:5,
          }}
        />
      </TouchableWithoutFeedback>
    </Animatable.View>
  )
}