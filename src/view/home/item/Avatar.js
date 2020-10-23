import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {useTheme} from '@react-navigation/native';
import {transformSize, commonStyle} from '@/utils';
import {Touchable, Icon, Button} from 'ui';

export default () => {
  const {colors} = useTheme();
  return (
    <View style={style.wrap}>
      <Text>123</Text>
    </View>
  );
};
const style = StyleSheet.create({
  wrap: {},
});
