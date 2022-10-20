import { react } from 'react';
import { Text, View, Image, ImageBackground, TouchableOpacity } from 'react-native';
import { images, icons, colors } from '../constants/index';

function UiButton(props) {
    const {onPress, title, isSelected} = props

    return <TouchableOpacity
        onPress={onPress}//anonimaer function
        style={{
            borderColor: 'white',
            borderWidth: 1,
            borderRadius: 5,
            height: 45,
            marginHorizontal: 15,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: isSelected == true ? 'white' : null, //bieu thuc or
            marginVertical: 10 //chieu tren va duoi
        }}>
        {isSelected == true && <Image source={icons.icon_check} style={{ //bieu thuc and
            // marginHorizontal:10, //= margin start va marginend
            position: 'absolute',
            left: 10,
            top: 10,
            width: 20,
            height: 20,
        }}></Image>}
        <Text style={{
            color:isSelected == true ? colors.primary:'white'
        }}>{title}</Text>
    </TouchableOpacity>
}

export default UiButton