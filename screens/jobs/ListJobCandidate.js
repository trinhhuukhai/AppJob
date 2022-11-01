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

const ListJobCandidate = ({ navigation }, props) => {


  // const [companyId, setCompanyId] = useState('')
  // const dataToken = AsyncStorage.getItem('companyName');
  // let abc = []
  // abc.name = dataToken
  // debugger
  // console.log(dataToken)
  // setCompanyId(dataToken)


  //data job
  useEffect(() => {

    getListJob()

  }, [])

  // const [companyId, setCompanyId] = useState('')
  const [token, setToken] = useState('')
  const [cmpId, setCmpId] = useState('')




  //job
  const [jobOfCompany, setJobOfCompany] = useState([])
  const getListJob= async () => {
    try {
      const dataToken = await AsyncStorage.getItem('access');
      const companyId = await AsyncStorage.getItem('companyId');
      axios
        .get(
          `https://spiderpig83.pythonanywhere.com/api/v1/jobs`,
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
                width: '100%',
                height: 50,
                backgroundColor: colors.primary,
                justifyContent: 'center',
                alignItems: 'center'
            }}>
                <Text style={{
                    color: 'white',
                    fontSize: 16
                }}>Find Jobs</Text>
            </View>
            <View style={{ marginHorizontal: 10, marginVertical: 10, flexDirection: 'row', alignItems: 'center' }}>
                <Image
                    tintColor='black' //mau logo
                    source={icons.icon_search}
                    style={{
                        width: 15,
                        height: 15,
                        // backgroundColor:'red',
                        alignSelf: 'center',
                        position: 'absolute',
                        top: 14,
                        left: 10
                    }}
                />
                <TextInput
                    onChangeText={(text) => {
                        setSearchText(text)
                    }}
                    autoCorrect={false}
                    style={{
                        // backgroundColor: colors.inactive,
                        borderWidth: 1,
                        height: 46,
                        flex: 1,
                        marginEnd: 5,
                        borderRadius: 5,
                        opacity: 0.4,
                        padding: 10,
                        paddingStart: 30,
                        color: 'black',
                        fontWeight: 'bold'
                    }}

                    placeholder='Keywork skill (Java,..), Job Title, Company ...'
                />

            </View>

            <View style={{
                backgroundColor: colors.inactive,
                height: 10,
                justifyContent: 'center',
                alignItems: 'center',
                marginTop: 10
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
                  <Text key={ski.id} style={{
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
                  navigation.navigate('ListJobCandidateDetail')
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

export default ListJobCandidate
