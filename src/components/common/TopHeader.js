import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useTheme } from '@react-navigation/native';
import { size, commonStyle } from '@/utils';
import { Touchable, Icon, Button } from 'ui';
export default (props) => {
  const { colors } = useTheme();

  let { hasRight, title, label, color, padding } = props;
  const handleRight = () => {
    if (props.hasRight) {
      props.handleRight && props.handleRight();
    }
  };
  return (
    <Touchable style={[style.topHeader, padding ? style.pad : null]} onPress={handleRight}>
      <View style={style.titleWrap}>
        <Text style={[style.line, color ? { backgroundColor: color } : { backgroundColor: colors.primary }]} />
        <Text style={[style.title, { color: colors.text }]}>{title}</Text>
        {label ? <View style={[style.label, { color: colors.text_tag }]}>{label}</View> : null}
      </View>
      {hasRight ? (
        <View style={style.right} click="handleRight">
          <Text style={[style.rightAll, { color: colors.text }]}>全部</Text>
          <Icon name="right" size={size(30)} color={colors.text_p} />
        </View>
      ) : null}
    </Touchable>
  );
};

const style = StyleSheet.create({
  topHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  titleWrap: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  line: {
    width: size(6),
    height: size(40),
    marginRight: size(20),
  },
  title: {
    fontSize: size(36),
    marginVertical: size(20),
    fontWeight: 'bold',
    textAlign: 'left',
  },
  label: {
    marginLeft: size(20),
  },
  right: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: size(32),
  },
  rightAll: {
    margin: 0,
    fontSize: size(24),
  },
  pad: {
    paddingHorizontal: size(32),
  },
});
