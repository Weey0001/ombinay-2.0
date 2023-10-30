import React from 'react'
import ViewPager from '@react-native-community/viewpager';
import {
  Image,
  FlatList,
  View,
  Dimensions,
  Text,
  StyleSheet
} from 'react-native';

const {width,height} = Dimensions.get('screen')

export const ViewPagerImg = (props) => {

  let {
    data
  } = props

  return (
    <ViewPager
      style={{
        flex: 1,
       
      }}
      initialPage={0}
      showPageIndicator={true}

    >

      {
        data
        &&
        data.map(ele=>{
          console.log(data.indexOf(ele))
          return(
            <ViewExp
              key={ele.id}
              data={ele}
              index={1}
            />
          )
        })
      }
    
    </ViewPager>
  )
}

const ViewExp = (props) =>{

  let {data,index} = props;
  let { uri } = data;

  return(
    <View 
      key={`${index+1}`}
      style={{
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor:"transparent"
      }}
    >

      <Image
        source={{uri:uri}}
        style={{
          borderWidth:5,
          borderColor:'white',
          height:width/5*4,
          width:width/5*4
        }}

      />
      
    </View>
  )
}