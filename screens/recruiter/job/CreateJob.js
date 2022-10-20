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
  Picker,
  SafeAreaView
} from 'react-native';
import { images, icons, colors } from '../../../constants/index';



const CreateJob = () => {
  return (
      <ScrollView>
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
            placeholder="Title"
          />
          <TextInput
            style={{
              // backgroundColor:'red',
              height: 40,
              borderBottomWidth: 1,
              color: 'red',
              marginBottom: 10
            }}
            placeholder="salary_range_min"
          />
          <TextInput
            style={{
              // backgroundColor:'red',
              height: 40,
              borderBottomWidth: 1,
              color: 'red',
              marginBottom: 10
            }}
            placeholder="salary_range_max"
          />
          <TextInput
            style={{
              // backgroundColor:'red',
              height: 40,
              borderBottomWidth: 1,
              color: 'red',
              marginBottom: 10
            }}
            placeholder="location"
          />

        </View>

        <View style={{
          width: '100%',
          // backgroundColor:'red',
          // height:100
          marginTop: 20
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
            }}>Create</Text>
          </TouchableOpacity>
        </View>

      </ScrollView>

  )
}

export default CreateJob
