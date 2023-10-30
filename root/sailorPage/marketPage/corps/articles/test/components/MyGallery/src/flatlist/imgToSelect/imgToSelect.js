import React,{useState,useRef,useContext,useCallback} from 'react'
import { 
  View,
  Dimensions,
  Image,
  TouchableWithoutFeedback
 } from 'react-native'
import * as Animatable from "react-native-animatable";
import { MyGalleryContext } from '../../../MyGalery';

const {width,height} = Dimensions.get('screen')

export default (props) => {

  let {item,index} = props.data
  let [isSelected,setSelected] = useState(false)
  let imgRef = useRef()
  let viewRef = useRef()
  const {setSelectedItem,selectedItem} = useContext(MyGalleryContext)

  
  let handlClick =() =>{
    
    imgRef
      .current
      .animate({
        0:{scale:isSelected?0.8:1},
        1:{scale:isSelected?1:0.8},
      },200)
    viewRef
      .current
      .animate({
        0:{rotate:isSelected?"5deg":"0deg"},
        1:{rotate:isSelected?"0deg":"5deg"}
      },100)
      .then(end=>{
        !isSelected?addItem():removeItem()
      })
  }
 

  let addItem = () => {

    let newArraySelected = Array.from(selectedItem)
    newArraySelected.push(item)
    setSelectedItem(newArraySelected)
    // console.log(newArraySelected)
    console.log(newArraySelected.length)

  }

  let removeItem = () => {

    let ArraySelected = Array.from(selectedItem)
    let newArraySelected = []
    // setSelectedItem([])
    ArraySelected.forEach(async ele=>{
      if(ele!=item) {
        newArraySelected.push(ele)
      }
    })
    setSelectedItem(newArraySelected)
    // console.log(newArraySelected)
    console.log(newArraySelected.length)

  }
  
  return (
    <Animatable.View
      useNativeDriver={true}
      animation="flipInX"
      duration={500}
      delay={index*100}
      style={{
        margin:5
      }}
    >

      <TouchableWithoutFeedback
        onPress={()=>{
                  
          handlClick()
          setSelected(!isSelected)
        }}
      >
        <Animatable.View
          useNativeDriver={true}
          ref={viewRef}
        >

            <Animatable.Image
              useNativeDriver={true}
              source={{uri:item.uri}}
              style={{
                width:width/2-40,
                height:width/2-40,
                borderWidth:10,
                borderColor:"#ffffff",
              }}
              ref={imgRef}
            />   
            {
              !isSelected
              &&
              <Animatable.Image
                useNativeDriver={true}
                source={require('./img/0.png')}
                style={{
                  width:width/12,
                  height:width/12,
                  position: 'absolute',
                  margin:width/50
                }}
              />
            }    
            {
              isSelected
              &&
              <Animatable.Image
                useNativeDriver={true}
                source={require('./img/1.png')}
                style={{
                  width:width/12,
                  height:width/12,
                  position: 'absolute',
                  margin:width/50
                }}
                animation='bounceIn'
              />
            }    
              
    
        </Animatable.View>
    
      </TouchableWithoutFeedback>

    </Animatable.View>
    
  )
}
