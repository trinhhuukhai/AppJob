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
    FlatList,
} from 'react-native';
import { images, icons, colors } from '../../constants/index';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { convertDateTimeToString2 } from '../../utilies/DateTime'
import Spinner from 'react-native-loading-spinner-overlay';


//list view from a map of object
//Flatlist

function ApplyJob({ navigation }, props) {
    let [isLoading, setIsLoading] = useState(true);

    //data job
    useEffect(() => {
        getJobApply()
        // getListJobSave()
    })

    //job
    const [job, setJob] = useState([])
    const [total, setTotal] = useState('')

    // const [jobId, setjobId] = useState([])

    const getJobApply = async () => {
        try {
            const dataToken = await AsyncStorage.getItem('access');
            // setToken(dataToken)
            axios
                .get(
                    'https://spiderpig83.pythonanywhere.com/api/v1/self/jobs/applied',
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
                        let resJob = res.data.applied_jobs
                        let total = res.data.total
                        setTotal(total)
                        // let jd = resJob.job_id
                        // setjobId(resJob)

                        // debugger
                        setJob(resJob)
                        // debugger
                        // AsyncStorage.setItem("jobId", resJob.job_id)


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

    return <View style={{ flex: 1 }}>
        <Spinner color='#00ff00' size={"large"} visible={isLoading} />
        <View style={{
            height: 70,
            justifyContent: 'center',
            alignItems: 'center'
        }}>
            <Text style={{
                fontSize: 20,
                color: 'black',
                fontWeight: 'bold'
            }}>Applied Job ({total})</Text>
        </View>

        <View style={{ //line
            width: '100%',
            height: 10,
            backgroundColor: 'gray'
        }} />

        <FlatList
            data={job}
            keyExtractor={item => item.id}
            renderItem={({ item }) =>

                <View style={{
                    alignItems: 'center',
                    padding: 20
                }}>
                    <Text style={{
                        color: 'red',
                        fontSize: 18,
                        // marginBottom: 10
                    }}>Applied date: {convertDateTimeToString2(item.apply_date)}</Text>
                    <View style={{
                        flexDirection: 'row',
                        marginRight: 2
                    }}>

                    </View>
                    <TouchableOpacity

                        onPress={() => {
                            AsyncStorage.setItem("jobId", item.job_id)
                            navigation.navigate('ApplyJobItem')
                        }}
                        style={{
                            backgroundColor: colors.primary,
                            width: '50%',
                            // alignSelf: 'center',
                            alignItems: 'center',
                            borderRadius: 7,
                            marginTop: 10, marginBottom: 10

                        }}>
                        <Text style={{
                            padding: 5,
                            color: 'white',
                            fontSize: 12,

                        }}>See details</Text>
                    </TouchableOpacity>
                    <Text style={{
                        fontWeight:'bold'
                    }}>Status: {item.status}</Text>


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

}

export default ApplyJob;
