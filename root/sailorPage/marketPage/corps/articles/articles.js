import React, { useContext, useState,useEffect,useRef } from 'react'
import * as Animatable from "react-native-animatable";
import { StateContext } from "../../../context/stateContext";
import { Myflatlist } from "../components/flatlist/myflatlist";
import { 
  View,
  TouchableWithoutFeedback,
  TextInput,
  UIManager, 
  Dimensions,
  LayoutAnimation ,
  Animated,
  Text,
  Button,
  ActivityIndicator
} from 'react-native';
import { ModalCamera } from './components/imageCamera/imageCamera';
import { Profile } from '../components/flatlist/profil/profile';
import { ProgPage } from '../components/ProgPage/progPage';
import { TestModule } from './test/testModule';

const {width,height}= Dimensions.get('screen')

UIManager.setLayoutAnimationEnabledExperimental&&UIManager.setLayoutAnimationEnabledExperimental(true)

export const Articles = (props) => {

  let {items,loadItems,isAll,setAll} = useContext(StateContext)

  let [itemFil,setItemfil] = useState(items);
  let [isSearch,setSearch]= useState(false);
  let [textSearch,setText]= useState("");
  let [isAdd,setAdd]=useState(false); 
  let [titleanim] = useState(new Animated.Value(height/15))
  let inptrf = useRef()
  let closeint = useRef();
  let [customHeight,setcustomHeight] = useState(height)
  let [isCategorie,setCategorie] = useState(false)
  let [isTitle,setTitle] = useState(false)

  let handleCloseint = () => {
   inpanim()
   closeanim()
   closeanim1()          
   handleOnBlur()
  }

  let closeanim = () => {
    closeint
      .current
      .rotate(500)

  }

  let closeanim1 = () => {
    closeint
      .current
      .slideOutLeft(500)
      .then(end=>{
        end.finished?
          setSearch(false):
          null
      })
  }

  let inpanim = () => {
    inptrf
      .current
      .bounceOut(500)

  }

  let handleOnfocus = () => {
    LayoutAnimation.spring()
    setcustomHeight(height/2)
  }

  let handleOnBlur = () => {
    LayoutAnimation.spring()
    setcustomHeight(height)
  }

  let handleChangeText = (text) => {
    let itemfound = [];
    if(text===""){
      setText(text)
      setCategorie(false)
      setTitle(false)
    }else{
      let newtext = text.toLowerCase();
      let regex = new RegExp(newtext)
      
      items.filter(ele=>{
        if(regex.test(ele.KeyItem))
        {
          itemfound.push(ele)
        }
      })      
      setItemfil(itemfound)
      setTitle("Resultats")
      setCategorie(true)
      setText(text)
   
    }    
  }

  let backBtn = () => {
    if(isAll){
      setAll(false)
    }
    setCategorie(false)
    setTitle(false)
  }

  let allItem = () =>{   
    setAll(true) 
    loadItems(true)
    setItemfil(items)
    setCategorie(true)  
    setTitle('Tous les Items')
  }

  return (
    <Animatable.View
      useNativeDriver={true}
      animation='bounceIn'
      style={{
        height:customHeight,
        width:width,
        position:"absolute",
        bottom:0,
        left:0,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor:'#00000059'
      }}
    >
      <View style={{
        flexDirection: 'row',
        flex: 1,
      }}>

        <View 
          style={{
            flexDirection: 'column-reverse',
            justifyContent: "flex-start",
            alignItems: "center",
            flex: 1,
            backgroundColor:'#00705aad',
            margin:10,
            borderRadius:10,
            elevation:2,
            paddingBottom:height/20,
            borderWidth:1,
            borderColor:'#ffffff1a'
            
          }}
        >

          <TestModule/>
          <Tools
            setsomeState={()=>allItem()}
            somekey="Tous"
            bckg="#2e2e2e0a"
            delaycount={4}
            source={require('./img/tab/all.png')}
            animation='tada'
            duration={800}
            iterationCount='infinite'
            iterationDelay={2000}
          />
          
          <Tools
            setsomeState={()=>setAdd(true)}
            somekey="Ajouter"
            bckg="#2e2e2e0a"
            delaycount={3}
            source={require('./img/tab/addItm.png')}
            animation='rubberBand'
            duration={1000}
            iterationCount='infinite'
            iterationDelay={3000}
          />

          <Tools
            setsomeState={()=>setSearch(true)}
            somekey="Recherche"
            bckg="#2e2e2e0a"
            delaycount={2}
            source={require('./img/tab/0.png')}
            animation='swing'
            duration={1000}
            iterationCount='infinite'
            iterationDelay={2000}
          />

          <Profile/>
          
          {
            isCategorie
            &&
            <Tools
              setsomeState={()=>{
                backBtn()
              }}
              somekey="Retour"
              bckg="#0056f500"
              delaycount={1}
              source={require('./img/tab/backCat.png')}
              animation='wobble'
              duration={5000}
              iterationCount='infinite'
              iterationDelay={2000}
            /> 
          }
          <View style={{
            flexGrow:1,
          }}>
            <ProgPage/>
          </View>

        </View>  
        <View style={{
          flexDirection: 'column',
          flex: 7,
        }}>
          <Myflatlist
            data={itemFil}
            source1={require('./img/1.png')}
            source2={require('./img/2.png')}
            source3={require('./img/0.png')}
            isCategorie={isCategorie}
            setCategorie={setCategorie}
            setTitle={setTitle}
            isSearch={isSearch}
            setSearch={setSearch}
            headerItem={()=>{
              return(
                <Animated.View style={{
                  height:titleanim,
                  width:width/4*3,
                  padding:5,

                }}>

                  <HeaderCat
                    text={isTitle? isTitle:'Categorie'}     
                  />
                </Animated.View>
              )
            }}
          />   
            {
              isSearch
              &&
              <Animatable.View
                animation="fadeIn"
                useNativeDriver={true}
                style={{
                  flexDirection: 'row',
                  justifyContent: 'center',
                  alignItems: 'center',
                  margin:3,
                  height:30
                }}
              >
                <Animatable.View
                  ref={inptrf}
                  animation="bounceIn"
                  duration={500}
                  delay={1000}
                  useNativeDriver={true}
                  style={{
                    flexGrow:1,
                    marginRight:3
                  }}
                >
                  <TextInput
                    value={textSearch}
                    onChangeText={(text)=>{
                      handleChangeText(text)
                    }}
                    onFocus={()=>{
                      handleOnfocus()
                    }}
                    onBlur={()=>{
                      handleOnBlur()
                    }}
                    placeholder='Recherche'
                    style={{
                      flexGrow:1,
                      textAlign:'center',
                      backgroundColor:"#ffffffa3",
                      borderRadius:20,
                      fontSize:20
                      
                    }}
                    placeholderTextColor="#00000042"
                  />          
                </Animatable.View>
                
                <Animatable.View
                  ref={closeint}
                  animation="slideInLeft"
                  duration={1000}
                  useNativeDriver={true}
                  style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    width:25,
                    height:25,
                    backgroundColor:'#87b800db',
                    borderRadius:15,
                    elevation:2,
                  }}
                >
                  <TouchableWithoutFeedback
                    onPress={()=>{
                      handleCloseint()
                      
                    }}

                  >
                    <Animatable.Text 
                      style={{
                        color:"#ffffff",
                        textAlign: 'center',
                        textShadowColor:"#000000db",
                        textShadowRadius:2
                      }}
                      animation="rotate"
                      duration={1000}
                      useNativeDriver={true}
                    >
                      X
                    </Animatable.Text>
                  </TouchableWithoutFeedback>

                </Animatable.View>
                
              </Animatable.View>
            }
     
        </View>    
        <ModalCamera
          isVisible={isAdd}
          setVisible={setAdd}
        />       
      </View>



    </Animatable.View>
  )
}

