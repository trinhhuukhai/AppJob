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
} from 'react-native';
import { Icon } from 'react-native-vector-icons/Icon';
import { SafeAreaView } from 'react-navigation';
import { images, icons, colors } from '../../../constants/index';
import { convertDateTimeToString } from '../../../utilies/DateTime'
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ProfileCandidate = () => {

  //data job
  useEffect(() => {
    getListCompany()
  }, [])

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
    <ScrollView>
      <View style={{
        flex: 1
      }}>

        <View style={{
          // marginHorizontal: 10,
          flexDirection: 'row',
          marginTop: 20,
          // justifyContent:'center',
          marginLeft: 10,
          alignItems: 'center'
        }}>
          <Image source={images.profile_user} style={{
            width: 100,
            height: 100,
            borderRadius: 100,
            marginRight: 20
            // marginTop: -50
          }} />
          <View style={{
            // flexWrap:'wrap'b
            // backgroundColor:'blue',
            // marginRight:40,
            width: '60%'
          }}>
            <Text style={{
              fontSize: 18,
              fontWeight: 'bold',
              marginTop: 10,
              color: 'black'
            }}>Khuat Van Manh</Text>
            <Text style={{ color: 'black', marginBottom: 5, fontWeight: '500' }}>Software Engineer</Text>
            <Text style={{ color: 'black', marginBottom: 5 }}>Skill: Java, Swift, Git</Text>
            <Text style={{
              fontSize: 14,
              color: 'black',
              alignSelf: 'flex-start',
              // backgroundColor:'blue'
              flexWrap: 'wrap-reverse'
            }}>VNCS Global Solution Technology - Viet Nam Acaddemy of Cryptography Techniques</Text>
            <Text style={{
              fontSize: 14,
              color: 'black',
              marginTop: 5
            }}>Ha Noi, Ha Noi, Viet Nam</Text>
          </View>

        </View>
        <View style={{
          marginTop: 20,
          flexDirection: 'row',
          justifyContent: 'center'
        }}>
          <TouchableOpacity

            // onPress={() => {
            //     navigate('UITabs')
            // }}
            style={{
              backgroundColor: colors.primary,
              // justifyContent:'center',
              // alignItems:'center',
              width: '40%',
              alignSelf: 'center',
              alignItems: 'center',
              borderRadius: 15,
              marginRight: 20
              // marginHorizontal:50 //can chinh le 2 ben theo chieu doc
            }}>
            <Text style={{
              padding: 10,
              color: 'white',
              fontSize: 14
            }}>Tu Choi</Text>
          </TouchableOpacity>

          <TouchableOpacity

            // onPress={() => {
            //     navigate('UITabs')
            // }}
            style={{
              backgroundColor: colors.primary,
              // justifyContent:'center',
              // alignItems:'center',
              width: '40%',
              alignSelf: 'center',
              alignItems: 'center',
              borderRadius: 15
              // marginHorizontal:50 //can chinh le 2 ben theo chieu doc
            }}>
            <Text style={{
              padding: 10,
              color: 'white',
              fontSize: 14
            }}>Dong y</Text>
          </TouchableOpacity>
        </View>

        <View style={{
          width: '100%',
          height: 1,
          backgroundColor: 'black',
          marginTop: 10
        }} />
      </View>

      <View style={{
        flex: 1
      }}>

        <View style={{
          // marginHorizontal: 10,
          flexDirection: 'row',
          marginTop: 20,
          // justifyContent:'center',
          marginLeft: 10,
          alignItems: 'center'
        }}>
          <Image source={images.profile_user} style={{
            width: 100,
            height: 100,
            borderRadius: 100,
            marginRight: 20
            // marginTop: -50
          }} />
          <View style={{
            // flexWrap:'wrap'b
            // backgroundColor:'blue',
            // marginRight:40,
            width: '60%'
          }}>
            <Text style={{
              fontSize: 18,
              fontWeight: 'bold',
              marginTop: 10,
              color: 'black'
            }}>Khuat Van Manh</Text>
            <Text style={{ color: 'black', marginBottom: 5, fontWeight: '500' }}>Software Engineer</Text>
            <Text style={{ color: 'black', marginBottom: 5 }}>Skill: Java, Swift, Git</Text>
            <Text style={{
              fontSize: 14,
              color: 'black',
              alignSelf: 'flex-start',
              // backgroundColor:'blue'
              flexWrap: 'wrap-reverse'
            }}>VNCS Global Solution Technology - Viet Nam Acaddemy of Cryptography Techniques</Text>
            <Text style={{
              fontSize: 14,
              color: 'black',
              marginTop: 5
            }}>Ha Noi, Ha Noi, Viet Nam</Text>
          </View>

        </View>
        <View style={{
          marginTop: 20,
          flexDirection: 'row',
          justifyContent: 'center'
        }}>
          <TouchableOpacity

            // onPress={() => {
            //     navigate('UITabs')
            // }}
            style={{
              backgroundColor: colors.primary,
              // justifyContent:'center',
              // alignItems:'center',
              width: '40%',
              alignSelf: 'center',
              alignItems: 'center',
              borderRadius: 15,
              marginRight: 20
              // marginHorizontal:50 //can chinh le 2 ben theo chieu doc
            }}>
            <Text style={{
              padding: 10,
              color: 'white',
              fontSize: 14
            }}>Tu Choi</Text>
          </TouchableOpacity>

          <TouchableOpacity

            // onPress={() => {
            //     navigate('UITabs')
            // }}
            style={{
              backgroundColor: colors.primary,
              // justifyContent:'center',
              // alignItems:'center',
              width: '40%',
              alignSelf: 'center',
              alignItems: 'center',
              borderRadius: 15
              // marginHorizontal:50 //can chinh le 2 ben theo chieu doc
            }}>
            <Text style={{
              padding: 10,
              color: 'white',
              fontSize: 14
            }}>Dong y</Text>
          </TouchableOpacity>
        </View>

        <View style={{
          width: '100%',
          height: 1,
          backgroundColor: 'black',
          marginTop: 10
        }} />
      </View>

      <View style={{
        flex: 1
      }}>

        <View style={{
          // marginHorizontal: 10,
          flexDirection: 'row',
          marginTop: 20,
          // justifyContent:'center',
          marginLeft: 10,
          alignItems: 'center'
        }}>
          <Image source={images.profile_user} style={{
            width: 100,
            height: 100,
            borderRadius: 100,
            marginRight: 20
            // marginTop: -50
          }} />
          <View style={{
            // flexWrap:'wrap'b
            // backgroundColor:'blue',
            // marginRight:40,
            width: '60%'
          }}>
            <Text style={{
              fontSize: 18,
              fontWeight: 'bold',
              marginTop: 10,
              color: 'black'
            }}>Khuat Van Manh</Text>
            <Text style={{ color: 'black', marginBottom: 5, fontWeight: '500' }}>Software Engineer</Text>
            <Text style={{ color: 'black', marginBottom: 5 }}>Skill: Java, Swift, Git</Text>
            <Text style={{
              fontSize: 14,
              color: 'black',
              alignSelf: 'flex-start',
              // backgroundColor:'blue'
              flexWrap: 'wrap-reverse'
            }}>VNCS Global Solution Technology - Viet Nam Acaddemy of Cryptography Techniques</Text>
            <Text style={{
              fontSize: 14,
              color: 'black',
              marginTop: 5
            }}>Ha Noi, Ha Noi, Viet Nam</Text>
          </View>

        </View>
        <View style={{
          marginTop: 20,
          flexDirection: 'row',
          justifyContent: 'center'
        }}>
          <TouchableOpacity

            // onPress={() => {
            //     navigate('UITabs')
            // }}
            style={{
              backgroundColor: colors.primary,
              // justifyContent:'center',
              // alignItems:'center',
              width: '40%',
              alignSelf: 'center',
              alignItems: 'center',
              borderRadius: 15,
              marginRight: 20
              // marginHorizontal:50 //can chinh le 2 ben theo chieu doc
            }}>
            <Text style={{
              padding: 10,
              color: 'white',
              fontSize: 14
            }}>Tu Choi</Text>
          </TouchableOpacity>

          <TouchableOpacity

            // onPress={() => {
            //     navigate('UITabs')
            // }}
            style={{
              backgroundColor: colors.primary,
              // justifyContent:'center',
              // alignItems:'center',
              width: '40%',
              alignSelf: 'center',
              alignItems: 'center',
              borderRadius: 15
              // marginHorizontal:50 //can chinh le 2 ben theo chieu doc
            }}>
            <Text style={{
              padding: 10,
              color: 'white',
              fontSize: 14
            }}>Dong y</Text>
          </TouchableOpacity>
        </View>

        <View style={{
          width: '100%',
          height: 1,
          backgroundColor: 'black',
          marginTop: 10
        }} />
      </View>

      <View style={{
        flex: 1
      }}>

        <View style={{
          // marginHorizontal: 10,
          flexDirection: 'row',
          marginTop: 20,
          // justifyContent:'center',
          marginLeft: 10,
          alignItems: 'center'
        }}>
          <Image source={images.profile_user} style={{
            width: 100,
            height: 100,
            borderRadius: 100,
            marginRight: 20
            // marginTop: -50
          }} />
          <View style={{
            // flexWrap:'wrap'b
            // backgroundColor:'blue',
            // marginRight:40,
            width: '60%'
          }}>
            <Text style={{
              fontSize: 18,
              fontWeight: 'bold',
              marginTop: 10,
              color: 'black'
            }}>Khuat Van Manh</Text>
            <Text style={{ color: 'black', marginBottom: 5, fontWeight: '500' }}>Software Engineer</Text>
            <Text style={{ color: 'black', marginBottom: 5 }}>Skill: Java, Swift, Git</Text>
            <Text style={{
              fontSize: 14,
              color: 'black',
              alignSelf: 'flex-start',
              // backgroundColor:'blue'
              flexWrap: 'wrap-reverse'
            }}>VNCS Global Solution Technology - Viet Nam Acaddemy of Cryptography Techniques</Text>
            <Text style={{
              fontSize: 14,
              color: 'black',
              marginTop: 5
            }}>Ha Noi, Ha Noi, Viet Nam</Text>
          </View>

        </View>
        <View style={{
          marginTop: 20,
          flexDirection: 'row',
          justifyContent: 'center'
        }}>
          <TouchableOpacity

            // onPress={() => {
            //     navigate('UITabs')
            // }}
            style={{
              backgroundColor: colors.primary,
              // justifyContent:'center',
              // alignItems:'center',
              width: '40%',
              alignSelf: 'center',
              alignItems: 'center',
              borderRadius: 15,
              marginRight: 20
              // marginHorizontal:50 //can chinh le 2 ben theo chieu doc
            }}>
            <Text style={{
              padding: 10,
              color: 'white',
              fontSize: 14
            }}>Tu Choi</Text>
          </TouchableOpacity>

          <TouchableOpacity

            // onPress={() => {
            //     navigate('UITabs')
            // }}
            style={{
              backgroundColor: colors.primary,
              // justifyContent:'center',
              // alignItems:'center',
              width: '40%',
              alignSelf: 'center',
              alignItems: 'center',
              borderRadius: 15
              // marginHorizontal:50 //can chinh le 2 ben theo chieu doc
            }}>
            <Text style={{
              padding: 10,
              color: 'white',
              fontSize: 14
            }}>Dong y</Text>
          </TouchableOpacity>
        </View>

        <View style={{
          width: '100%',
          height: 1,
          backgroundColor: 'black',
          marginTop: 10
        }} />
      </View>
    </ScrollView>

  )
}

export default ProfileCandidate
