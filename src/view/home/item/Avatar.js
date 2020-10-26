import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import {useTheme} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';

import LinearGradient from 'react-native-linear-gradient';
import {transformSize, commonStyle, checkStaticImg} from '@/utils';
import {Touchable, Icon, Button} from 'ui';

export default () => {
  const {colors} = useTheme();
  const userInfo = useSelector((state) => state.my.userInfo);
  const barHeight = useSelector((state) => state.common.barHeight);
  const homeCount = useSelector((state) => state.home.homeCount);

  const goToLogin = () => {};
  const goToAccount = () => {};
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
        <View style={style.stuNameWrap} onClick={goToAccount}>
          <View style={style.stuId}>
            <Text style={style.stuIdText}>{userInfo.students_id}</Text>
            <Icon value="chevron-right" size={16}></Icon>
          </View>
          <Text style={style.stuName}>{userInfo.students_name}</Text>
        </View>

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
        </View>
      </View>
    );
  };
  const renderNoLogin = () => {
    return (
      <View style={style.noLoginWrap} onClick={goToLogin}>
        <Text style={style.noLoginTitle}>厚仁学生中心</Text>
        <View style={style.noLoginCon}>
          <Image
            source={{uri: checkStaticImg('xueshu.png')}}
            style={style.noLoginImg}
          />
          <Text style={style.noLoginLabel}>
            您好！「厚仁学生中心」小程序仅对厚仁教育用户开放，请您进行微信授权并绑定厚仁学生账号。
          </Text>
        </View>
        <View style={style.noLoginBtnWrap}>
          <Text style={style.noLoginText}>点击登录</Text>
          <Icon value="chevron-right" size={16}></Icon>
        </View>
      </View>
    );
  };
  return (
    <LinearGradient
      start={{x: 0, y: 0}}
      end={{x: 1, y: 0}}
      colors={['#44a8d1', '#48e1b7']}
      style={[style.linearGradient, {paddingTop: barHeight}]}>
      <View className="avatar-wrap">
        {userInfo.students_id ? renderLogin() : renderNoLogin()}
      </View>
    </LinearGradient>
  );
};

const style = StyleSheet.create({
  linearGradient: {
    borderBottomLeftRadius: transformSize(30),
    borderBottomRightRadius: transformSize(30),
  },
  loginWrap: {
    paddingHorizontal: transformSize(32),
    paddingBottom: transformSize(120),
    flexDirection: 'column',
  },
  stuNameWrap: {
    flexDirection: 'column',
    marginBottom: transformSize(30),
  },
  stuId: {
    alignSelf: 'flex-start',
    marginTop: transformSize(20),

    marginBottom: transformSize(20),
    height: transformSize(60),
    lineHeight: transformSize(60),
    fontWeight: 'bold',
    borderRadius: transformSize(30),
  },
  stuIdText: {
    fontSize: transformSize(28),
    color: '#f3dbb4',
  },
  stuName: {
    fontSize: transformSize(36),
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
    borderRadius: transformSize(10),
  },
  stuLabel: {
    fontSize: transformSize(24),
    color: 'rgba(255, 255, 255, .7)',
  },
  stuValue: {
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  stuValueText: {
    fontSize: transformSize(50),
    fontWeight: 'bold',
    color: '#fff',
  },
  stuUnit: {
    fontSize: transformSize(24),
    color: 'rgba(255, 255, 255, 0.7)',
    marginLeft: transformSize(10),
  },

  noLoginWrap: {
    paddingHorizontal: transformSize(32),
    paddingBottom: transformSize(60),

    flexDirection: 'column',
  },
  noLoginTitle: {
    color: '#fff',
    fontSize: transformSize(40),
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
  noLoginCon: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: transformSize(60),
    marginBottom: transformSize(30),
  },
  noLoginImg: {
    width: transformSize(100),
    height: transformSize(100),
    borderRadius: transformSize(50),
    marginRight: transformSize(20),
  },
  noLoginLabel: {
    flex: 1,
    fontSize: transformSize(28),
    color: '#fff',
  },
  noLoginBtnWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    marginBottom: transformSize(40),
    alignSelf: 'flex-end',
    height: transformSize(60),
    lineHeight: transformSize(60),
    paddingHorizontal: transformSize(22),
    borderRadius: transformSize(30),
    backgroundColor: '#fff',
  },
  noLoginText: {
    height: transformSize(60),
    lineHeight: transformSize(60),
    fontSize: transformSize(28),
    color: '#E6A53D',
  },
});