const Tools = (props)=>{

  let {
    setsomeState,
    somekey,
    delaycount,
    source,
    animation,
    duration,
    iterationCount,
    iterationDelay
  } = props;
  
  let containerRef = useRef()
  let ImgRef = useRef()

  let handleAnim = () => {
    ImgRef
      .current
      .swing(500)
      .then(end=>{
        if(end.finished){
          setsomeState()
        }
      })
  }

  return(
    <View>
      <Animatable.View
        useNativeDriver={true}
        animation={animation}
        duration={duration}
        iterationCount={iterationCount}
        iterationDelay={iterationDelay}
      >
        <Animatable.View
          style={{
            borderRadius:20,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor:'#1c408796',
            elevation:2,
            marginTop:10,
            // marginBottom:5
          }}
          useNativeDriver={true}
          animation="bounceIn"
          duration={500}
          delay={200*delaycount}
          ref={containerRef}
        >
          <TouchableWithoutFeedback
            onPress={()=>{
              handleAnim()
            }} 
          >

            <Animatable.Image
              useNativeDriver={true}
              animation='bounceIn'
              source={source}
              style={{
                width:width/7,
                height:width/7
              }}
              ref={ImgRef}
            />

          </TouchableWithoutFeedback>


        </Animatable.View> 
      
      </Animatable.View>
      <Text style={{
        color:"#ffffffcf",
        height:20,
        overflow:'hidden',
        textAlign:'center'
      }}>
        {somekey}
      </Text>    
    </View>


  )
}

const HeaderCat = (props)=> {
  let {
    text,
  } = props;
  return(
    <View
      style={{
        backgroundColor:"#6105ffa1",
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
        borderRadius:10,
        elevation:2,
        borderWidth:1,
        borderColor:"#ffffff1a"
      }}
    >
      <Text style={{
        color:'white',
        fontSize:width/12
      }}>
        {text}
      </Text>
    </View>
  )
}

