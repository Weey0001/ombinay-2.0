import React,{useContext, useState,useRef,useEffect} from 'react'
import ReactNativeModal from 'react-native-modal'
import { 
    Text,
    View,
    Dimensions, 
    Button,
    Image,
    TouchableWithoutFeedback,
    ScrollView
  } from 'react-native'
import * as Animatable from 'react-native-animatable';
import { EditModal } from '../editModal/editModal';
import { StateContext } from '../../../../../../../context/stateContext';

const {width,height} = Dimensions.get('screen')

export const MyModalInfo = (props) => {

  
  let {types,Api,newFromNum} = useContext(StateContext),
  {
    TypeItem,
    Name,
    Price,
    Phone,
    Email,
    Sailor,
    promotion,
    MobilImg,
    ShopId,
    updatedAt,
    _id,
    Description,
    view
  } = props.data,
  findType = (someType) =>{
    let type;
    types.forEach(ele=>{
      if(ele._id===someType){
        type = ele.TypeItem
      }
    })
    return (
      <Text style={{
        color:"#696969e3"
      }}>
        {type}
      </Text>
    )
  },
  myText = (value) =>(
    <Text 
      style={{
        alignSelf: 'stretch',
        color:"white"
      }}
    >
      {value}
    </Text>
  )

  let formatDate = () => {
    let dateNow = new Date();
    let dateModified = new Date(updatedAt)

    let deltaDate = dateNow.getTime() - dateModified.getTime()
    let newDate = Math.round(deltaDate/1000/60/60/24)
    if(newDate<30){
      return(
        <Text
          style={{
            color:'#ffffff99',
            textAlign:'left',
            alignSelf: 'stretch',
          }}
        >
          Il y a {JSON.stringify(newDate)} jour{newDate>1? "s":""}.
        </Text>
      )
    }else if(newDate>=30&&newDate<365){
      let newMounthFull = newDate/30
      let newMounth = Math.round(newMounthFull)
      return(
        <Text
          style={{
            color:'#ffffff99',
            textAlign:'left',
            alignSelf: 'stretch',
          }}
        >
          Il y a {JSON.stringify(newMounth)} mois.
        </Text>
      )
    }else if(newDate>=365){
      let newYearFull = newDate/365;
      let newYear = Math.round(parseFloat(newYearFull))
      return(
        <Text
          style={{
            color:'#ffffff99',
            textAlign:'left',
            alignSelf: 'stretch',
          }}
        >
          Il y a {JSON.stringify(newYear)} an{newYear>1? "s":""}
        </Text>
      )
    }
  }


  return (
    <ReactNativeModal
      {...props}
      style={{
        flex: 1,
        backgroundColor:"#25004799",
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',
        margin:0
      }}
      animationIn='flipInY'
      animationInTiming={500}
      animationOut='flipOutX'
      animationOutTiming={500}
      useNativeDriver={true}
    >
        
      <ScrollView
        style={{
          width:width,
          height:height,
          flexDirection: 'column',
          marginBottom:0
        }}
        contentContainerStyle={{
          justifyContent: 'flex-start',
          alignItems: 'center',
        }}
      >
      <Image 
          source={{uri:Api+`/static/images/${ShopId}/items/${MobilImg}/org.jpg`}} 
          style={{
            width:width-40,
            height:width-40,
            borderRadius:200
          }} 
        />

        <View
          style={{
            flexDirection: 'column',
            justifyContent: 'flex-start',
            alignItems: 'center',
            width:'90%',
            padding:10,
            backgroundColor:'#ffffff26',
            borderTopStartRadius:200,
            borderBottomRightRadius:200,
            top:-width/25
            
          }}
        >

          <Text 
            style={{
              color:"white",
              fontSize:width/15,
              textAlign:'center'
            }}
          >
            {Name}
          </Text>

          {findType(TypeItem)}

          <View
            style={{
              alignSelf: 'stretch',
            }}
          >
            {
              promotion
              &&
              <Animatable.Text 
                style={{
                  color:"red",
                  position: 'absolute',
                  fontSize:20,
                  fontWeight:'bold',
                  textShadowColor:"#000000",
                  textShadowRadius:10,
                }}
                animation="pulse"
                useNativeDriver={true}
                iterationCount="infinite"
                duration={1000}
              >
                Promotion
              </Animatable.Text>           
            }
            <Animatable.Text 
              style={{
                color:promotion?"#f0c400":"#ffffff",
                alignSelf: 'flex-end',
                textAlign:"right",
                fontSize:20,
                textShadowColor:promotion?'#ff4d4d':"#000000",
                textShadowRadius:20,
              }}
              animation={promotion?"tada":null}
              duration={1000}
              iterationCount="infinite"
              useNativeDriver={true}
              iterationDelay={2000}
            >
              {newFromNum(Price)}.ar
            </Animatable.Text>          
          </View>
          {myText(`Vu ${view} fois.`)}
          {myText(`Publier par ${Sailor}`)}
          {formatDate()}
          {myText(`Telephone: ${Phone}`)}
          {myText(Email)}


          <ModalEdit
            data = {props.data}
          />

        </View>

        <MyDescription
          Description={Description}
        /> 
        
        <View 
          style={{
            margin:10
          }}
        >
          <Button
            title="Back"
            color='#8605ffb0'
            onPress={()=>{
              props.setVisible(false)
            }}
          />        
        </View>

      </ScrollView>
       
    </ReactNativeModal>
  )
}

const MyDescription = (props) => {

  let {
    Description
  } = props

  let descComp = useRef();

  return(
    <Animatable.View 
      style={{
        width:width,
        padding:20,
        
      }}
      ref={descComp}
      useNativeDriver={true}
      animation="fadeIn"
      duration={300}
      delay={200}
    >

      <Text style={{
        color:"#ffffff99",
        marginTop:10,
        borderBottomColor:'white',
        borderBottomWidth:1
      }}>
        Description:
      </Text>  

      <View 
        style={{
          backgroundColor:"#3d3d3d7a"
        }}
      >
        <Text style={{
          color:"#ffffff99",
          padding:20
        }}>
          {Description}
        </Text>        
      </View>
            
    </Animatable.View>
  )
}

const ModalEdit = (props) => {

  let [isVisible,setVisible] = useState(false)

  let {
    data
  } = props;

  let editRef = useRef()

  let handleEdit = () => {
    editRef
      .current
      .swing(500)
      .then(_=>{
        setVisible(true)
      })
  }

  return(
    <View
      style={{
        position: 'absolute',
        bottom:0,
        margin:20,
        right:0,
        zIndex:2
      }}
    >

      <EditModal
        isVisible={isVisible}
        setVisible={setVisible}
        data={data}
      />

      <Animatable.View
        useNativeDriver={true}
        animation='bounceIn'
      >
        <TouchableWithoutFeedback
          onPress={()=>{
            handleEdit()
          }}
        >
          <Animatable.Image
            source={require('./img/0.png')}
            style={{
              height:50,
              width:50
            }}
            useNativeDriver={true}
            ref={editRef}
          />
        </TouchableWithoutFeedback>
      </Animatable.View>
    </View>
  )
}