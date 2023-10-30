import React,{useState,useEffect, useContext,useRef} from 'react'
import { View,Text,Button, Dimensions,Image, AsyncStorage, ScrollView, TouchableWithoutFeedback} from 'react-native'
import * as Animatable from "react-native-animatable";
import * as ImagePicker from 'expo-image-picker';
import * as ImageManipulator from "expo-image-manipulator";
import ImageProfile from './components/imageProfile/imageProfile';
import Axios from 'axios';
import { StateContext } from '../../../../../context/stateContext';
import Modal from 'react-native-modal';

const {width,height} = Dimensions.get('screen')

export const Profile = (props) => {
  
  let {info,Api,loadProfil,shopInfo} = useContext(StateContext)
  let{
    view,
    imgP,
    imgC
  } = shopInfo;
  let {pseudo,updatedAt} = info;

  let takePhoto = async(useFor) => {

    let optionImg = {
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      base64:true,
      exif:true,
      quality:0.5,
      allowsEditing:true,
      aspect:useFor==="users"?[1,1]:[4,3]
    }

    let optionResizer500 ={
      compress:1,
      format:ImageManipulator.SaveFormat.JPEG,
      base64:true
    }

    let optionResizer200 = {
      compress:0.4,
      format:ImageManipulator.SaveFormat.JPEG,
      base64:true
    }


    try {

      let dataImage = await ImagePicker.launchImageLibraryAsync(optionImg);

      let dataImage500 = 
        await 
          ImageManipulator
            .manipulateAsync(
              dataImage.uri,
              [{
                resize:
                  {
                    width:useFor==="users"?500:800,
                    height:useFor==="users"?500:600
                  }
              }],
              optionResizer500
            );
      
      let dataImage200 = 
        await 
          ImageManipulator
            .manipulateAsync(
              dataImage500.uri,
              [{resize:{width:200,height:200}}],
              optionResizer200
            );

      let newId = new Date().getTime();

      let data = {
        shopId:info.shopId,
        orgbase64:dataImage500.base64,
        category:useFor,
        winbase64:dataImage200.base64,
        idProfilImg:newId
      };

      if(useFor === "users"){
        AsyncStorage.setItem("IdImgProfile",JSON.stringify(newId))     
      }else{
        AsyncStorage.setItem("IdImgCover",JSON.stringify(newId))
      }

      let options = {
          url: `${Api}/users/addImageProfil`,
          method: 'POST',
          data: data,
          headers: {
            'Content-Type': "application/json"
          }
        }
      let response = await Axios(options)
      if(response.status===200) await loadProfil(true)

    } catch (error) {
      alert("wo"+error)
    }
  }

  let formatDate = () => {
    let dateNow = new Date();
    let dateModified = new Date(updatedAt)

    let deltaDate = dateNow.getTime() - dateModified.getTime()
    let newDate = Math.round(deltaDate/1000/60/60/24)
    if(newDate<30){
      return(
        <LazyText
          title='Inscription'
          data={`Il y a ${JSON.stringify(newDate)} jour${newDate>1? "s":""}.`}
        />

      )
    }else if(newDate>=30&&newDate<365){
      let newMounthFull = newDate/30
      let newMounth = Math.round(newMounthFull)
      return(
        <LazyText
          title='Inscription'
          data={`Il y a ${JSON.stringify(newMounth)} mois.`}
        />

      )
    }else if(newDate>=365){
      let newYearFull = newDate/365;
      let newYear = Math.round(parseFloat(newYearFull))
      return(
        <LazyText
          title='Inscription'
          data={`Il y a ${JSON.stringify(newYear)} an${newYear>1? "s":""}`}
        />

      )
    }
  }
  let [isProfil,setProfil] = useState(false)
  let profilRef = useRef()

  let handleAnim = () => {
    profilRef
      .current
      .rubberBand(500)
      .then(end=>{
        if(end.finished)
        {
          setProfil(true)
        }
      })
  }

  return (
    <View
      style={{
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Animatable.View
        useNativeDriver={true}
        animation='rubberBand'
        duration={1000}
        iterationCount='infinite'
        iterationDelay={2500}
      >
        <TouchableWithoutFeedback
          onPress={()=>{
            handleAnim()
          }}
        >
          <Animatable.View
            useNativeDriver={true}
            ref={profilRef}
          >
            <Animatable.Image
              useNativeDriver={true}
              animation='bounceIn'
              duration={500}
              delay={500}
              source={{uri:`${Api}/static/images/${info.shopId}/users/${imgP}win.jpg`}}
              style={{
                width:width/7,
                height:width/7,
                borderRadius:50,
                borderWidth:1,
                borderColor:"#ffffffcf"
              }}

            />        
          </Animatable.View>

        </TouchableWithoutFeedback>

      </Animatable.View>

      <Text style={{
        color:"#ffffffcf"
      }}>
        {pseudo}
      </Text>
      <Modal
        isVisible={isProfil}
        style={{
          alignItems: 'center',
          flex: 1,
        }}
        useNativeDriver={true}
        animationIn='bounceIn'
        animationInTiming={500}
        animationOut='flipOutY'
        animationOutTiming={500}
      >
        <ScrollView
          style={{
            flex: 1,

          }}
          contentContainerStyle={{
            justifyContent: 'center',
            alignItems: 'center',            
          }}
        >
          <ImageProfile
            source={(imgP===undefined||imgP===null||imgP==="")?require('./img/004.png'):{uri:`${Api}/static/images/${info.shopId}/users/${imgP}win.jpg`}}
            source0={(imgC===undefined||imgC===null||imgC==="")?require('./img/004.png'):{uri:`${Api}/static/images/${info.shopId}/cover/${imgC}org.jpg`}}
            takePhoto={takePhoto}
            info={info}
          />

          <View
            style={{
              padding:10,
              backgroundColor:'#ffffff2b',
              borderRadius:10,
              borderWidth:2,
              borderColor:"#ffffff57",
              width:width/3*2
            }}
          >
            <LazyText
              title="Nom"
              data={info.firstName}
            />
            <LazyText
              title="Prenom"
              data={info.lastName}
            />
            <LazyText
              title="Numero de tel"
              data={info.phone}
            />
            <LazyText
              title="e-Mail"
              data={info.email}
            />
            <LazyText
              title="view"
              data={view}
            />
            {formatDate()}

          </View>

          <Button 
            color="#00ff00" 
            title="Fermer" 
            onPress={()=>setProfil(false)} 
          />     
        </ScrollView>

        
      </Modal>
    </View>
    
  )
}

const LazyText = (props) => {

  let {
    title,
    data
  } = props

  return(
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}
    >
      <Text 
        style={{
          color:'white',
          borderBottomColor:'white',
          borderBottomWidth:1
        }}
      >
        {title}:
      </Text>
      <Text
        style={{
          color:'white'
        }}
      >
        {data}
      </Text>
    </View>
  )
}
