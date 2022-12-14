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
import { images, icons, colors } from '../../../constants/index';
import { formatDate } from '../../..//utilies/DateTime'

import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Spinner from 'react-native-loading-spinner-overlay';

function ViewProfileUser({ navigation }, props) {
    let [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        getUserDetail()
        getProfile()
        // getJobApply()
    }, [])

    //job_detail_apply


    const setStatus = async () => {
        try {
            const dataToken = await AsyncStorage.getItem('access');
            const id = await AsyncStorage.getItem('IdJobApply');
            // debugger
            axios
                .put(`https://spiderpig83.pythonanywhere.com/api/v1/job/applied/${id}`,
                    {
                        status: "Accepted"
                    }, {
                    "headers": {
                        'Authorization': `Bearer ${dataToken}`,
                        'Content-Type': 'application/json',
                    }
                },)
                .then(res => {
                    setIsLoading(false)
                    console.log('Accept thanh cong')


                })
                .catch(e => {
                    setIsLoading(false)
                    alert("Save không thành công!!")
                    console.log(`post error ${e}`);
                    // debugger

                });
        } catch (error) {
            throw error
        }

    };

    //user
    const [userApi, setUserApi] = useState([])
    const getUserDetail = async () => {
        try {
            const dataToken = await AsyncStorage.getItem('access');
            const userId = await AsyncStorage.getItem('UserId');
            axios
                .get(
                    `https://spiderpig83.pythonanywhere.com/api/v1/user/${userId}`,
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
                        setIsLoading(false)
                        let responseUser = res.data
                        let user = {}
                        user.userId = responseUser.id
                        user.userName = responseUser.full_name
                        user.email = responseUser.email
                        user.phone = responseUser.phone_number
                        user.dob = responseUser.date_of_birth
                        user.gender = responseUser.gender

                        // debugger
                        setUserApi(user)
                        // console.log(res)
                        console.log(userApi)
                    }
                })
                .catch(e => {
                    setIsLoading(false)
                    console.log(`get error error ${e}`);
                });
        } catch (error) {
            // debugger
            throw error
        }
    };
    const { userId, userName, dob, gender, phone } = userApi


    //profile

    const [profile, setProfile] = useState([])
    const [education, setEducation] = useState([])
    const [experience, setExperience] = useState([])
    const [certificate, setCertificate] = useState([])

    const getProfile = async () => {
        try {
            const dataToken = await AsyncStorage.getItem('access');
            const userId = await AsyncStorage.getItem('UserId');
            axios
                .get(
                    `https://spiderpig83.pythonanywhere.com/api/v1/candidate/${userId}/profile`,
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
                        setIsLoading(false)
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
                    setIsLoading(false)
                    console.log(`get error error ${e}`);

                });
        } catch (error) {
            debugger
            throw error
        }

    };

    const { avatar, description, location, skills } = profile


    return (
        <ScrollView>
            <Spinner color='#00ff00' size={"large"} visible={isLoading} />

            <View
                style={{
                    padding: 10,
                    width: '100%',
                    backgroundColor: 'gray',
                    height: 100,
                }}
            />
            <View style={{
                flexDirection: 'row',
                // justifyContent: 'space-between'
            }}>
                <View
                    style={{
                        // alignItems: 'center',
                        // paddingStart: 20
                        // marginHorizontal: 30
                        marginLeft: 10
                    }}>
                    <Image
                        source={images.profile_user}
                        style={{
                            width: 100,
                            height: 100,
                            borderRadius: 100,
                            marginTop: -70,
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
                    <Text
                        style={{

                            marginTop: 10,
                            color: 'black',
                        }}>
                        Date of birth: {dob}
                    </Text>
                    <Text
                        style={{


                            marginTop: 10,
                            color: 'black',
                        }}>
                        Phone Number: {phone}
                    </Text>
                    <Text
                        style={{
                            marginTop: 10,
                            color: 'black',
                        }}>
                        Gender: {gender}
                    </Text>
                    <Text
                        style={{
                            color: 'black',
                            marginTop: 5,
                        }}>
                        Address: {location}
                    </Text>
                </View>
                <TouchableOpacity

                    onPress={() => {
                        setStatus()

                    }}
                    style={{
                        backgroundColor: colors.primary,
                        width: 80,
                        // alignSelf: 'center',
                        // marginLeft:-40,
                        alignItems: 'center',
                        borderRadius: 7,
                        // alignSelf: 'center',
                        marginTop: 10,
                        height: 30


                    }}>
                    <Text style={{
                        padding: 5,
                        color: 'white',
                        fontSize: 12
                    }}>Accept</Text>
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
                    //description
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
                        Description
                    </Text>
                </View>

                <View
                    style={{
                        flexDirection: 'row',
                        marginTop: 15,
                        // backgroundColor:'red',
                        marginBottom: 5,
                    }}>
                    <Image
                        source={icons.icon_description}
                        style={{
                            width: 30,
                            height: 30,
                            marginRight: 20,
                            marginTop: 5,
                        }}
                    />
                    <FlatList
                        data={description}
                        // keyExtractor={item => item.id}
                        keyExtractor={(item, index) => `key-${index}`}
                        renderItem={({ item }) => <View
                            style={{
                                marginBottom: 5
                            }}>
                            <Text>- {item}</Text>
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
                    //skills
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
                        Skills
                    </Text>
                </View>

                <View
                    style={{
                        flexDirection: 'row',
                        marginTop: 15,
                        // backgroundColor:'red',
                        marginBottom: 5,
                    }}>
                    <Image
                        source={icons.icon_skills}
                        style={{
                            width: 30,
                            height: 30,
                            marginRight: 20,
                            marginTop: 5,
                        }}
                    />
                    <FlatList
                        data={skills}
                        // keyExtractor={item => item.id}
                        keyExtractor={(item, index) => `key-${index}`}
                        renderItem={({ item }) => <View
                            style={{
                                marginBottom: 5
                            }}>
                            <Text>- {item}</Text>
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
                        Education
                    </Text>
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
                        data={education}
                        // keyExtractor={item => item.id}
                        keyExtractor={(item, index) => `key-${index}`}
                        renderItem={({ item }) => <View
                            style={{
                                marginBottom: 5
                            }}>
                            <Text style={{ fontSize: 14, fontWeight: 'bold' }}>
                                {item.school_name}
                            </Text>
                            <Text>{item.field_of_study}</Text>
                            <Text style={{ marginBottom: 5 }}>{formatDate(item.start_date)} - {formatDate(item.end_date)}</Text>
                            <View style={{ width: '80%', height: 1, backgroundColor: colors.primary }} />
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
    );
};

export default ViewProfileUser;
