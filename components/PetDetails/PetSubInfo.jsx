import { View, Text, Image } from 'react-native'
import React from 'react'
import calendarimg from './../../assets/images/calendar.png'
import boneimg from './../../assets/images/bone.png'
import seximg from './../../assets/images/sex.png'
import weightimg from './../../assets/images/weight.png'
import Colors from '../../constants/Colors'
import PetSubInfoCard from './PetSubInfoCard'

export default function PetSubInfo({pet}) {
  return (
    <View style={{
        paddingHorizontal:20
    }}>
      <View style={{
        display:'flex',
        flexDirection:'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
      }}>
        <PetSubInfoCard icon={calendarimg} 
        title={'Yaş'}
        value={pet?.age}
        />
        <PetSubInfoCard icon={boneimg} 
        title={'Irk'}
        value={pet?.breed}
        />
      </View>
      <View style={{
        display:'flex',
        flexDirection:'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
      }}>
        <PetSubInfoCard icon={seximg} 
        title={'Cinsiyet'}
        value={pet?.sex}
        />
        <PetSubInfoCard icon={weightimg} 
        title={'Ağırlık'}
        value={pet?.weight + ' KG'}
        />
      </View>
    </View>
  )
}