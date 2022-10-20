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
} from 'react-native';
import { images, icons, colors } from '../../constants/index';

//list view from a map of object
//Flatlist

function _getColorStatus(status){
    // if(status.toLowerCase().trim() == 'opening now'){
    //     return colors.success
    // }else if(status.toLowerCase().trim() == 'closing soon'){
    //     return colors.alert
    // }else if(status.toLowerCase().trim() == 'coming soon'){
    //     return colors.warning
    // }else{
    //     return colors.success
    // }

    return status.toLowerCase().trim() == 'opening now' ? colors.success:
        (status.toLowerCase().trim() == 'closing soon') ? colors.alert:
        (status.toLowerCase().trim() == 'coming soon') ? colors.warning: colors.success
}

function FoodItem(props) {

    //construcdistering
    let {name, imageUrl, status,price,website,socialNetworks} = props.food;
    //list of food = state

    return (
        <View style={{ flex: 1, backgroundColor: 'white' }}>
            <View style={{
            height: 150,
            // backgroundColor:'red',
            paddingTop: 20,
            paddingStart: 10,
            flexDirection: 'row'
        }}>
            <Image style={{
                width: 100,
                height: 100,
                resizeMode: 'cover',
                borderRadius: 15,
                marginRight: 10
            }}
                source={{
                    uri: imageUrl
                }}
            />
            <View style={{
                // backgroundColor:'green',
                flex: 1,
                marginRight: 10
            }}>
                <Text style={{
                    color: 'black',
                    fontSize: 14,
                    fontWeight: 'bold'
                }}>{name}</Text>

                <View style={{
                    height: 1,
                    backgroundColor: 'black'
                }} />

                <View style={{
                    flexDirection: 'row'
                }}>
                    <Text style={{
                        color: 'black',
                        fontSize: 14
                    }}>Status: </Text>
                    <Text style={{
                        color: _getColorStatus(status),
                        fontSize: 14
                    }}>{status}</Text>
                </View>
                <Text style={{
                    color: 'black',
                    fontSize: 14
                }}>{price}</Text>
                <Text style={{
                    color: 'black',
                    fontSize: 14
                }}>Food type: Pizzza</Text>
                <Text style={{
                    color: 'black',
                    fontSize: 14
                }}>Website: {website}</Text>


                <View style={{
                    flexDirection: 'row',

                }}>
                    {socialNetworks['facebook'] != undefined && <Image source={icons.icon_facebook} style={{
                        width: 15,
                        height: 15,
                        marginEnd: 5
                    }} />}
                   {socialNetworks['instagram'] != undefined && <Image source={icons.icon_instagram} style={{
                        width: 15,
                        height: 15,
                        marginRight: 5
                    }} />}
                   {socialNetworks['twitter'] != undefined && <Image source={icons.icon_twitter} style={{
                        width: 15,
                        height: 15,
                        marginRight: 5
                    }} />}
                </View>


            </View>
        </View>
        </View>
    );
}

export default FoodItem;
