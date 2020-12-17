import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useTheme, useNavigation } from '@react-navigation/native';
import { ECharts } from 'react-native-echarts-wrapper';
import { useDispatch, useSelector } from 'react-redux';
import { size } from '@/utils';
import { Touchable, Icon, Button } from 'ui';
export default (props) => {
  const { colors } = useTheme();
  const navigation = useNavigation();

  let dataX = props.data.map((item) => {
    return {
      name: item.label,
      max: 5,
    };
  });
  let dataY = props.data.map((item) => {
    return item.value;
  });

  console.log(dataY, 'dataxy');
  let option = {
    title: {
      text: '',
    },
    tooltip: {},
    color: '#fc8300',
    zlevel: 100,
    symbolSize: 3,
    symbolOffset: [20, 20],
    layoutSize: '90%',
    radar: {
      shape: 'circle',

      name: {
        textStyle: {
          color: '#fff',
          backgroundColor: '#999',
          borderRadius: 3,
          padding: [3, 5],
        },
      },
      indicator: dataX,
    },
    series: [
      {
        name: '上课情况综合评分',
        type: 'radar',
        label: {
          normal: {
            position: 'outside',
            show: true,
          },
        },
        // areaStyle: {normal: {}},
        data: [
          {
            value: dataY,
            name: '上课情况综合评分',
          },
        ],
      },
    ],
  };
  return (
    <View style={style.wrap}>
      <ECharts option={option} backgroundColor="red" />
    </View>
  );
};
const style = StyleSheet.create({
  wrap: {
    marginTop: size(40),
    height: size(500),
  },
});
