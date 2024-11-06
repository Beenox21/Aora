import { Text, View , ScrollView, Image} from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Collapsible } from '@/components/Collapsible'
import { Link } from 'expo-router'
import {images} from '../constants'
import CustomButton from '@/components/customButton'
import { StatusBar } from 'expo-status-bar'
import { Redirect,router } from 'expo-router'
import { useGlobalContext } from '@/context/GlobalProvider'


const index = () => {
    const {isLoading,isLoggedIn} = useGlobalContext()

    if(!isLoading && isLoggedIn ){
        return <Redirect href='/home'/>
    }

    return (
           <SafeAreaView className='bg-primary h-full '>
            
            <ScrollView contentContainerStyle={{height : '100%'}}>
                <View className='w-full justify-center min-h-[85vh] items-center  px-4'>
                    <Image 
                    source={images.logo}
                    resizeMode='contain'
                    className= 'w-[130px] h-[84px]'
                    />


                    <Image 
                    source={images.cards}
                    resizeMode='contain'
                    className= 'max-w-[380px] w-full h-[300px]'
                    />

                    <View className='relative mt-5'>
                        <Text className="text-3xl text-white font-bold text-center">
                            Discover Endless Possibilitie{' '}
                            <Text className='text-secondary-200'>Aora</Text>
                        </Text>

                        <Image
                            source={images.path}
                            resizeMode='contain'
                            className='w-[136px] h-[15px] absolute -bottom-2 -right-8'
                        />
                    </View>

                    <Text className="text-sm font-pregular text-gray-100 mt-7 text-center">Where creativity meets innovation: embark on a journey of limitless exploration with Aora</Text>

                    <CustomButton 
                    title='Continue with Email' 
                    containerStyles='w-full mt-7'
                    handlePress={() => router.push('/sign-in')}
                    />
                </View>
            </ScrollView>

            <StatusBar backgroundColor='#161622' style='light'/>
           </SafeAreaView>
        
    )
}

export default index
