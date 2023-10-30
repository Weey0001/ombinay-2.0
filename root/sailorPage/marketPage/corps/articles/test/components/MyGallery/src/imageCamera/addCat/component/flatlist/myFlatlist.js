import React,{useContext,useEffect} from 'react'
import * as Animatable from "react-native-animatable";
import { FlatList, Dimensions } from 'react-native';
import { Title } from '../title/title';
import { Item } from './item/item';
import { StateContext } from '../../../../../../../../../../../context/stateContext';
const {width,height} = Dimensions.get("screen")

export const MyFlatlist = () => {
  
  const {types} = useContext(StateContext)
  useEffect(() => {
    console.log('loaded types')
  }, [types])

  return (
    <Animatable.View
      useNativeDriver={true}
      animation='zoomIn'
      duration={200}
      style={{
        width:width,
        height:height/8*7,
      }}
    >
      <FlatList
        data={types}
        renderItem={({item,index})=>
          <Item
            index={index}
            data={item}
          />
        }
        contentContainerStyle={{
          alignItems:'center'
        }}
        keyExtractor={(item,index)=>item._id}
        ListHeaderComponent={()=>{
          return(
            <Title/>
          )
        }}
      />
    </Animatable.View>
  )
}
