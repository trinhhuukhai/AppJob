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
  FlatList,
} from 'react-native';
import { images, icons, colors } from '../../constants/index';

const FiveStar = (props) => {

    const{numberOfStar} = props //trich xuat tu component ben kia

  return <View style={{
    flexDirection:'row',
    marginTop:10
  }}>
      {[0,1,2,3,4].map(item => <Image
    // tintColor={colors.primary} //mau logo
    
    source={icons.icon_star}
    style={{
      width: 10,
      height: 10,
      tintColor: item <= numberOfStar-1 ? 'red' : 'gray',
      alignSelf: 'center',
      marginRight: 5
    }}
  />)}
  </View>
  

}

export default FiveStar
