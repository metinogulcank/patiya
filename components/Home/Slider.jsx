import { View, FlatList, Image, StyleSheet, Dimensions } from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from './../../config/FirebaseConfig';

export default function Slider() {
    const [sliderList, setSliderList] = useState([]);
    const flatListRef = useRef(null); // FlatList için referans
    const currentIndex = useRef(0); // Şu anki slider indexini tutar

    useEffect(() => {
        GetSliders();
    }, []);

    useEffect(() => {
        if (sliderList.length > 0) {
            const interval = setInterval(() => {
                autoScroll();
            }, 10000); // Her 10 saniyede bir kaydır
            return () => clearInterval(interval); // Bileşen unmount olduğunda temizle
        }
    }, [sliderList]);

    const GetSliders = async () => {
        try {
            const snapshot = await getDocs(collection(db, 'Sliders'));
            const sliders = snapshot.docs.map(doc => doc.data());
            setSliderList(sliders);
        } catch (error) {
            console.error('Slider verileri alınırken hata oluştu:', error);
        }
    };

    const autoScroll = () => {
        if (flatListRef.current) {
            currentIndex.current = (currentIndex.current + 1) % sliderList.length; // Sıradaki indexe geç, sona ulaşıldığında başa dön
            flatListRef.current.scrollToIndex({
                index: currentIndex.current,
                animated: true, // Kaydırma animasyonu
            });
        }
    };

    return (
        <View style={{ marginTop: 15 }}>
            <FlatList
                ref={flatListRef} // FlatList'e referans ver
                data={sliderList}
                horizontal
                showsHorizontalScrollIndicator={false}
                pagingEnabled // Sayfa benzeri kaydırma
                renderItem={({ item }) => (
                    <View>
                        <Image
                            source={{ uri: item?.imageUrl }}
                            style={styles.sliderImage}
                        />
                    </View>
                )}
                keyExtractor={(item, index) => index.toString()}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    sliderImage: {
        width: Dimensions.get('screen').width * 0.9,
        height: 160,
        borderRadius: 15,
        marginHorizontal: 0, // Görsel arasına boşluk
    },
});
