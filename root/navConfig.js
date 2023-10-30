import { createAppContainer } from "react-navigation"
import { createStackNavigator } from "react-navigation-stack";
import SailorPage from './sailorPage/SailorPage';

const StackSailor = createStackNavigator(
  {    
    Sailor:SailorPage
  },
  {
    initialRouteName:"Sailor",
    defaultNavigationOptions:{
      header:null
    }  
  }
)

export default  createAppContainer(StackSailor)

