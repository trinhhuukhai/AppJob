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
import ListjobItem from './ListjobItem';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

//list view from a map of object
//Flatlist

function ListJob({ navigation }, props) {

    //data job
    useEffect(() => {
        getListJob()
    }, [])

    //job
    const [job, setJob] = useState([])
    const [totals, setTotals] = useState('')

    const getListJob = async () => {
        try {
            const dataToken = await AsyncStorage.getItem('access');
            const idComp = await AsyncStorage.getItem('idCompany');
            axios
                .get(
                    `https://spiderpig83.pythonanywhere.com/api/v1/company/${idComp}/jobs`,
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
                        let resJob = res.data.jobs
                        let total = res.data.total
                        // debugger
                        setTotals(total)
                        setJob(resJob)
                        // debugger

                    }
                })
                .catch(e => {
                    console.log(`get jobs error ${e}`);
                });
        } catch (error) {
            // debugger
            throw error
        }
    };

    return <View style={{ flex: 1, backgroundColor: 'white', paddingVertical: 30 }}>

        {
            totals === 0 ? <View><Text style={{
                fontSize:18,
                color:colors.primary,
                alignSelf:'center'
            }}>Chua co cong viec nao duoc tao</Text></View>
                :
                <View>
                    <View style={{
                        padding: 10,
                        flexDirection: 'row',
                        justifyContent: 'space-between'
                    }}>
                        <Text style={{
                            color: 'black',
                            fontSize: 20,

                        }}>Danh sach cong viec</Text>

                        <TouchableOpacity style={{
                            flexDirection: 'row',
                            alignItems: 'center'
                        }} onPress={() => navigation.navigate("CreateJob")}>
                            <Text>Create New</Text>
                            <Image source={icons.icon_edit} style={{
                                width: 30,
                                height: 30,
                                tintColor: colors.primary,
                                marginLeft: 10
                            }} />
                        </TouchableOpacity>

                    </View>

                    <FlatList
                        data={job}
                        // keyExtractor={item => item.id}
                        keyExtractor={(item, index) => `key-${index}`}
                        renderItem={({ item }) => <View style={{
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
                                }}>{item.title}</Text>
                                <View style={{
                                    flexDirection: 'row',
                                    marginRight: 2
                                    // justifyContent:'center',
                                    // justifyContent: 'space-around',
                                    // backgroundColor: 'red',
                                    // flex:1,
                                    // width: '100%'
                                }}>
                                    {item.skills.map((ski, i) =>
                                        <Text
                                            key={i}
                                            style={{
                                                // backgroundColor:'red',
                                                borderWidth: 1,
                                                borderColor: colors.primary,
                                                padding: 3,
                                                marginRight: 5
                                            }}>{ski}</Text>
                                    )

                                    }
                                </View>
                                <TouchableOpacity

                                    onPress={() => {
                                        // alert('xem chi tiet')
                                        AsyncStorage.setItem("JobId", item.id)
                                        //redriac
                                        navigation.navigate("ListjobItem")

                                    }}
                                    style={{
                                        backgroundColor: colors.primary,
                                        width: '60%',
                                        // alignSelf: 'center',
                                        alignItems: 'center',
                                        borderRadius: 7,
                                        marginTop: 10

                                    }}>
                                    <Text style={{
                                        padding: 5,
                                        color: 'white',
                                        fontSize: 12
                                    }}>Xem chi tiet</Text>
                                </TouchableOpacity>
                                <Text>{item.id}</Text>



                            </View>
                        </View>}
                    />
                </View>

        }




    </View>

}

export default ListJob;
