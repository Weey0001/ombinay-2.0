import 
  React, 
  { 
    useState, 
    useRef, 
    useContext 
  } 
from 'react'
import 
  {
    StyleSheet,
    Text, 
    View, 
    Dimensions,
    TouchableWithoutFeedback,
    ScrollView
  } 
from 'react-native'
import 
  { 
    InputObject,
    InputDesc 
  } 
from './inputcomp/inputObject'
import 
  { 
    StateContext
  } 
from '../../../../../../../context/stateContext'
import ReactNativeModal from 'react-native-modal'
import * as Animatable from 'react-native-animatable';
import axios from "axios";

const {width,height} = Dimensions.get('screen')

export const EditModal = (props) => {

  let {Api,loadItems} = useContext(StateContext)

  let {
    isVisible,
    setVisible,
    data,
  } = props,
  {
    Name,
    Price,
    Description,
    _id
  } = data,
  [name,setName] = useState(Name),
  [price,setPrice] = useState(Price),
  [desc,setDescription] = useState(Description),
  updateItem = useRef(),
  name_ref = useRef(),
  price_ref = useRef(),
  description_ref = useRef(),
  close = useRef()

  let setUpdate = async () => {

    let item = {
      Name:name.trim(),
      Price:price,
      Description:desc.trim()
    }
    try {

      let result = await axios.post(Api+"/items/update/"+_id,item)
      if(result.status===200){
        loadItems(true)
        setVisible(false)        
      }

    } catch (error) {
      alert(error)
    }

  }

  let animbtn = (paramS) => {
    if(paramS !== 'close'){
      updateItem
        .current
        .swing(200)
        .then(end=>{
          if(end.finished){
            setUpdate()
          }
        })      
    }else{
      close
        .current
        .swing(200)
        .then(end=>{
          if(end.finished){
            setVisible(false)
          }
        })
    }

  }

  return (
    <ReactNativeModal
      useNativeDriver={true}
      isVisible={isVisible}
      animationIn='bounceIn'
      animationInTiming={500}
      animationOut='zoomOut'
      animationOutTiming={500}
    >

      <ScrollView>
        <Text style={{
          color:'white',
          fontSize:40,
          textAlign:"center",
        }}>
          Edit
        </Text>

        <View
          style={{
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            width:"100%",
            flexGrow:1
          }}
        >
          <InputObject
            value={name}
            index={1}
            style={styles.inp}
            type="Name:"
            onParentChange={setName}
            ml={false}
            ref={name_ref}
            onSub={()=>{
              price_ref
                .current
                .focus()
            }}
            kb="default"

          />

          <InputObject
            value={`${price}`}
            index={2}
            style={styles.inp}
            type="Price:"
            onParentChange={setPrice}
            ml={false}
            ref={price_ref}
            onSub={()=>{
              description_ref
                .current
                .focus()
            }}
            kb="numeric"

          />
          <Text style={{
            color:"white",
            fontSize:15,
            borderBottomColor:"white",
            borderBottomWidth:1,
            margin:10,
            alignSelf: 'flex-start',
            }}
          >
            Descriptions:
          </Text>

          <ScrollView
            style={{
              backgroundColor:'white',
              width:'100%',
              height:height/3,
              borderRadius:20
            }}
          >
            <InputDesc
              value={desc}
              line={1}
              index={3}
              style={styles.inpdec}
              type="Descriptions:"
              onParentChange={setDescription}
              ml={true}
              ref={description_ref}
              
            />            
          </ScrollView>

    
        </View>      
      </ScrollView>

      <View
        style={{
          alignSelf:"stretch",
          flexDirection: 'row',
          justifyContent: 'space-around',
          alignItems: 'center',
        }}
      >
        <Animatable.View
          useNativeDriver={true}
          animation='bounceIn'
          style={{
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <TouchableWithoutFeedback 
            onPress={()=>{
              animbtn()
            }}
          >
            <Animatable.Text 
              ref={updateItem}
              style={{
                color:"white",
                fontSize:20,
                backgroundColor:'#0049b8ba',
                borderTopLeftRadius:20,
                borderBottomRightRadius:20,
                padding:6
              }}
              useNativeDriver={true}
            >
              Update
            </Animatable.Text>
          </TouchableWithoutFeedback>
        </Animatable.View>   

        <Animatable.View
          useNativeDriver={true}
          animation='bounceIn'
          style={{
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <TouchableWithoutFeedback 
            onPress={()=>{
              animbtn("close")
            }}
          >
            <Animatable.Text 
              ref={close}
              style={{
                color:"white",
                fontSize:20,
                backgroundColor:'#5900b8ba',
                borderTopLeftRadius:20,
                borderBottomRightRadius:20,
                padding:6
              }}
              useNativeDriver={true}
            >
              Fermer
            </Animatable.Text>
          </TouchableWithoutFeedback>
        </Animatable.View>   
      </View>


    </ReactNativeModal>
  )
}

const styles = StyleSheet.create({
  inp:{

    backgroundColor:'white',
    borderRadius:10,
    textAlign:'center',
    width:"100%"

  },
  inpdec:{
    backgroundColor:"white",
    borderRadius:10,
    width:"100%"
  }
});
