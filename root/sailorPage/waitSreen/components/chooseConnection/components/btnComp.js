import React, { useRef } from 'react'
import * as Animatable from 'react-native-animatable'
import { 
  TouchableWithoutFeedback, 
  Text, 
  Dimensions,
  StyleSheet
} from 'react-native'

const {width} = Dimensions.get('screen')

export const BtnComp = (props) => {

  let {title,onPress,backgroundColor} = props;
  let btnref = useRef()
  let animBtn = () => {
    if(title==="Local"||title==="Web"){
      btnref
        .current
        .zoomOut(200)
        .then(end=>{
          end.finished?
            onPress():
            null
        })
    }else{
      btnref
        .current
        .rubberBand(200)
        .then(end=>{
          end.finished?
            onPress():
            null
        })
    }

  }

  return (
    <Animatable.View
      style={{
        ...styles.container,
        backgroundColor:backgroundColor
        }}
      ref={btnref}
      animation="bounceIn"
      duration={500}
      useNativeDriver={true}
    >
      <TouchableWithoutFeedback
        onPress={()=>{animBtn()}}
      >
        <Text style={styles.text}>
          {title}
        </Text>
      </TouchableWithoutFeedback>
    </Animatable.View>
  )
}

const styles = StyleSheet.create({
  container:{
    width:width/3,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    borderRadius:10
  },
  text:{
    color:'white',
    fontSize:15,
    textShadowColor:'black',
    textShadowRadius:2,
    padding:5
  }
});
