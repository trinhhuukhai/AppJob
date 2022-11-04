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
import SelectList from 'react-native-dropdown-select-list';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';


function CreateCompany({ navigation }, props) {zz

  const [city, setCity] = useState("")
  const [nameC, setNameC] = useState("")
  const [businessMin, setBusinessMin] = useState("")
  const [businessMax, setBusinessMax] = useState("")

  useEffect(() => {
    getCity()
  })

  const [cities, setCities] = useState([])
  const [token, setToken] = useState('')

  // const.log(result)
  const getCity = async () => {
    try {
      let result = []

      const dataToken = await AsyncStorage.getItem('access');
      setToken(dataToken)
      axios
        .get(
          `https://spiderpig83.pythonanywhere.com/api/v1/cities`,
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
            let CityName = res.data.cities


            CityName.forEach(function (item) {
              let object = {}

              object.key = item['id']
              object.value = item['name']
              result.push(object)


            })
            setCities(result)
          }
        })
        .catch(e => {
          console.log(`get city  error ${e}`);
        });
    } catch (error) {
      // debugger
      throw error
    }
  };

  const createCompany =  () => {
    try {
      // const dataToken = await AsyncStorage.getItem('access');

      // debugger
      axios
        .post('https://spiderpig83.pythonanywhere.com/api/v1/companies',
          {
            name: nameC,
            city_id: city,
            business_size_min: businessMin,
            business_size_max: businessMax,
          }, {
          "headers": {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          }
        },)
        .then(res => {
          console.log('them thanh cong')
          // debugger

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
      <View style={{
        paddingHorizontal: 20,
        marginTop: 20,
      }}>
        <Text style={{
          fontSize: 20,
          alignSelf: 'center',
          color: colors.primary
        }}>Create new company</Text>

        <SelectList
          boxStyles={{ marginTop: 20 }}
          setSelected={setCity}
          data={cities}
          placeholder={"Chon thanh pho"}
        />
        <TextInput
          onChangeText={text => {
            setNameC(text);
          }}
          style={{
            // backgroundColor:'red',
            height: 40,
            marginTop: 10,
            borderBottomWidth: 1,
            color: 'red',
            marginBottom: 10
          }}
          placeholder="Name"
        />
        <TextInput
          onChangeText={text => {
            setBusinessMin(text);
          }}
          style={{
            height: 40,
            borderBottomWidth: 1,
            color: 'red',
            marginBottom: 10
          }}
          placeholder="Business size min"
        />
        <TextInput
          onChangeText={text => {
            setBusinessMax(text);
          }}
          style={{
            // backgroundColor:'red',
            height: 40,
            borderBottomWidth: 1,
            color: 'red',
            marginBottom: 10
          }}
          placeholder="Business size max"
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
           
            createCompany()
            alert("Them moi cong ty thanh cong")
            navigation.navigate('Company')
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
          }}>Create</Text>
        </TouchableOpacity>
      </View>

    </ScrollView>

  )
}

export default CreateCompany
