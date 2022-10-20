import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const test = () => {
    return (
        <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' }}>
            {
                data && data?.map((item, index) => (
                    <TouchableOpacity
                        key={index}
                        onPress={() => navigation.navigate("CreateAnInnScreen")}
                    >
                        <View style={{ width: (windowWidth - 40) / 3, backgroundColor: 'white', marginBottom: 10, padding: 10, borderRadius: 8, height: 100, position: 'relative' }}>
                            {
                                item?.name === 'Lập hợp đồng mới' && dataNumber.length > 0 && dataNumber.filter((item) => item.type === "Đang trống").length > 0 ? (
                                    <View style={{ position: 'absolute', top: 15, right: 15, height: 30, width: 30, borderRadius: 99, backgroundColor: '#ff7f00', zIndex: 99, justifyContent: 'center', alignItems: 'center' }}>
                                        <Text style={{ color: 'white', fontSize: 14 }}>
                                            {
                                                dataNumber.filter((item) => item.type === "Đang trống").length
                                            }
                                        </Text>
                                    </View>
                                ) : null
                            }
                            {
                                item?.name === 'Thanh lý' && dataNumber.length > 0 && dataNumber.filter((item) => item.type === "Đang ở").length > 0 ? (
                                    <View style={{ position: 'absolute', top: 15, right: 15, height: 30, width: 30, borderRadius: 99, backgroundColor: '#ff7f00', zIndex: 99, justifyContent: 'center', alignItems: 'center' }}>
                                        <Text style={{ color: 'white', fontSize: 14 }}>
                                            {
                                                dataNumber.filter((item) => item.type === "Đang ở").length
                                            }
                                        </Text>
                                    </View>
                                ) : null
                            }
                            {
                                item?.name === 'Danh sách phòng' && dataNumber?.length > 0 ? (
                                    <View style={{ position: 'absolute', top: 15, right: 15, height: 30, width: 30, borderRadius: 99, backgroundColor: '#ff7f00', zIndex: 99, justifyContent: 'center', alignItems: 'center' }}>
                                        <Text style={{ color: 'white', fontSize: 14 }}>
                                            {

                                                dataNumber.filter((item) => item.type === "Đang ở").length
                                            }/{
                                                dataNumber.filter((item) => item.type === "Đang trống").length
                                            }
                                        </Text>
                                    </View>
                                ) : null
                            }
                            <View style={{ width: '100%', justifyContent: 'center', alignItems: 'center' }}>
                                <Image
                                    style={{ width: 50, height: 50 }}
                                    source={item.image}
                                />
                            </View>
                            <Text style={{ width: (windowWidth - 60) / 3, textAlign: 'center', paddingHorizontal: 10 }}>
                                {item.name}
                            </Text>
                        </View>
                    </TouchableOpacity>
                ))
            }
        </View >
  )
}

export default test

const styles = StyleSheet.create({})