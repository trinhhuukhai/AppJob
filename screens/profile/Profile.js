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
    TouchableHighlight,
    StyleSheet
} from 'react-native';
import { Icon } from 'react-native-vector-icons/Icon';
import { images, icons, colors } from '../../constants/index';
import { convertDateTimeToString } from '../../utilies/DateTime';
import { convertToString } from '../../utilies/Validation';
import { formatDate } from '../../utilies/DateTime'

import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SwipeListView } from 'react-native-swipe-list-view';

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

    //deleteEducation
    const deleteEdu = async (education_id) => {
        try {
            const dataToken = await AsyncStorage.getItem('access');
            axios
                .delete(
                    `https://spiderpig83.pythonanywhere.com/api/v1/education/${education_id}`,
                    {
                        headers: { Authorization: `Bearer ${dataToken}` },
                    },
                    {
                        headers: {
                            'Content-Type': 'application/json',
                        },
                    },
                )
                .then(res => {
                    if (res.status != 200) {
                        throw 'Fail request';
                    } else {
                        alert('Xóa thành công')
                    }
                })
                .catch(e => {
                    // debugger
                    let abc = false;


                    // console.log(`get jobs error ${e}`);
                });
        } catch (error) {
            // debugger
            throw error;
        }
    };

    //deleteExp
    const deleteExp = async (experience_id) => {
        try {
            const dataToken = await AsyncStorage.getItem('access');
            axios
                .delete(
                    `https://spiderpig83.pythonanywhere.com/api/v1/experience/${experience_id}`,
                    {
                        headers: { Authorization: `Bearer ${dataToken}` },
                    },
                    {
                        headers: {
                            'Content-Type': 'application/json',
                        },
                    },
                )
                .then(res => {
                    if (res.status != 200) {
                        throw 'Fail request';
                    } else {
                        alert('Xóa thành công')
                    }
                })
                .catch(e => {
                    // debugger
                    let abc = false;


                    // console.log(`get jobs error ${e}`);
                });
        } catch (error) {
            // debugger
            throw error;
        }
    };

    //deleteCer
    const deleteCer = async (certificate_id) => {
        try {
            const dataToken = await AsyncStorage.getItem('access');
            axios
                .delete(
                    `https://spiderpig83.pythonanywhere.com/api/v1/certificate/${certificate_id}`,
                    {
                        headers: { Authorization: `Bearer ${dataToken}` },
                    },
                    {
                        headers: {
                            'Content-Type': 'application/json',
                        },
                    },
                )
                .then(res => {
                    if (res.status != 200) {
                        throw 'Fail request';
                    } else {
                        alert('Xóa thành công')
                    }
                })
                .catch(e => {
                    // debugger
                    let abc = false;


                    // console.log(`get jobs error ${e}`);
                });
        } catch (error) {
            // debugger
            throw error;
        }
    };


    //education
    const deleteRowEdu = (rowMap, rowKey) => {
        const prevIndex = education.findIndex(item => item.id === rowKey);
        deleteEdu(rowKey)
        const newData = [...education];
        newData.splice(prevIndex, 1);
        setEducation(newData);
    };

    const onRowDidOpen = rowKey => {
        console.log('This row opened', rowKey);
    };

    const renderItemEducation = data => (
        <TouchableHighlight
            onPress={() => console.log('You touched me')}
            style={styles.rowFront}
            underlayColor={colors.primary}
        >
            <View>
                <Text style={{ fontSize: 14, fontWeight: 'bold' }}>
                    {data.item.school_name}
                </Text>
                <Text>{data.item.field_of_study}</Text>
                <Text style={{ marginBottom: 5 }}>{formatDate(data.item.start_date)} - {formatDate(data.item.end_date)}</Text>

            </View>
        </TouchableHighlight>
    );
    const renderHiddenItemEducation = (data, rowMap) => (
        <View style={styles.rowBack}>
            <TouchableOpacity
                style={[styles.backRightBtn, styles.backRightBtnRight]}
                onPress={() => deleteRowEdu(rowMap, data.item.id)}
            >
                <Image
                    source={icons.icon_bin}
                    style={{
                        width: 30,
                        height: 30,
                    }}
                />

            </TouchableOpacity>
        </View>
    );

    //experrient
    const deleteRowExp = (rowMap, rowKey) => {
        const prevIndex = experience.findIndex(item => item.id === rowKey);
        deleteExp(rowKey)
        const newData = [...experience];
        newData.splice(prevIndex, 1);
        setExperience(newData);
    };

    const renderItemExp = data => (
        <TouchableHighlight
            onPress={() => console.log('You touched me')}
            style={styles.rowFront}
            underlayColor={colors.primary}
        >
            <View>
                <Text style={{ fontSize: 14, fontWeight: 'bold' }}>
                    {data.item.company_name}
                </Text>
                <Text>{data.item.title}</Text>
                <Text style={{ marginBottom: 5 }}>{formatDate(data.item.start_date)} - {formatDate(data.item.end_date)}</Text>


            </View>
        </TouchableHighlight>
    );
    const renderHiddenItemExp = (data, rowMap) => (
        <View style={styles.rowBack}>
            <TouchableOpacity
                style={[styles.backRightBtn, styles.backRightBtnRight]}
                onPress={() => deleteRowExp(rowMap, data.item.id)}
            >
                <Image
                    source={icons.icon_bin}
                    style={{
                        width: 30,
                        height: 30,
                    }}
                />

            </TouchableOpacity>
        </View>
    );

    //cer
    const deleteRowCer = (rowMap, rowKey) => {
        const prevIndex = certificate.findIndex(item => item.id === rowKey);
        deleteCer(rowKey)
        const newData = [...certificate];
        newData.splice(prevIndex, 1);
        setCertificate(newData);
    };

    const renderItemCer = data => (
        <TouchableHighlight
            onPress={() => console.log('You touched me')}
            style={styles.rowFront}
            underlayColor={colors.primary}
        >
            <View>
                <Text style={{ fontSize: 14, fontWeight: 'bold' }}>
                    {data.item.name}
                </Text>
                <Text>{data.item.issue_organization}</Text>
                <Text style={{ marginBottom: 5 }}>{data.item.issue_date}</Text>


            </View>
        </TouchableHighlight>
    );
    const renderHiddenItemCer = (data, rowMap) => (
        <View style={styles.rowBack}>
            <TouchableOpacity
                style={[styles.backRightBtn, styles.backRightBtnRight]}
                onPress={() => deleteRowCer(rowMap, data.item.id)}
            >
                <Image
                    source={icons.icon_bin}
                    style={{
                        width: 30,
                        height: 30,
                    }}
                />

            </TouchableOpacity>
        </View>
    );





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
                    flexDirection: 'row',
                    justifyContent: 'space-between',

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
                                marginTop: -80,
                            }}
                        />
                        <Text
                            style={{
                                fontSize: 18,
                                fontWeight: 'bold',
                                marginTop: 10,
                                // marginLeft:10,
                                color: 'black',
                            }}>
                            {userName}
                        </Text>
                        <Text style={{
                            marginStart: 10
                        }}>Skills:</Text>
                        {skills?.map((item) => <View key={item} style={{
                            flexDirection: 'row'
                        }}><Text style={{ color: 'black', marginBottom: 2, marginLeft: 30 }}>
                                - {item}
                            </Text></View>)}
                        <Text style={{
                            marginStart: 10
                        }}>Description:</Text>
                        {description?.map((item) => <View key={item} style={{
                            flexDirection: 'row'
                        }}><Text style={{ color: 'black', marginBottom: 2, marginLeft: 30 }}>
                                - {item}
                            </Text></View>)}
                        <Text
                            style={{
                                fontSize: 14,
                                color: 'black',
                                marginTop: 5,
                            }}>
                            Address: {location}
                        </Text>
                    </View>
                    <TouchableOpacity
                        style={{
                            marginTop: 10,
                            marginRight: 10
                        }}
                        onPress={() => navigation.navigate('FormProfile')}>
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
                        <SwipeListView
                            data={education}
                            renderItem={renderItemEducation}
                            renderHiddenItem={renderHiddenItemEducation}
                            rightOpenValue={-75}
                            previewRowKey={'0'}
                            previewOpenValue={-40}
                            previewOpenDelay={3000}
                            onRowDidOpen={onRowDidOpen}
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
                        <SwipeListView
                            data={experience}
                            renderItem={renderItemExp}
                            renderHiddenItem={renderHiddenItemExp}
                            rightOpenValue={-75}
                            previewRowKey={'0'}
                            previewOpenValue={-40}
                            previewOpenDelay={3000}
                            onRowDidOpen={onRowDidOpen}
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
                        <SwipeListView
                            data={certificate}
                            renderItem={renderItemCer}
                            renderHiddenItem={renderHiddenItemCer}
                            rightOpenValue={-75}
                            previewRowKey={'0'}
                            previewOpenValue={-40}
                            previewOpenDelay={3000}
                            onRowDidOpen={onRowDidOpen}
                        />
                    </View>
                </View>
            </ScrollView>
        </View>
    );
};

export default Profile;

const styles = StyleSheet.create({
    container: {
        // backgroundColor: 'white',
        // flex: 1,
        paddingVertical: 20
    },
    backTextWhite: {
        color: '#FFF',
    },
    rowFront: {
        // alignItems: 'center',
        padding: 10,
        backgroundColor: 'white',
        borderBottomColor: colors.primary,
        borderBottomWidth: 1,
        // justifyContent: 'center',
        // height: 50,
    },
    rowBack: {
        alignItems: 'center',
        backgroundColor: '#DDD',
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    backRightBtn: {
        alignItems: 'center',
        bottom: 0,
        justifyContent: 'center',
        position: 'absolute',
        top: 0,
        width: 75,
    },
    backRightBtnRight: {
        backgroundColor: 'colors.primary',
        right: 0,
    },
});
