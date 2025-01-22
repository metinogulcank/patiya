import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native'
import React, { useEffect } from 'react'
import { useLocalSearchParams, useNavigation, useRouter } from 'expo-router'
import PetInfo from '../../components/PetDetails/PetInfo';
import PetSubInfo from '../../components/PetDetails/PetSubInfo';
import AboutPet from '../../components/PetDetails/AboutPet';
import OwnerInfo from '../../components/PetDetails/OwnerInfo';
import Colors from '../../constants/Colors';
import { useUser } from '@clerk/clerk-expo';
import { collection, doc, getDocs, query, setDoc, where } from 'firebase/firestore';
import { db } from '../../config/FirebaseConfig';

export default function PetDetails() {
    const pet =useLocalSearchParams();
    const navigation = useNavigation();
    const {user} = useUser();
    const router = useRouter()
    useEffect(()=>{
        navigation.setOptions({
            headerTransparent: true,
            headerTitle: ''
        })
    })
    const sanitizeObject = (obj) => {
        const sanitized = {};
        Object.entries(obj || {}).forEach(([key, value]) => {
            if (value !== undefined) {
                sanitized[key] = value;
            }
        });
        return sanitized;
    };
    
    const InitiateChat = async () => {
        try {
            console.log('User Data:', user);
            console.log('Pet Data:', pet);
    
            const userEmail = user?.primaryEmailAddress?.emailAddress || 'unknown@example.com';
            const petEmail = pet?.email || 'unknown@example.com';
    
            if (!userEmail || !petEmail) {
                console.error('User email or Pet email is missing.');
                return;
            }
    
            const docId1 = `${userEmail}_${petEmail}`;
            const docId2 = `${petEmail}_${userEmail}`;
    
            const q = query(collection(db, 'Chat'), where('id', 'in', [docId1, docId2]));
            const querySnapshot = await getDocs(q);
    
            if (querySnapshot.docs.length === 0) {
                const sanitizedUser = sanitizeObject({
                    email: user?.primaryEmailAddress?.emailAddress,
                    imageUrl: user?.imageUrl, // Kullanıcının resmi
                    name: user?.fullName,
                });
    
                const sanitizedPet = sanitizeObject({
                    email: pet?.email,
                    imageUrl: pet?.userImg, // Hayvanın resmi (Firestore'de `userImage` alanı var)
                    name: pet?.username,
                });
    
                console.log('Sanitized User:', sanitizedUser);
                console.log('Sanitized Pet:', sanitizedPet);
    
                await setDoc(doc(db, 'Chat', docId1), {
                    id: docId1,
                    users: [sanitizedUser, sanitizedPet],
                    userIds: [user?.primaryEmailAddress?.emailAddress,pet?.email]
                });
    
                router.push({
                    pathname: '/chat',
                    params: { id: docId1 },
                });
            } else {
                console.log('Chat already exists.');
            }
        } catch (error) {
            console.error('InitiateChat error:', error);
        }
    };
    
    
  return (
    <View>
        <ScrollView>
            <PetInfo pet={pet}/>
            <PetSubInfo pet={pet}/>
            <AboutPet pet={pet}/>
            <OwnerInfo pet={pet}/>
            <View style={styles?.bottomContainer}>
                <TouchableOpacity onPress={InitiateChat} style={styles?.adoptBtn}>
                    
                    <Text style={{
                        textAlign:'center',
                        fontFamily:'outfit-medium',
                        fontSize:20
                    }}>Beni Sahiplen</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
    adoptBtn:{
        padding:15,
        backgroundColor:Colors.PRIMARY
    },
    bottomContainer:{
        position:'fixed',
        marginTop:20,
        width:'100%',
        bottom:0
    }
})