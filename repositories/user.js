import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

const getUserDetail = async () => {
    try {
        const dataToken = await AsyncStorage.getItem('access');
        axios
            .get(
                'https://spiderpig83.pythonanywhere.com/api/v1/self/info',
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
                    let responseUser = res.data
                    let user = {}
                    user.userId = responseUser.id
                    user.userName = responseUser.full_name
                    user.email = responseUser.email
                    user.phone = responseUser.phone_number
                    // debugger          
                    return user
                    // console.log(res)
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


export default {
    getUserDetail
}