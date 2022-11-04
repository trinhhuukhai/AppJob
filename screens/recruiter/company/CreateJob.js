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


function CreateJob({ navigation }, props) {

  const [category, setCategory] = useState("")
  const [subcategory, setSubCategory] = useState("")

  const [title, setTitle] = useState("")
  const [des, setDes] = useState("")
  const [require, setRequire] = useState("")
  const [skill, setSkill] = useState("")
  const [salaryMin, setSalaryMin] = useState("")
  const [salaryMax, setSalaryMax] = useState("")
  const [location, setLocation] = useState("")

  // const [companyId, setCompanyId] = useState("")


  useEffect(() => {
    getCategory()
  }, [])

  const [categories, setCategories] = useState([])
  const [subCategories, setSubCategories] = useState([])
  const [token, setToken] = useState('')




  const getCategory = async () => {
    try {
      let result = []

      const dataToken = await AsyncStorage.getItem('access');
      setToken(dataToken)
      axios
        .get(
          `https://spiderpig83.pythonanywhere.com/api/v1/categories`,
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
            let cat = res.data.categories
            // debugger
            cat.forEach(function (item) {
              let object = {}

              object.key = item['id']
              object.value = item['name']
              result.push(object)


            })
            setCategories(result)
          }
        })
        .catch(e => {
          console.log(`get cate  error ${e}`);
        });
    } catch (error) {
      // debugger
      throw error
    }
  };

  //get sub cat
  const getSubCategory =  () => {
    try {
      let result = []

      // const dataToken = await AsyncStorage.getItem('access');
      axios
        .get(
          `https://spiderpig83.pythonanywhere.com/api/v1/category/${category}/subcategories`,
          {
            headers: { Authorization: `Bearer ${token}` },
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
            let subCat = res.data
            subCat.forEach(function (item) {
              let object = {}
              object.key = item['id']
              object.value = item['name']
              result.push(object)
            })
            setSubCategories(result)
          }
        })
        .catch(e => {
          console.log(`get sub  error ${e}`);
        });
    } catch (error) {
      // debugger
      throw error
    }
  };

  const createJob = async () => {
    try {
      const dataToken = await AsyncStorage.getItem('access');

      // debugger
      axios
        .post('https://spiderpig83.pythonanywhere.com/api/v1/jobs',
          {
            company_id: await AsyncStorage.getItem('idCompany'),
            category_id: category,
            subcategory_id: subcategory,
            title: title,
            description: des,
            requirements: require,
            skills: skill,
            salary_range_min: salaryMin,
            salary_range_max: salaryMax,
            location: location,
          }, {
          "headers": {
            'Authorization': `Bearer ${dataToken}`,
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
        }}>Create new job</Text>
        <SelectList
          setSelected={setCategory}
          boxStyles={{ marginTop: 20 }}
          data={categories}
          placeholder={"Job industry"}
          onPress={getSubCategory()}
        // defaultOption={{ key: 'EL', value: 'Electronics'}}
        />
        <SelectList
          setSelected={setSubCategory}
          boxStyles={{ marginTop: 20 }}
          data={subCategories}
          placeholder={"Field"}

        />
        <TextInput
          onChangeText={text => {
            setTitle(text);
          }}
          style={{
            // backgroundColor:'red',
            height: 40,
            marginTop: 10,
            borderBottomWidth: 1,
            color: 'red',
            marginBottom: 10
          }}
          placeholder="Job name"
        />
        <TextInput
          onChangeText={text => {
            setDes((Array.from(text.split(','))))
          }}
          style={{
            // backgroundColor:'red',
            height: 40,
            borderBottomWidth: 1,
            color: 'red',
            marginBottom: 10
          }}
          placeholder="Description: Develop, team building,..."
        />
        <TextInput
          onChangeText={text => {
            setRequire((Array.from(text.split(','))))
          }}
          style={{
            height: 40,
            borderBottomWidth: 1,
            color: 'red',
            marginBottom: 10
          }}
          placeholder="Requirements: Using VCS, OOP, ..."
        />
        <TextInput
          onChangeText={text => {
            setSkill((Array.from(text.split(','))))
          }}
          style={{
            height: 40,
            borderBottomWidth: 1,
            color: 'red',
            marginBottom: 10
          }}
          placeholder="Skills: Java, OOP, Git, ..."
        />
        <TextInput
          onChangeText={text => {
            setSalaryMin(text);
          }}
          style={{
            height: 40,
            borderBottomWidth: 1,
            color: 'red',
            marginBottom: 10
          }}
          placeholder="Salary min"
        />
        <TextInput
          onChangeText={text => {
            setSalaryMax(text);
          }} //khi thay doi email/password cap nhap gia tri text
          style={{
            // backgroundColor:'red',
            height: 40,
            borderBottomWidth: 1,
            color: 'red',
            marginBottom: 10
          }}
          placeholder="Salary max"
        />
        <TextInput
          onChangeText={text => {
            setLocation(text);
          }} //khi thay doi email/password cap nhap gia tri text
          style={{
            // backgroundColor:'red',
            height: 40,
            borderBottomWidth: 1,
            color: 'red',
            marginBottom: 10
          }}
          placeholder="Address"
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
           
            createJob()
            alert("Them moi cong viec thanh cong")
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

export default CreateJob
