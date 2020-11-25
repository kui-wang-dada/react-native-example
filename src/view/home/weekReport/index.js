import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useTheme } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { getWeekReportDetail } from '@/store/actions';
import { ListItem } from 'common';
import { size, commonStyle, messageTime } from '@/utils';
import { Touchable, Icon, Button } from 'ui';

export default ({ route, navigation }) => {
  const { colors } = useTheme();
  const dispatch = useDispatch();
  const weekReportDetail = useSelector((state) => state.home.weekReportDetail);
  console.log(weekReportDetail, 'params');
  useEffect(() => {
    // Update the document title using the browser API
    const { name } = route.params;
    let params = {
      name: name,
    };
    console.log(params, 'params');
    dispatch(getWeekReportDetail(params));
  }, []);

  let detail = weekReportDetail;
  let iconName = detail.tutoring_class_name && detail.tutoring_class_name.split('')[0];
  let listData = [
    {
      label: '报告日期',
      value: messageTime(detail.start_on),
      icon: 'fudao',
    },
    {
      label: '辅导老师',
      value: detail.tutor_name,
      icon: 'fudao',
    },
  ];
  return (
    <View style={[style.weekReport, { backgroundColor: colors.card }]}>
      <View style={[style.weekMain, { backgroundColor: colors.background }]}>
        <View style={style.top}>
          <View style={style.topLeft}>
            <Text style={[style.topIcon, { backgroundColor: colors.primary }]}>{iconName}</Text>
            <Text style={[style.topName, { color: colors.text }]}>{detail.tutoring_class_name}</Text>
          </View>
          <Text style={[style.topRight, { color: colors.text_p }]}>{messageTime(detail.start_on)}</Text>
        </View>
        <View style={[style.center]}>
          <Text style={[style.centerText, { color: colors.text_p }]}> {detail.content}</Text>
        </View>
      </View>

      <View style={[style.listWrap, { backgroundColor: colors.background }]}>
        {listData.map((item, index) => {
          return <ListItem item={item} key={index} style={{ height: size(100) }} />;
        })}
      </View>
    </View>
  );
};
const style = StyleSheet.create({
  weekReport: {
    flex: 1,
  },
  weekMain: {
    padding: size(32),
    minHeight: size(400),
    marginBottom: size(20),
  },
  top: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: size(32),
  },
  topLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  topIcon: {
    textAlign: 'center',
    lineHeight: size(60),
    fontSize: size(28),
    fontWeight: 'bold',
    width: size(60),
    height: size(60),
    borderRadius: size(30),
    marginRight: size(16),
  },
  topName: {
    fontSize: size(32),
    fontWeight: 'bold',
  },
  topRight: {
    fontSize: size(28),
  },
  center: {},
  centerText: {
    fontSize: size(28),
  },
  listWrap: {
    paddingHorizontal: size(32),
  },
});
