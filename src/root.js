import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet} from 'react-native';
// import {transformSize, commonStyle} from '@/utils';
import {Touchable, Icon} from 'ui';
import MyRouter from '@/router';

export default function Root() {
  return (
    <View style={style.wrap}>
      <MyRouter></MyRouter>
    </View>
  );
}

const style = StyleSheet.create({
  wrap: {
    flex: 1,
  },
});
