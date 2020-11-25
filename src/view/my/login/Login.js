import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, ImageBackground } from 'react-native';
import { useTheme } from '@react-navigation/native';
import { size, checkStaticImg } from '@/utils';
import { Touchable, Icon, Button, TabBar } from 'ui';
import ScrollableTabView from 'react-native-scrollable-tab-view';
import Tab1 from './item/LoginTab1';
import Tab2 from './item/LoginTab2';
export default () => {
  const { colors } = useTheme();
  return (
    <View style={style.wrap}>
      <View style={style.conWrap}>
        <Text style={[style.title, { color: colors.primary }]}>厚仁留学</Text>
      </View>
      <ScrollableTabView
        renderTabBar={() => <TabBar activeTheme={colors.primary} style={[style.tabBar, { borderBottomColor: colors.border }]} />}
        contentProps={{
          keyboardShouldPersistTaps: 'always',
        }}>
        <Tab1 tabLabel="邀请码登录" />
        <Tab2 tabLabel="邮箱登录" />
      </ScrollableTabView>
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

  conWrap: {
    marginTop: '20%',
    marginBottom: size(40),
    paddingHorizontal: size(40),
    alignItems: 'center',
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
