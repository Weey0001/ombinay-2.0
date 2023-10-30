import React, { useContext,useEffect, useState} from 'react'
import Modal from 'react-native-modal'
import { BackBtn } from './component/backbtn'
import { MyFlatlist } from './component/flatlist/myFlatlist'
import { InptCat } from './component/inptCat/inptCat'

export const ModalAddCat = (props) => {

  let {isVisible,setVisible} = props

  return (

    <Modal
      isVisible={isVisible}
      useNativeDriver={true}
      animationIn='flipInY'
      animationInTiming={500}
      style={{
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor:'#ba52ffc4',
        margin:0
      }}
      animationOut='flipOutY'
      animationOutTiming={300}
      
    >

      <MyFlatlist/>
      <InptCat/>

      <BackBtn
        source={require('./component/img/fermer.png')}
        onPress={()=>{
          setVisible(false)
        }}
      />

    </Modal>

  )
}

