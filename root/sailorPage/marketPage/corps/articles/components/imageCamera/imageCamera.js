import React, { useContext,useEffect, useState } from 'react'
import Modal from 'react-native-modal'
import { TabButton } from './components/tabBtn';
import { FormAdd } from './components/formAdd';

export const ModalCamera = (props) => {

  let {isVisible,setVisible} = props;
  let [isUri,setUri] = useState(false)

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
      }}
      animationOut='flipOutY'
      animationOutTiming={400}
    >
      
      <FormAdd
        isUri={isUri}
        setUri={setUri}
        close={()=>{setVisible(false)}}
      />

      <TabButton
        setUri={setUri}
      /> 

    </Modal>

  )
}
