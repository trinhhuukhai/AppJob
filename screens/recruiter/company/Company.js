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
import { images, icons, colors } from '../../../constants/index';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

//list view from a map of object
//Flatlist

function Company({ navigation }, props) {

    //data job
    useEffect(() => {
        getListJob()
        

    }, [])

    //job
    const [selfCompany, setSelfCompany] = useState([])

    const { name, logo, business_size_min, business_size_max, id } = selfCompany

    const getListJob = async () => {
        try {
            const dataToken = await AsyncStorage.getItem('access');
            axios
                .get(
                    'https://spiderpig83.pythonanywhere.com/api/v1/self/company',
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
                        
                        let infoCompany = res.data

                        AsyncStorage.setItem("idCompany", infoCompany.id)
                        // debugger
                        setSelfCompany(infoCompany)
                        
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




    return <View style={{ flex: 1, backgroundColor: 'white', paddingVertical: 30 }}>
        {id !== null ?
            <View>
                <View style={{
                    padding: 10,
                    flexDirection: 'row',
                    justifyContent: 'space-between'
                }}>
                    <Text style={{
                        color: 'black',
                        fontSize: 20,

                    }}>Company Information</Text>
                    <TouchableOpacity
                        onPress={() => {
                            // alert('xem chi tiet')
                            AsyncStorage.setItem("idCompany", id)
                            //redriac
                            navigation.navigate("CreateJob")

                        }}
                        style={{
                            flexDirection: 'row',
                            alignItems: 'center'
                        }}>
                        <Text>Create Job</Text>
                        <Image source={icons.icon_edit} style={{
                            width: 30,
                            height: 30,
                            tintColor: colors.primary,
                            marginLeft: 10
                        }} />
                    </TouchableOpacity>
                </View>

                <View style={{
                    flexDirection: 'row',
                    padding: 20

                }}>
                    <Image
                        style={{
                            width: 100,
                            height: 100,
                            marginRight: 30,
                        }} source={{
                            uri: 'https://virama.vn/wp-content/uploads/2021/04/z2457798763776_fa747346d3bb19417e576d642ab6fd2e-scaled.jpg'
                        }} />
                    <View style={{
                    }}>
                        <Text style={{
                            color: 'red',
                            fontSize: 18,
                            marginBottom: 10
                        }}>{name}</Text>
                        <Text>Min:{business_size_min}</Text>
                        <Text>Max:{business_size_max}</Text>
                        <Text>Id:{id}</Text>



                    </View>
                </View>

            </View>
            :
            <View style={{
                padding: 10,
                flexDirection: 'row',
                justifyContent: 'space-between'
            }}>
                <Text style={{
                    color: 'black',
                    fontSize: 20,

                }}>No Information</Text>
                
                <TouchableOpacity
                    onPress={() => {
                        // alert('xem chi tiet')
                        // AsyncStorage.setItem("idCompany", id)
                        //redriac
                        navigation.navigate("CreateCompany")

                    }}
                    style={{
                        flexDirection: 'row',
                        alignItems: 'center'
                    }}>
                    <Text>Create New Company</Text>
                    <Image source={icons.icon_edit} style={{
                        width: 30,
                        height: 30,
                        tintColor: colors.primary,
                        marginLeft: 10
                    }} />
                </TouchableOpacity>
            </View>


        }




    </View>

}

export default Company;
