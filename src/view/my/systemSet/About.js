import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useTheme } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { size, commonStyle } from '@/utils';
import { Touchable, Icon, Button } from 'ui';
export default () => {
  const { colors } = useTheme();

  const aboutData = useSelector((state) => state.my.aboutData);
  const version = useSelector((state) => state.my.version);
  return (
    <View style={[style.about, { backgroundColor: colors.background }]}>
      <View style={style.topWrap}>
        <Icon name="about" size={60} color={colors.primary} />
        <Text style={[style.title, { color: colors.text }]}>{'厚仁教育'}</Text>
        <Text style={[style.des, { color: colors.text_p }]}>
          版本
          <Text> {version}</Text>
        </Text>
      </View>
      <View style={style.bottomWrap}>
        <Text style={[style.label, { color: colors.text_p }]}>{'官方网站'}：www.wholeren.com</Text>
        <Text style={[style.label, { color: colors.text_p }]}>Copyright ©2020 {'厚仁集团'} All Rights Reserved</Text>
      </View>
    </View>
  );
};

const style = StyleSheet.create({
  about: {
    position: 'relative',
    height: '100%',
  },
  topWrap: {
    paddingTop: size(100),
    alignItems: 'center',
  },
  title: {
    marginTop: size(20),
    fontSize: size(32),
    fontWeight: 'bold',
    color: '#333',
  },
  des: {
    marginTop: size(20),
    fontSize: size(28),
    color: '#666',
  },
  bottomWrap: {
    position: 'absolute',
    bottom: size(100),
    left: 0,
    right: 0,
    alignItems: 'center',
  },
  label: {
    fontSize: size(24),
    color: '#999',
  },
});
