import 
  React,
  { 
    useContext, 
    useEffect, 
    useState
  } 
from 'react'
import * as Animatable from "react-native-animatable";
import { StateContext } from '../../../../context/stateContext';
import Axios from 'axios';
import { MyFlatMenu } from './flatlistCat/flatlist';
import { MyFlatlistItem } from './flatlistItem/flatlistItem';

export const Myflatlist = (props) => {
  let {Api,types,load,isAll} = useContext(StateContext)

  let {
    data,
    isCategorie,
    setCategorie,
    setTitle,
    isSearch,
    setSearch,
    headerItem,
  } = props
  let [Data,setData] = useState(null)
  let [cat,setCat] = isCategorie? useState(cat):useState(null)
  let [isList,setList] = useState(false)

  useEffect(() => {

    if(cat&&!isSearch){
      itemsByType()    
    }

  },[load])

  let itemsByType = async () => {

    try {

      let result = await Axios.get(Api + `/items/foundItemSpeType/${cat}`)
      setData(result.data)

    } catch (error) {
      alert(error)
    }

  }

  let onCat = async (someCatId) => {
    try {

      let result = await Axios.get(Api+"/items/foundItemSpeType/"+`${someCatId}`)
      setData(result.data)
      setCat(someCatId)
      setCategorie(true)
    
    } catch (error) {
      alert(error)
    }

  }  

  let filterItems = () => {
    let AllItems = (isSearch||isAll)? data:Data;
    return AllItems
  }

  return (
    <Animatable.View
      useNativeDriver={true}
      animation='bounceIn'
      style={{
        flex: 20,
        borderRadius:10,
        margin:5,
        backgroundColor:'#ffffff29',
        elevation:2,
        borderWidth:1,
        borderColor:"#ffffff63"
      }}
    >
      {
        !isCategorie
        &&  
        <MyFlatMenu
          data={types.sort((a, b) => a.TypeItem.localeCompare(b.TypeItem))}
          onCat={onCat}
          setTitle={setTitle}
          cat={cat}
          setSearch={setSearch}
          listHeader={headerItem}
        /> 
      }
      {
        isCategorie
        &&
        <MyFlatlistItem
          data={filterItems()}
          onCat={onCat}
          isList={isList}
          listHeader={headerItem}
          setList={setList}
        />          
      }    
      
    </Animatable.View>
  )
}

