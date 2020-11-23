import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useTheme } from '@react-navigation/native';
import { size, commonStyle } from '@/utils';
import { Touchable, Icon, Button, TabBar } from 'ui';
import ScrollableTabView from 'react-native-scrollable-tab-view';
import Tab1 from './item/LoginTab1';
import Tab2 from './item/LoginTab2';
export default () => {
  const { colors } = useTheme();
  return (
    <View style={style.wrap}>
      <ScrollableTabView
        renderTabBar={() => <TabBar style={[style.tabBar, { borderBottomColor: colors.border }]} />}
        contentProps={{
          keyboardShouldPersistTaps: 'always',
        }}>
        <Tab1 tabLabel="邀请码登录" />
        <Tab2 tabLabel="邮箱登录" />
      </ScrollableTabView>
    </View>
  );
};
const style = StyleSheet.create({
  wrap: {
    flex: 1,
  },
  tabBar: {
    borderBottomWidth: size(1),
  },
});
