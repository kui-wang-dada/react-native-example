import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useTheme } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { size, commonStyle } from '@/utils';
import { Touchable, Icon, Button } from 'ui';
export default (props) => {
  const { colors } = useTheme();
  const dispatch = useDispatch();
  const userInfo = useSelector((state) => state.my.userInfo);

  const switchStudent = () => {};

  let { item } = props;
  let isActive = userInfo.students_id === item.name;
  return (
    <View style={[style.accountItem, { borderColor: colors.border_2 }, isActive ? { backgroundColor: colors.primary, border: 'none' } : null]}>
      <View style={style.leftWrap}>
        <Text style={[style.id, { color: colors.text_p }]}>{item.name}</Text>
        <Text style={[style.name, { color: colors.text }]}>{item.full_name}</Text>
      </View>
      {isActive ? (
        <Button title="查看中" style={[style.status, { backgroundColor: colors.background }]} textStyle={[style.statusText, { color: colors.primary }]} />
      ) : (
        <Button
          title="切换学生"
          style={[style.status, { backgroundColor: colors.primary }]}
          textStyle={[style.statusText, { color: colors.background }]}
          onPress={() => switchStudent(item)}
        />
      )}
    </View>
  );
};
const style = StyleSheet.create({
  accountItem: {
    marginTop: size(40),
    padding: size(30),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: size(1),
    borderRadius: size(20),
  },
  leftWrap: {
    flex: 1,
    marginRight: size(20),
    justifyContent: 'space-between',
    marginBottom: size(20),
  },
  id: {
    fontSize: size(28),
  },
  name: {
    fontSize: size(36),
    fontWeight: 'bold',
    marginTop: size(20),
  },
  status: {
    width: size(140),
    height: size(60),
    textAlign: 'center',
    lineHeight: size(60),
    borderRadius: size(8),
  },
  statusText: {
    fontSize: size(28),
  },
});
