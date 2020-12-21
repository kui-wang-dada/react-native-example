import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useTheme } from '@react-navigation/native';
import { useNavigation } from '@react-navigation/native';
import { size, commonStyle } from '@/utils';
import { Touchable, Icon, Button } from 'ui';

export default (props) => {
  const { colors } = useTheme();
  const navigation = useNavigation();
  const goToTpDetail = () => {
    if (props.from === 'detail') {
      return;
    }
    navigation.navigate('tutor', { name: props.item.name });
  };

  let { item, from } = props;
  let statusStragety = {
    Complete: '已完结',
    Working: '服务中',
    Terminate: '已取消',
    HangOn: '暂停中',
  };
  return (
    <Touchable style={[style.tpItemWrap, { borderColor: colors.sep, backgroundColor: colors.background }]} onPress={goToTpDetail}>
      <View style={style.topWrap}>
        <Text style={[style.topName, { color: colors.text }]}>{item.plan_name}</Text>
        <View style={[style.topStatus, { backgroundColor: colors.sep }]}>
          <Text style={[style.topStatusText, { color: colors.text }]}>{statusStragety[item.plan_status]}</Text>
        </View>
      </View>
      <View style={[style.tpTimeWrap, from === 'detail' ? style.detail : null]}>
        <Text style={[style.timeWrap, { color: colors.text_p }]}>
          已用课时
          <Text style={[style.time, { color: colors.text }]}>{item.used_hours}</Text>
          小时
        </Text>

        <Text style={[style.timeWrap, { color: colors.text_p }]}>
          剩余课时
          <Text style={[style.time, { color: colors.text }]}>{item.unused_hours}</Text>
          小时
        </Text>
      </View>
    </Touchable>
  );
};
const style = StyleSheet.create({
  tpItemWrap: {
    padding: size(30),
    borderWidth: size(1),
    borderRadius: size(20),
  },
  topWrap: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  topName: {
    flex: 1,
    fontSize: size(32),
    fontWeight: 'bold',
  },
  topStatus: {
    marginLeft: size(40),
    width: size(140),
    height: size(50),

    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: size(25),
  },
  topStatusText: {
    fontSize: size(28),
  },
  tpTimeWrap: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: size(40),
  },
  detail: {},
  timeWrap: {
    fontSize: size(28),
  },
  time: {
    marginHorizontal: size(10),
    fontWeight: 'bold',
  },
});
