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
import { images, icons, colors } from '../../constants/index';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SwipeListView } from 'react-native-swipe-list-view';
import { convertDateTimeToString2 } from '../../utilies/DateTime'
import Spinner from 'react-native-loading-spinner-overlay';

//list view from a map of object
//Flatlist

function SaveJob({ navigation }, props) {
    let [isLoading, setIsLoading] = useState(true);

    //data job
    useEffect(() => {
        getJobSave();
    })

    //job
    const [job, setJob] = useState([])
    // const [jobId, setjobId] = useState([])
    const [total, setTotal] = useState('')

    const getJobSave = async () => {
        try {
            const dataToken = await AsyncStorage.getItem('access');
            axios
                .get(
                    'https://spiderpig83.pythonanywhere.com/api/v1/self/jobs/saved',
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
                        let resJob = res.data.saved_jobs
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
                    setIsLoading(false)
                    console.log(`get error error ${e}`);
                });
        } catch (error) {
            // debugger
            throw error
        }
    };

    //deleteEducation
    const deleteSaveJob = async (saved_job_id) => {
        try {
            const dataToken = await AsyncStorage.getItem('access');
            axios
                .delete(
                    `https://spiderpig83.pythonanywhere.com/api/v1/self/job/${saved_job_id}/saved`,
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
                        setIsLoading(false)
                        alert('Xóa thành công')
                    }
                })
                .catch(e => {
                    setIsLoading(false)
                    // debugger
                    let abc = false;


                    // console.log(`get jobs error ${e}`);
                });
        } catch (error) {
            // debugger
            throw error;
        }
    };

    //save job
    const deleteRowSave = (rowMap, rowKey) => {
       
        const prevIndex = job.findIndex(item => item.id === rowKey);
        deleteSaveJob(rowKey)
        const newData = [...job];
        newData.splice(prevIndex, 1);
        setJob(newData);
        setIsLoading(false)
    };

    const onRowDidOpen = rowKey => {
        console.log('This row opened', rowKey);
    };

    const renderItemSaveJob = data => (

        <TouchableHighlight
            onPress={() => console.log('You touched me')}
            style={styles.rowFront}
            underlayColor={colors.primary}
        >
            <View style={{
                alignItems: 'center',
                padding: 20
            }}>
                <Text style={{
                    color: 'red',
                    fontSize: 18,
                    marginBottom: 10
                }}>Saved date: {convertDateTimeToString2(data.item.save_date)}</Text>
                <View style={{
                    flexDirection: 'row',
                    marginRight: 2
                }}>

                </View>
                <TouchableOpacity

                    onPress={() => {
                        AsyncStorage.setItem("jobId", data.item.job_id)
                        navigation.navigate('SaveJobItem')
                    }}
                    style={{
                        backgroundColor: colors.primary,
                        width: '50%',
                        // alignSelf: 'center',
                        alignItems: 'center',
                        borderRadius: 7,
                        marginTop: 10

                    }}>
                    <Text style={{
                        padding: 5,
                        color: 'white',
                        fontSize: 13
                    }}>See details</Text>
                </TouchableOpacity>
            </View>
        </TouchableHighlight>
    );
    const renderHiddenItemSaveJob = (data, rowMap) => (
        <View style={styles.rowBack}>
            <Spinner color='#00ff00' size={"large"} visible={isLoading} />
            <TouchableOpacity
                style={[styles.backRightBtn, styles.backRightBtnRight]}
                onPress={() => deleteRowSave(rowMap, data.item.id)}
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
    //data job


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
            }}>Saved Job ({total})</Text>
        </View>

        <View style={{ //line
            width: '100%',
            height: 10,
            backgroundColor: 'gray'
        }} />
        <SwipeListView
            data={job}
            renderItem={renderItemSaveJob}
            renderHiddenItem={renderHiddenItemSaveJob}
            rightOpenValue={-75}
            previewRowKey={'0'}
            previewOpenValue={-40}
            previewOpenDelay={3000}
            onRowDidOpen={onRowDidOpen}
        />
    </View>

}

export default SaveJob;

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
        // backgroundColor: 'colors.primary',
        right: 0,
    },
});
