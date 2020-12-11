import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, ImageBackground } from 'react-native';

import { useTheme, useNavigation } from '@react-navigation/native';
import { useWechatLogin } from 'hook/wechat';
import { useDispatch, useSelector } from 'react-redux';
import { commitSessionId, getHomeSp, getHomeTp, getHomeCount, getUserInfo } from '@/store/actions';
import { useGetHomeData } from 'hook/useGetData';
import { size, checkStaticImg, $api, modal } from '@/utils';
import { Touchable, Icon, Button, TabBar } from 'ui';
import ScrollableTabView from 'react-native-scrollable-tab-view';
import LinearGradient from 'react-native-linear-gradient';
import Tab1 from './item/LoginTab1';
import Tab2 from './item/LoginTab2';
export default ({ route }) => {
  const { colors } = useTheme();
  const navigation = useNavigation();
  const getWechat = useWechatLogin();
  const getHomeData = useGetHomeData();
  const dispatch = useDispatch();
  const [hasStd, setHasStd] = useState(false);

  const type = route.params && route.params.type;
  const title = type ? '绑定' : '登录';
  useEffect(() => {
    getData();
  }, []);
  const getData = async () => {
    let res = await $api['my/bindConfig']();
    if (res.data.display && !res.data.display.allow_bind_using_invitation_code) {
      setHasStd(true);
    }
  };

  const login = async (params) => {
    try {
      let res = await $api['my/erpLogin'](params);
      console.log(res, 'erp');

      if (res.data && res.data.display && res.data.display.students_id) {
        dispatch(commitSessionId(res.data.display.uid));
        await getHomeData();

        navigation.navigate('首页');
      } else {
        modal.showToast(res.status.message);
      }
    } catch (error) {
      modal.showToast('绑定失败');
    }
  };

  return (
    <View style={[style.wrap, { backgroundColor: colors.background }]}>
      <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 0, y: 1 }} colors={colors.gradient_login} style={[style.linearGradient]}>
        <Button icon="back" iconColor={'#fff'} iconSize={16} style={style.backWrap} onPress={navigation.goBack} />
        <Text style={[style.title, { color: colors.primary }]}>厚仁留学{title}</Text>
      </LinearGradient>

      <ScrollableTabView
        contentProps={{
          keyboardShouldPersistTaps: 'always',
        }}
        renderTabBar={() => <TabBar style={style.tabBar} activeSize={size(36)} />}>
        <Tab1 tabLabel={'邀请码' + title} hasStd={hasStd} type={type} login={login} />
        <Tab2 tabLabel={'账号密码' + title} type={type} login={login} />
      </ScrollableTabView>

      {type ? null : (
        <View style={style.otherWrap}>
          <View style={style.otherTitle}>
            <View style={[style.line, { backgroundColor: colors.border_2 }]} />
            <Text style={[style.otherText]}>推荐使用微信登录</Text>
            <View style={[style.line, { backgroundColor: colors.border_2 }]} />
          </View>

          <Touchable onPress={getWechat} style={style.wechatWrap}>
            <Image source={require('@/assets/images/wechat.png')} style={style.wechat} />
          </Touchable>
        </View>
      )}
    </View>
  );
};
const style = StyleSheet.create({
  wrap: {
    flex: 1,
  },

  linearGradient: {
    height: '20%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  backWrap: {
    position: 'absolute',
    left: size(40),
    top: size(60),
    width: size(50),
    height: size(50),
  },

  title: {
    fontSize: size(54),
    fontWeight: 'bold',
  },

  otherTitle: {
    marginTop: size(80),
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  line: {
    width: '30%',
    height: size(1),
  },
  otherText: {
    fontSize: size(28),
    marginHorizontal: size(40),
  },
  wechatWrap: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  wechat: {
    width: size(100),
    height: size(100),
    marginTop: size(30),
    marginBottom: size(50),
  },
});
