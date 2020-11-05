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
    navigation.navigate('recordDetail', { name: item.name });
  };

  let { item } = props;

  let iconName = item.tutoring_class_name && item.tutoring_class_name.split('')[0];
  let attendance = {
    Late: ['迟到', '#F8BC5A'],
    Present: ['正常', '#4bc694'],
    Absent: ['缺勤', '#EE806B'],
  };
  let [statusLabel, statusColor] = attendance[item.student_attendance] || ['', ''];
  return (
    <Touchable style={[style.recordItem, { backgroundColor: colors.background }]} onPress={goToDetail}>
      <View style={style.topWrap}>
        <View style={style.topLeft}>
          <View style={[style.topIconWrap, { backgroundColor: colors.primary }]}>
            <Text style={[style.topIcon, { color: colors.background }]}>{iconName}</Text>
          </View>
          <Text style={[style.topName, { color: colors.text }]}>{item.tutoring_class_name}</Text>
        </View>
        <Text style={[style.topRight, { color: colors.text_p }]}>{messageTime(item.start_on)}</Text>
      </View>
      <View style={[style.center]}>
        <Text numberOfLines={3} style={[style.centerText, { color: colors.text_p }]}>
          {item.content}
        </Text>
      </View>

      <View style={style.bottom}>
        <Text style={[style.time, { color: colors.text_p }]}>{item.used_hours}小时</Text>
        {statusLabel ? <Text style={[style.project, { color: statusColor, backgroundColor: colors.card }]}>{statusLabel}</Text> : null}
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
  bottom: {
    marginTop: size(20),
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  time: {
    fontSize: size(24),
  },
  project: {
    fontSize: size(24),
    paddingHorizontal: size(20),
    paddingVertical: size(4),
    borderRadius: size(40),
  },
});
