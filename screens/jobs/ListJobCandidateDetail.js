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
import FoodItem from '../food/FoodItem';
import SelectList from 'react-native-dropdown-select-list'
import { Select } from '../../components'
import UiButton from '../../components';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ListJobCandidateDetail = () => {

    const [id, setId] = useState('')
    //data job
    useEffect(() => {
        getListCompany()
        // getJobiddd()
    }, [])


    const [jobInfo, setJobInfo] = useState([])
    const [jobName, setJobName] = useState([])
    const [location, setLocation] = useState([])
    const [datePoster, setDatePoster] = useState([])
    const [jobDescription, setJobDescription] = useState([])
    const [jobRequirement, setJobRequirement] = useState([])
    const [jobSkills, setJobSkills] = useState([])
    const [salaryMin, setSalaryMin] = useState([])
    const [salaryMax, setSalaryMax] = useState([])
    const [token, setToken] = useState('')
    const [jid, setJid] = useState('')

    const [jobId, setJobId] = useState('')

    const getListCompany = async () => {
        try {
            const dataToken = await AsyncStorage.getItem('access');
            const jobid = await AsyncStorage.getItem('jobId');
            setToken(dataToken)
            setJid(jobid)
            axios
                .get(
                    `https://spiderpig83.pythonanywhere.com/api/v1/job/${jobid}`,
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
                        let resJob = res.data
                        let nameJob = resJob.title
                        let locationName = resJob.location
                        let datePost = resJob.date_posted
                        let jobDes = resJob.description
                        let jobRequi = resJob.requirements
                        let jobSkill = resJob.skills
                        let salaryMin = resJob.salary_range_min
                        let salaryMax = resJob.salary_range_max
                        let joId = resJob.id
                        // debugger

                        setJobName(nameJob)
                        setLocation(locationName)
                        setDatePoster(datePost)
                        setJobDescription(jobDes)
                        setJobRequirement(jobRequi)
                        setJobSkills(jobSkill)
                        setSalaryMin(salaryMin)
                        setSalaryMax(salaryMax)
                        setJobId(joId)
                        // debugger          
                        setJobInfo(resJob)
                        // debugger

                    }
                })
                .catch(e => {
                    console.log(`get error error ${e}`);
                    debugger
                });
        } catch (error) {
            // debugger
            throw error
        }
    };


    const saveJob = async () => {
        try {
            // const dataToken = await AsyncStorage.getItem('access');
            // const jobId = await AsyncStorage.getItem('jobId');
            // debugger
            axios
                .post('https://spiderpig83.pythonanywhere.com/api/v1/self/jobs/saved',
                    {
                        job_id: jid
                    }, {
                    "headers": {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    }
                },)
                .then(res => {
                    alert('Save khong thanh cong')

                })
                .catch(e => {
                    alert("Save không thành công!!")
                    console.log(`post error ${e}`);
                    // debugger

                });
        } catch (error) {
            throw error
        }

    };

    const ApplyJob = async () => {
        try {
            // const dataToken = await AsyncStorage.getItem('access');
            // const jobId = await AsyncStorage.getItem('jobId');
            // debugger
            axios
                .post('https://spiderpig83.pythonanywhere.com/api/v1/self/jobs/applied',
                    {
                        job_id: jid
                    }, {
                    "headers": {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    }
                },)
                .then(res => {
                    alert('Apply thanh cong')

                })
                .catch(e => {
                    alert("Apply không thành công!!")
                    console.log(`post error ${e}`);
                    // debugger

                });
        } catch (error) {
            throw error
        }

    };


    //   const { namejo } = jobName
    return (
        <View style={{ flex: 1, backgroundColor: 'white' }}>
            <View style={{
                // justifyContent:'center',
                alignItems: 'center',
                marginTop: 20

            }}>
                <Text style={{
                    fontSize: 20,
                    textAlign: 'center',
                    color: 'black',
                    fontWeight: 'bold'

                }}>{jobName}</Text>
            </View>
            <View style={{
                flexDirection: 'row',
                marginTop: 10,
                marginHorizontal: 10
            }}>
                <TouchableOpacity


                    onPress={() => {
                        saveJob()
                    }}
                    style={{
                        backgroundColor: colors.primary,
                        //   width: '60%',
                        alignSelf: 'center',
                        alignItems: 'center',
                        borderRadius: 7,
                        marginTop: 10,
                        flex: 1,
                        marginRight: 10

                    }}>
                    <Text style={{
                        padding: 10,
                        color: 'white',
                        fontSize: 12
                    }}>Save</Text>
                </TouchableOpacity>
                <TouchableOpacity

                    onPress={() => {
                        ApplyJob()
                    }}
                    style={{
                        backgroundColor: colors.primary,
                        //   width: '60%',
                        alignSelf: 'center',
                        alignItems: 'center',
                        borderRadius: 7,
                        marginTop: 10,
                        flex: 1

                    }}>
                    <Text style={{
                        padding: 10,
                        color: 'white',
                        fontSize: 12
                    }}>Apply Now</Text>
                </TouchableOpacity>
            </View>

            <View style={{
                width: '100%',
                height: 1,
                backgroundColor: 'gray',
                marginTop: 20
            }} />
            <View style={{
                flexDirection: 'row',
                alignItems: "center",
                marginTop: 10,
                marginLeft: 20,
                marginBottom: 5
            }}>
                <Image source={icons.icon_maps} style={{
                    width: 15,
                    height: 15,
                    marginRight: 5
                }} />
                <Text>{location}</Text>
            </View>
            <View style={{
                flexDirection: 'row',
                alignItems: "center",
                marginTop: 5,
                marginLeft: 20
            }}>
                <Image source={icons.icon_calendar_info} style={{
                    width: 15,
                    height: 15,
                    marginRight: 5
                }} />
                <Text>{datePoster}</Text>
            </View>

            <View style={{
                width: '100%',
                height: 1,
                backgroundColor: 'gray',
                marginTop: 10
            }} />


            <ScrollView style={{

            }}>


                <View style={{
                    padding: 10
                }}>
                    <Text style={{
                        fontSize: 20,
                        color: 'black',
                        marginBottom: 5
                    }}>Job Description</Text>


                    <FlatList
                        data={jobDescription}
                        keyExtractor={item => item.id}
                        renderItem={({ item }) => <View style={{
                            marginLeft: 10
                        }}>
                            <Text key={item.id}  style={{
                                marginTop: 10
                            }}>- {item}</Text>
                        </View>}
                    />

                    <View style={{
                        width: '100%',
                        height: 1,
                        backgroundColor: colors.primary,
                        marginTop: 20
                    }} />
                </View>

                <View style={{
                    padding: 10
                }}>
                    <Text style={{
                        fontSize: 20,
                        color: 'black',
                        marginBottom: 5
                    }}>Requirements</Text>
                    <FlatList
                        data={jobRequirement}
                        keyExtractor={item => item.id}
                        renderItem={({ item }) => <View  style={{
                            marginLeft: 10
                        }}>
                            <Text key={item.id} style={{
                                marginTop: 10
                            }}>- {item}</Text>
                        </View>}
                    />
                    <View style={{
                        width: '100%',
                        height: 1,
                        backgroundColor: colors.primary,
                        marginTop: 20
                    }} />
                </View>

                <View style={{
                    padding: 10
                }}>
                    <Text style={{
                        fontSize: 20,
                        color: 'black',
                        marginBottom: 5
                    }}>Skills</Text>
                    <FlatList
                        data={jobSkills}
                        keyExtractor={item => item.id}
                        renderItem={({ item }) => <View style={{
                            marginLeft: 10
                        }}>
                            <Text key={item.id} style={{
                                marginTop: 10
                            }}>- {item}</Text>
                        </View>}
                    />
                    <View style={{
                        width: '100%',
                        height: 1,
                        backgroundColor: colors.primary,
                        marginTop: 20
                    }} />
                </View>

                <View style={{
                    padding: 10
                }}>
                    <Text style={{
                        fontSize: 20,
                        color: 'black',
                        marginBottom: 5
                    }}>Salary</Text>
                    <View style={{
                        marginLeft: 10
                    }}>
                        <Text style={{
                            marginTop: 10
                        }}>{salaryMin} - {salaryMax} VND</Text>
                    </View>

                    <View style={{
                        width: '100%',
                        height: 1,
                        backgroundColor: colors.primary,
                        marginTop: 20
                    }} />
                </View>
            </ScrollView>






        </View>
    )
}

export default ListJobCandidateDetail
