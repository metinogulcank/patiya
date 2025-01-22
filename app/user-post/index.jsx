import { View, Text, FlatList, Pressable, StyleSheet, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useNavigation } from 'expo-router'
import { useUser } from '@clerk/clerk-expo';
import { collection, deleteDoc, doc, getDocs, query, where } from 'firebase/firestore';
import { db } from '../../config/FirebaseConfig';
import PetListItem from "../../components/Home/PetListItem"
import Colors from '../../constants/Colors';

export default function UserPost() {
    const navigation = useNavigation();
    const { user } = useUser();
    const [userPostList, setUserPostList] = useState([]);
    const [loader, setLoader] = useState(false);

    useEffect(() => {
        navigation.setOptions({
            headerTitle: 'Listelemelerim'
        })
        user && GetUserPost();
    }, [user])

    const GetUserPost = async () => {
        setLoader(true);
        
        // Eski verileri temizle
        setUserPostList([]);

        const q = query(collection(db, 'Pets'), where('email', '==', user?.primaryEmailAddress?.emailAddress));
        const querySnapshot = await getDocs(q);

        // Verileri listeye ekle
        const posts = [];
        querySnapshot.forEach((doc) => {
            posts.push({ ...doc.data(), id: doc.id }); // id'yi de ekleyin
        });

        // Yeni veriyi ekleyin
        setUserPostList(posts);
        setLoader(false);
    }

    const onDeletePost = (docId) => {
        Alert.alert("İlanı Kaldırmak İstediğinize Emin Misiniz?", "Bu işlem geri alınamaz", [
            {
                text: 'İptal',
                onPress: () => console.log('İptale Tıklandı'),
                style: 'cancel'
            },
            {
                text: 'Kaldır',
                onPress: () => DeletePost(docId),
            }
        ]);
    }

    const DeletePost = async (docId) => {
        try {
            // Veriyi sil
            await deleteDoc(doc(db, 'Pets', docId));
            console.log('Silindi:', docId);

            // Silme işleminden sonra listeyi güncelle
            GetUserPost(); // Veriyi güncellemek için tekrar al
        } catch (error) {
            console.error("Silme hatası:", error);
            Alert.alert("Bir hata oluştu", "İlan silinemedi");
        }
    }

    return (
        <View style={{ padding: 20 }}>
            <Text style={{ fontFamily: 'outfit-medium', fontSize: 30 }}>İlanlar</Text>

            <FlatList 
                data={userPostList}
                numColumns={2}
                refreshing={loader}
                onRefresh={GetUserPost}
                renderItem={({ item, index }) => (
                    <View>
                        <PetListItem pet={item} key={index} />
                        <Pressable onPress={() => onDeletePost(item?.id)} style={styles.deleteButton}>
                            <Text style={{ fontFamily: 'outfit', textAlign: 'center' }}>Kaldır</Text>
                        </Pressable>
                    </View>
                )}
            />

            {userPostList?.length == 0 && <Text>İlan Bulunamadı</Text>}
        </View>
    )
}

const styles = StyleSheet.create({
    deleteButton: {
        backgroundColor: Colors.LIGHT_SECONDARY,
        padding: 5,
        borderRadius: 7,
        marginTop: 5,
        marginRight: 10
    }
})
