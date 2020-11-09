import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useTheme, useNavigation } from '@react-navigation/native';
import { size, commonStyle } from '@/utils';
import { Touchable, Icon, Button } from 'ui';
export default ({ props }) => {
  const { colors } = useTheme();
  const navigation = useNavigation();

  const goToPages = () => {
    let { route, params, icon, type } = props.data;
    let { loginEmail } = props;

    if (!loginEmail && icon !== 'chat') {
      navigation.navigate('login');
      return;
    }

    navigation.navigate(route, params);
  };

  let { title, icon } = props.data;

  return (
    <Touchable style={style.listItem} onPress={() => goToPages()}>
      <View style={[style.listWrap, { borderBottomColor: colors.border }]}>
        <View style={style.left}>
          <Icon name={icon} size={30} color={colors.primary} />
          <Text style={[style.label, { color: colors.text }]}>{title}</Text>
        </View>
        <Icon name="mo" size={18} color={colors.text_p} />
      </View>
    </Touchable>
  );
};

const style = StyleSheet.create({
  listItem: {
    paddingLeft: size(40),
    paddingRight: size(40),
  },
  listWrap: {
    height: size(100),
    borderBottomWidth: size(1),

    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  left: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  label: {
    marginLeft: size(20),
    fontSize: size(32),
    color: '#333',
  },
});