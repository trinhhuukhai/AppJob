import React, { useEffect, useState, useContext } from 'react';
import {
    Text,
    View,
    Image,
    ImageBackground,
    TouchableOpacity,
    TextInput,
    KeyboardAvoidingView,
    Keyboard
} from 'react-native';
import { images, icons, colors } from '../constants/index';
import { UiButton } from '../components/index';
import { isValidEmail, isValidPassword } from '../utilies/Validation'

import {AuthContext} from '../repositories/AuthContext'
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';




//moi 1 function = class = component
function Login(props) {
    const {navigation, route} = props
    //function of navigate to/back
    const {navigate, goback} = navigation
    
    

    const [keyboardIsShow, setkeyboardIsShow] = useState(false)

    //state validate form
    const [errorEmail, setErrorEmail] = useState('')
    const [errorPassword, setErrorPassword] = useState('')

    //state to store email/password
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const [data, setData] = useState('')

    const login = (email, password) => {
        axios
          .post('https://spiderpig83.pythonanywhere.com/api/v1/token/auth', {
            email,
            password,
          }, {
            "headers": {
              'Content-Type': 'application/json',
            }
          })
          .then(res => {
            let userInfo = res.data;
            let access = userInfo.access
            setData(access)
            //save access to storage
            AsyncStorage.setItem("access", access)
            alert('Đăng nhập thành công')
    
            //redriac
            navigate('Welcome')
          })
          .catch(e => {
            console.log(`login error ${e}`);
            alert('Đăng nhập không thành công!!!')
            
          });
      };



    // const {isLoading, login, getUser} = useContext(AuthContext);
    

    const validOk = () => email.length > 0 && password.length > 0 && isValidEmail(email) == true && isValidPassword(password) == true

    //componentDidMount = load het data moi vao function useEffect
    useEffect(() => {
        Keyboard.addListener('keyboardDidShow', () => {
            setkeyboardIsShow(true)
        })
        Keyboard.addListener('keyboardDidHide', () => {
            setkeyboardIsShow(false)
        })
    })

 

    return (
        
        <KeyboardAvoidingView //tong the man hinh

            style={{
                flex: 100, //toan man hinh,
                backgroundColor: 'white',

            }}>
            {/* <Spinner visible={isLoading} /> */}
            <View //man hinh top logo
                style={{
                    flex: 30,
                    // backgroundColor: 'blue',
                    flexDirection: 'row', //chieu tu trai sang phai
                    // backgroundColor: 'green',
                    justifyContent: 'space-around',
                    alignItems: 'center',
                }}>
                <Text
                    style={{
                        color: 'black',
                        fontSize: 20,
                        fontWeight: 'bold',
                        width: '50%',
                    }}>
                    Already have Account?
                </Text>
                <Image
                    tintColor={colors.primary} //mau logo
                    source={images.logo_job}
                    style={{
                        width: 100,
                        height: 100,
                        // backgroundColor:'red',
                        alignSelf: 'center',
                    }}
                />
            </View>
            <View style={{ //man hinh form
                flex: 30,
                // backgroundColor: 'violet'
            }}>
                <View

                    style={{
                        marginHorizontal: 15, //theo chieu ngang

                    }}>
                    <Text
                        style={{
                            fontSize: 14,
                            color: colors.primary,
                        }}>
                        Email:
                    </Text>
                    <TextInput

                        onChangeText={(text) => {
                            setErrorEmail(isValidEmail(text) == true ? '' : 'Email not in correct format')
                            setEmail(text)
                        }} //khi thay doi email/password cap nhap gia tri text

                        placeholder="example@gmail.com" />
                    <View style={{
                        backgroundColor: colors.primary,
                        height: 1,
                        width: '100%',
                        // marginHorizontal: 15,
                        alignSelf: 'center'
                    }} />
                    <Text style={{
                        color: 'red',
                        fontSize: 12,
                        marginBottom: 5
                    }}>{errorEmail}</Text>

                </View>
                <View style={{
                    marginHorizontal: 15, //theo chieu ngang

                }}>
                    <Text
                        style={{
                            fontSize: 14,
                            color: colors.primary,
                        }}>
                        Password:
                    </Text>
                    <TextInput
                        onChangeText={(text) => {
                            setErrorPassword(isValidPassword(text) == true ? '' : 'Password must be at least 3 character')
                            setPassword(text)
                        }} //khi thay doi email/password cap nhap gia tri text
                        secureTextEntry={true}
                        placeholder="Enter your password" />
                    <View style={{
                        backgroundColor: colors.primary,
                        height: 1,
                        width: '100%',
                        marginHorizontal: 15,
                        alignSelf: 'center'
                    }} />
                    <Text style={{
                        color: 'red',
                        fontSize: 12,
                        marginBottom: 5
                    }}>{errorPassword}</Text>
                </View>
            </View>


            {keyboardIsShow == false && <View
                style={{
                    flex: 15,
                    // backgroundColor: 'green'
                }}>
                <TouchableOpacity
                    disabled = {validOk() == false}
                    onPress={() => {
                        login(email, password)
                    }}
                    style={{
                        backgroundColor: validOk() ==true ? colors.primary :'gray',
                        width: '60%',
                        alignSelf: 'center',
                        alignItems: 'center',
                        borderRadius: 15
                    }}>
                    <Text style={{
                        padding: 10,
                        color: 'white',
                        fontSize: 14
                    }}>LOGIN</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => {
                        navigate('Register')
                    }}
                    style={{
                        padding: 5,
                    }}>
                    <Text style={{
                        padding: 10,
                        color: colors.primary,
                        fontSize: 14,
                        alignSelf: 'center'
                    }}>New user? Register now</Text>
                </TouchableOpacity>
            </View>
            }
        </KeyboardAvoidingView>
    );
}

export default Login;
