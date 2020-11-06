import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useTheme } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { getCourseRecord, getCourseDetail } from '@/store/actions';
import { size, commonStyle } from '@/utils';
import { Touchable, Icon, Button, FlowList } from 'ui';
import { CourseItem, RecordItem } from 'common';
export default ({ route, navigation }) => {
  const { colors } = useTheme();
  const dispatch = useDispatch();
  const courseDetail = useSelector((state) => state.home.courseDetail);
  console.log(courseDetail, 'params');

  const { name } = route.params;
  let params = {
    name: name,
  };
  useEffect(() => {
    // Update the document title using the browser API

    console.log(params, 'params');
    dispatch(getCourseDetail(params));
  }, []);

  return (
    <View style={[style.wrap, { backgroundColor: colors.card }]}>
      <View style={[style.header, { backgroundColor: colors.background }]}>
        <CourseItem item={courseDetail} />
      </View>
      <FlowList
        style={style.flatlistWrap}
        contentContainerStyle={style.flatlist}
        request={getCourseRecord}
        params={params}
        renderItem={({ item }) => (
          <View style={[style.recordItem, { borderBottomColor: colors.border }]}>
            <RecordItem item={item} />
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
  header: {
    marginBottom: size(20),
  },
  recordItem: {
    borderBottomWidth: size(1),
  },
});
