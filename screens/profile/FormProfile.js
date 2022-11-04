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
  Button
} from 'react-native';
import { images, icons, colors } from '../../constants/index';
import FoodItem from '../food/FoodItem';
import SelectList from 'react-native-dropdown-select-list'
import { Select } from '../../components'
import UiButton from '../../components'
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { convertToArray } from '../../utilies/Validation'
import { launchImageLibrary } from 'react-native-image-picker';
import Spinner from 'react-native-loading-spinner-overlay';


const FormProfile = ({ navigation }) => {

  let [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getProfile()
  }, [])

  const [skill, setSkill] = useState('')
  const [des, setDes] = useState('')
  const [add, setAdd] = useState('')

  // const convert = (string)=>console.log(Array.from(string.split(',')))
  const [token, setToken] = useState('')

  const [profile, setProfile] = useState([])

  const getProfile = async () => {
    try {
      const dataToken = await AsyncStorage.getItem('access');
      setToken(dataToken)
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
            setIsLoading(false)

            let profileData = res.data.profile
            setProfile(profileData)

          }


        })
        .catch(e => {
          setIsLoading(false)
          console.log(`get error error ${e}`);

        });
    } catch (error) {
      debugger
      throw error
    }

  };
  const { id, description, location, skills } = profile

  const createProfile = () => {
    try {
      axios
        .post('https://spiderpig83.pythonanywhere.com/api/v1/profile/create',
          {
            skills: skill,
            description: des,
            location: add
            
          }, {
          "headers": {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          }
        },)
        .then(res => {
          setIsLoading(false)
          console.log('them thanh cong')

        })
        .catch(e => {
          setIsLoading(false)
          alert("Save không thành công!!")
          console.log(`post error ${e}`);

        });
    } catch (error) {
      throw error
    }

  };
  const [uri, setUri] = useState("")
  const [base, setBase] = useState("")
  const [file, setFile] = useState('')
  const handleChoosePhoto = () => {
    let option = {
      mediaType: 'photo',
      includeBase64: true,
      
      maxHeight: 200,
      maxWidth: 200
    }

    launchImageLibrary(option, (response) => {
      console.log(response);
      if (response) {
        let data = response.assets[0].fileName
        let uri = response.assets[0].uri
        // setFile(data)
        // setPhoto(abc);
        // console.log(abc)
        debugger
      }
    })
  };


  return (<View>
  <Spinner color='#00ff00' size={"large"} visible={isLoading} />
    {!id == "" ?

      (<ScrollView>
        <View>
          <View style={{
            paddingHorizontal: 20,
            marginTop: 50,
          }}>


            <TextInput
              onChangeText={text => {
                setSkill((Array.from(text.split(','))))
              }}

              style={{
                // backgroundColor:'red',

                borderBottomWidth: 1,
                color: 'red',
                marginBottom: 10,

                justifyContent: 'flex-start'


              }}
              placeholder={skills.toString()}
              placeholderTextColor={'red'}
            // value={skills.toString()}
            />

            <TextInput
              onChangeText={text => {
                setDes((Array.from(text.split(','))))
              }}
              style={{
                // backgroundColor:'red',

                borderBottomWidth: 1,
                color: 'red',
                marginBottom: 10,

                justifyContent: 'flex-start'


              }}
              placeholder={description.toString()}
              placeholderTextColor={'red'}
            />
            <TextInput
              onChangeText={text => {
                setAdd(text)
              }}
              style={{
                // backgroundColor:'red',
                borderBottomWidth: 1,
                color: 'red',
                marginBottom: 10,
                justifyContent: 'flex-start'
              }}
              placeholder={location}
              placeholderTextColor={'red'}
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
                createProfile()
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
              }}>Change</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>)
      :
      (<ScrollView>
        <View>
          <View style={{
            paddingHorizontal: 20,
            marginTop: 50,
          }}>


            <TextInput
              onChangeText={text => {
                setSkill((Array.from(text.split(','))))
              }}

              style={{
                // backgroundColor:'red',

                borderBottomWidth: 1,
                color: 'red',
                marginBottom: 10,

                justifyContent: 'flex-start'


              }}
              placeholder='Kỹ năng'
            // placeholderTextColor={'red'}
            // value={skills.toString()}
            />

            <TextInput
              onChangeText={text => {
                setDes((Array.from(text.split(','))))
              }}
              style={{
                // backgroundColor:'red',

                borderBottomWidth: 1,
                color: 'red',
                marginBottom: 10,

                justifyContent: 'flex-start'


              }}
              placeholder='Thông tin thêm'
            // placeholderTextColor={'red'}
            />
            <TextInput
              onChangeText={text => {
                setAdd(text)
              }}
              style={{
                // backgroundColor:'red',
                borderBottomWidth: 1,
                color: 'red',
                marginBottom: 10,
                justifyContent: 'flex-start'
              }}
              placeholder='Địa chỉ'
            // placeholderTextColor={'red'}
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
                createProfile()
                navigation.navigate('Profile')
              }}
              style={{
                backgroundColor: colors.primary,
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
              }}>Lưu</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>)
    }
  </View>



  )
}

export default FormProfile

