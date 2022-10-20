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

const FormEducation = () => {

    const [school_name, setName] = useState('')
    const [field_of_study, setField] = useState('')
    const [description, setDescription] = useState('')
    const [start_date, setStart] = useState('')
    const [end_date, setEnd] = useState('')

    // const convert = (string)=>console.log(Array.from(string.split(',')))
    const [access, setAccess] = useState('')


    useEffect(() => {
        handleGetToken();
    }, [handleGetToken]);

    const handleGetToken = async () => {
        const accessApi = await AsyncStorage.getItem("access");
        setAccess(accessApi)
    };

    const data = [
        school_name,
        field_of_study,
        description,
        start_date, end_date
    ]
     const postData = ()=>{
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${access}`
          }
          
          axios.post('https://spiderpig83.pythonanywhere.com/api/v1/self/education', data, {
              headers: headers
            })
            .then((response) => {
                debugger
                console.log(response)

            })
            .catch((error) => {
                console.log(`ep: ${error}`)
            })
     }


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
                        placeholder="Ten truong"
                    />
                    <TextInput
                        onChangeText={text => {
                            setField(text);
                        }} //khi thay doi email/password cap nhap gia tri text
                        style={{
                            // backgroundColor:'red',
                            height: 40,
                            borderBottomWidth: 1,
                            color: 'red',
                            marginBottom: 10
                        }}
                        placeholder="Ten chuyen nganh"
                    />
                    <TextInput
                        onChangeText={text => {
                            setDescription((Array.from(text.split(','))))
                            console.log(description)
                        }} //khi thay doi email/password cap nhap gia tri text
                        multiline={true}
                        numberOfLines={10}
                        style={{
                            // backgroundColor:'red',
                            height: 40,
                            borderBottomWidth: 1,
                            color: 'red',
                            marginBottom: 10,
                            height: 100,
                            justifyContent: 'flex-start'


                        }}
                        placeholder="Mo ta hoc van"
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
                        placeholder="Ngay bat dau hoc"
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
                        placeholder="Ngay ket thuc hoc"
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
                            postData()
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

export default FormEducation
