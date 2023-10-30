import React,{useState, useEffect,createContext,useRef} from 'react'
import Modal from 'react-native-modal';
import {
  View,
  Text,
  Button,
  TouchableOpacity,
  Dimensions,
  ActivityIndicator,
  TouchableWithoutFeedback,
} from 'react-native'
import * as MediaLibrary from 'expo-media-library';
import { MyGalleryPhoto } from './src/flatlist/flatlist';
import { BtnToGallery } from './src/btnToGallery/btnToGallery';
import { ModalCamera } from './src/imageCamera/imageCamera';
import * as Animatable from 'react-native-animatable';

const {width,height} = Dimensions.get('screen')

export const MyGalleryContext = createContext()

export const MyGalery = () => {
  
  let [isGallery,setGallery] = useState(false)
  let [items,setItems] = useState(false)
  let [selectedItem,setSelectedItem] = useState([])
  let [isFormVisible,setFormVisible] = useState(false)
  let [isUri,setUri] = useState(false)
  
  useEffect(
    ()=>{
      takePhoto()
    },
    []
  )

  let takePhoto = async () => {

    let option = {
      first:200,
    }

   let media = await MediaLibrary.getAssetsAsync(option)
   setItems(media.assets)

  }
  if(items==false){
    return(
      <View
        style={{
          flex:1,
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <ActivityIndicator
          size='large'
          color="#00cca7b8"

        />
      </View>
    )
  }else{
    return (
      <View>
        <BtnToGallery
          setGallery={setGallery}
        />
        <Modal
          isVisible={isGallery}
          useNativeDriver={true}
          animationIn='bounceIn'
          animationOut='flipOutY'
          animationOutTiming={500}
          style={{
            flex: 1,
          }}
        >
          <MyGalleryContext.Provider
            value={{
              setSelectedItem:setSelectedItem,
              selectedItem:selectedItem
            }}
          >
            <MyGalleryPhoto
              data={(items!==false)?items:[]}
            />    
          </MyGalleryContext.Provider>

          <View style={{
            position:'absolute',
            bottom:0,
            width:"100%",
            flexDirection: 'row',
            justifyContent: 'space-around',
            alignItems: 'center',
            padding:20
          }}>
           
            <BtnGalery
              animation='swing'
              iterationCount='infinite'
              iterationDelay = {2000}
              duration={2000}
              title='Retour'
              actionFunc={()=>{
                setSelectedItem([])
                setGallery(false)               
              }}
              bck='#ff2e2ec7'
            />     

            <BtnGalery
              animation='rubberBand'
              iterationCount='infinite'
              iterationDelay = {1500}
              duration={2000}
              title='Valider'
              actionFunc={()=>{
                setUri(selectedItem)
                setFormVisible(true)              
              }}
              bck='#2eff6db5'
            />    
            <ModalCamera
              isVisible={isFormVisible}
              setVisible={setFormVisible}
              isUri={isUri}
              setUri={setUri}
            />
          </View>

        </Modal>
      </View>
    )    
  }

}


const BtnGalery = (props) => {

  let {
    actionFunc,
    title,
    bck,
    animation,
    iterationCount,
    iterationDelay,
    duration,
  } = props;
  let textRef = useRef();

  let handlAnim = () => {
    textRef
      .current
      .tada(300)
      .then(_=>{
        _.finished?
        actionFunc():null       
      })

  }

  return(
    <Animatable.View
      useNativeDriver={true}
      animation={animation}
      iterationCount={iterationCount}
      iterationDelay={iterationDelay}
      duration={duration}
    >
      <TouchableWithoutFeedback
        onPress={()=>{
          handlAnim()
        }}
      >
        <Animatable.Text
          useNativeDriver={true}
          ref={textRef}
          style={{
            backgroundColor:bck,
            fontSize:width/15,
            color:'white',
            padding:5,
            textShadowColor:"black",
            textShadowRadius:2,
            borderRadius:10,
            elevation:2
          }}
        >
          {title}
        </Animatable.Text>
      </TouchableWithoutFeedback>
    </Animatable.View>
  )
}