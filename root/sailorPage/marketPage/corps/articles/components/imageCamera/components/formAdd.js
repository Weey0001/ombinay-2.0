import React, 
{ 
  useContext, 
  useState, 
  forwardRef, 
  useRef,
  useEffect, 
} from 'react'
import * as Animatable from 'react-native-animatable';
import { 
  Dimensions, 
  Keyboard, 
  Picker,  
  TouchableWithoutFeedback,
  Text,
  TextInput, 
  ScrollView,  
  View
} from 'react-native';
import { StateContext } from '../../../../../../context/stateContext';
import axios from 'axios'
import * as ImageManipulator from "expo-image-manipulator";
import { ModalAddCat } from '../addCat/addCat';
import { BackBtn } from '../addCat/component/backbtn';

const {width} = Dimensions.get('screen')

export const FormAdd = (props) => {

  let {
    isUri,
    setUri,
    close
  } = props;
  let _name = useRef()
  let _price = useRef()
  let _desc = useRef()
  let {
    types,
    info,
    Api,
    loadItems,
    setLoad,
    load,
    loadTypes
  } = useContext(StateContext)
  let [value,setValue] = useState(false)
  let [isCategorie,setCategorie] = useState(false)

  let newItem = async() => {

    let item = {
      info:info,
      name:_name.current._lastNativeText,
      price:_price.current._lastNativeText,
      type:value,
      description:_desc.current._lastNativeText,
      fileOrg:isUri.base64
    }

    if ( 
      item.type === "Categorie" 
      || item.type === false 
      || item.name === undefined 
      || item.price === undefined 
      || item.description === undefined 
      || isUri === false 
      || isUri === "" 
    ){
      alert("Verifier vos Entrees !")
    }else{
      addFileSytem(item)
    }
  }

  let addFileSytem = async (item) =>{

    let idTime = new Date().getTime()
    item.mobilId = idTime

    let options = {
      compress:0.1,
      format:ImageManipulator.SaveFormat.JPEG,
      base64:true
    }
    let resized = [
      {
        resize:{
          width:200,
          height:200
        }
      }
    ]

    try {

      let result = await ImageManipulator.manipulateAsync(isUri.uri,resized,options)
      item.fileWin = result.base64
      submitForm("application/json", item)
      
    } catch (error) {
      alert( "Error" + error )
    }
  }
  
  let submitForm = async (contentType,data) => {

    let options = {
      url: `${Api}/items/add`,
      method: 'POST',
      data: data,
      headers: {
        'Content-Type': contentType
      }
    }

    try {
      let response = await axios(options)
      if(response.status===200) {
        _name.current.clear()
        _price.current.clear()
        _desc.current.clear()
        setUri(false)
        setValue(false)
        loadItems(true)
        setLoad(!load)
        loadTypes(true)        
      }
    } catch (error) {
      alert("Error" + error)
    }

  }

  return (
    <Animatable.View
      useNativeDriver={true}
      style={{
        height:"100%",
        width:"100%",
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      }}
      animation='bounceIn'

    >

      <Animatable.Image
        useNativeDriver={true}
        source={(isUri===false||isUri===''||isUri===null )? require('./img/004.png'):{uri:isUri.uri}}
        animation='bounceIn'
        style={{
          width:"75%",
          height:"40%",
          marginTop:5,
          marginBottom:5
        }}
        delay={500}
      />


      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >        
        <MyPicker
          types={types}
          value={value}
          setValue={setValue}
          index={3}
          
        />
        <AddCategorie
          setVisible={setCategorie}
          index={2}
        />


      </View>

      <MyInp
        index={4}
        ref={_name}
        text="Nom du produit"
        onSubmitHandler={()=>{
          _price.current.focus()
        }}

        kb="default"
      />

      <MyInp
        index={5}
        ref={_price}
        text="Prix du produit"
        onSubmitHandler={()=>{
          _desc.current.focus()
        }}
        kb='numeric'
      />

      <MyInp
        index={6}
        ref={_desc}
        text="Decrire le produit"
        onSubmitHandler={null}
        kb="default"
      />
      <View
        style={{
          flexDirection: 'row',
        }}
      >
        <BackBtn
        source={require('./img/close.png')}
          onPress={close}
        />

        <BtnSave
          index={7}
          onPress={()=>{
            newItem()
          }}
        />      
      </View>


      <ModalAddCat
        isVisible={isCategorie}
        setVisible={setCategorie}
      />
      
    </Animatable.View>
  )
}

