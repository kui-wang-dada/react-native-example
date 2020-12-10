import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, Alert } from 'react-native';
import { useTheme, useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { useWechatLogin } from 'hook/wechat';
import { size, $api, checkStaticImg } from '@/utils';
import { Touchable, Icon, Button } from 'ui';
export default () => {
  const { colors } = useTheme();
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const userInfo = useSelector((state) => state.my.userInfo);

  const getWechat = useWechatLogin();

  const goToMySet = () => {
    navigation.navigate('mySet');
  };
  const goToLogin = () => {
    navigation.navigate('mySet');
  };

  return (
    <View style={style.myWrap}>
      {userInfo.username ? (
        <View style={style.topWrap}>
          <Touchable style={style.topWrapCon} onPress={goToMySet}>
            <Image style={style.logo} source={{ uri: userInfo.avatar }} />
            <View style={style.topCon}>
              <View style={style.topName}>
                <Text style={[style.title, { color: colors.text }]}>{userInfo.username}</Text>

                {/* {userInfo.phone_number ? <Text style={style.phone}>{userInfo.phone_number}</Text> : null} */}
              </View>

              {userInfo.students_id ? <Text style={[style.student, { color: colors.text_p }]}>绑定学号：{userInfo.students_id}</Text> : null}
            </View>
            <Icon name="edit" size={16} color="#999" />
          </Touchable>
          {userInfo.students_id ? null : (
            <Button
              title="绑定厚仁账号"
              onPress={goToLogin}
              style={[style.loginBtn, { backgroundColor: colors.primary }]}
              textStyle={[style.loginBtnText, { color: colors.background }]}
            />
          )}
        </View>
      ) : (
        <View>
          <View style={style.noLoginWrap}>
            <Touchable onPress={getWechat} style={[style.noLogin, { backgroundColor: colors.background }]}>
              <Image style={style.img} source={{ uri: checkStaticImg('login1.png') }} />
              <View style={style.loginLabel}>
                <Text style={[style.loginLabelTitle, { color: colors.text }]}>登录并绑定后即可实时跟踪服务过程</Text>
                <Button
                  title="点击登录"
                  style={[style.noLoginBtn, { backgroundColor: colors.primary }]}
                  textStyle={[style.noLoginBtnText, { color: colors.background }]}
                />
              </View>
            </Touchable>
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
  myWrap: {},
  topWrap: {
    paddingVertical: size(60),
    paddingHorizontal: size(40),
  },
  topWrapCon: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  logo: {
    width: size(140),
    height: size(140),
    borderRadius: size(70),
  },
  topCon: {
    marginHorizontal: size(30),
  },
  topName: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    fontSize: size(36),
    fontWeight: 'bold',
    marginRight: size(20),
  },
  student: {
    fontSize: size(28),
    marginTop: size(10),
  },
  loginBtn: {
    textAlign: 'center',

    paddingVertical: size(4),
    paddingHorizontal: size(20),
    borderRadius: size(12),
    marginTop: size(6),

    alignSelf: 'center',
  },
  loginBtnText: {
    fontSize: size(24),
    lineHeight: size(60),
  },

  noLoginWrap: {
    flexDirection: 'row',
    paddingVertical: size(60),
    paddingHorizontal: size(40),
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  noLogin: {
    flexDirection: 'row',
  },
  img: {
    width: size(140),
    height: size(140),
    borderRadius: size(70),
    marginRight: size(30),
  },
  loginLabel: {
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  loginLabelTitle: {
    fontSize: size(28),
    fontWeight: 'bold',
  },
  noLoginBtn: {
    marginTop: size(10),
    height: size(60),
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: size(8),
    paddingHorizontal: size(20),
  },
  noLoginBtnText: {
    fontSize: size(28),
  },
});
