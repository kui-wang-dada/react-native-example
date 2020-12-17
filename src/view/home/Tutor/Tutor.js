import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useTheme } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { getTpDetail } from '@/store/actions';

import ScrollableTabView from 'react-native-scrollable-tab-view';
import { TutorItem } from 'common';
import { size, commonStyle } from '@/utils';
import { Touchable, Icon, Button, TabBar } from 'ui';
import { Tab1, Tab2, Tab3, Tab4, Tab5 } from './item';
export default ({ route, navigation }) => {
  const { colors } = useTheme();
  const dispatch = useDispatch();
  const userInfo = useSelector((state) => state.my.userInfo);
  const tpDetail = useSelector((state) => state.home.tpDetail);
  console.log(tpDetail, 'params');
  useEffect(() => {
    // Update the document title using the browser API
    const { name } = route.params;
    let params = {
      name: name,
    };
    console.log(params, 'params');
    dispatch(getTpDetail(params));
  }, []);

  const handleModal = (flag) => {
    this.setState({
      isOpened: flag,
    });
  };
  const handleProgress = (percent) => {
    this.setState({
      percent: percent,
    });
  };
  const { name } = route.params;
  return (
    <View style={style.wrap}>
      <View>
        <TutorItem item={tpDetail} from="detail" />
      </View>
      <ScrollableTabView
        contentProps={{
          keyboardShouldPersistTaps: 'always',
        }}
        renderTabBar={() => <TabBar style={style.tabBar} />}>
        <Tab1 tabLabel="辅导记录" name={name} />
        {userInfo.is_std ? null : <Tab2 tabLabel="辅导报告" name={name} />}
        <Tab3 tabLabel="文档报告" name={name} handleModal={handleModal} handleProgress={handleProgress} />
        <Tab4 tabLabel="辅导课程" name={name} />
        <Tab5 tabLabel="沟通记录" name={name} />
      </ScrollableTabView>
    </View>
  );
};
const style = StyleSheet.create({
  wrap: {
    flex: 1,
  },
});
