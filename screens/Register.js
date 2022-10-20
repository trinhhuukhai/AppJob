import React, { useContext, useEffect, useState } from 'react';
import {
  Text,
  View,
  Image,
  TouchableOpacity,
  TextInput,
  Keyboard,
  ScrollView
} from 'react-native';
import RadioGroup from 'react-native-radio-buttons-group';
import DatePicker from 'react-native-date-picker';
import { images, icons, colors } from '../constants/index';
import { isValidEmail, isValidPassword } from '../utilies/Validation';
import { convertDateTimeToString } from '../utilies/DateTime'

import { AuthContext } from '../repositories/AuthContext';

const Register = (props) => {

  //navigate
    const {navigation, route} = props
    //function of navigate to/back
    const {navigate, goback} = navigation

  const [keyboardIsShow, setkeyboardIsShow] = useState(false);


  //state validate form
  const [errorEmail, setErrorEmail] = useState('');
  const [errorPassword, setErrorPassword] = useState('');

  //state to store email/password
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  // const [role, setRole] = useState('');
  const [full_name, setName] = useState('');
  const [phone_number, setPhone] = useState('');
  // const [gender, setGender] = useState('');
  // const [date_of_birth, setDoB] = useState('');
 
  const { isLoading, register } = useContext(AuthContext);
  const[data, setData] = useState('')
 


  const validOk = () =>
    email.length > 0 &&
    password.length > 0 &&
    isValidEmail(email) == true &&
    isValidPassword(password) == true;

  //calendar
  const [date, setDate] = useState(new Date());
  const [open, setOpen] = useState(false);

  const dateFormat = convertDateTimeToString(date)



  //radio btn
  const radioBtnGender = [
    {
      id: '1', // acts as primary key, should be unique and non-empty string
      label: 'Male',
      value: 'male',
    },
    {
      id: '2',
      label: 'Female',
      value: 'female',
    },
  ]
  const [rdGender, setRdGender] = useState('male');
  const setValueGender = (value) => {
    var newArray = value.filter((item) => item.selected === true); //get the items that are selected
    setRdGender(newArray[0].value); //set the selected value in this Hook
    // setGender(newArray[0].value)
  };

  //role
  const radioBtnRole = [
    {
      id: '1', // acts as primary key, should be unique and non-empty string
      label: 'Candidate',
      value: 'candidate',
    },
    {
      id: '2',
      label: 'Recruiter',
      value: 'recruiter',
    },
  ];
  const [rdRole, setRdRole] = useState('recruiter');
  const setValueRole = (value) => {
    var newArray = value.filter((item) => item.selected === true); //get the items that are selected
    setRdRole(newArray[0].value); //set the selected value in this Hook
    // setRole(newArray[0].value)
  };



  //componentDidMount = load het data moi vao function useEffect
  useEffect(() => {
    Keyboard.addListener('keyboardDidShow', () => {
      setkeyboardIsShow(true);
    });
    Keyboard.addListener('keyboardDidHide', () => {
      setkeyboardIsShow(false);
    });
  });

  return (

    <View style={{
      flex: 100, //toan man hinh,
      backgroundColor: colors.primary,
    }}>
      
      <View //man hinh top logo
        style={{
          flex: 20,
          // backgroundColor: 'blue',
          flexDirection: 'row', //chieu tu trai sang phai
          // backgroundColor: colors.primary,
          justifyContent: 'space-around',
          alignItems: 'center',
          position: 'absolute', top: 0, right: 0, left: 0

        }}>
        <Text
          style={{
            color: 'black',
            fontSize: 20,
            fontWeight: 'bold',
            width: '50%',
          }}>
          Register an Account?
        </Text>
        <Image
          tintColor='white' //mau logo
          source={images.logo_job}
          style={{
            width: 100,
            height: 100,
            // backgroundColor:'red',
            alignSelf: 'center',
          }}
        />
      </View>
      <ScrollView style={{ width: '100%' }}>
        <View
          style={{
            //man hinh form
            flex: 80,
            backgroundColor: 'white',
            padding: 10,
            margin: 10,
            marginTop: 110,
            borderRadius: 20
          }}>
          <View //email
            style={{
              marginHorizontal: 15, //theo chieu ngang
            }}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}>
              <TextInput
                value={email}
                style={{
                  // backgroundColor:'red',
                  flex: 1,
                }}
                onChangeText={text => {
                  setErrorEmail(
                    isValidEmail(text) == true
                      ? ''
                      : 'Email not in correct format',
                  );
                  setEmail(text);
                }} //khi thay doi email/password cap nhap gia tri text
                placeholder="Email"
              />
              <Image
                style={{
                  width: 20,
                  height: 20,
                  marginTop: 20,
                }}
                source={icons.icon_email}
              />
            </View>

            <View
              style={{
                backgroundColor: colors.primary,
                height: 1,
                width: '100%',
                // marginHorizontal: 15,
                alignSelf: 'center',
              }}
            />
            <Text
              style={{
                color: 'red',
                fontSize: 12,
                marginBottom: 5,
              }}>
              {errorEmail}
            </Text>
          </View>
          <View
            style={{
              //password
              marginHorizontal: 15, //theo chieu ngang
            }}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}>
              <TextInput
                value={password}
                style={{
                  flex: 1,
                }}
                onChangeText={text => {
                  setErrorPassword(
                    isValidPassword(text) == true
                      ? ''
                      : 'Password must be at least 3 character',
                  );
                  setPassword(text);
                }} //khi thay doi email/password cap nhap gia tri text
                secureTextEntry={true}
                placeholder="Password"
              />
              <Image
                style={{
                  width: 20,
                  height: 20,
                  marginTop: 20,
                }}
                source={icons.icon_password}
              />
            </View>
            <View
              style={{
                backgroundColor: colors.primary,
                height: 1,
                width: '100%',
                marginHorizontal: 15,
                alignSelf: 'center',
              }}
            />
            <Text
              style={{
                color: 'red',
                fontSize: 12,
                marginBottom: 5,
              }}>
              {errorPassword}
            </Text>
          </View>
          <View //name
            style={{
              marginHorizontal: 15, //theo chieu ngang
            }}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}>
              <TextInput
                value={full_name}
                style={{
                  // backgroundColor:'red',
                  flex: 1,
                }}
                onChangeText={text => {

                  setName(text);
                }} //khi thay doi email/password cap nhap gia tri text
                placeholder="Name"
              />
              <Image
                style={{
                  width: 20,
                  height: 20,
                  marginTop: 20,
                }}
                source={icons.icon_user_id}
              />
            </View>
            <View
              style={{
                backgroundColor: colors.primary,
                height: 1,
                width: '100%',
                // marginHorizontal: 15,
                alignSelf: 'center',
              }}
            />
            <Text
              style={{
                color: 'red',
                fontSize: 12,
                marginBottom: 5,
              }}>
            </Text>
          </View>
          <View //phone
            style={{
              marginHorizontal: 15, //theo chieu ngang
            }}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}>
              <TextInput
                value={phone_number}
                style={{
                  // backgroundColor:'red',
                  flex: 1,
                }}
                onChangeText={text => {


                  setPhone(text);
                }} //khi thay doi email/password cap nhap gia tri text
                placeholder="Phone"
              />
              <Image
                style={{
                  width: 20,
                  height: 20,
                  marginTop: 20,
                }}
                source={icons.icon_phone}
              />
            </View>
            <View
              style={{
                backgroundColor: colors.primary,
                height: 1,
                width: '100%',
                // marginHorizontal: 15,
                alignSelf: 'center',
              }}
            />
            <Text
              style={{
                color: 'red',
                fontSize: 12,
                marginBottom: 5,
              }}>
            </Text>
          </View>
          <View //Date of birth
            style={{
              marginHorizontal: 15, //theo chieu ngang

            }}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-around',
              }}>
              <TextInput
                value={dateFormat}
                
                style={{
                  // backgroundColor:'red',
                  flex: 1,
                }}
                // onChangeText={(date) => {
                //   setDoB(date);
                // }} //khi thay doi email/password cap nhap gia tri text
              // placeholder={date}
              />
              <TouchableOpacity style={{
                // backgroundColor:'blue'
              }} onPress={() => setOpen(true)}>
                <Image
                  style={{
                    width: 20,
                    height: 20,
                    marginTop: 20,

                  }}
                  source={icons.icon_calendar}
                />
              </TouchableOpacity>
            </View>
            <View
              style={{
                backgroundColor: colors.primary,
                height: 1,
                width: '100%',
                // marginHorizontal: 15,
                alignSelf: 'center',
              }}
            />

            <Text
              style={{
                color: 'red',
                fontSize: 12,
                marginBottom: 5,
              }}>
            </Text>
          </View>

          <View //gender
            style={{
              // backgroundColor:'red',
              marginVertical: 8,
              marginHorizontal: 15, //theo chieu ngang
            }}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
              <Text style={{
                color: 'black'
              }}>
                {rdGender}
              </Text>
              <RadioGroup
                layout="row"
                radioButtons={radioBtnGender} //pass in our array
                onPress={(value) => setValueGender(value)}

              />
            </View>
            <View
              style={{
                backgroundColor: colors.primary,
                height: 1,
                width: '100%',
                // marginHorizontal: 15,
                alignSelf: 'center',
              }}
            />
          </View>

          <View //role
            style={{
              marginVertical: 25,
              marginHorizontal: 15, //theo chieu ngang
            }}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center'
              }}>
              <Text style={{
                color: 'black'
              }}>
                {rdRole}
              </Text>
              <RadioGroup
                layout="row"
                radioButtons={radioBtnRole} //pass in our array
                onPress={(value) => setValueRole(value)}

              />
            </View>
            <View
              style={{
                backgroundColor: colors.primary,
                height: 1,
                width: '100%',
                // marginHorizontal: 15,
                alignSelf: 'center',
                marginBottom: 5
              }}
            />
          </View>

          {keyboardIsShow == false && ( //btn register
            <View
              style={{
                flex: 15,
                // backgroundColor: 'green'
              }}>
              <TouchableOpacity
                disabled={validOk() == false}
                onPress={() => {
                  {register(email, password, rdRole, full_name, phone_number, rdGender, dateFormat) ? alert('Lỗi không đăng ký tài khoản được!!!'):alert('Đăng ký tài khoản thành công')}
                  navigate('Login')
                } }
                 
                
                style={{
                  backgroundColor: validOk() == true ? colors.primary : 'gray',
                  // justifyContent:'center',
                  // alignItems:'center',
                  width: '70%',
                  alignSelf: 'center',
                  alignItems: 'center',
                  borderRadius: 15,
                  // marginHorizontal:50 //can chinh le 2 ben theo chieu doc
                }}>
                <Text
                  style={{
                    padding: 10,
                    color: 'white',
                    fontSize: 14,
                  }}>
                  Register
                </Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </ScrollView>



      {/* <View style={{
        flex: 5,
        // backgroundColor:'red'
      }}></View> */}



      <DatePicker
        modal
        open={open}
        date={date}
        mode={'date'}
        format="YYYY-MM-DD"
        onDateChange={setDate}
        onConfirm={date => {
          setOpen(false);
          setDate(date);


        }}
        onCancel={() => {
          setOpen(false);
        }}
      />


    </View>

  );
}

export default Register;
