import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useTheme, useNavigation } from '@react-navigation/native';
import { size, commonStyle } from '@/utils';
import { Touchable, Icon, Button } from 'ui';
export default (props) => {
  const { colors } = useTheme();

  const navigation = useNavigation();
  const goToDetail = () => {
    let { item } = props;
    navigation.navigate('courseDetail', { name: item.name });
  };

  let { item } = props;
  let letterOne = item.class_name && item.class_name.slice(0, 1);
  return (
    <Touchable style={[style.courseItem, { backgroundColor: colors.background }]} onPress={goToDetail}>
      <View style={[style.letterImg, { backgroundColor: colors.primary }]}>
        <Text style={[style.letterImgText, { color: colors.background }]}>{letterOne}</Text>
      </View>
      <View style={style.con}>
        <View style={style.conTop}>
          <Text style={[style.name, { color: colors.text }]}>{item.class_name}</Text>
          <Text style={[style.semester, { color: colors.text_p }]}>学期：{item.semester}</Text>
        </View>
        <View style={style.conBottom}>
          <Text style={[style.times, { color: colors.text_p }]}>辅导次数：{item.tutoring_events_times || item.tutoring_events_count} 次</Text>
          <Text style={[style.hours, { color: colors.text_p }]}>辅导总时长：{item.used_hours} 小时</Text>
        </View>
      </View>
    </Touchable>
  );
};
const style = StyleSheet.create({
  courseItem: {
    padding: size(30),
    flexDirection: 'row',
    alignItems: 'center',
  },
  letterImg: {
    justifyContent: 'center',
    alignItems: 'center',
    width: size(80),
    height: size(80),
    borderRadius: size(8),
    marginRight: size(30),
  },
  letterImgText: {
    fontSize: size(28),
    fontWeight: 'bold',
  },
  con: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
  },
  conTop: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  name: {
    fontSize: size(28),
    fontWeight: 'bold',
  },
  semester: {
    fontSize: size(24),
  },
  conBottom: {
    width: '100%',
    marginTop: size(20),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  times: {
    fontSize: size(24),
  },
  hours: {
    fontSize: size(24),
  },
});
