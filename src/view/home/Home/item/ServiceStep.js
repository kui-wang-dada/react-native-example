import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useTheme, useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { checkStaticImg, size } from '@/utils';
import { Touchable, Icon, Button, Image } from 'ui';
export default () => {
  const { colors } = useTheme();
  const navigation = useNavigation();
  return (
    <View style={style.wrap}>
      <Image source={{ uri: checkStaticImg('home-bg.jpeg') }} style={[style.img, { backgroundColor: colors.background }]} />
    </View>
  );
};
const style = StyleSheet.create({
  wrap: {
    paddingVertical: size(40),
  },
  img: {
    width: '100%',
    minHeight: size(1200),
    resizeMode: 'cover',
  },
});
