import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { useTheme, useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { size } from '@/utils';
import { Touchable, Icon, Button } from 'ui';
export default (props) => {
  const { colors } = useTheme();
  const navigation = useNavigation();
  const tipText = props.visible ? '没有更多了' : '加载中';
  return (
    <View style={[styles.endTipContainer]}>
      {props.visible ? null : <ActivityIndicator color={colors.text_tag} style={styles.endTipIcon} />}
      <Text style={[styles.endTipText, { color: colors.text_tag }]}>{tipText}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  endTipContainer: {
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 20,
  },
  endTipIcon: {
    marginRight: 10,
  },
  endTipText: {
    textAlign: 'center',
    color: '#999',
  },
});
