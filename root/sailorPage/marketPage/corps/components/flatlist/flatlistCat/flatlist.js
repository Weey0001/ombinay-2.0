import React from 'react'
import {FlatList} from 'react-native';
import { Cat } from './CatItem/Cat';

export const MyFlatMenu = (props) => {

  let {
    data,
    onCat,
    setTitle,
    cat,
    setSearch,
    listHeader
  } = props

  return (
    <FlatList
      data={data}
      keyExtractor={(item,index)=>item._id}
      contentContainerStyle={{
        justifyContent: 'center',
        alignItems: 'center',
        paddingBottom:35
      }}
      
      renderItem={({item,index})=>

        <Cat
          data={item}
          index={index}
          onCat={onCat}
          setTitle={setTitle}
          cat={cat}
          setSearch={setSearch}
        />
      }
      ListHeaderComponent={()=>{
        return listHeader()
      }}
    />
  )
}
