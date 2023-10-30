import React,{useRef} from 'react'
import {
  View,
  FlatList,
  TouchableWithoutFeedback,
  Dimensions
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import {Item} from './itemsList/item';
import {ListItem} from './itemsList/ListItem';

const {width,height} = Dimensions.get('screen')

export const MyFlatlistItem = (props) => {

  let {
    data,
    isList,
    setList,
    listHeader
  } = props

  return (
    <View 
      style={{
        flex: 1,
        justifyContent: 'center',
      }}
    >
        <FlatList
        data={data}
        keyExtractor={(item,index)=>item._id}
        contentContainerStyle={{
          justifyContent: 'center',
          alignItems: 'center',
        }}
        
        renderItem={({item,index})=>
          {
            if(!isList){
              return(
                <Item
                  data={item}
                  index={index}
                /> 
              )           
            }else{
              return(
                <ListItem
                  data={item}
                  index={index}
                />
              )
            }
          }

        }
        horizontal={false}
        numColumns={isList? 1:2}
        key={isList? 1:2}
        ListHeaderComponent={()=>{
          return listHeader()
        }}
      /> 

      <ToList
        setList={setList}
        isList={isList}
      />

    </View>
  )
}
const ToList = (props) => {

  let {
    setList,
    isList
  } = props;
  let changeRef = useRef()

  let handlAnim = (bool) => {
    changeRef
      .current
      .zoomOut(200)
      .then(end=>{
        if(end.finished){
          setList(bool)
        }
      })
      .then(_=>{

        changeRef
          .current
          .zoomIn(200)
     
      })

    
  }

  return(
    <Animatable.View
      useNativeDriver={true}
      style={{
        position: 'absolute',
        bottom:width/6,
        right:0,
        margin:5,

      }}
      animation='bounceIn'
      duration={500}
      delay={500}

    >

      <Animatable.View
        useNativeDriver={true}
        ref={changeRef}
        style={{
          backgroundColor:'#0000009c',
          borderRadius:20,
          padding:10
        }}
      >
        {
          isList
          &&

          <TouchableWithoutFeedback
            onPress={()=>{
              handlAnim(false)
            }}
          >
            <Animatable.Image
              useNativeDriver={true}
              source={require("./img/toicn.png")}
              style={{
                width:width/10,
                height:width/10
              }}
              animation='bounceIn'
              duration={500}
              delay={500}

            />
          </TouchableWithoutFeedback>
        }
        {
          !isList
          &&
          <TouchableWithoutFeedback
            onPress={()=>{
              handlAnim(true)
            }}
          >
            <Animatable.Image
              useNativeDriver={true}
              source={require("./img/tolist.png")}
              style={{
                width:width/10,
                height:width/10
              }}
              animation='bounceIn'
              duration={500}
              delay={500}
            />
          </TouchableWithoutFeedback>

        }
      </Animatable.View>

    </Animatable.View>
  )
}