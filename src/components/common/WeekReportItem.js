import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useTheme, useNavigation } from '@react-navigation/native';
import { size, commonStyle, messageTime } from '@/utils';
import { Touchable, Icon, Button } from 'ui';
export default (props) => {
  const { colors } = useTheme();
  const navigation = useNavigation();
  const goToDetail = () => {
    let { item } = props;

    let stragety = {
      'TPRT-00001': 'weekReport',
      'TPRT-00002': 'monthReport',
      'TPRT-00004': 'termReport',
    };
    navigation.navigate(stragety[item.report_type], { name: item.name });
  };

  let { item } = props;

  let stragety = {
    'TPRT-00001': { title: item.tutoring_class_name, label: item.content },
    'TPRT-00002': { title: '月报告', label: item.report_title },
    'TPRT-00004': { title: '期末总结', label: item.report_title },
  };

  let iconName = stragety[item.report_type].title && stragety[item.report_type].title.split('')[0];
  return (
    <Touchable style={[style.recordItem, { backgroundColor: colors.background }]} onPress={goToDetail}>
      <View style={style.topWrap}>
        <View style={style.topLeft}>
          <View style={[style.topIconWrap, { backgroundColor: colors.primary }]}>
            <Text style={[style.topIcon, { color: colors.background }]}>{iconName}</Text>
          </View>

          <Text style={[style.topName, { color: colors.text }]}>{stragety[item.report_type].title}</Text>
        </View>
        <Text style={[style.topRight, { color: colors.text_p }]}>{messageTime(item.start_on)}</Text>
      </View>
      <View style={[style.center]}>
        <Text numberOfLines={3} style={[style.centerText, { color: colors.text_p }]}>
          {stragety[item.report_type].label}
        </Text>
      </View>
    </Touchable>
  );
};
const style = StyleSheet.create({
  recordItem: {
    padding: size(30),
  },
  topWrap: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: size(20),
  },
  topLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  topIconWrap: {
    width: size(44),
    height: size(44),
    borderRadius: size(22),
    marginRight: size(10),
    justifyContent: 'center',
    alignItems: 'center',
  },
  topIcon: {
    fontSize: size(28),
    fontWeight: 'bold',
  },
  topName: {
    fontSize: size(28),
    fontWeight: 'bold',
  },
  topRight: {
    fontSize: size(28),
  },
  center: {
    fontSize: size(28),
  },
  centerText: {
    fontSize: size(28),
    lineHeight: size(40),
  },
});
