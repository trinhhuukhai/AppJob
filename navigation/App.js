
import React, {Component, useState} from 'react'
import {
    SafeAreaView, 
    Text, 
    View,
    Image,
    TouchableOpacity,
    ImageBackground,
    FlatList,
} from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { StackRouter } from 'react-navigation'
import {Welcome, Login, Register, JobListItem, JobList} from '../screens'

import {AuthProvider} from '../repositories/AuthContext';
/**
 - Call API(Application Programming Interface)
 - POST, GET, PUT, DELETE
 - Postman(Postwoman)
 - find some public apis
 */
 import UITabs from './UITabs'
 import UITabsRecruiter from './UITabsRecruiter'

const Stack = createNativeStackNavigator()


function App(props) {


    return <AuthProvider>
            <NavigationContainer>
        <Stack.Navigator initialRouteName='Welcome' screenOptions={{
            headerShown: false
        }}>
            <Stack.Screen name={"Welcome"} component={Welcome}/>
            <Stack.Screen name={"Login"} component={Login}/>
            <Stack.Screen name={"Register"} component={Register}/>

            
            <Stack.Screen name={"UITabs"} component={UITabs}/>                
                         
        </Stack.Navigator>
    </NavigationContainer>
    </AuthProvider>


    
}
export default App