import React from 'react'
import * as Animatable from 'react-native-animatable';
import {
  View,
  Text,
  Dimensions
} from 'react-native'

const {width,height} = Dimensions.get('screen')

export const ViewComp = (props) => {

  let {
    view
  } = props

  return (
    <View style={{
      flexDirection: 'row',
    }}>
      <Animatable.Image
        useNativeDriver={true}
        source={require('./img/view.png')}
        style={{
          height:width/10,
          width:width/8,
        }}
      />
      <View style={{
        backgroundColor:'#006eadd6',
        left:width/10-10,
        top:-5,
        position: 'absolute',
        padding:2,
        borderRadius:10,
        borderWidth:1,
        borderColor:"#ffffffcf",
        paddingLeft:5,
        paddingRight:5

      }}>
        <Text style={{
          color:"white",
          fontSize:10
        }}>
          {view}
        </Text>                  
      </View>


    </View>
  )
}
