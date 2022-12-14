import React, { cloneElement, useEffect, useState } from 'react';
import {
    Text,
    View,
    Image,
    ImageBackground,
    TouchableOpacity,
    TextInput,
    KeyboardAvoidingView,
    Keyboard,
    ScrollView,
    FlatList,
} from 'react-native';
import { Icon } from 'react-native-vector-icons/Icon';
import { SafeAreaView } from 'react-navigation';
import { images, icons, colors } from '../../../constants/index';
import { convertDateTimeToString } from '../../../utilies/DateTime'
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ProfileRecruiter = ({navigation}) => {

    useEffect(() => {
        getUserDetail()
    }, [])

    //user
    const [userApi, setUserApi] = useState([])
    const getUserDetail = async () => {
        try {
            const dataToken = await AsyncStorage.getItem('access');
            axios
                .get(
                    'https://spiderpig83.pythonanywhere.com/api/v1/self/info',
                    {
                        headers: { Authorization: `Bearer ${dataToken}` },
                    }, {
                    "headers": {
                        'Content-Type': 'application/json',
                    }
                }
                )
                .then(res => {
                    if (res.status != 200) {
                        throw "Fail request"
                    } else {
                        let responseUser = res.data
                        let user = {}
                        user.userId = responseUser.id
                        user.userName = responseUser.full_name
                        user.email = responseUser.email
                        user.phone = responseUser.phone_number
                        // debugger          
                        setUserApi(user)
                        // console.log(res)
                        console.log(userApi)
                    }
                })
                .catch(e => {
                    console.log(`get error error ${e}`);
                });
        } catch (error) {
            debugger
            throw error
        }
    };
    const { userId, userName } = userApi
    const handleLogout = () => {
        AsyncStorage.clear();
        navigation.navigate('Login');
    };
    return (
        <View>
            <View
                style={{
                    padding: 10,
                    width: '100%',
                    backgroundColor: 'gray',
                    height: 100,

                    alignItems: 'flex-end'
                }}
            >
                <View style={{
                    backgroundColor:colors.primary,
                    padding:3,
                    borderRadius:5,
                    alignItems:'center',
                    justifyContent:'center',
                    
                    // borderWidth:1
                    // borderColor:'white'
                }}>
                    <TouchableOpacity
                        onPress={() =>
                            handleLogout()
                        }

                    >
                        <Text style={{
                            fontSize: 18,
                            color: 'white'
                        }}>Logout</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <View style={{
                marginHorizontal: 10,
                // alignItems:'center'
                marginLeft: 40
            }}>
                <Image source={images.profile_user} style={{
                    width: 100,
                    height: 100,
                    borderRadius: 100,
                    marginTop: -60
                }} />
                <Text style={{
                    fontSize: 18,
                    fontWeight: 'bold',
                    marginTop: 10,
                    color: 'black'
                }}>{userName}</Text>
            </View>
        </View>
    )
}

export default ProfileRecruiter
