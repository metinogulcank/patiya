import { View, Text, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import Category from './Category'
import { collection, getDocs, query, where } from 'firebase/firestore'
import { db } from '../../config/FirebaseConfig'
import PetListItem from './PetListItem'

export default function PetListByCategory() {

  const [petList, setPetList] = useState([]);
  const [loader, setLoader] = useState(false)
  /**
   * 
   * @param {*} category
   */
  
  useEffect(()=>{
    GetPetList('Kuş')
  },[])

  const GetPetList=async(category)=>{
    setPetList([]);
    const q=query(collection(db,'Pets'),where('category','==',category?category:'Balık'))
    const querySnapshot = await getDocs(q);

    querySnapshot.forEach(doc=>{
      setPetList(petList=>[...petList,doc.data()])
    })
    setLoader(false)
  }
  return (
    <View>
      <Category category={(value)=>GetPetList(value)}/>
        <FlatList 
        data={petList}
        style={{
          marginTop:10,
          marginHorizontal:5
        }}
        horizontal={true}
        renderItem={({item,index})=>(
          <PetListItem pet={item}/>
        )}

        />
    </View>
  )
}