const MyInp = forwardRef((props,ref)=>{
  
  let {
    text,
    index,
    onSubmitHandler,
    kb
  } = props

  return(
    <Animatable.View
      useNativeDriver={true}
      animation='flipInX'
      delay={index*100}
      style={{
        margin:10
      }}
    >
      {
        index!==6
        &&
        <TextInput
          ref={ref}
          placeholder={text}
          style={{
            backgroundColor:'white',
            width:width/3*2,
            textAlign:'center',
            borderRadius:10
          }}
          onSubmitEditing={()=>{
            onSubmitHandler()
          }}
          keyboardType={kb}
        />        
      }

      {
        index===6
        &&
        <ScrollView
          style={{
            backgroundColor:"white",
            maxHeight:80,
            borderRadius:20
          }}
        >
          <TextInput
            ref={ref}
            placeholder={text}
            style={{
              width:width/3*2,
              textAlign:'center',
              borderRadius:10
            }}
            multiline={true}
            onBlur={()=>{
              Keyboard.dismiss()
            }}
          />        
        </ScrollView>

      }

    
    </Animatable.View>
  )
})

const MyPicker = (props) => {

   let {
     types,
     index,
     value,
     setValue
   } = props

  return(
    <Animatable.View
      useNativeDriver={true}
      animation='flipInX'
      delay={index*100}
      style={{
        backgroundColor:'white',
        width:"60%",
        height:30,
        borderRadius:10,
        margin:5
      }}
    >
      
      <Picker
        selectedValue={value}
        onValueChange={
          (itemValue, itemIndex) => setValue(itemValue)
        }
        mode="dialog"
        enabled={true}
        style={{
          height:30,
        }}
      >
        <Picker.Item
          label="Categorie"
          value='Categorie'
          
        />
        { 
          types
          &&
          types.map(({_id,TypeItem})=>
            <Picker.Item
              key={_id}
              label={TypeItem} 
              value={_id} 
            />
          )
        }
      </Picker>
      
    </Animatable.View>
  )
}

const BtnSave = (props) => {

  let {onPress,index} = props
  let savedData = useRef()

  let handleAnim = () => {
    savedData
      .current
      .zoomIn(200)
      .then(end=>{
        if(end.finished){
          onPress()          
        }

      })
  }

  return (
    <Animatable.View
      useNativeDriver={true}
      animation='bounceIn' 
      style={{
        elevation:2,}}
      delay={index*100}
      ref={savedData}
    >

      <TouchableWithoutFeedback
        onPress={()=>{
          handleAnim()
        }}
      >
      
        <Animatable.Image
          useNativeDriver={true}
          ref={savedData}
          style={{

            margin:5,
            width:40,
            height:40
          }}
          source={require("./img/success.png")}
        />

      </TouchableWithoutFeedback>
    
    </Animatable.View>
  )
}

const AddCategorie = (props) => {

  let {
    index,
    setVisible
  }=props

  let btnadd = useRef()
  let handleAnim = () => {
    btnadd
      .current
      .zoomIn(300)
      .then(end=>{
        if(end.finished){
          setVisible(true)
        }
      })
  }

  return(
    <Animatable.View
      useNativeDriver={true}
      animation='bounceIn'
      delay={index*300}
      style={{
        margin:5,
      }}
      
    >
      <TouchableWithoutFeedback
        onPress={()=>{
          handleAnim()
        }}
      >
        <Animatable.Image
          useNativeDriver={true}
          ref={btnadd}
          style={{
            margin:5,
            width:30,
            height:30
          }}
          source={require('./img/add.png')}
          animation='rotate'
          delay={index*300}
        />
      </TouchableWithoutFeedback>
    </Animatable.View>
  )
}