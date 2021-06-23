import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useTheme, useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { size } from '@/utils';
import { Touchable, Icon, Button } from 'ui';
import { getRelation } from '@/store/actions';
import HTMLView from 'react-native-htmlview';
export default () => {
  const { colors } = useTheme();
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const userInfo = useSelector((state) => state.my.userInfo);
  const relation = useSelector((state) => state.my.relation);
  useEffect(() => {
    dispatch(getRelation({}));
  }, []);
  let str = relation.page_header + relation.page_body + relation.page_footer;
  return (
    <ScrollView style={style.wrap}>
      <HTMLView value={`<p>${str || '--'}</p>`} stylesheet={styleHtml} paragraphBreak="" addLineBreaks={true} />
    </ScrollView>
  );
};
const styleHtml = StyleSheet.create({
  p: {
    lineHeight: size(40),
    fontSize: size(28),
    color: '#666',
  },
});
const style = StyleSheet.create({
  wrap: {
    flex: 1,
    paddingHorizontal: size(30),
    paddingVertical: size(40),
  },
});
