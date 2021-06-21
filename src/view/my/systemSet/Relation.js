import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useTheme, useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { size } from '@/utils';
import { Touchable, Icon, Button } from 'uiCommon';
import { getRelation } from '@/store/actions';
export default () => {
  const { colors } = useTheme();
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const userInfo = useSelector((state) => state.my.userInfo);
  useEffect(() => {
    dispatch(getRelation({}));
  }, []);
  return (
    <View style={style.wrap}>
      <Text>123</Text>
    </View>
  );
};
const style = StyleSheet.create({
  wrap: {},
});
