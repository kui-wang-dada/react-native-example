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
    return item.label;
  });
  let dataY = props.data.map((item) => {
    return item.value;
  });
  const data = {
    dimensions: {
      data: dataX,
    },
    measures: [
      {
        data: dataY,
      },
    ],
  };

  let option = {
    tooltip: {
      trigger: 'axis',
      position: function (point, params, dom, rect, size) {
        var obj = { top: 60 };
        obj[['left', 'right'][+(point[0] < size.viewSize[0] / 2)]] = 5;
        return obj;
        // console.log(params, size, 'posit');
        // if (params[0].dataIndex > 2) {
        //   return [point[0] - size.contentSize[0], '10%'];
        // }
        // // 固定在顶部
        // return [point[0], '10%'];
      },
      extraCssText: 'text-align:left;z-index:999',
      formatter: function (params, ticket, callback) {
        console.log(params, 'paras');
        var showHtm = '';
        for (var i = 0; i < params.length; i++) {
          let displayValue = params[i].value;

          showHtm += params[i].name + '：' + displayValue;
        }
        return showHtm;
      },
      // formatter: "{b}：{c}",
      //  (params) => {
      //   console.log(params, "paras");
      //   const data = params[0];
      //   let html = "";
      //   html += `<span style="color:#fff442;font-size:bold;">${data.name}: ${data.value} <br/></span>`;
      //   return html;
      // },
    },

    color: ['#fc8300'],
    legend: {
      data: dataX.map((item) => {
        return item;
      }),
      type: 'plain',
    },
    xAxis: [
      {
        type: 'category',
        data: data.dimensions.data,
        axisTick: {
          alignWithLabel: true,
        },
      },
    ],
    yAxis: [
      {
        type: 'value',
      },
    ],
  };
  if (data && data.dimensions && data.measures) {
    option.series = data.measures.map((item) => {
      return {
        ...item,
        type: 'bar',
        label: {
          normal: {
            position: 'outside',
            show: true,
          },
        },
      };
    });
  }
  return (
    <View style={style.wrap}>
      <ECharts option={option} />
    </View>
  );
};
const style = StyleSheet.create({
  wrap: {
    marginTop: size(40),
    height: size(500),
  },
});
