import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import React, { createContext, useEffect, useState } from 'react';


export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [userInfo, setUserInfo] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [splashLoading, setSplashLoading] = useState(false);

  const [data, setData] = useState('')

  const register = (email, password, role, full_name, phone_number, gender, date_of_birth) => {

    axios.post('https://spiderpig83.pythonanywhere.com/api/v1/user/create', {
      email, password, role, full_name, phone_number, gender, date_of_birth
    },
      {
        headers: {
          'Content-Type': 'application/json',
        }
      }).then(response => {
        let userInfo = response.data;

        setUserInfo(userInfo);
        AsyncStorage.setItem('userInfo', JSON.stringify(userInfo));
        setIsLoading(false);
        console.log(userInfo);
      })
      .catch(error => {
        console.log(error.response)
      });
  };

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
        AsyncStorage.setItem("AccessToken", access)

        //redriac
      })
      .catch(e => {
        console.log(`login error ${e}`);
        setIsLoading(false);
      });
  };

  // headers: { Authorization: `Bearer ${data}` }

  const getUser = () => {
   axios
      .get(
        'https://spiderpig83.pythonanywhere.com/api/v1/self/info',
        {
          headers: { Authorization: `Bearer ${data}`},
        }, {
          "headers": {
            'Content-Type': 'application/json',
          }
        }
      )
      .then(res => {
        console.log(res.data);
        debugger
        setUserInfo({});
        setIsLoading(false);
      })
      .catch(e => {
        console.log(`logout error ${e}`);
        setIsLoading(false);
      });
  };



  const logout = () => {
    setIsLoading(true);

    axios
      .post(
        `${BASE_URL}/logout`,
        {

        },
        {
          headers: { Authorization: `Bearer ${userInfo.access_token}` },
        },
      )
      .then(res => {
        console.log(res.data);
        AsyncStorage.removeItem('userInfo');
        setUserInfo({});
        setIsLoading(false);
      })
      .catch(e => {
        console.log(`logout error ${e}`);
        setIsLoading(false);
      });
  };

  const isLoggedIn = async () => {
    try {
      setSplashLoading(true);

      let userInfo = await AsyncStorage.getItem('userInfo');
      userInfo = JSON.parse(userInfo);

      if (userInfo) {
        setUserInfo(userInfo);
      }

      setSplashLoading(false);
    } catch (e) {
      setSplashLoading(false);
      console.log(`is logged in error ${e}`);
    }
  };

  useEffect(() => {
    isLoggedIn();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        isLoading,
        userInfo,
        splashLoading,
        register,
        login,
        logout,
        getUser

      }}>
      {children}
    </AuthContext.Provider>
  );
};
