import React,{useContext,useEffect,useRef} from 'react'
import {
  View,
  FlatList,
  Text,
  Image,
  Dimensions
} from 'react-native';
import ImgToSelect from './imgToSelect/imgToSelect';
import * as Animatable from 'react-native-animatable';
import { MyGalleryContext } from '../../MyGalery';

const {width,height} = Dimensions.get('screen')

export const MyGalleryPhoto = (props) => {

  let {
    data,
  } = props

  return (
    <View style={{
      flex:1,
    }}>

      <HeaderCount/>

      <FlatList
        data={data}
        contentContainerStyle={{
          justifyContent: 'center',
          alignItems: 'center',
        }}
        renderItem={({item,index})=>{
            return(
              <ImgToSelect
                data={{
                  item: item,
                  index: index
                }}
              />         
            )
          }
        }
        horizontal={false}
        numColumns={2}
        ListEmptyComponent={
          <View
            style={{
              backgroundColor:'blue',
              justifyContent: 'center',
              alignItems: 'center',
              width:width,
              height:width/5*7
            }}
          >
            <Text style={{
              color:'white',
              backgroundColor:'red'
            }}>
              vide
            </Text>
          </View>
        }
      />
   </View>
  )
}

const HeaderCount = (props) => {
    const {selectedItem} = useContext(MyGalleryContext)
    let arraySelectedItem = Array.from(selectedItem)
    let len = arraySelectedItem.length
  return(
    <Animatable.View
      useNativeDriver={true}
      animation='pulse'
      duration={1500}
      iterationCount='infinite'
      iterationDelay={3000}
    >
      <Animatable.View
        useNativeDriver={true}
        animation="bounceIn"
        duration={500}
        style={{

          justifyContent: "center",
          alignItems: 'center',
          backgroundColor:'#00bd8ecc',
          width:"100%",
          borderRadius:20,
          marginBottom:10
        }}
      >
        <View style={{
          flexDirection: 'row',
          justifyContent: "center",
          alignItems: 'center',
          width:width/3*2
        }}>
          <ChiffrAnim
            len={len}
          />

          <Text 
            style={{
              color:'white',
              fontSize:width/15
            }}
          >
            Photo{len>1?"s":""}
          </Text>        
        </View>

      </Animatable.View>
    </Animatable.View>

  )
}

const ChiffrAnim = (props) => {

  const {selectedItem} = useContext(MyGalleryContext)

  let{len} = props
  let lenRef = useRef()

  useEffect(() => {
    lenRef
      .current
      .animate({
        0:{scale:1},
        0.5:{scale:1.5},
        1:{scale:1}
      },500)
  }, [selectedItem])

  return(
    <Animatable.Text 
      useNativeDriver={true}
      style={{
        color:'white',
        fontSize:width/15,
        marginRight:10
      }}
      ref={lenRef}
    >
      {len}
    </Animatable.Text>
  )
}