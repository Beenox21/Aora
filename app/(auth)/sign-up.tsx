import { Text, View,ScrollView, Image, Alert } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import {images} from '../../constants'
import Formfeild from '@/components/fromField'
import CustomButton from '@/components/customButton'
import { Link, router } from 'expo-router'
import { createUser } from '@/lib/appwrite'

const SignUp = () => {

  const [form, setForm] = useState({
    email: '',
    password : '',
    username : ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

 const submit = async () => {
    if(!form.username && !form.email && !form.password)
      Alert.alert('Error', 'All fields are required!')
    
    setIsSubmitting(true)

    try {
      const result = await createUser(form)

      // Soon we will be making it a global using context
      console.log('User created successfully. Redirecting to home.')
      router.replace('/home')

    } catch (error : any) {
      Alert.alert('Error', error.message)
    } finally {
      setIsSubmitting(false)
    }
 }

  return (
   <SafeAreaView className='bg-primary h-full'>
    <ScrollView>
      <View className='w-full justify-center min-h-[85vh] px-4 my-6'>
        <Image
        source={images.logo}
        className='w-[115px] h-[35px]'
        resizeMode='content'
        />

        <Text className='text-2xl text-white font-semibold mt-10'>Create your account</Text>

        {/* This is a form component */}
        <Formfeild
          title='Username'
          value= {form.username}
          handleChangeText= {
            (e) => {
              setForm({...form, username: e})
            }
          }
          otherStyles="mt-10"
        />

        <Formfeild
          title='Email'
          value= {form.email}
          handleChangeText= {
            (e) => {
              setForm({...form, email: e})
            }
          }
          otherStyles="mt-7"
          keyboardType='email-address'
        />


        <Formfeild
          title='Password'
          value= {form.password}
          handleChangeText= {
            (e) => {
              setForm({...form, password: e})
            }
          }
          otherStyles="mt-7"
          
        />

        <CustomButton
         title="Sign Up" 
         containerStyles="mt-7"
         handlePress={submit}
         isLoading={isSubmitting}
         />

         <View className='justify-center pt-5 flex-row gap-2'>
          <Text className='text-lg text-gray-100 font-pregular'>
            Already have an account?
          </Text>
          <Link href='/sign-in' className='font-psemibold text-secondary'>
          Sign in
          </Link>
         </View>

      </View>
    </ScrollView>
   </SafeAreaView>
  )
}

export default SignUp
