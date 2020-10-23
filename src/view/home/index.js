import React, {Component} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {useTheme} from '@react-navigation/native';
import {transformSize, commonStyle} from '@/utils';
import {Touchable, Icon} from 'ui';

export default () => {
  const {colors} = useTheme();

  return (
    <View>
      <Text style={{color: colors.text_p}}>123</Text>
    </View>
  );
};
