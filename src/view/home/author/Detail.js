import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useTheme, useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { size } from '@/utils';
import { Touchable, Icon, Button } from 'ui';
export default () => {
  const { colors } = useTheme();
  const navigation = useNavigation();
  return (
    <View style={style.wrap}>
      <Text>123</Text>
    </View>
  );
};
const style = StyleSheet.create({
  wrap: {},
});
