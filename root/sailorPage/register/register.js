import React,{useState} from 'react'
import {
  View,
  Text
} from 'react-native';
import { SignUp } from './components/signUp/signUp';
import { LogIn } from './components/logIn/logIn';

export const Register = (props) => {

  let [isLogIn,setLogIn] = useState(false)

  return (
    <View style={{
      flex: 1,
    }}>

      {
        !isLogIn
        &&
        <SignUp
          setLogIn={setLogIn}
        />
      }
      {
        isLogIn
        &&
        <LogIn
         setLogIn={setLogIn}
        />
      }

      
    </View>
  )
}
