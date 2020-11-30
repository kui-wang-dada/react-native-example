import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useTheme } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { commitDarkTheme, commitColorTheme } from '@/store/actions';
import { size, commonStyle } from '@/utils';
import { Touchable, Icon, Button, Switch } from 'ui';
export default (props) => {
  const { colors } = useTheme();
  const dispatch = useDispatch();
  const darkTheme = useSelector((state) => state.my.darkTheme);
  let { data } = props;

  const handleSwitch = (callback) => {
    if (darkTheme) {
      callback(false);
      commitDarkTheme(false);
      commitColorTheme(commonStyle.lightColorTheme);
      commonStyle.changeTheme('light');
    } else {
      callback(true);
      commitDarkTheme(true);
      commitColorTheme(commonStyle.darkColorTheme);
      commonStyle.changeTheme('dark');
    }
  };
  return (
    <View style={{ backgroundColor: colors.background }}>
      <View
        style={[
          style.content,
          data.border
            ? null
            : {
                borderBottomWidth: size(1),
                borderBottomColor: colors.border,
              },
        ]}>
        <Text style={[style.label, { color: colors.text }]}>{data.label}</Text>
        <Switch value={darkTheme} onAsyncPress={handleSwitch} width={size(100)} height={size(50)} backgroundActive={colors.primary} />
      </View>

      {data.border ? <View style={[style.border, { backgroundColor: colors.border }]} /> : null}
    </View>
  );
};

const style = StyleSheet.create({
  content: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: size(40),
    alignItems: 'center',
    height: size(90),
  },

  label: { color: '#333', fontSize: size(28) },
  value: { flex: 1, textAlign: 'right', fontSize: size(28) },
  icon: { marginLeft: size(10) },
  border: {
    width: '100%',
    height: size(10),
  },
  textInputStyle: {
    flex: 1,
    textAlign: 'justify',
    height: size(98),
    fontSize: size(28),
  },
});
