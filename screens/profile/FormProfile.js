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

const FormProfile = ({ navigation }) => {
  useEffect(() => {
    getProfile()
}, [])

  const [skill, setSkill] = useState('')
  const [des, setDes] = useState('')
  const [add, setAdd] = useState('')

  // const convert = (string)=>console.log(Array.from(string.split(',')))
  const [access, setAccess] = useState('')

  const [profile, setProfile] = useState([])

  const getProfile = async () => {
      try {
          const dataToken = await AsyncStorage.getItem('access');
          axios
              .get(
                  'https://spiderpig83.pythonanywhere.com/api/v1/self/profile',
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
                      
                      let profileData = res.data.profile
                      setProfile(profileData)

                  }


              })
              .catch(e => {
                  console.log(`get error error ${e}`);

              });
      } catch (error) {
          debugger
          throw error
      }

  };
      const { id, description, location, skills } = profile

  const saveJob = async () => {
    try {
      const dataToken = await AsyncStorage.getItem('access');
      // debugger
      axios
        .post('https://spiderpig83.pythonanywhere.com/api/v1/profile/create',
          {
            skills: skill,
            description: des,
            location: add,
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

  return (<View>
    aloo
    {!id == ""?
    
    <Text style={{
      color:'black'
    }}>DA co thong convertToString</Text>
    :
    <Text>chua co thong itn</Text>
    }
  </View>
    // <ScrollView>
    //   <View>
    //     <View style={{
    //       paddingHorizontal: 20,
    //       marginTop: 50,
    //     }}>


    //       <TextInput
    //         onChangeText={text => {
    //           setSkill((Array.from(text.split(','))))
    //         }}

    //         style={{
    //           // backgroundColor:'red',

    //           borderBottomWidth: 1,
    //           color: 'red',
    //           marginBottom: 10,

    //           justifyContent: 'flex-start'


    //         }}
    //         placeholder="Skill"
    //       />

    //       <TextInput
    //         onChangeText={text => {
    //           setDes((Array.from(text.split(','))))
    //         }} 
    //         style={{
    //           // backgroundColor:'red',

    //           borderBottomWidth: 1,
    //           color: 'red',
    //           marginBottom: 10,

    //           justifyContent: 'flex-start'


    //         }}
    //         placeholder="Description"
    //       />
    //       <TextInput
    //         onChangeText={text => {
    //           setAdd(text)
    //         }} 
    //         style={{
    //           // backgroundColor:'red',
    //           borderBottomWidth: 1,
    //           color: 'red',
    //           marginBottom: 10,
    //           justifyContent: 'flex-start'
    //         }}
    //         placeholder="Location"
    //       />

    //     </View>
    //     <View style={{
    //       width: '100%',
    //       // backgroundColor:'red',
    //       // height:100
    //       marginTop: 20
    //     }}>
    //       <TouchableOpacity

    //         onPress={() => {
    //           saveJob()
    //           navigation.navigate('Profile')
    //         }}
    //         style={{
    //           backgroundColor: colors.primary,
    //           // justifyContent:'center',
    //           // alignItems:'center',
    //           width: '60%',
    //           alignSelf: 'center',
    //           alignItems: 'center',
    //           borderRadius: 15
    //           // marginHorizontal:50 //can chinh le 2 ben theo chieu doc
    //         }}>
    //         <Text style={{
    //           padding: 10,
    //           color: 'white',
    //           fontSize: 14
    //         }}>Xac Nhan</Text>
    //       </TouchableOpacity>
    //     </View>
    //     <Text>{access}</Text>
    //   </View>
    // </ScrollView>


  )
}

export default FormProfile

