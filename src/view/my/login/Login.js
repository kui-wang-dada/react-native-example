import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, ImageBackground } from 'react-native';
import { useTheme } from '@react-navigation/native';
import { size, checkStaticImg, $api } from '@/utils';
import { Touchable, Icon, Button, TabBar } from 'ui';
import ScrollableTabView from 'react-native-scrollable-tab-view';
import Tab1 from './item/LoginTab1';
import Tab2 from './item/LoginTab2';
export default () => {
  const { colors } = useTheme();

  const [tab, setTab] = useState(1);
  const [hasStd, setHasStd] = useState(false);

  useEffect(() => {
    getData();
  }, []);
  const getData = async () => {
    let res = await $api['my/bindConfig']();
    if (res.data.display && !res.data.display.allow_bind_using_invitation_code) {
      setHasStd(true);
    }
  };
  return (
    <View style={style.wrap}>
      <ImageBackground source={require('@/assets/bg-theme.jpeg')} style={style.topWrap}>
        <Text style={[style.title, { color: colors.background }]}>厚仁留学</Text>
        <View style={style.tabTitleWrap}>
          <Button
            style={style.tabTextWrap}
            textStyle={[style.tabText, { color: colors.card }, tab === 1 ? { ...style.tabTextActive, ...{ color: colors.background } } : null]}
            title="邀请码登录"
            onPress={() => {
              setTab(1);
            }}
          />
          <View style={style.tabLine} />
          <Button
            style={style.tabTextWrap}
            textStyle={[style.tabText, { color: colors.card }, tab === 0 ? { ...style.tabTextActive, ...{ color: colors.background } } : null]}
            title="账号密码登录"
            onPress={() => {
              setTab(0);
            }}
          />
        </View>
      </ImageBackground>
      <View style={style.conWrap}>{tab === 1 ? <Tab1 hasStd={hasStd} /> : <Tab2 />}</View>

      <View style={style.otherWrap}>
        <View style={style.otherTitle}>
          <View style={[style.line, { backgroundColor: colors.border_2 }]} />
          <Text style={[style.otherText]}>社交账号登录</Text>
          <View style={[style.line, { backgroundColor: colors.border_2 }]} />
        </View>
        <Touchable style={style.wechatWrap}>
          <Image source={{ uri: checkStaticImg('wechat.png') }} style={style.wechat} />
        </Touchable>
      </View>
    </View>
  );
};
const style = StyleSheet.create({
  wrap: {
    flex: 1,
  },

  topWrap: {
    backgroundColor: 'red',
    paddingTop: '20%',
    paddingBottom: size(80),
    justifyContent: 'center',
    alignItems: 'center',
  },
  tabTitleWrap: {
    flexDirection: 'row',
    marginTop: size(60),
  },
  tabLine: {
    width: size(4),
    backgroundColor: '#fff',
    height: '100%',
    marginHorizontal: size(40),
  },
  tabTextWrap: {
    width: '35%',
    height: size(60),
    justifyContent: 'center',
    alignItems: 'center',
  },
  tabText: {
    fontSize: size(28),
  },
  tabTextActive: {
    fontSize: size(32),
    fontWeight: 'bold',
  },
  conWrap: {
    flex: 1,
    position: 'relative',
    top: -size(40),
    borderRadius: size(20),
    marginHorizontal: size(40),
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  title: {
    fontSize: size(54),
    fontWeight: 'bold',
  },

  tabBar: {
    borderBottomWidth: size(1),
  },
  bgImg: {
    position: 'absolute',
  },

  otherWrap: {},
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
    width: size(60),
    height: size(60),
    marginTop: size(30),
    marginBottom: size(50),
  },
});
