import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Stack } from 'expo-router'

// The reason we are creating different is to avoid the footer navbar in the auth pages
const AuthLayout = () => {
  return (
    <Stack>
      <Stack.Screen
        name='sign-in'
        options={{
          headerShown: false
        }}
      />
      <Stack.Screen
        name='sign-up'
        options={{
          headerShown: false
        }}
      />
    </Stack>
  )
}

export default AuthLayout

