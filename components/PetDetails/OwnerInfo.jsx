import { View, Text, Image, StyleSheet } from 'react-native'
import React from 'react'
import Colors from '../../constants/Colors'
import { Ionicons } from '@expo/vector-icons'

export default function OwnerInfo({pet}) {
  return (
    <View style={styles.container}>
        <View style={{
            display:'flex',
            flexDirection:'row',
            gap:20
        }}>
            <Image source={{uri: pet?.userImg}} style={{
                width:50,
                height:50,
                borderRadius:99
            }}/>
            <View>
                <Text style={{
                    fontFamily:'outfit-medium',
                    fontSize:17
                }}>{pet?.username}</Text>
                <Text style={{
                    fontFamily:'outfit',
                    color:Colors.GRAY
                }}>İlan Sahibi</Text>
            </View>
        </View>
      <Ionicons name='send-sharp' size={24} color={Colors.PRIMARY} />
    </View>
  )
}

const styles = StyleSheet.create({
    container:{
        marginHorizontal:20,
        paddingHorizontal:20,
        display:'flex',
        flexDirection:'row',
        alignItems:'center',
        height:70,
        gap:20,
        borderWidth:1,
        borderRadius:15,
        padding:20,
        backgroundColor:Colors.WHITE,
        borderColor:Colors.PRIMARY,
        justifyContent:'space-between'
    }
})