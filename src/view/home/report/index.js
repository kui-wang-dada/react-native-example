import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useTheme } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { getHomeReport } from '@/store/actions';
import { ReportItem } from 'common';
import { size, commonStyle } from '@/utils';
import { Touchable, Icon, Button, FlowList } from 'ui';
export default (props) => {
  const { colors } = useTheme();

  console.log('props', props);
  let name = props.name;

  return (
    <View style={[style.wrap, { backgroundColor: colors.card }]}>
      <FlowList
        style={style.flatlistWrap}
        contentContainerStyle={style.flatlist}
        request={getHomeReport}
        renderItem={({ item }) => (
          <View style={style.recordItem}>
            <ReportItem item={item} />
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
    paddingTop: size(32),
    paddingBottom: size(200),
  },
  recordItem: {
    marginBottom: size(30),
  },
});
