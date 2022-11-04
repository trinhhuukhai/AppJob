import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState } from 'react';
import {
    Text,
    View,
    Image,
    ImageBackground,
    TouchableOpacity,
} from 'react-native';
import { images, icons, colors } from '../constants/index';
import { UiButton } from '../components/index';
import axios from 'axios';
import Spinner from 'react-native-loading-spinner-overlay';

//component = function

//cach viet truyen thong
function Welcome(props) {

    const [role, setRole] = useState('')

    let [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        handleGetToken();

    }, [handleGetToken]);

    const handleGetToken = async () => {
        const dataToken = await AsyncStorage.getItem('access');

        if (!dataToken) {
            navigation.replace('Login');
        } else {
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
                    let roleApi = res.data.role
                    setRole(roleApi)
                    console.log(roleApi);

                    AsyncStorage.setItem("roleApi", roleApi)
                    setIsLoading(false)
                    navigation.replace('UITabs');


                })
                .catch(e => {
                    console.log(`logout error ${e}`);
                    setIsLoading(false)

                });

        }
    };

    //state => khi state ma thay doi => ui duoc load lai
    //like getter, setter [lay gia tri, thay doi]
    const [accountTypes, setAccountTypes] = useState([
        {
            name: 'Student',
            isSelected: true,
        },
        {
            name: 'Job Seekers',
            isSelected: false,
        },
        {
            name: 'Recruiter',
            isSelected: false,
        }
    ])

    //navigation
    const { navigation, route } = props
    //function of navigate to/back
    const { navigate, goback } = navigation

    return (

        
        <View
            style={{
                // backgroundColor: 'white',
                flex: 100,
            }}>
             <Spinner color='#00ff00' size={"large"} visible={isLoading} />
            <ImageBackground
                source={images.background}
                resizeMode="cover"
                style={{
                    flex: 100, //toan man hinh
                }}>
                <View
                    style={{
                        // height: 50,
                        flex: 20,
                        // backgroundColor: 'violet',
                    }} //
                >
                    <View
                        style={{
                            flexDirection: 'row', //cho view hien thi theo chieu ngang
                            height: 50,
                            justifyContent: 'flex-start', //can chinh noi dung cua the view flex theo chieu ngang
                            alignItems: 'center', //can chinh noi dung theo chieu doc
                        }}>
                        <Image
                            source={icons.icon_flame}
                            style={{
                                // marginHorizontal:10, //= margin start va marginend
                                marginStart: 10,
                                marginEnd: 5,
                                width: 30,
                                height: 30,
                            }}
                        />
                        <Text style={{ color: 'white' }}>FINDFOB.CO</Text>
                        <View style={{ flex: 1 }} />
                        <Image
                            source={icons.icon_question}
                            style={{
                                width: 18,
                                height: 18,
                                marginEnd: 10,
                                // tintColor:'black' mau icon
                            }}
                        />
                    </View>
                </View>
                <View
                    style={{
                        flex: 20,
                        width: '100%',
                        justifyContent: 'center',
                        alignItems: 'center',
                        // backgroundColor: "green"
                    }}>
                    <Text style={{ marginBottom: 7, color: 'white' }}>Welcome to</Text>
                    <Text style={{ marginBottom: 7, color: 'white', fontWeight: 'bold' }}>
                        FINDJOB.CO
                    </Text>
                </View>
                <View
                    style={{
                        flex: 40,
                        // backgroundColor: "red"
                    }}>

                    {accountTypes.map(accountType =>
                        <UiButton
                            key={accountType.name}
                            onPress={() => {

                                let newAccountTypes = accountTypes.map(eachAccountType => {
                                    return {
                                        ...eachAccountType, //nhan ban doi tuong
                                        isSelected: eachAccountType.name == accountType.name //kiem tra dieu kine
                                    }
                                })

                                setAccountTypes(newAccountTypes) // thay doi state => render data
                            }}
                            title={accountType.name}
                            isSelected={accountType.isSelected}
                        />)}

                </View>
                <View
                    style={{
                        flex: 20,
                        justifyContent: 'center',
                    }}
                >

                    <UiButton
                        onPress={() => {
                            navigate('Login')
                        }}
                        title={'login'.toUpperCase()} />
                    <Text
                        style={{
                            color: 'white',
                            fontSize: 14,
                            alignSelf: 'center' //can chinh dong Text
                        }}
                    >
                        Want to register new Account?
                    </Text>
                    <TouchableOpacity
                        onPress={() => {
                            navigate('Register')
                        }}
                        style={{
                            padding: 10
                        }}>
                        <Text
                            style={{
                                color: colors.primary,
                                fontSize: 14,
                                textDecorationLine: 'underline',
                                alignSelf: 'center' //can chinh dong Text
                            }}
                        >
                            Register
                        </Text>
                    </TouchableOpacity>

                </View>
            </ImageBackground>
        </View>
    );
}

export default Welcome; //cu export dai dien
