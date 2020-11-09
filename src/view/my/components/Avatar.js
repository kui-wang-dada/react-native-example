import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { useTheme } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { size, commonStyle, checkStaticImg } from '@/utils';
import { Touchable, Icon, Button } from 'ui';
export default () => {
  const { colors } = useTheme();
  const dispatch = useDispatch();
  const userInfo = useSelector((state) => state.my.userInfo);
  return (
    <View className="my-wrap">
      {userInfo.username ? (
        <View class="top-wrap">
          <View class="top-wrap-con" onClick={this.goToMySet}>
            <Image class="logo" src={userInfo.avatar} />
            <View class="top-con">
              <View class="top-name">
                <Text class="title">{userInfo.username}</Text>

                {/* {userInfo.phone_number ? <Text class="phone">{userInfo.phone_number}</Text> : null} */}
              </View>

              {userInfo.students_id ? <Text class="student">绑定学号：{userInfo.students_id}</Text> : null}
            </View>
            <Icon value="edit-outline" size="16" color="#999" />
          </View>
          {userInfo.students_id ? null : (
            <View onClick={this.goToLogin} className="login-btn">
              绑定厚仁账号
            </View>
          )}
        </View>
      ) : (
        <View>
          <View class="no-login-wrap">
            <Button open-type="getUserInfo" onGetUserInfo={this.getUserInfo} class="no-login">
              <Image class="img" src={checkStaticImg('login1.png')} />
              <View class="login-label">
                <Text class="login-label-title">登录并绑定后即可实时跟踪服务过程</Text>
                <View>点击登录</View>
              </View>
            </Button>
          </View>
        </View>
      )}
      {/* <Button open-type="getPhoneNumber" onGetPhoneNumber={this.getPhoneNumber}>
        获取手机号码
      </Button> */}
      <View class="sep" />
    </View>
  );
};
const style = StyleSheet.create({
  wrap: {},
});
