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
import FiveStar from './FiveStar';

const ProductGridView = () => {
  //data
  const [products, setProducts] = useState([
    {
      url: 'https://cly.1cdn.vn/2021/06/04/iphone-13-pro-max-pink-1622622813024.jpg',
      price: 75,
      producstName: 'Sam sung SC 5573',
      specification: [
        'Dry clean',
        'Cyclone filter',
        'convenience cord stories',
      ],
      reviews: 19,
      starts: 5,
    },
    {
      url: 'https://didongviet.vn/dchannel/wp-content/uploads/2020/12/Hi%CC%80nh-a%CC%89nh-Samsung-Galaxy-A52-%C4%91u%CC%9Bo%CC%9B%CC%A3c-tie%CC%82%CC%81t-lo%CC%A3%CC%82-chi-tie%CC%82%CC%81t-nha%CC%82%CC%81t.-jpg.jpg',
      price: 13,
      producstName: 'Sam sung Note',
      specification: [
        'Smart',
        'Cyclone filter',
        'convenience cord stories',
      ],
      reviews: 20,
      starts: 4,
    },
    {
      url: 'https://cdn.tgdd.vn/Files/2022/08/09/1454677/oppo-reno8-series-sap-duoc-ra-mat-tgdd-1-111_1280x720-800-resize.jpg',
      price: 75,
      producstName: 'Iphone 13',
      specification: [
        'Ngon',
        'Cyclone filter',
        'convenience cord stories',
      ],
      reviews: 16,
      starts: 5,
    },
    {
      url: 'https://www.inlogo.vn/vnt_upload/File/Image/b1_logo_dien_thoai_vsmart_co_y_nghia_gi_logo_vsmart_nghia_la_gi.jpg',
      price: 75,
      producstName: 'Oppo',
      specification: [
        'Dry clean',
        'Cyclone filter',
        'convenience cord stories',
      ],
      reviews: 19,
      starts: 5,
    },
    {
      url: 'https://photo2.tinhte.vn/data/attachment-files/2021/04/5440710_ipad_pro-1.jpg',
      price: 75,
      producstName: 'vsmart',
      specification: [
        'Dry clean',
        'Cyclone filter',
        'convenience cord stories',
      ],
      reviews: 19,
      starts: 5,
    },
    {
      url: 'https://cdn.tgdd.vn/Files/2022/01/04/1409113/render_9proplus_1_1280x1280-800-resize.jpg',
      price: 75,
      producstName: 'ipad',
      specification: [
        'Dry clean',
        'Cyclone filter',
        'convenience cord stories',
      ],
      reviews: 19,
      starts: 5,
    },
    {
      url: 'https://cdn.tgdd.vn/Files/2022/01/04/1409113/render_9proplus_1_1280x1280-800-resize.jpg',
      price: 75,
      producstName: 'ipad',
      specification: [
        'Dry clean',
        'Cyclone filter',
        'convenience cord stories',
      ],
      reviews: 19,
      starts: 5,
    }, {
      url: 'https://cdn.tgdd.vn/Files/2022/01/04/1409113/render_9proplus_1_1280x1280-800-resize.jpg',
      price: 75,
      producstName: 'ipad',
      specification: [
        'Dry clean',
        'Cyclone filter',
        'convenience cord stories',
      ],
      reviews: 19,
      starts: 5,
    }, {
      url: 'https://cdn.tgdd.vn/Files/2022/01/04/1409113/render_9proplus_1_1280x1280-800-resize.jpg',
      price: 75,
      producstName: 'ipad',
      specification: [
        'Dry clean',
        'Cyclone filter',
        'convenience cord stories',
      ],
      reviews: 19,
      starts: 5,
    }
  ])

  return (
    <View style={{
      flex: 1,
      backgroundColor: 'white'
    }}>
      <FlatList
        style={{
          marginTop: 5
        }}
        data={products}
        numColumns={2}
        keyExtractor={item => item.producstName}

        renderItem={({ item, index }) => <View style={{
          // backgroundColor: index%2 == 0? colors.primary:'red',
          flex: 0.5,
          // height: 200,
          marginTop: 5,
          marginLeft: index % 2 == 0 ? 10 : 0,
          marginRight: 10,
          marginBottom: 5,
          borderRadius: 20,
          borderWidth: 1,
          borderColor: 'gray',

        }}>

          <View style={{
            flexDirection: 'row',
            marginTop: 10,
            marginHorizontal: 5
            // marginLeft:10
          }}>
            <Image style={{
              width: 100,
              height: 100,
              resizeMode: 'cover',
              borderRadius: 20,
              marginRight: 10
            }}
              source={{
                uri: item.url
              }}
            />

            <Text style={{
              color: 'black',
              fontSize: 16,
              flex: 1,
              textAlign: 'right',
              // backgroundColor:'red',
              fontWeight: 'bold'
            }}>$ {item.price}</Text>

          </View>
          <Text style={{
            color: colors.primary,
            fontSize: 12,
            fontWeight: 'bold',
            marginHorizontal: 10,
            marginTop: 5
          }}>{item.producstName}</Text>

          {//duyet tung phan tu anh xa
            item.specification.map(specification =>
              <Text
                key={specification}
                style={{
                  color: 'black',
                  fontSize: 14,
                  paddingHorizontal: 10,
                  paddingBottom: 10
                }}>* {specification}</Text>
            )
          }

          <View style={{
            flexDirection: 'row',
            padding: 10,
          }}>
            <Image
              tintColor={colors.primary} //mau logo
              source={icons.icon_heart}
              style={{
                width: 25,
                height: 25,
                // backgroundColor:'red',
                alignSelf: 'center',
                marginRight: 5
              }}
            />
            <Text style={{
              color: colors.primary,
              fontSize: 12,
              width: 50
            }}>Saved for later</Text>

            <View style={{
              flex: 1,
              // backgroundColor: 'red'

            }}>
            <FiveStar numberOfStar={item.specification} />
            <Text>{item.specification}</Text>

            </View>
          </View>

        </View>}
      />
    </View>
  )
}

export default ProductGridView
