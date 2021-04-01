import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, ScrollView } from 'react-native';
import { useTheme } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { commitShowErp } from '@/store/actions';
import { size, commonStyle, checkStaticImg } from '@/utils';
import { Touchable, Icon, Button } from 'ui';
import Avatar from './components/Avatar';
import ListItem from './components/ListItem';
export default ({ route, navigation }) => {
  const { colors } = useTheme();
  const dispatch = useDispatch();
  const userInfo = useSelector((state) => state.my.userInfo);
  const showErp = useSelector((state) => state.common.showErp);
  const version = useSelector((state) => state.common.version);
  console.log(userInfo, 'params');

  const handleShowErp = () => {
    dispatch(commitShowErp('show'));
  };

  const listData = [
    {
      title: '我的合同',
      icon: 'contract',
      route: 'contract',
      beLogin: true,
    },
    {
      title: '交易记录',
      icon: 'order',
      route: 'order',
      border: true,
      beLogin: true,
    },
    {
      title: '联系客服',
      icon: 'kefu',
      route: 'livechat',
      params: { title: 'app个人中心' },
    },
    // {
    //   title: '指纹登录',
    //   icon: 'finger',
    //   route: 'finger',
    //   type: 'finger',
    // },
    {
      title: '关于厚仁',
      label: '查看厚仁业务',
      icon: 'wholeren',
      params: { id: 'gh_54505723e513', path: 'pages/home/index' },
      type: 'mini',
    },

    {
      title: '生物识别',
      icon: 'finger',
      route: 'finger',
      beLogin: true,
    },
    {
      title: '厚仁方法论',
      icon: 'setting',
      route: 'fits',
    },
    {
      title: '系统设置',
      icon: 'setting',
      route: 'systemSet',
    },
  ];

  if (userInfo.roles && userInfo.roles.includes('Employee')) {
    listData.push({
      title: 'ERP',
      icon: 'erp',
      type: 'erp',
    });
  }
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
            if (item.beLogin && !userInfo.name) {
              return null;
            }
            return (
              <View>
                <ListItem key={index} data={item} />
                {item.border ? <View style={[style.sep, { height: size(10), backgroundColor: colors.sep }]} /> : null}
              </View>
            );
          })}
        </View>
      </ScrollView>
      <View style={style.versionWrap}>
        <Text style={[style.version, { color: colors.text_tag }]}>当前版本：{version}</Text>
      </View>
      {showErp === 'hide' ? (
        <Button
          onPress={handleShowErp}
          style={style.btnWrap}
          title="erp"
          textStyle={{
            color: 'white',
            fontSize: size(28),
            fontWeight: 'bold',
          }}
        />
      ) : null}
    </View>
  );
};
const style = StyleSheet.create({
  myWrap: {
    flex: 1,
  },
  sep: {
    width: '100%',
    height: size(20),
  },
  myList: {
    flex: 1,
  },
  btnWrap: {
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: size(60),
    right: size(30),
    width: size(100),
    height: size(100),
    backgroundColor: '#ff6f6b',
    borderRadius: size(50),
  },
  versionWrap: {
    position: 'absolute',
    bottom: size(60),
    right: 0,
    left: 0,
  },
  version: {
    textAlign: 'center',
    fontSize: size(24),
  },
});
