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
import { images, icons, colors } from '../../constants/index';
import FoodItem from '../food/FoodItem';

//list view from a map of object
//Flatlist

function FoodList(props) {
    //list of food = state
    const [foods, setFoods] = useState([
        {
            name: 'palde maksi Valencia, with rabbit and chicken and sea food',
            imageUrl:
                'https://www.bluristorante.com/wp-content/uploads/2019/03/9-Traditional-Italian-Food-Dishes-You-Will-Love.jpg',
            status: 'Opening soon',
            price: 222.34,
            website: 'https://prcaandhn.com.vn',
            socialNetworks: {
                facebook: 'https://facebook.com/khai1803',
                twitter: 'https://twitter.com/khai',
                instagram: 'https://www.instagram/khai/',
            },
        },
        {
            name: 'Cha muc',
            imageUrl:
                'https://www.eatingeurope.com/wp-content/uploads/2018/08/italy-food-map-1024x683.jpg',
            status: 'Opening now',
            price: 2225.34,
            website: 'https://afaf.com.vn',
            socialNetworks: {
                facebook: 'https://facebook.com/khai1803',
                twitter: 'https://twitter.com/khai',
                instagram: 'https://www.instagram/khai/',
            }
        },
        {
            name: 'Cha ca',
            imageUrl:
                'https://restaurantclicks.com/wp-content/uploads/2022/04/Popular-French-Foods.jpg',
            status: 'Closing soon',
            price: 2252.34,
            website: 'https://pafaf.com.vn',
            socialNetworks: {

                twitter: 'https://twitter.com/khai',
                instagram: 'https://www.instagram/khai/',
            }
        },
        {
            name: 'Gio cha lua',
            imageUrl:
                'https://www.thespruceeats.com/thmb/r7h44nGpKvHQQxE0j56r_C0Dd_c=/450x300/filters:no_upscale():max_bytes(150000):strip_icc()/croque-madame-recipe-5211811-hero-01-777600f85fce49268f12d6d5cb5d46b3.jpg',
            status: 'Comming soon',
            price: 125.34,
            website: 'https://afafbn.com.vn',
            socialNetworks: {
                facebook: 'https://facebook.com/khai1803',
                twitter: 'https://twitter.com/khai',

            }
        },
        {
            name: 'Banh da cua',
            imageUrl:
                'https://www.thespruceeats.com/thmb/r7h44nGpKvHQQxE0j56r_C0Dd_c=/450x300/filters:no_upscale():max_bytes(150000):strip_icc()/croque-madame-recipe-5211811-hero-01-777600f85fce49268f12d6d5cb5d46b3.jpg',
            status: 'Comming soon',
            price: 125.34,
            website: 'https://afafbn.com.vn',
            socialNetworks: {
                facebook: 'https://facebook.com/khai1803',

            }
        },
        {
            name: 'Bun cha',
            imageUrl:
                'https://www.thespruceeats.com/thmb/r7h44nGpKvHQQxE0j56r_C0Dd_c=/450x300/filters:no_upscale():max_bytes(150000):strip_icc()/croque-madame-recipe-5211811-hero-01-777600f85fce49268f12d6d5cb5d46b3.jpg',
            status: 'Comming soon',
            price: 125.34,
            website: 'https://afafbn.com.vn',
            socialNetworks: {
                facebook: 'https://facebook.com/khai1803',

                instagram: 'https://www.instagram/khai/',
            }
        },
    ]

    );

    const [categorys, setCategorys] = useState([
        {
            name: 'BBQ',
            urlImg: 'https://cdn.pixabay.com/photo/2016/08/04/11/56/smoke-1568953__340.jpg'
        }, {
            name: 'Breakfast',
            urlImg: 'https://thegioibosach.com/upload/images/cach-uop-bo-nuong-BBQ-2.jpg'
        }, {
            name: 'Coffe',
            urlImg: 'https://cdn.pixabay.com/photo/2016/08/04/11/56/smoke-1568953__340.jpg'
        }, {
            name: 'Hot Dog',
            urlImg: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRUtb3TfUi4pMvvzCehARfasDJ9pS_9Fa3LCw&usqp=CAU'
        }, {
            name: 'Noodle',
            urlImg: 'https://cdn.pixabay.com/photo/2016/08/04/11/56/smoke-1568953__340.jpg'
        }, {
            name: 'Bread',
            urlImg: 'https://cdn.pixabay.com/photo/2016/08/04/11/56/smoke-1568953__340.jpg'
        }, {
            name: 'Bun cha',
            urlImg: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/60/B%C3%BAn_Ch%E1%BA%A3_1.jpg/1280px-B%C3%BAn_Ch%E1%BA%A3_1.jpg'
        }, {
            name: 'Bun dau',
            urlImg: 'https://cdn.vntrip.vn/cam-nang/wp-content/uploads/2017/09/bun-dau-mam-tom-2-e1505460520519.jpg'
        }, {
            name: 'Cocacola',
            urlImg: 'https://upload.wikimedia.org/wikipedia/commons/c/cc/Coca-Cola_Local_Brand_Cambodia.jpg'
        }, {
            name: 'Pepsi',
            urlImg: 'https://t3.ftcdn.net/jpg/03/23/86/24/360_F_323862457_5RaEzJNg6yeYx6RjbU4WwkAl3R0yxNQt.jpg'
        }, {
            name: 'Sting',
            urlImg: 'https://tomitamart.vn/public/media//00386.jpg'
        }, {
            name: 'Ngo',
            urlImg: 'https://cdn.vntrip.vn/cam-nang/wp-content/uploads/2017/09/bun-dau-mam-tom-2-e1505460520519.jpg'
        }
    ])

    const [searchText, setSearchText] = useState('')

    //filter
    // const filteredSearch = () => {
    //     foods.filter(eachFood => eachFood.name.toLowerCase().includes(searchText.toLowerCase()))
    // }

    return <View style={{ flex: 1, backgroundColor: 'white' }}>
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
                    top: 12,
                    left: 10
                }}
            />
            <TextInput
                onChangeText={(text) => {
                    setSearchText(text)
                }}
                autoCorrect={false}
                style={{
                    backgroundColor: 'gray',
                    height: 40,
                    flex: 1,
                    marginEnd: 5,
                    borderRadius: 5,
                    opacity: 0.4,
                    padding: 10,
                    paddingStart: 30,
                    color: 'white'
                }}

                placeholder=''
            />
            <Image
                tintColor={colors.primary} //mau logo
                source={icons.icon_menu}
                style={{
                    width: 30,
                    height: 30,
                    // backgroundColor:'red',
                    alignSelf: 'center',
                }}
            />
        </View>
        <View style={{
            height: 100,

        }}>

            <View style={{ //line
                height: 1,
                backgroundColor: 'gray'
            }} />

            <FlatList
                horizontal={true}
                keyExtractor={item => item.name}
                data={categorys}
                renderItem={({ item }) => {
                    return <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                        <Image style={{
                            width: 40,
                            height: 40,
                            resizeMode: 'cover',
                            borderRadius: 20,
                            margin: 10
                        }}

                            source={{
                                uri: item.urlImg
                            }}
                        />
                        <Text style={{ color: 'black', fontSize: 14 }}>{item.name}</Text>
                    </View>
                }}
            >

            </FlatList>

            <View style={{
                height: 1,
                backgroundColor: 'gray'
            }}></View>
        </View>

        <View>
            {/* <ScrollView>
                {foods.map(eachFood =>
                    <FoodItem food={eachFood} key={eachFood.name} />
                )}
            </ScrollView> */}

            <FlatList

                data={foods.filter(eachFood => eachFood.name.toLowerCase().includes(searchText.toLowerCase()))}
                renderItem={({ item }) => {
                    return <FoodItem food={item} key={item.name} />
                }}
                keyExtractor={eachFood => eachFood.name}
            />

        </View>
    </View>

}

export default FoodList;
