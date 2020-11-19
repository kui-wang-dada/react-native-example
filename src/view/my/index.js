import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, ScrollView } from 'react-native';
import { useTheme } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { getRecordDetail } from '@/store/actions';
import { size, commonStyle, checkStaticImg } from '@/utils';
import { Touchable, Icon, Button } from 'ui';
import Avatar from './components/Avatar';
import ListItem from './components/ListItem';
export default ({ route, navigation }) => {
  const { colors } = useTheme();
  const dispatch = useDispatch();
  const userInfo = useSelector((state) => state.my.userInfo);
  console.log(userInfo, 'params');

  const listData = [
    {
      title: '联系客服',
      icon: 'back',
      route: 'webView',
      params: { url: 'https://lc.chat/now/9055235/1' },
    },
  ];
  return (
    <View style={style.myWrap}>
      <Avatar />
      {/* <Button open-type="getPhoneNumber" onGetPhoneNumber={this.getPhoneNumber}>
          获取手机号码
        </Button> */}
      <View style={[style.sep, { backgroundColor: colors.sep }]} />
      <ScrollView>
        <View style={style.myList}>
          {listData.map((item, index) => {
            return <ListItem key={index} data={item} />;
          })}
        </View>
      </ScrollView>
    </View>
  );
};
const style = StyleSheet.create({
  myWrap: {},
  sep: {
    width: '100%',
    height: size(20),
  },
  myList: {
    flex: 1,
  },
});
