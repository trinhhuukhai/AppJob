import React, { useEffect, useState } from 'react';
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
import { images, icons, colors } from '../../constants/index';
import { convertDateTimeToString } from '../../utilies/DateTime';
import { convertToString } from '../../utilies/Validation';
import { formatDate } from '../../utilies/DateTime'

import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

// import {
//     user as UserRepository
// } from '../../repositories'

function Profile({ navigation }, props) {

   

    useEffect(() => {
        getProfile()
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


    //profile

    const [profile, setProfile] = useState([])
    const [education, setEducation] = useState([])
    const [experience, setExperience] = useState([])
    const [certificate, setCertificate] = useState([])

    const getProfile = async () => {
        try {
            const dataToken = await AsyncStorage.getItem('access');
            axios
                .get(
                    'https://spiderpig83.pythonanywhere.com/api/v1/self/profile',
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
                        // debugger
                        let profileData = res.data


                        let prof = profileData.profile
                        let ctf = profileData.certificates
                        let exp = profileData.experience
                        let edu = profileData.education

                        setProfile(prof)
                        setEducation(edu)
                        setExperience(exp)
                        setCertificate(ctf)

                        // debugger

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

    const { avatar, description, location, skills } = profile


    return (
        <View>
            <ScrollView>

                <View
                    style={{
                        padding: 10,
                        width: '100%',
                        backgroundColor: 'gray',
                        height: 100,
                    }}
                />
                <View style={{
                    flexDirection: 'row'
                }}>
                    <View
                        style={{
                            marginHorizontal: 10,
                        }}>
                        <Image
                            source={images.profile_user}
                            style={{
                                width: 100,
                                height: 100,
                                borderRadius: 100,
                                marginTop: -50,
                            }}
                        />
                        <Text
                            style={{
                                fontSize: 18,
                                fontWeight: 'bold',
                                marginTop: 10,
                                color: 'black',
                            }}>
                            {userName}
                        </Text>
                        {/* <Text style={{ color: 'black', marginBottom: 5, fontWeight: '500' }}>
                            Software Engineer
                        </Text> */}
                        <Text style={{ color: 'black', marginBottom: 5 }}>
                            {skills}
                        </Text>
                        <Text
                            style={{
                                fontSize: 14,
                                color: 'black',
                                alignSelf: 'flex-start',
                                // backgroundColor:'blue'
                            }}>
                            {JSON.stringify(description)}
                        </Text>
                        <Text
                            style={{
                                fontSize: 14,
                                color: 'black',
                                marginTop: 5,
                            }}>
                            {location}
                        </Text>
                    </View>
                    <TouchableOpacity
                        style={{
                            marginTop: 10,
                        }}
                        onPress={() => navigation.navigate('FormExperience')}>
                        <Image
                            source={icons.icon_edit}
                            style={{
                                width: 30,
                                height: 30,
                                tintColor: colors.primary,
                            }}
                        />
                    </TouchableOpacity>
                </View>

                <View
                    style={{
                        //line
                        width: '100%',
                        height: 5,
                        backgroundColor: 'black',
                        marginTop: 5,
                    }}
                />

                <View
                    style={{
                        //education
                        marginHorizontal: 10,
                        marginTop: 10,
                    }}>
                    <View
                        style={{
                            flexDirection: 'row',
                            // backgroundColor:'red',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                        }}>
                        <Text
                            style={{
                                fontSize: 18,
                                fontWeight: 'bold',
                                marginTop: 10,
                                color: 'black',
                            }}>
                            Education
                        </Text>
                        <TouchableOpacity
                            onPress={() => navigation.navigate('FormEducation')}>
                            <Image
                                source={icons.icon_edit}
                                style={{
                                    width: 30,
                                    height: 30,
                                    tintColor: colors.primary,
                                }}
                            />
                        </TouchableOpacity>
                    </View>

                    <View
                        style={{
                            flexDirection: 'row',
                            marginTop: 15,
                            // backgroundColor:'red',
                            marginBottom: 5,
                        }}>
                        <Image
                            source={icons.icon_education}
                            style={{
                                width: 30,
                                height: 30,
                                marginRight: 20,
                                marginTop: 5,
                            }}
                        />
                        <FlatList
                        // ref={}
                            data={[...education]}
                            keyExtractor={item => item.id}
                            renderItem={({ item }) => <View
                                style={{
                                    marginBottom: 5
                                }}>
                                <Text style={{ fontSize: 14, fontWeight: 'bold' }}>
                                    {item.school_name}
                                </Text>
                                <Text>{item.field_of_study}</Text>
                                <Text style={{ marginBottom: 5 }}>{formatDate(item.start_date)} - {formatDate(item.end_date)}</Text>
                                <View style={{ width: '70%', height: 1, backgroundColor: colors.primary }} />
                            </View>}
                        />




                    </View>
                </View>

                <View
                    style={{
                        //line
                        width: '100%',
                        height: 5,
                        backgroundColor: 'black',
                        marginTop: 5,
                    }}
                />
                <View
                    style={{
                        //experience
                        marginHorizontal: 10,
                        marginTop: 10,
                    }}>
                    <View
                        style={{
                            flexDirection: 'row',
                            // backgroundColor:'red',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                        }}>
                        <Text
                            style={{
                                fontSize: 18,
                                fontWeight: 'bold',
                                marginTop: 10,
                                color: 'black',
                            }}>
                            Experience
                        </Text>
                        <TouchableOpacity
                            onPress={() => navigation.navigate('FormExperience')}>
                            <Image
                                source={icons.icon_edit}
                                style={{
                                    width: 30,
                                    height: 30,
                                    tintColor: colors.primary,
                                }}
                            />
                        </TouchableOpacity>
                    </View>
                    <View
                        style={{
                            flexDirection: 'row',
                            marginTop: 15,
                            // backgroundColor:'red',
                            marginBottom: 5,
                        }}>
                        <Image
                            source={icons.icon_experience}
                            style={{
                                width: 30,
                                height: 30,
                                marginRight: 20,
                                marginTop: 5,
                            }}
                        />
                        <FlatList
                            data={experience}
                            keyExtractor={item => item.id}
                            renderItem={({ item }) => <View
                                style={{
                                    marginBottom: 5
                                }}>
                                <Text style={{ fontSize: 14, fontWeight: 'bold' }}>
                                    {item.company_name}
                                </Text>
                                <Text>{item.title}</Text>
                                <Text style={{ marginBottom: 5 }}>{formatDate(item.start_date)} - {formatDate(item.end_date)}</Text>
                                <View style={{ width: '70%', height: 1, backgroundColor: colors.primary }} />
                            </View>}
                        />

                    </View>
                </View>

                <View
                    style={{
                        //line
                        width: '100%',
                        height: 5,
                        backgroundColor: 'black',
                        marginTop: 5,
                    }}
                />

                <View
                    style={{
                        //education
                        marginHorizontal: 10,
                        marginTop: 10,
                    }}>
                    <View
                        style={{
                            flexDirection: 'row',
                            // backgroundColor:'red',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                        }}>
                        <Text
                            style={{
                                fontSize: 18,
                                fontWeight: 'bold',
                                marginTop: 10,
                                color: 'black',
                            }}>
                            Certificate
                        </Text>
                        <TouchableOpacity
                            onPress={() => navigation.navigate('FormCertificate')}>
                            <Image
                                source={icons.icon_edit}
                                style={{
                                    width: 30,
                                    height: 30,
                                    tintColor: colors.primary,
                                }}
                            />
                        </TouchableOpacity>
                    </View>
                    <View
                        style={{
                            flexDirection: 'row',
                            marginTop: 15,
                            // backgroundColor:'red',
                            marginBottom: 10,
                        }}>
                        <Image
                            source={icons.icon_certificate}
                            style={{
                                width: 30,
                                height: 30,
                                marginRight: 20,
                                marginTop: 5,
                            }}
                        />
                        <FlatList
                            data={certificate}
                            keyExtractor={item => item.id}
                            renderItem={({ item }) => <View
                                style={{
                                    marginBottom: 5
                                }}>
                                <Text style={{ fontSize: 14, fontWeight: 'bold' }}>
                                    {item.name}
                                </Text>
                                <Text>{item.issue_organization}</Text>
                                <Text style={{ marginBottom: 5 }}>{item.issue_date}</Text>
                                <View style={{ width: '70%', height: 1, backgroundColor: colors.primary }} />
                            </View>}
                        />
                    </View>
                </View>
            </ScrollView>
        </View>
    );
};

export default Profile;
