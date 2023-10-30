import React,{useRef} from 'react'
import { 
  TouchableWithoutFeedback,
  View,
  Text,
  Dimensions
  } from 'react-native';
import * as Animatable from 'react-native-animatable';

const {width,height} = Dimensions.get('screen')

export const Cat = (props) => {

  let {
    data,
    onCat,
    index,
    setTitle,
    setSearch
  } = props;
  let {
    TypeItem,
    _id,
    count
  } = data
  let textRef = useRef()

  let handleAnim = () => {
    textRef
      .current
      .rubberBand(500)
      .then(end=>{
        if(end.finished){
          setSearch(false)
          onCat(_id)         
        }
      })
  }
  return(
    <Animatable.View
      useNativeDriver={true}
      animation='bounceIn'
      style={{
        margin:5,
        width:width/3*2+40,
        height:width/9,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius:30,
        elevation:2,
        backgroundColor:"#ffffff36",
        borderWidth:1,
        borderColor:'#ffffff75'
      }}
      delay={index*100}
      ref={textRef}
      duration={500}
    >
      <TouchableWithoutFeedback
        onPress={()=>{
          handleAnim()
          setTitle(TypeItem)

        }}
      >
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Text 
            style={{
              color:'white',
              fontSize:width/12,
              textShadowColor:"black",
              textShadowRadius:2,
              width:width/3*2+width/10,
              height:width/9,
              textAlign:'center',
            }}

          >
            {TypeItem} 

          </Text> 
          <Text 
            style={{
              color:'#ffffff87',
              position: 'absolute',
              left:0,
              fontSize:width/20,
              marginLeft:width/20
            }}
          >
            {count}
          </Text>         
        </View>

      </TouchableWithoutFeedback>
    </Animatable.View>
  )
}