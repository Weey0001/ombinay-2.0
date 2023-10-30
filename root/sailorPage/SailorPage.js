import React, { Component } from 'react'
import { ImageBackground, StatusBar, Text, View, AsyncStorage, Platform } from 'react-native'
import {StateContext} from './context/stateContext'
import {WaitSreen} from './waitSreen/waitSreen'
import axios from "axios"
import { NetError } from './netError/netError'
import * as Permissions from 'expo-permissions';
import { Articles } from './marketPage/corps/articles/articles'
import { Register } from './register/register'
import {Background3D} from './sensors/sensor';

export default class SailorPage extends Component {

  constructor(props){
    super(props)

    this.state={
      isWaitScreen:true,
      isConnection:false,
      isLocal:false,
      localIpAddress:"",
      items:[],
      types:[],
      isShowModal:false,
      Api:false,
      info:false,
      hasPremission:false,
      isLoadingTypes:false,
      isLoadingItems:false,
      isLoadingProfil:false,
      SuccessLogIn:true,
      shopInfo:false,
      load:false,
      isAll:false
    }
  }

  setAll = (bool) => {
    this.setState({
      isAll:bool
    })
  }

  getPermissionAsync = async () => {

    await 
      Permissions
        .askAsync(
          Permissions.CAMERA,
          Permissions.AUDIO_RECORDING,
          Permissions.CAMERA_ROLL
        );

  }

  setConnection = (bool) => {
    this.setState({
      isConnection:bool
    })
  }

  setLocal = (bool) => {
    this.setState({
      isLocal:bool
    })
  }

  setLocalIpAddress=(text)=>{
    this.setState({
      localIpAddress:text
    })
  }

  componentDidMount(){

    this.getPermissionAsync()
  }

  checkProfile = async (Api) => {
    try {
      let allItem = await AsyncStorage.getItem('User')
      let validation = []
      if(allItem!==null){
        let parsed = JSON.parse(allItem)
        let allValue = Object.values(parsed)
        allValue.forEach(ele=>{
          if(ele!==(undefined||null||"")){
            validation.push("ok")
          }
        })
      }else{
        this.setState({
          Api:Api,
          isWaitScreen:false,
          SuccessLogIn:false,
          isConnection:false
        })         
      }

      if(validation.length===11){
        this.sendInternId(allItem,Api)
      }else{
        this.setState({
          Api:Api,
          isWaitScreen:false,
          SuccessLogIn:false,
          isConnection:false
        })  
      }
    } catch (error) {
      this.setState({
        Api:Api,
        isWaitScreen:false,
        SuccessLogIn:false,
        isConnection:false
      }) 
    }
  }

  sendInternId = async (internData,Api) => {
      let info = JSON.parse(internData)
      let result = await axios.post(Api+"/users/config/synchronisationwithAppData",info)
      if(result.data=="succes"){
        this.connection(Api)
      }else{
        this.setState({
          Api:Api,
          isWaitScreen:false,
          SuccessLogIn:false,
          isConnection:false
        })
      }

  } 

  connection = async (addressServer) => {

    let internProfile = await AsyncStorage.getItem("User")
    let parsed = JSON.parse(internProfile)
    let id = await parsed.shopId
    let itemS = await axios.post(addressServer+"/items/allitems/"+id),
    typeS = await axios.get(addressServer+"/types/shops/"+id),
    infoS = parsed
    let shopInfo = await axios.get(addressServer+'/shops/shopInfo/'+id)

    this.setState({
      shopInfo:shopInfo.data,
      items:itemS.data,
      types:typeS.data,
      info:infoS,
      Api:addressServer,
      isWaitScreen:false,
      SuccessLogIn:true, //to true !!!!
      isConnection:false,
    })

  } 

  async componentDidUpdate(){
    let {
      isConnection,
      isLocal,
      localIpAddress,
      Api,
      isLoadingItems,
      isLoadingTypes,
      isLoadingProfil,
      load
    } = this.state;
    let internProfile = await AsyncStorage.getItem("User")
    if(internProfile!==null){
      let parsed = JSON.parse(internProfile)
      var id = await parsed.shopId     
    }

    if(isConnection){

      let localAddress = `http://${localIpAddress}:5000`
      let web = "http://3.127.92.129:5000"

      isLocal? 
        this.checkProfile(localAddress):
        this.checkProfile(web)
    }
    if(isLoadingItems){
      let itemS = await axios.post(Api+"/items/allitems/"+id)
      this.setState({
        load:!load,
        items:itemS.data,
        isLoadingItems:false
      })
    }
    if(isLoadingTypes){
      let typeS = await axios.get(Api+"/types/shops/"+id)
      this.setState({
        types:typeS.data,
        isLoadingTypes:false
      })
    }
    if(isLoadingProfil){
      let shopInfo = await axios.get(Api+'/shops/shopInfo/'+id)
      this.setState({
        shopInfo:shopInfo.data,
        isLoadingProfil:false
      })
    }
  }

  setLoad = (bool) => {
    this.setState({
      load:bool
    })
  }

  loadProfil = (bool) => {
    this.setState({
      isLoadingProfil:bool
    })
  }

  loadItems = (bool) =>{
    this.setState({
      isLoadingItems:bool
    })
  }

  loadTypes = (bool) => {
    this.setState({
      isLoadingTypes:bool
    })
  }

  setShowModal = (bool) =>{
    this.setState({
      isShowModal:bool
    })
  }

  reformatNumber = (someNumber) => {
    let stringNumb = someNumber.toString().replace(/\B(?=(\d{3})+(?!\d))/g," ")
    return stringNumb
  }

  shouldComponentUpdate(){
    return true
  }

  setSuccesLogIn=(bool)=>{
    this.setState({
      SuccessLogIn:bool
    })
  }

  render() {
    let {
      isWaitScreen,
      items,
      types,
      isConnection,
      isShowModal,
      Api,
      info,
      isLoadingItems,
      SuccessLogIn,
      shopInfo,
      load,
      isAll
    } = this.state;
    return (

      <Background3D>
        <StateContext.Provider
            value={{
              setConnection:this.setConnection,
              setLocal:this.setLocal,
              setLocalIpAddress:this.setLocalIpAddress,
              items:items,
              types:types,
              isConnection:isConnection,
              Api:Api,
              newFromNum:this.reformatNumber,
              info:info,
              loadProfil:this.loadProfil,
              loadItems:this.loadItems,
              loadTypes:this.loadTypes,
              isLoadingItems:isLoadingItems,
              setSuccesLogIn:this.setSuccesLogIn,
              shopInfo:shopInfo,
              setLoad:this.setLoad,
              load:load,
              isAll:isAll,
              setAll:this.setAll
            }}
          >
          <StatusBar hidden={true}/>

          <NetError
            isShowModal={isShowModal}
            setShowModal={this.setShowModal}
          />

          {
            isWaitScreen
            &&
            <WaitSreen/>
          }
          {
            !isWaitScreen&&!SuccessLogIn
            &&
            <Register/>
          }
          {
            !isWaitScreen&&SuccessLogIn
            &&<Articles
              items={items}
            />
          }   

        </StateContext.Provider>
      </Background3D>

    )
  }
}
