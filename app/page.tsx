import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'

const page = () => {
    return (
        <SafeAreaView>
            <View className='px-5 mt-10 pb-4'>
                <Text>This is a new page</Text>
            </View>
        </SafeAreaView>
    )
}

export default page

const styles = StyleSheet.create({})