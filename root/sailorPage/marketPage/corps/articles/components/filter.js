import React, { useContext,useState } from 'react'
import ReactNativeModal from 'react-native-modal'
import { 
    Text, 
    Picker,
    View,
    StyleSheet,
    TouchableOpacity
  } from 'react-native'

import { StateContext } from '../../../../context/stateContext';

export const Filter = (props) => {
 
  let {reorganize} = props;
  let [filtreMode,setMode] = useState("1")

  let filtre = (fil) => {
    reorganize(fil)
    setMode(fil)
  }

  return (
    <ReactNativeModal
    
      {...props}
      animationIn="flipInX"
      animationInTiming={500}
      animationOut="flipOutY"
      animationOutTiming={500}
      useNativeDriver={true}
      style={{
        borderColor:'#ffffff8c',
        borderWidth:3,
        backgroundColor:'#5e5e5e',
        borderRadius:20
      }}
    >
      <Text
        style={{
          color:"white",
          fontSize:30,
          textAlign:'center',
          marginBottom: 4,
        }}
      >
        Filtre
      </Text>

      <View style={{
        flexGrow:1,
        backgroundColor:'#00000073',
        flexDirection: 'column',
        justifyContent: 'center',
        borderBottomLeftRadius:20,
        borderBottomRightRadius:20
      }}>

        <Text style={styles.text}>
          Ordre:
        </Text>

        <View style={styles.pikerView}>
          <Picker
            selectedValue={filtreMode}
            style={
              {
                color:'white',
              }
            }
            onValueChange={
              (itemValue, itemIndex) =>
                {
                  filtre(itemValue)
                }
            }
            mode="dialog"
            enabled={true}

          >
            <Picker.Item 
              label="a-z"
              value={"1"}
            />

            <Picker.Item 
              label="z-a"
              value={"2"}
            />

            <Picker.Item 
              label="Prix Croissant"
              value={"3"}
            />

            <Picker.Item 
              label="Prix Decroissant"
              value={"4"}
            />

            <Picker.Item 
              label="Date Croissant"
              value={"5"}
            />

            <Picker.Item 
              label="Date decroissant"
              value={"6"}
            />

            <Picker.Item 
              label="promotions"
              value={"7"}
            />

          </Picker>
        </View>
      </View>

      <View style={{
        width:"100%",
        position: 'absolute',
        bottom:10,
        
      }}>
        <TouchableOpacity 
          style={{
            backgroundColor:"#36a1ce8f",
            borderRadius:20,
            alignSelf: 'center',
            padding:5,
            elevation:2
          }} 
          onPress={()=>{
            props.setFiltre(false)
          }} 
        >
          <Text style={{
            color:'#ffffff',
            fontSize:20,
            textShadowColor:"black",
            textShadowRadius:2
            
          }}>
            Valider
          </Text>
        </TouchableOpacity>
      </View>
      
    </ReactNativeModal>
  )
}

const styles = StyleSheet.create({
  pikerView:{           
    backgroundColor:'#000000',
    marginBottom:5,
    borderRadius:20,
    margin:10,
    borderColor:'#ffffff8c',
    borderWidth:2
  },
  text:{
    color:"#ffffff",
    fontSize:20,
    textAlign:'center'
  }
});