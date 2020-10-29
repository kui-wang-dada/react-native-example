import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {useTheme} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {getSpDetail} from '@/store/actions';

import ScrollableTabView from 'react-native-scrollable-tab-view';
import {ServiceItem} from 'common';
import {size, commonStyle} from '@/utils';
import {Touchable, Icon, Button, TabBar} from 'ui';
import {Tab1, Tab2, Tab3, Tab4, Tab5} from './item';
export default ({route, navigation}) => {
  const {colors} = useTheme();
  const dispatch = useDispatch();
  const spDetail = useSelector((state) => state.home.spDetail);
  console.log(spDetail, 'params');
  useEffect(() => {
    // Update the document title using the browser API
    const {name} = route.params;
    let params = {
      name: name,
    };
    console.log(params, 'params');
    dispatch(getSpDetail(params));
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
  const {name} = route.params;
  return spDetail.name ? (
    <View style={style.wrap}>
      <View>
        <ServiceItem item={spDetail} from="detail" />
      </View>
      <ScrollableTabView
        contentProps={{
          keyboardShouldPersistTaps: 'always',
        }}
        renderTabBar={() => <TabBar style={style.tabBar} />}>
        <Tab1 tabLabel="沟通记录" name={name} />
        <Tab2 tabLabel="服务流程" name={name} list={spDetail.tasks} />
        <Tab3 tabLabel="选校单" name={name} />
        <Tab4
          tabLabel="文档报告"
          name={name}
          handleModal={handleModal}
          handleProgress={handleProgress}
        />
      </ScrollableTabView>
    </View>
  ) : null;
};
const style = StyleSheet.create({
  wrap: {
    flex: 1,
  },
});
