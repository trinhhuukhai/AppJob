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
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const JobListItem = ({ navigation }, props) => {


  // const [companyId, setCompanyId] = useState('')
  // const dataToken = AsyncStorage.getItem('companyName');
  // let abc = []
  // abc.name = dataToken
  // debugger
  // console.log(dataToken)
  // setCompanyId(dataToken)


  //data job
  useEffect(() => {


    getInfoCompany()
    getListCompany()
    getCity()

    // getCopanyName()
  }, [])

  // const [nameCopany, setNameCompany] = useState()
  // const getCopanyName = async () =>{
  //   const nameComp = await AsyncStorage.getItem('companyName');
  //   setNameCompany(nameComp)
  //   // let compa = {}
  //   // compa.name = nameComp
  //   // debugger  

  // }

  //info company
  //job
  const [infoCompany, setInfoConpany] = useState([])
  // const [companyId, setCompanyId] = useState('')

  const getInfoCompany = async () => {
    try {
      const dataToken = await AsyncStorage.getItem('access');
      const companyId = await AsyncStorage.getItem('companyId');
      axios
        .get(
          `https://spiderpig83.pythonanywhere.com/api/v1/company/${companyId}`,
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
            let info = {}
            info.nameCompany = resJob.name
            info.Min = resJob.business_size_min
            info.Max = resJob.business_size_max
           

            setInfoConpany(info)
            // debugger
            AsyncStorage.setItem("idCity", resJob.city_id)

          }
        })
        .catch(e => {
          console.log(`get error error ${e}`);
        });
    } catch (error) {
      // debugger
      throw error
    }
  }
  const { nameCompany, Min, Max } = infoCompany

  const [city, setCity] = useState([])
  // const [companyId, setCompanyId] = useState('')

  const getCity = async () => {
    try {
      const dataToken = await AsyncStorage.getItem('access');
      const idCity = await AsyncStorage.getItem('idCity');
      axios
        .get(
          `https://spiderpig83.pythonanywhere.com/api/v1/city/${idCity}`,
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
            let rescity = res.data.name

            setCity(rescity)
            // debugger

            // debugger

          }
        })
        .catch(e => {
          console.log(`get error error ${e}`);
        });
    } catch (error) {
      // debugger
      throw error
    }
  };

  // const{namecity} = city



  //job
  const [jobOfCompany, setJobOfCompany] = useState([])
  // const [companyId, setCompanyId] = useState('')

  const getListCompany = async () => {
    try {
      const dataToken = await AsyncStorage.getItem('access');
      const companyId = await AsyncStorage.getItem('companyId');
      axios
        .get(
          `https://spiderpig83.pythonanywhere.com/api/v1/company/${companyId}/jobs`,
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
            let resJob = res.data.jobs
            setJobOfCompany(resJob)
            // debugger

          }
        })
        .catch(e => {
          console.log(`get error error ${e}`);
        });
    } catch (error) {
      // debugger
      throw error
    }
  };



  return (
    <View style={{ flex: 1, backgroundColor: 'white' }}>
      <View style={{
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
        // marginHorizontal:20,
        // backgroundColor: 'red',
        padding: 10
      }}>
        <Image
          style={{
            width: 100,
            height: 100,

          }} source={{
            uri: 'https://virama.vn/wp-content/uploads/2021/04/z2457798763776_fa747346d3bb19417e576d642ab6fd2e-scaled.jpg'
          }} />
        <Text style={{
          fontSize: 20,
          marginLeft: 5,
          fontWeight: 'bold',
          flex: 1, flexWrap: 'wrap',
          textAlign: 'center'
        }}>{nameCompany}</Text>

      </View>

      <View style={{
        flexDirection: 'row',
        justifyContent: 'space-around',
        // padding:10
        paddingHorizontal: 10,
        marginBottom: 5,
        // backgroundColor:'red',

      }}>
        <View style={{

          flex: 1,
          flexDirection: 'row',
          alignItems: 'center',
          marginRight: 50
        }}>
          <Image style={{
            width: 15,
            height: 15,
            marginRight: 8
          }} source={icons.icon_maps} />
          <Text>{city}</Text>
        </View>
        <View style={{

          flex: 1,
          flexDirection: 'row',
          alignItems: 'center',
          marginRight: 50
        }}>
          <Image style={{
            width: 15,
            height: 15,
            marginRight: 8
          }} source={icons.icon_couple_users} />
          <Text>{Min} - {Max}</Text>
        </View>
      </View>

      <View style={{ //line
        width: '100%',
        height: 10,
        backgroundColor: 'gray'
      }} />

      <FlatList
        data={jobOfCompany}

        keyExtractor={item => item.id}
        renderItem={({ item }) => <View style={{
          // flexDirection: 'row',
          padding: 20
        }}>
          <View style={{
            flexDirection: 'row'
          }}>
            <Image
              style={{
                width: 100,
                height: 100,
                marginRight: 30,
              }} source={{
                uri: 'https://virama.vn/wp-content/uploads/2021/04/z2457798763776_fa747346d3bb19417e576d642ab6fd2e-scaled.jpg'
              }} />
            <View style={{
            }}>
              <Text style={{
                color: 'red',
                fontSize: 18,
                marginBottom: 10
              }}>{item.title}</Text>
              <View style={{
                flexDirection: 'row',
                marginRight: 2
              }}>
                {item.skills.map((ski) =>
                  <Text style={{
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
                  AsyncStorage.setItem("jobId", item.id)
                  navigation.navigate('JobDetail')
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
                  fontSize: 12
                }}>Xem chi tiet</Text>
              </TouchableOpacity>
              <Text>{item.id}</Text>
            </View>
          </View>
          <View style={{
            width: "100%",
            height: 1,
            backgroundColor: 'gray',
            marginTop: 10
          }} />
        </View>

        }
      />
    </View>
  )
}

export default JobListItem
