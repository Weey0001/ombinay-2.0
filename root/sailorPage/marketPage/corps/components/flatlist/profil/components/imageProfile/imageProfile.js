import React, { PureComponent } from 'react'
import { Text, View, Dimensions,Button,TouchableWithoutFeedback } from 'react-native'
import * as Animatable from 'react-native-animatable';

const {width,height} = Dimensions.get('screen')

export default class ImageProfile extends PureComponent {

  appPhoto = (useFor) => {
    useFor==="users"? 
      this.appProfil(useFor)
      :this.appCover(useFor)

  }

  appProfil=(useFor)=>{
    this
      .appP
      .bounceIn(500)
      .then(end=>{
        if(end.finished){
          this.props.takePhoto(useFor)
        }
      })
  }

  appCover = (useFor) => {
    this
      .appC
      .zoomIn(500)
      .then(end=>{
        if(end.finished){
          this.props.takePhoto(useFor)
        }
      })
  }
  
  render() {
    let {source,source0,info} = this.props
    let {
      pseudo
    } = info;
    console.log(source0)
    return (
      <Animatable.View
        style={{
          alignSelf: 'stretch',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          marginBottom:width/10,
        }}
      > 
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'flex-start',
            alignItems: 'center',
            width:"100%",
            height:width/4*2,
          }}
        >
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              width:"100%"
            }}
          >

            <Animatable.Image
              useNativeDriver={true}
              source={source0}
              animation='bounceIn'
              duration={500}
              delay={500}
              style={{
                width:width-width/10,
                height:width/4*2,
                borderRadius:10,
                borderColor:"#ffffff57",
                borderWidth:1,
                marginTop:width/25
              }}
            />

            <View
              style={{
                position: 'absolute',
                bottom:0,
                right:width/30,
                margin:10,
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <Animatable.View
                useNativeDriver={true}
                ref={ref=>this.appC=ref}
              >
                <TouchableWithoutFeedback
                  onPress={()=>{
                    this.appPhoto("cover")
                  }}
                >

                  <Animatable.Image
                    source={require('./img/0.png')}
                    ref={ref=>this.appP=ref}
                    style={{
                      width:width/6,
                      height:width/6,
                    }}
                  />

                </TouchableWithoutFeedback>             
              </Animatable.View>
            </View>

          </View>
        </View>

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'flex-start',
            alignItems: 'center',
            width:"100%",
            // top:-width/5,
            // backgroundColor:'blue',
            position: 'absolute',
            bottom:-width/10
          }}
        >
          <View>

            <Animatable.Image
              useNativeDriver={true}
              source={source}
              style={{
                width:width/4,
                height:width/4,
                margin:10,
                borderRadius:50,
                alignSelf: 'flex-start',
                left:10,
                borderWidth:2,
                borderColor:"#fcfcfcde"

              }}
              animation='bounceIn'
              duration={500}
              delay={800}

            />

            <View
              style={{
                position: 'absolute',
                bottom:5,
                margin:10,
                justifyContent: 'center',
                alignItems: 'center',
                width:width/4,
                left:10
              }}
            >
              <View>
                <TouchableWithoutFeedback
                  onPress={()=>{
                    this.appPhoto('users')
                  }}
                >

                  <Animatable.Image
                    source={require('./img/0.png')}
                    ref={ref=>this.appP=ref}
                    style={{
                      width:width/15,
                      height:width/15,
                    }}
                  />

                </TouchableWithoutFeedback>             
              </View>
            </View>

          </View>
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'flex-start',
            }}
          >
            <Text style={{
              color:"#fcfcfca8",
              marginLeft:10,
              textShadowColor:'black',
              textShadowRadius:10,
              borderBottomWidth:1,
              borderBottomColor:'#fcfcfca8',
              
            }}>
              pseudo:
            </Text>
            <Text
              style={{
                color:'white',
                textShadowColor:'black',
                textShadowRadius:20,
                fontSize:25,
                marginLeft:10
              }}
            >
              {pseudo}
            </Text>
          </View>
        </View>
      </Animatable.View>
    )
  }
}
