import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useTheme } from '@react-navigation/native';
import { size, commonStyle } from '@/utils';
import { Touchable, Icon, Button } from 'ui';

export default (props) => {
  const { colors } = useTheme();

  const { labelStyle, titleStyle, border = true, islink = false, title, leftIcon, label } = props;

  const renderLeft = () => {
    let { leftIcon, label } = props;
    return (
      <View style={style.left}>
        {leftIcon ? <Icon name={leftIcon.name} size={leftIcon.size} color={leftIcon.color} style={{ marginRight: size(10) }} /> : null}
        <Text style={[style.label, { color: colors.text }, labelStyle]}>{label}</Text>
      </View>
    );
  };

  const renderRight = () => {
    return (
      <View style={style.right}>
        <Text style={[style.title, { color: colors.text }, titleStyle]}>{title}</Text>
        {islink ? <Icon name="right" size={15} color={colors.text_tag} style={{ marginLeft: size(10) }} /> : null}
      </View>
    );
  };

  return (
    <Touchable onPress={props.onPress} style={[style.wrap, props.style, border ? { borderBottomColor: colors.border } : null]}>
      {renderLeft()}
      {renderRight()}
    </Touchable>
  );
};

const style = StyleSheet.create({
  wrap: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: size(90),
    borderBottomWidth: size(1),
  },

  left: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  label: {
    fontSize: size(32),

    fontWeight: 'bold',
  },
  right: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    flex: 1,
    textAlign: 'right',
  },
  title: {
    fontSize: size(32),
    flex: 1,
    textAlign: 'right',
    flexWrap: 'wrap',
  },
});
