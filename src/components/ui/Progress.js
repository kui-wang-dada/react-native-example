import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useTheme, useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { size } from '@/utils';
import { Touchable, Icon, Button } from 'ui';
export default (props) => {
  const { colors } = useTheme();
  const navigation = useNavigation();
  let { percent = 0, height = 30, loading = true } = props;
  let { color_blue, primary } = colors;
  console.log(percent, 'percent');
  return (
    <View style={[style.progress, { height }, loading ? null : { borderRadius: size(20) }]}>
      <View style={[style.progressBar, loading ? { backgroundColor: primary } : { borderRadius: size(20) }, { width: size((percent > 100 ? 100 : percent) * 7.5) }]} />
      {loading ? null : (
        <Text
          style={[
            style.text,
            percent > 10
              ? {
                  left: size((percent > 100 ? 100 : percent) * 6.7) - 35,
                }
              : { left: size(percent * 6.7) + 5, color: color_blue },
          ]}>
          {percent + '%'}
        </Text>
      )}
    </View>
  );
};
const style = StyleSheet.create({
  progress: {
    position: 'relative',
    backgroundColor: '#e5e5e5',
  },
  progressBar: {
    position: 'absolute',
    width: 100,
    height: '100%',
  },
  text: {
    position: 'absolute',
    fontSize: size(24),
    top: '50%',
    transform: [
      {
        translateY: -size(12),
      },
    ],
    left: 70,
    color: '#fff',
  },
});
