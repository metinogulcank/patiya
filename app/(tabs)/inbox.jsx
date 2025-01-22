import { View, Text, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useUser } from '@clerk/clerk-expo'
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../../config/FirebaseConfig';
import UserItem from '../../components/Inbox/UserItem';

export default function Inbox() {
  const {user} = useUser();
  const [userList, setUserList] = useState([])

  useEffect(()=>{
    user&&GetUserList();
  },[user])

  const GetUserList =async()=>{
    const q=query(collection(db,'Chat'),
    where('userIds','array-contains',user?.primaryEmailAddress?.emailAddress));

    const querySnapshot = await getDocs(q);

    querySnapshot.forEach(doc=>{
      setUserList(prevList => [...prevList,doc.data()])
    })
  }

  const MapOtherUserList = () => {
    const list = [];
    userList.forEach((record) => {
      const otherUser = record.users?.filter(user => user?.email!=user?.primaryEmailAddress?.emailAddress)
      const result = {
        docId: record.id,
        ...otherUser[0]
      }
      list.push(result)
    })
    return list;
  }
  return (
    <View style={{
      padding:20,
      marginTop:20
    }}>
      <Text style={{
        fontFamily:'outfit-medium',
        fontSize:30
      }}>Gelen Kutusu</Text>

      <FlatList 
        data={MapOtherUserList()}
        style={{marginTop:20}}
        renderItem={({item,index})=>(
          <UserItem userInfo={item} key={index}/>
        )}
      />
    </View>
  )
}