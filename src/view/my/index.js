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
      title: '',
    },
  ];
  return (
    <View className="my-wrap">
      <Avatar
        colorTheme={this.props.colorTheme}
        user={this.props.userInfo}
        loginEmail={this.props.loginEmail}
        // navigation={this.props.navigation}
        invitation={this.props.invitation}
      />
      {/* <Button open-type="getPhoneNumber" onGetPhoneNumber={this.getPhoneNumber}>
          获取手机号码
        </Button> */}
      <View class="sep" />
      <ScrollView style={{ flex: 1 }}>
        <View style={style.myList}>
          {listData.map((item, index) => {
            return <ListItem colorTheme={this.props.colorTheme} key={index} data={item} loginEmail={this.props.loginEmail} navigation={this.props.navigation} />;
          })}
        </View>
      </ScrollView>
    </View>
  );
};
const style = StyleSheet.create({
  wrap: {},
});
