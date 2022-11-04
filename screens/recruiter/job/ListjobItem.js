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
    ScrollView, FlatList
} from 'react-native';
import { images, icons, colors } from '../../../constants/index';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {convertDateTimeToString2} from '../../../utilies/DateTime'
import Spinner from 'react-native-loading-spinner-overlay';


function ListjobItem({ navigation }, props) {
    let [isLoading, setIsLoading] = useState(true);

    //data job
    useEffect(() => {
        getListCompany()
    })

    //job
    const [user, setUser] = useState([])
    // const [companyId, setCompanyId] = useState('')
    const [total, setTotal] = useState([])

    const getListCompany = async () => {
        try {
            const dataToken = await AsyncStorage.getItem('access');
            const jobID = await AsyncStorage.getItem('JobId');
            axios
                .get(
                    `https://spiderpig83.pythonanywhere.com/api/v1/jobs/${jobID}/applied`,
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
                        let resJob = res.data
                        let totalUser = resJob.total
                        let userApplyJob = resJob.applied_jobs


                        setTotal(totalUser)
                        setUser(userApplyJob)
                        // debugger

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


    return (
        <View style={{ flex: 1 }}>
         <Spinner color='#00ff00' size={"large"} visible={isLoading} />
        <View style={{
            padding:20,
            justifyContent:'center',
            alignItems:'center'
        }}><Text style={{
            fontSize:20
        }}>Total candidate applied: {total}</Text></View>
            
            <View style={{
                width:'100%',
                height:10,
                backgroundColor:'gray'
            }} />

            <FlatList
                data={user}
                // keyExtractor={item => item.id}
                keyExtractor={(item, index) => `key-${index}`}
                renderItem={({ item }) => <View style={{
                    alignItems:'center',
                    padding:10
                }}>
                    <Text>Date applied: {convertDateTimeToString2(item.apply_date)}</Text>
                    <TouchableOpacity

                        onPress={() => {
                            // alert('xem chi tiet')
                            AsyncStorage.setItem("UserId", item.user_id)
                            AsyncStorage.setItem("IdJobApply", item.id)
                            navigation.navigate('ViewProfileUser')

                        }}
                        style={{
                            backgroundColor: colors.primary,
                            width: '40%',
                            // alignSelf: 'center',
                            alignItems: 'center',
                            borderRadius: 7,
                            marginTop: 10,
                            alignSelf:'center',
                            marginBottom:10

                        }}>
                        <Text style={{
                            padding: 5,
                            color: 'white',
                            fontSize: 12
                        }}>See Profile Details</Text>
                    </TouchableOpacity>
                    <Text style={{
                        fontWeight:'bold',
                        color:colors.primary
                    }}>Status: {item.status}</Text>
                    <View style={{
                        width:'100%',
                        height:1,
                        marginTop:10,
                        backgroundColor:'gray'
                    }} />
                </View>}
            />


        </View>
    );
}

export default ListjobItem;
