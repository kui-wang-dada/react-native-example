import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {useTheme} from '@react-navigation/native';
import {size, commonStyle} from '@/utils';
import {Touchable, Icon, Button} from 'ui';
export default (props) => {
  const {colors} = useTheme();
  return (
    <View style={[style.tabs, props.style]}>
      {props.tabs.map((tab, i) => {
        return (
          <Touchable
            key={tab}
            onPress={() => props.goToPage(i)}
            style={style.tab}>
            <View style={style.tabWrap}>
              <Text
                style={[
                  style.tabText,
                  props.activeTab === i
                    ? {...style.activeText, ...{color: colors.color_blue}}
                    : null,
                ]}>
                {tab}
              </Text>
              {props.activeTab === i ? (
                <View
                  style={[style.active, {backgroundColor: colors.color_blue}]}
                />
              ) : null}
            </View>
          </Touchable>
        );
      })}
    </View>
  );
};
const style = StyleSheet.create({
  tabs: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    width: '100%',
    height: size(100),

    backgroundColor: '#fff',
  },
  tab: {
    height: '100%',
    paddingHorizontal: size(20),
    justifyContent: 'center',
    alignItems: 'center',
  },
  tabWrap: {
    position: 'relative',
  },
  tabText: {
    fontSize: size(28),
    color: '#203046',
  },
  activeText: {
    fontWeight: 'bold',
  },
  active: {
    position: 'absolute',
    left: '50%',
    transform: [
      {
        translateX: -size(36),
      },
    ],
    bottom: -size(24),
    width: size(76),
    height: size(6),
  },
});