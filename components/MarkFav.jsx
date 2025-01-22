import { View, Text, Pressable } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Ionicons } from '@expo/vector-icons'
import Shared from './../Shared/Shared'
import { useUser } from '@clerk/clerk-expo'

export default function MarkFav({pet,color='black'}) {
    const {user} = useUser();
    const [favList,setFavList] = useState();
    useEffect(()=>{
        user&&GetFav();
    },[user])

    const GetFav = async()=>{
        const result = await Shared.GetFavList(user);
        console.log(result);
        setFavList(result?.favorites ? result?.favorites:[])
    }
    const AddToFav = async () => {
        try {
            const updatedFavList = [...favList, pet?.id]; // Yeni favori listesi
            setFavList(updatedFavList); // Durumu hemen güncelle
            await Shared.UpdateFav(user, updatedFavList); // Firebase'de güncelle
        } catch (error) {
            console.error("Error adding to favorites: ", error);
        }
    };
    const removeFromFav = async()=>{
        const favResult = favList.filter(item=>item!=pet.id);
        await Shared.UpdateFav(user,favResult);
        GetFav();
    }
  return (
    <View>
        {favList?.includes(pet.id) ? 
        <Pressable onPress={removeFromFav}> 
          <Ionicons name='heart' size={30} color='red'/>
        </Pressable> :
        <Pressable onPress={()=>AddToFav()}>
          <Ionicons name='heart-outline' size={30} color={color}/>
        </Pressable>
        }
    </View>
  )
}