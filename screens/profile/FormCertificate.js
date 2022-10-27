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
import UiButton from '../../components'
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { convertToArray } from '../../utilies/Validation'

const FormCertificate = ({ navigation }) => {

    const [name, setName] = useState('')
    const [organization, setOrganization] = useState('')
    const [issue_date, setStart] = useState('')
    const [expire_date, setEnd] = useState('')

    // const convert = (string)=>console.log(Array.from(string.split(',')))
    const [access, setAccess] = useState('')


    const saveJob = async () => {
        try {
            const dataToken = await AsyncStorage.getItem('access');
            // debugger
            axios
                .post('https://spiderpig83.pythonanywhere.com/api/v1/self/certificate',
                    {
                        name: name,
                        issue_organization: organization,
                        issue_date: issue_date,
                        expire_date: expire_date
                    }, {
                    "headers": {
                        'Authorization': `Bearer ${dataToken}`,
                        'Content-Type': 'application/json',
                    }
                },)
                .then(res => {
                    console.log('them thanh cong')
             

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

    return (
        <ScrollView>
            <View>
                <View style={{
                    paddingHorizontal: 20,
                    marginTop: 50,
                }}>
                    <TextInput
                        onChangeText={text => {
                            setName(text);
                        }} //khi thay doi email/password cap nhap gia tri text
                        style={{
                            // backgroundColor:'red',
                            height: 40,
                            borderBottomWidth: 1,
                            color: 'red',
                            marginBottom: 10
                        }}
                        placeholder="Te chung chi"
                    />
                    <TextInput
                        onChangeText={text => {
                            setOrganization(text);
                        }} //khi thay doi email/password cap nhap gia tri text
                        style={{
                            // backgroundColor:'red',
                            height: 40,
                            borderBottomWidth: 1,
                            color: 'red',
                            marginBottom: 10
                        }}
                        placeholder="Ten trung tam"
                    />

                    <TextInput
                        onChangeText={text => {
                            setStart(text);
                        }} //khi thay doi email/password cap nhap gia tri text
                        style={{
                            // backgroundColor:'red',
                            height: 40,
                            borderBottomWidth: 1,
                            color: 'red',
                            marginBottom: 10
                        }}
                        placeholder="Ngay bat dau"
                    />
                    <TextInput
                        onChangeText={text => {
                            setEnd(text);
                        }} //khi thay doi email/password cap nhap gia tri text
                        style={{
                            // backgroundColor:'red',
                            height: 40,
                            borderBottomWidth: 1,
                            color: 'red',
                            marginBottom: 10
                        }}
                        placeholder="Ngay het han"
                    />

                </View>
                <View style={{
                    width: '100%',
                    // backgroundColor:'red',
                    // height:100
                    marginTop: 20
                }}>
                    <TouchableOpacity

                        onPress={() => {
                            saveJob()
                            navigation.navigate('Profile')
                        }}
                        style={{
                            backgroundColor: colors.primary,
                            // justifyContent:'center',
                            // alignItems:'center',
                            width: '60%',
                            alignSelf: 'center',
                            alignItems: 'center',
                            borderRadius: 15
                            // marginHorizontal:50 //can chinh le 2 ben theo chieu doc
                        }}>
                        <Text style={{
                            padding: 10,
                            color: 'white',
                            fontSize: 14
                        }}>Xac Nhan</Text>
                    </TouchableOpacity>
                </View>
                <Text>{access}</Text>
            </View>
        </ScrollView>


    )
}

export default FormCertificate

