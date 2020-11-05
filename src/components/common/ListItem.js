import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useTheme } from '@react-navigation/native';
import { size, commonStyle } from '@/utils';
import { Touchable, Icon, Button } from 'ui';
export default (props) => {
  const { colors } = useTheme();

  let { item } = props;
  let { label, value, icon, type, rightStyle, valueTip } = item;
  if (type === 'attendance') {
    var attendance = {
      Late: ['迟到', '#F8BC5A'],
      Present: ['正常', '#4bc694'],
      Absent: ['缺勤', '#EE806B'],
    };
    var [statusLabel, statusColor] = attendance[value] || ['', ''];
  }
  return (
    <View style={[style.listItemWrap, { borderBottomColor: colors.border }, props.style]}>
      <View style={style.itemLeft}>
        <Icon name={icon} size={16} color={'#666'} />
        <Text style={[style.itemLabel, { color: colors.text_p }]}>{label}</Text>
      </View>
      {type === 'attendance' ? (
        <View style={[style.itemRight, style.itemAttendance, { backgroundColor: colors.card }]}>
          <Text style={[style.itemValue, { color: statusColor }]}>{statusLabel}</Text>
        </View>
      ) : (
        <View style={style.itemRight}>
          <Text style={[style.itemValue, rightStyle]}>{value}</Text>
          {valueTip ? <Text style={[style.itemValueTip, { color: colors.text_tag }]}>{valueTip}</Text> : null}
        </View>
      )}
    </View>
  );
};
const style = StyleSheet.create({
  listItemWrap: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: size(80),
    borderBottomWidth: size(1),
  },
  itemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  itemLabel: {
    fontSize: size(28),
    marginLeft: size(10),
  },
  itemRight: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: size(4),
    paddingHorizontal: size(20),
  },
  itemAttendance: {
    borderRadius: size(30),
  },
  itemValue: {
    fontSize: size(28),
    fontWeight: 'bold',
  },

  itemValueTip: {
    fontSize: size(24),
    marginLeft: size(6),
  },
});
