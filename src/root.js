import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, NativeModules} from 'react-native';
import {useDispatch} from 'react-redux';
import {commitBarHeight} from '@/store/actions/common';
// import {transformSize, commonStyle} from '@/utils';
import {Touchable, Icon} from 'ui';
import MyRouter from '@/router';

export default () => {
  const dispatch = useDispatch();

  useEffect(() => {
    // Update the document title using the browser API
    console.log(5);
    const {StatusBarManager} = NativeModules;

    // iOS Only
    StatusBarManager.getHeight((statusBarHeight) => {
      dispatch(commitBarHeight(statusBarHeight.height));
      console.log(statusBarHeight);
    });
  }, [dispatch]);
  return (
    <View style={style.wrap}>
      <MyRouter />
    </View>
  );
};

const style = StyleSheet.create({
  wrap: {
    flex: 1,
  },
});
