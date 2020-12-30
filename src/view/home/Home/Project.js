import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useTheme, useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { getServiceList } from '@/store/actions';
import { ServiceItem } from 'common';
import { size } from '@/utils';
import { Touchable, Icon, Button, FlowList } from 'ui';
export default () => {
  const { colors } = useTheme();
  const navigation = useNavigation();
  return (
    <View style={[style.wrap, { backgroundColor: colors.card }]}>
      <FlowList
        style={style.flatlistWrap}
        contentContainerStyle={style.flatlist}
        request={getServiceList}
        renderItem={({ item }) => (
          <View style={style.messageItem}>
            <ServiceItem item={item} />
          </View>
        )}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
};
const style = StyleSheet.create({
  wrap: {
    flex: 1,
  },
  flatlistWrap: {
    flex: 1,
    paddingHorizontal: size(32),
    paddingTop: size(20),
    paddingBottom: size(200),
  },
  messageItem: {
    marginVertical: size(20),
  },
});
