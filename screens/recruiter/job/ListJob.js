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
import { images, icons, colors } from '../../../constants/index';
import ListjobItem from './ListjobItem';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SwipeListView } from 'react-native-swipe-list-view';

export default function ListJob({navigation}) {


    //data job
    useEffect(() => {
        getListJob();
    }, []);

    //job
    const [job, setJob] = useState([]);
    const [totals, setTotals] = useState('');

    const getListJob = async () => {
        try {
            const dataToken = await AsyncStorage.getItem('access');
            const idComp = await AsyncStorage.getItem('idCompany');
            axios
                .get(
                    `https://spiderpig83.pythonanywhere.com/api/v1/company/${idComp}/jobs`,
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
                        let resJob = res.data.jobs;
                        let total = res.data.total;
                        // debugger
                        setTotals(total);
                        setJob(resJob);
                        // debugger
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

    const deleteJob = async (job_id) => {
        try {
            const dataToken = await AsyncStorage.getItem('access');
            axios
                .delete(
                    `https://spiderpig83.pythonanywhere.com/api/v1/job/${job_id}`,
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

    const [listData, setListData] = useState(
        Array(20)
            .fill('')
            .map((_, i) => ({ key: `${i}`, text: `item #${i}` }))
    );


    const deleteRow = (rowMap, rowKey) => {
        const prevIndex = job.findIndex(item => item.id === rowKey);
        deleteJob(rowKey)
        const newData = [...job];
        newData.splice(prevIndex, 1);
        setJob(newData);
    };

    const onRowDidOpen = rowKey => {
        console.log('This row opened', rowKey);
    };
    const renderItem = data => (
        <TouchableHighlight
            onPress={() => console.log('You touched me')}
            style={styles.rowFront}
            underlayColor={'#AAA'}
        >
            <View style={{
                flexDirection: 'row',
                // justifyContent:'center',
                padding: 20
            }}>
                <Image
                    style={{
                        width: 100,
                        height: 100,
                        // marginRight: 30,
                      
                    }} source={{
                        uri: 'https://virama.vn/wp-content/uploads/2021/04/z2457798763776_fa747346d3bb19417e576d642ab6fd2e-scaled.jpg'
                    }} />
                <View style={{
                    // marginLeft:30,
                    paddingHorizontal:10,
                    // marginStart:20
                    // backgroundColor:'red',
                    width:'82%',
                   
                }}>
                    <Text style={{
                        color: 'red',
                        fontSize: 18,
                        marginBottom: 10,
                        // marginLeft:30
                    }}>{data.item.title}</Text>
                    <View style={{
                        flexDirection: 'row',
                        marginRight: 2
                        // justifyContent:'center',
                        // justifyContent: 'space-around',
                        // backgroundColor: 'red',
                        // flex:1,
                        // width: '100%'
                    }}>
                        {data.item.skills?.map((ski, i) =>
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
                            AsyncStorage.setItem("JobId", data.item.id)
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
                    <Text>{data.item.id}</Text>



                </View>
            </View>
        </TouchableHighlight>
    );

    const renderHiddenItem = (data, rowMap) => (
        <View style={styles.rowBack}>
            <TouchableOpacity
                style={[styles.backRightBtn, styles.backRightBtnRight]}
                onPress={() => deleteRow(rowMap, data.item.id)}
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
        <View style={styles.container}>
            {totals === 0 ? (
                <View>
                    <Text
                        style={{
                            fontSize: 18,
                            color: colors.primary,
                            alignSelf: 'center',
                        }}>
                        Chua co cong viec nao duoc tao
                    </Text>
                </View>
            ) : (
                <View>
                    <View
                        style={{
                            padding: 10,
                            flexDirection: 'row',
                            justifyContent: 'center',
                        }}>
                        <Text
                            style={{
                                color: 'black',
                                fontSize: 20,
                            }}>
                            Danh sach cong viec
                        </Text>
                    </View>
                    <View
                        style={{
                            width: '100%',
                            height: 5,
                            backgroundColor: 'gray',
                        }}
                    />
                </View>


            )}
            <SwipeListView
                data={job}
                renderItem={renderItem}
                renderHiddenItem={renderHiddenItem}
                rightOpenValue={-75}
                previewRowKey={'1'}
                previewOpenValue={-40}
                previewOpenDelay={3000}
                onRowDidOpen={onRowDidOpen}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        flex: 1,
        paddingVertical: 20
    },
    backTextWhite: {
        color: '#FFF',
    },
    rowFront: {
        alignItems: 'center',
        backgroundColor: 'white',
        borderBottomColor: 'black',
        borderBottomWidth: 1,
        justifyContent: 'center',
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
        backgroundColor: colors.primary,
        right: 0,
    },
});
