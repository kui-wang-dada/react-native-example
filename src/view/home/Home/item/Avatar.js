import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { useTheme, useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';

import LinearGradient from 'react-native-linear-gradient';
import { size, commonStyle, checkStaticImg } from '@/utils';
import { Touchable, Icon, Button } from 'ui';

export default () => {
  const { colors } = useTheme();
  const navigation = useNavigation();

  const userInfo = useSelector((state) => state.my.userInfo);
  const barHeight = useSelector((state) => state.common.barHeight);
  const homeCount = useSelector((state) => state.home.homeCount);

  const goToLogin = () => {
    if (userInfo.name) {
      navigation.navigate('erpBind');
    } else {
      navigation.navigate('login');
    }
  };
  const goToAccount = () => {
    navigation.navigate('account');
  };
  const renderLogin = () => {
    console.log(homeCount, 'homeCount');
    let conData = [
      {
        label: '进入服务',
        value: homeCount.total_days,
        unit: '天',
      },
      {
        label: '沟通时长',
        value: homeCount.total_time,
        unit: '分钟',
      },
      {
        label: '沟通频次',
        value: homeCount.total_records,
        unit: '次',
      },
    ];
    return (
      <View style={style.loginWrap}>
        <Touchable style={style.stuNameWrap} onPress={goToAccount}>
          <View style={style.stuId}>
            <Text style={style.stuIdText}>{userInfo.students_id}</Text>
            <Icon name="right" size={14} color="#f3dbb4" />
          </View>
          <Text style={style.stuName}>{userInfo.students_name}</Text>
        </Touchable>
        {/*
        <View style={style.stuCon}>
          {conData.map((item, index) => {
            return (
              <View style={style.stuItem} key={index}>
                <Text style={style.stuLabel}>{item.label}</Text>
                <View style={style.stuValue}>
                  <Text style={style.stuValueText}> {item.value}</Text>

                  <Text style={style.stuUnit}>{item.unit}</Text>
                </View>
              </View>
            );
          })}
        </View> */}
      </View>
    );
  };
  const renderNoLogin = () => {
    return (
      <Touchable style={style.noLoginWrap} onPress={goToLogin}>
        <Text style={style.noLoginTitle}>厚仁学生中心</Text>
        <View style={style.noLoginCon}>
          <Image source={{ uri: checkStaticImg('xueshu.png') }} style={style.noLoginImg} />
          <Text style={style.noLoginLabel}>您好！「厚仁学生中心」APP仅对厚仁教育用户开放，请您进行微信授权并绑定厚仁学生账号。</Text>
        </View>
        {userInfo.name ? (
          <Button style={style.noLoginBtnWrap} textStyle={style.noLoginText} icon="right" iconSize={16} iconColor="#E6A53D" title="绑定厚仁账号" />
        ) : (
          <Button style={style.noLoginBtnWrap} textStyle={style.noLoginText} icon="right" iconSize={16} iconColor="#E6A53D" title="点击登录" />
        )}
      </Touchable>
    );
  };
  return (
    <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} colors={colors.gradient} style={[style.linearGradient, { paddingTop: barHeight }]}>
      <View style={style.avatarWrap}>{userInfo.students_id ? renderLogin() : renderNoLogin()}</View>
    </LinearGradient>
  );
};

const style = StyleSheet.create({
  linearGradient: {
    borderBottomLeftRadius: size(30),
    borderBottomRightRadius: size(30),
  },
  avatarWrap: {
    paddingTop: size(20),
  },
  loginWrap: {
    paddingHorizontal: size(32),
    paddingBottom: size(120),
    flexDirection: 'column',
  },
  stuNameWrap: {
    flexDirection: 'column',
    marginBottom: size(40),
  },
  stuId: {
    flexDirection: 'row',
    alignSelf: 'flex-start',
    alignItems: 'center',
    marginTop: size(20),

    marginBottom: size(20),
    height: size(60),
    lineHeight: size(60),
    fontWeight: 'bold',
    borderRadius: size(30),
  },
  stuIdText: {
    fontSize: size(28),
    color: '#f3dbb4',
  },
  stuName: {
    fontSize: size(36),
    fontWeight: 'bold',
    color: '#fff',
  },
  stuCon: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  stuItem: {
    flexDirection: 'column',
    alignItems: 'center',
    flex: 1,
    borderRadius: size(10),
  },
  stuLabel: {
    fontSize: size(24),
    color: 'rgba(255, 255, 255, .7)',
  },
  stuValue: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    marginTop: size(10),
  },
  stuValueText: {
    fontSize: size(50),
    fontWeight: 'bold',
    color: '#fff',
  },
  stuUnit: {
    fontSize: size(24),
    color: 'rgba(255, 255, 255, 0.7)',
    marginLeft: size(10),
    marginBottom: size(10),
  },

  noLoginWrap: {
    paddingHorizontal: size(32),
    paddingBottom: size(60),

    flexDirection: 'column',
  },
  noLoginTitle: {
    color: '#fff',
    fontSize: size(40),
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
  noLoginCon: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: size(60),
    marginBottom: size(30),
  },
  noLoginImg: {
    width: size(100),
    height: size(100),
    borderRadius: size(50),
    marginRight: size(20),
  },
  noLoginLabel: {
    flex: 1,
    fontSize: size(28),
    color: '#fff',
    lineHeight: size(40),
  },
  noLoginBtnWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    marginBottom: size(40),
    alignSelf: 'flex-end',
    height: size(60),
    lineHeight: size(60),
    paddingHorizontal: size(22),
    borderRadius: size(30),
    backgroundColor: '#fff',
  },
  noLoginText: {
    height: size(60),
    lineHeight: size(60),
    fontSize: size(28),
    color: '#E6A53D',
  },
});
