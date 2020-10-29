import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useTheme } from '@react-navigation/native';
import { size, commonStyle } from '@/utils';
import { Touchable, Icon, Button } from 'ui';
export default (props) => {
  const { colors } = useTheme();

  const renderIcon = () => {
    let { icon, iconColor, iconSize } = props;

    if (icon) {
      return <Icon name={icon} disabled={true} color={iconColor} size={iconSize} />;
    } else {
      return null;
    }
  };

  const { title, onPress, isIconRight, numberOfLines } = props;

  const ComponentsWrap = onPress ? Touchable : View;

  return (
    <ComponentsWrap {...props} style={[style.main, props.style]} activeOpacity={0.8}>
      {isIconRight ? null : props.renderIcon ? props.renderIcon() : renderIcon()}
      <Text style={props.textStyle} numberOfLines={numberOfLines}>
        {title}
      </Text>
      {isIconRight ? (props.renderIcon ? props.renderIcon() : renderIcon()) : null}
    </ComponentsWrap>
  );
};
const style = StyleSheet.create({
  main: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
});
