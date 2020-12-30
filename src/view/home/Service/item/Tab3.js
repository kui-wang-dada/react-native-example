import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useTheme } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { getSpSchool } from '@/store/actions';
import { SchoolItem } from 'common';
import { size, commonStyle } from '@/utils';
import { Touchable, Icon, Button, FlowList } from 'ui';
export default (props) => {
  const { colors } = useTheme();

  console.log('props', props);
  let name = props.name;

  let params = {
    doctype: 'Service Project',
    name: name,
  };

  return (
    <View style={[style.wrap, { backgroundColor: colors.card }]}>
      <FlowList
        style={style.flatlistWrap}
        contentContainerStyle={style.flatlist}
        request={getSpSchool}
        params={params}
        renderItem={({ item }) => (
          <View style={style.schoolItem}>
            <SchoolItem item={item} />
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
  schoolItem: {
    marginBottom: size(30),
  },
});
