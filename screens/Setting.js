import React, { useState, useEffect } from 'react'
import {
    Text,
    View,
    Image,
    ImageBackground,
    TouchableOpacity,
    TextInput,
    KeyboardAvoidingView,
    Keyboard
} from 'react-native';
import { images, icons, colors } from '../constants/index';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Setting = ({ navigation }) => {

    const handleLogout = () => {
        AsyncStorage.clear();
        navigation.navigate('Login');
    };

    return (
        <View>
            <TouchableOpacity
                onPress={()=>
                    handleLogout()
                }
            >
                <Text style={{
                    fontSize: 20,
                    color: 'red'
                }}>Logout</Text>
            </TouchableOpacity>
        </View>
    )
}

export default Setting
