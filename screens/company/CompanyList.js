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
    Picker
} from 'react-native';
import { images, icons, colors } from '../../constants/index';
import SelectList from 'react-native-dropdown-select-list'
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';


const CompanyList = ({ navigation }) => {

    //data job
    useEffect(() => {
        getListCompany()
    })

    //company
    const [token, setToken] = useState('')
    const [company, setCompany] = useState([])
    const getListCompany = async () => {
        try {
            const dataToken = await AsyncStorage.getItem('access');
            // debugger
            setToken(dataToken)
            axios
                .get(
                    'https://spiderpig83.pythonanywhere.com/api/v1/companies',
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
                        let resJob = res.data.companies
                        setCompany(resJob)
                     



                    }
                })
                .catch(e => {
                    console.log(`get error error ${e}`);
                });
        } catch (error) {
            // debugger
            throw error
        }
    };

    const [city, setCity] = useState([])
    // const [companyId, setCompanyId] = useState('')
    const [searchText, setSearchText] = useState('')

    return (

        <View style={{ flex: 1, backgroundColor: 'white' }}>
            <View style={{
                width: '100%',
                height: 50,
                backgroundColor: colors.primary,
                justifyContent: 'center',
                alignItems: 'center'
            }}>
                <Text style={{
                    color: 'white',
                    fontSize: 16
                }}>Company</Text>
            </View>
            <View style={{ marginHorizontal: 10, marginVertical: 10, flexDirection: 'row', alignItems: 'center' }}>
                <Image
                    tintColor='black' //mau logo
                    source={icons.icon_search}
                    style={{
                        width: 15,
                        height: 15,
                        // backgroundColor:'red',
                        alignSelf: 'center',
                        position: 'absolute',
                        top: 14,
                        left: 10
                    }}
                />
                <TextInput
                    onChangeText={(text) => {
                        setSearchText(text)
                    }}
                    autoCorrect={false}
                    style={{
                        // backgroundColor: colors.inactive,
                        borderWidth: 1,
                        height: 46,
                        flex: 1,
                        marginEnd: 5,
                        borderRadius: 5,
                        opacity: 0.4,
                        padding: 10,
                        paddingStart: 30,
                        color: 'black',
                        fontWeight: 'bold'
                    }}

                    placeholder='Keywork Company ...'
                />

            </View>

            <View style={{
                backgroundColor: colors.inactive,
                height: 10,
                justifyContent: 'center',
                alignItems: 'center',
                marginTop: 10
            }} />

            <FlatList
                data={company.filter(item => item.name?.toLowerCase().includes(searchText.toLowerCase()))}
                keyExtractor={item => item.id}
                renderItem={({ item }) => <View style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    // padding: 10
                }}>
                    <Image
                        style={{
                            width: 100,
                            height: 100
                        }}
                        source={{
                            uri: 'https://mondialbrand.com/images/KHACHHANG/TAM-VIET/thiet-ke-logo-cty-thue-tam-viet-3.jpg'
                        }}

                    />
                    <Text style={{
                        fontSize: 18,
                        fontWeight: 'bold',
                        marginTop: 10,
                        // marginBottom: 10
                    }}>{item.name}</Text>
                    <View style={{
                        flexDirection: 'row',
                        // marginTop: 5
                    }}>
                        <TouchableOpacity

                            onPress={() => {
                                AsyncStorage.setItem("companyId", item.id)
                                AsyncStorage.setItem("companyName", item.name)

                                navigation.navigate("CompanyListItem")
                            }
                            }
                            style={{
                                backgroundColor: colors.primary,
                                width: '50%',
                                alignSelf: 'center',
                                alignItems: 'center',
                                borderRadius: 7,
                                marginTop: 10

                            }}>
                            <Text style={{
                                padding: 5,
                                color: 'white',
                                fontSize: 12
                            }}>See Job</Text>
                        </TouchableOpacity>

                    </View>
                    <View style={{
                        width: "100%",
                        height: 1,
                        backgroundColor: 'gray',
                        marginTop: 10
                    }} />
                </View>
                }
            />

        </View>
    )
}

export default CompanyList
