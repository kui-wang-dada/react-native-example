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
    <View style={style.myWrap}>
      {userInfo.username ? (
        <View style={style.topWrap}>
          <View style={style.topWrapCon} onClick={this.goToMySet}>
            <Image style={style.logo} src={userInfo.avatar} />
            <View style={style.topCon}>
              <View style={style.topName}>
                <Text style={style.title}>{userInfo.username}</Text>

                {/* {userInfo.phone_number ? <Text style={style.phone">{userInfo.phone_number}</Text> : null} */}
              </View>

              {userInfo.students_id ? <Text style={style.student}>绑定学号：{userInfo.students_id}</Text> : null}
            </View>
            <Icon value="edit-outline" size="16" color="#999" />
          </View>
          {userInfo.students_id ? null : (
            <View onClick={this.goToLogin} style={style.loginBtn}>
              绑定厚仁账号
            </View>
          )}
        </View>
      ) : (
        <View>
          <View style={style.noLoginWrap}>
            <Button open-type="getUserInfo" onGetUserInfo={this.getUserInfo} style={style.noLogin}>
              <Image style={style.img} src={checkStaticImg('login1.png')} />
              <View style={style.loginLabel}>
                <Text style={style.loginLabelTitle}>登录并绑定后即可实时跟踪服务过程</Text>
                <View>点击登录</View>
              </View>
            </Button>
          </View>
        </View>
      )}
      {/* <Button open-type="getPhoneNumber" onGetPhoneNumber={this.getPhoneNumber}>
        获取手机号码
      </Button> */}
      <View style={style.sep} />
    </View>
  );
};
const style = StyleSheet.create({
  wrap: {},
});
