import { View, Text, Image, Pressable } from 'react-native'
import login from './../../assets/images/login.png'
import Colors from './../../constants/Colors'
import * as WebBrowser from 'expo-web-browser'
import React, { useCallback } from 'react'
import { useOAuth } from '@clerk/clerk-expo'
import * as Linking from 'expo-linking'

export const useWarmUpBrowser = () => {
  React.useEffect(() => {
    
    void WebBrowser.warmUpAsync()
    return () => {
      void WebBrowser.coolDownAsync()
    }
  }, [])
}

WebBrowser.maybeCompleteAuthSession()

export default function LoginScreen() {

  useWarmUpBrowser()
  const { startOAuthFlow } = useOAuth({ strategy: 'oauth_google' })

  const onPress = useCallback(async () => {
    try {
      const { createdSessionId, signIn, signUp, setActive } = await startOAuthFlow({
        redirectUrl: Linking.createURL('/(tabs)/home', { scheme: 'myapp' }),
      })

      if (createdSessionId) {
        
      } else {
        
      }
    } catch (err) {
      
      console.error(JSON.stringify(err, null, 2))
    }
  }, [])

  return (
    <View style={{
      backgroundColor: Colors.WHITE,
      height: '100%'
    }}>
      <Image source={login}
      style={{
        width:'100%',
        height:500
      }}
      />
      <View style={{
        padding:20,
        display:'flex',
        alignItems: 'center'
      }}>
        <Text style={{
          fontFamily: 'outfit-bold',
          fontSize:30,
          textAlign:'center'
        }}>
          Yeni Arkadaş Edinmeye Hazır Mısın?
        </Text>
        <Text style={{
          fontFamily:'outfit',
          fontSize:18,
          textAlign:'center',
          color: Colors.GRAY
        }}>Şimdi Beğendiğin Hayvanı Sahiplen ve Hayatlarını Tekrardan Güzelleştir...</Text>

        <Pressable
        onPress={onPress}
        style={{
          padding:14,
          marginTop: 60,
          backgroundColor:Colors.PRIMARY,
          width: '100%',
          borderRadius: 14
        }}>
          <Text style={{
            fontFamily: 'outfit-medium',
            fontSize: 20,
            textAlign: 'center'
          }}>
            Hadi Başlayalım
          </Text>
        </Pressable>
      </View>
    </View>
  )
}