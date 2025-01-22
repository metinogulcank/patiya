import { 
  View, Text, Image, TextInput, StyleSheet, ScrollView, 
  TouchableOpacity, Pressable, ToastAndroid 
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { useNavigation } from 'expo-router';
import boneimg from './../../assets/images/bone.png';
import Colors from './../../constants/Colors';
import { Picker } from '@react-native-picker/picker';
import { collection, addDoc, getDocs } from 'firebase/firestore';
import { db } from '../../config/FirebaseConfig';
import * as ImagePicker from 'expo-image-picker';
import { useUser } from '@clerk/clerk-expo';

export default function AddNewPet() {
  const navigation = useNavigation();
  const [formData, setFormData] = useState({ category: 'Dogs', sex: 'Male' });
  const [gender, setGender] = useState();
  const [categoryList, setCategoryList] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState();
  const [image, setImage] = useState();
  const {user} = useUser();

  useEffect(() => {
    navigation.setOptions({ headerTitle: 'Yeni Hayvan Ekle' });
    GetCategories();
  }, []);

  const GetCategories = async () => {
    setCategoryList([]);
    const snapshot = await getDocs(collection(db, 'Categories'));
    snapshot.forEach((doc) => {
      setCategoryList((categoryList) => [...categoryList, doc.data()]);
    });
  };

  const handleInputChange = (fieldName, fieldValue) => {
    setFormData((prev) => ({
      ...prev,
      [fieldName]: fieldValue,
    }));
  };

  const imagePicker = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: 'images',
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const onSubmit = async () => {
    if (Object.keys(formData).length != 8 || !image) {
      ToastAndroid.show('Lütfen tüm alanları doldurun ve bir fotoğraf ekleyin!', ToastAndroid.SHORT);
      return;
    }

    const imageUrl = await uploadImageToCloudinary();
    if (imageUrl) {
      await saveFormData(imageUrl);
    }
  };

  const uploadImageToCloudinary = async () => {
    const data = new FormData();
    data.append('file', { uri: image, name: 'photo.jpg', type: 'image/jpeg' });
    data.append('upload_preset', 'pet-adopt'); // Cloudinary'den aldığınız upload preset
    data.append('cloud_name', 'do2bcwoyh'); // Cloudinary'den aldığınız cloud name

    try {
      const response = await fetch('https://api.cloudinary.com/v1_1/do2bcwoyh/image/upload', {
        method: 'POST',
        body: data,
      });
      const result = await response.json();
      console.log('Cloudinary Upload URL:', result.secure_url);
      return result.secure_url; // Cloudinary'den dönen URL
    } catch (error) {
      console.error('Cloudinary Upload Error:', error);
      ToastAndroid.show('Fotoğraf yüklenirken bir hata oluştu.', ToastAndroid.SHORT);
      return null;
    }
  };

  const saveFormData = async (imageUrl) => {
    try {
      const docId = Date.now().toString();
      await addDoc(collection(db, 'Pets'), {
        ...formData,
        imageUrl: imageUrl, // Fotoğraf URL'sini Firestore'a kaydediyoruz
        username: user?.fullName,
        email:user?.primaryEmailAddress?.emailAddress,
        userImg: user?.imageUrl,
        id:docId
      });
      ToastAndroid.show('Hayvan başarıyla eklendi!', ToastAndroid.SHORT);
      navigation.goBack();
    } catch (error) {
      console.error('Firestore Save Error:', error);
      ToastAndroid.show('Hayvan bilgileri kaydedilirken bir hata oluştu.', ToastAndroid.SHORT);
    }
  };

  return (
    <ScrollView style={{ padding: 20 }}>
      <Text style={{ fontFamily: 'outfit-medium', fontSize: 20 }}>Sahiplendirmek İçin Yeni Hayvan Ekle</Text>

      <Pressable onPress={imagePicker}>
        {!image ? (
          <Image
            source={boneimg}
            style={{
              width: 100,
              height: 100,
              borderRadius: 15,
              borderWidth: 1,
              borderColor: Colors.PRIMARY,
            }}
          />
        ) : (
          <Image
            source={{ uri: image }}
            style={{
              width: 100,
              height: 100,
              borderRadius: 15,
            }}
          />
        )}
      </Pressable>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Hayvanın Adı*</Text>
        <TextInput style={styles.input} onChangeText={(value) => handleInputChange('name', value)} />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Hayvanın Irkı*</Text>
        <TextInput style={styles.input} onChangeText={(value) => handleInputChange('breed', value)} />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Hayvanın Yaşı*</Text>
        <TextInput
          style={styles.input}
          keyboardType="number-pad"
          onChangeText={(value) => handleInputChange('age', value)}
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Hayvanın Cinsiyeti*</Text>
        <Picker
          selectedValue={gender}
          style={styles.input}
          onValueChange={(itemValue) => setGender(itemValue)}
        >
          <Picker.Item label="Erkek" value="male" />
          <Picker.Item label="Dişi" value="female" />
        </Picker>
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Kategori*</Text>
        <Picker
          selectedValue={selectedCategory}
          style={styles.input}
          onValueChange={(itemValue) => {
            setSelectedCategory(itemValue);
            handleInputChange('category', itemValue);
          }}
        >
          {categoryList.map((category, index) => (
            <Picker.Item key={index} label={category.name} value={category.name} />
          ))}
        </Picker>
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Hayvanın Ağırlığı*</Text>
        <TextInput
          style={styles.input}
          keyboardType="number-pad"
          onChangeText={(value) => handleInputChange('weight', value)}
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Şehriniz*</Text>
        <TextInput style={styles.input} onChangeText={(value) => handleInputChange('address', value)} />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Hayvan Hakkında*</Text>
        <TextInput
          style={styles.input}
          onChangeText={(value) => handleInputChange('about', value)}
          numberOfLines={5}
          multiline
        />
      </View>

      <TouchableOpacity style={styles.button} onPress={onSubmit}>
        <Text style={{ fontFamily: 'outfit-medium', textAlign: 'center' }}>Gönder</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  inputContainer: {
    marginVertical: 5,
  },
  input: {
    padding: 5,
    backgroundColor: Colors.WHITE,
    borderRadius: 7,
    height: 50,
    fontFamily: 'outfit-medium',
  },
  label: {
    marginVertical: 5,
    fontFamily: 'outfit-medium',
  },
  button: {
    padding: 15,
    backgroundColor: Colors.PRIMARY,
    borderRadius: 7,
    marginVertical: 10,
    marginBottom: 30,
  },
});
