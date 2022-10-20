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

const FormExperience = () => {
    return (
        <View>
            <View style={{
                paddingHorizontal: 20,
                marginTop: 50,
            }}>
                <TextInput
                    style={{
                        // backgroundColor:'red',
                        height: 40,
                        borderBottomWidth: 1,
                        color: 'red',
                        marginBottom: 10
                    }}
                    placeholder="Cong viec da lam"
                />
                <TextInput

                    style={{
                        // backgroundColor:'red',
                        height: 40,
                        borderBottomWidth: 1,
                        color: 'red',
                        marginBottom: 10
                    }}
                    placeholder="Ten cong ty"
                />
                <TextInput
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
                    placeholder="Mo ta cong viec da lam"
                />
                <TextInput
                    style={{
                        // backgroundColor:'red',
                        height: 40,
                        borderBottomWidth: 1,
                        color: 'red',
                        marginBottom: 10
                    }}
                    placeholder="Dia chi lam viec"
                />
                <TextInput
                    style={{
                        // backgroundColor:'red',
                        height: 40,
                        borderBottomWidth: 1,
                        color: 'red',
                        marginBottom: 10
                    }}
                    placeholder="Ngay bat dau cong viec"
                />
                <TextInput
                    style={{
                        // backgroundColor:'red',
                        height: 40,
                        borderBottomWidth: 1,
                        color: 'red',
                        marginBottom: 10
                    }}
                    placeholder="Ngay ket thuc cong viec"
                />
              
            </View>
            <View style={{
                width:'100%',
                // backgroundColor:'red',
                // height:100
                marginTop:20
            }}>
                <TouchableOpacity
                  
                    // onPress={() => {
                    //     navigate('UITabs')
                    // }}
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

        </View>

    )
}

export default FormExperience

