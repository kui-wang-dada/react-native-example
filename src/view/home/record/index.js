import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useTheme } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { getRecordDetail } from '@/store/actions';
import { size, commonStyle, messageTime } from '@/utils';
import { Touchable, Icon, Button } from 'ui';
import { ListItem } from 'common';
export default ({ route, navigation }) => {
  const { colors } = useTheme();
  const dispatch = useDispatch();
  const recordDetail = useSelector((state) => state.home.recordDetail);
  console.log(recordDetail, 'params');
  useEffect(() => {
    // Update the document title using the browser API
    const { name } = route.params;
    let params = {
      name: name,
    };
    console.log(params, 'params');
    dispatch(getRecordDetail(params));
  }, []);

  let detail = recordDetail;
  let iconName = detail.tutoring_class_name && detail.tutoring_class_name.split('')[0];

  let desData = [
    {
      label: '辅导时长',
      value: detail.used_hours,
      icon: 'fudao',
      valueTip: '小时',
    },
    {
      label: '辅导日期',
      value: messageTime(detail.creation),
      icon: 'fudao',
    },
    {
      label: '辅导老师',
      value: detail.tutor_name,
      icon: 'fudao',
    },
  ];
  let parData = [
    {
      label: '学生出勤',
      value: detail.student_attendance,
      icon: 'book',
      type: 'attendance',
    },
    {
      label: '与老师互动',
      value: detail.student_interaction,
      icon: 'book',
      rightStyle: { color: '#4bc694' },
    },
    {
      label: '上课注意力',
      value: detail.student_concentration,
      icon: 'book',
      rightStyle: { color: '#4bc694' },
    },
    {
      label: '作业完成情况',
      value: detail.student_homework,
      icon: 'book',
      rightStyle: { color: '#4bc694' },
    },
  ];
  let isParent = !!detail.student_getwords;
  return (
    <View style={[style.recordDetail, { backgroundColor: colors.card }]}>
      <View style={[style.recordTop, { backgroundColor: colors.background }]}>
        <View style={style.top}>
          <View style={style.topLeft}>
            <Text style={[style.topIcon, { backgroundColor: colors.primary, color: colors.background }]}>{iconName}</Text>
            <Text style={[style.topName, { color: colors.text }]}>{detail.tutoring_class_name}</Text>
          </View>
          <Text style={[style.topRight, { color: colors.text_p }]}>{messageTime(detail.start_on)}</Text>
        </View>
        <View style={style.center}>
          <Text style={[style.centerText, { color: colors.text_p }]}>{detail.content}</Text>
        </View>
        {isParent ? (
          <View style={style.recordFeed}>
            <Text style={[style.title, { color: colors.text }]}>课堂反馈</Text>
            <View style={style.feed}>
              <Text style={[style.feedText, { color: colors.text_p }]}> {detail.student_getwords}</Text>
            </View>
          </View>
        ) : null}
      </View>

      <View style={[style.recordDes, { backgroundColor: colors.background }]}>
        <Text style={style.title}>课堂信息</Text>
        <View style={style.listWrap}>
          {desData.map((des, index) => {
            return <ListItem item={des} key={index} />;
          })}
        </View>
      </View>
      {isParent ? (
        <View style={[style.recordParent, { backgroundColor: colors.background }]}>
          <View style={style.titleWrap}>
            <Text style={[style.title, { color: colors.text }]}>学生表现</Text>
            <Text style={[style.label, { color: colors.text_tag }]}>(满分为5分)</Text>
          </View>

          <View style={style.listWrap}>
            {parData.map((par, index) => {
              return <ListItem item={par} key={index} />;
            })}
          </View>
        </View>
      ) : null}
      <View style={[style.sep, { backgroundColor: colors.card }]} />
      {/* <Comment userInfo={this.props.userInfo} data={this.props.recordDetail} type="Tutoring Event" afterSubmit={this.afterSubmit} /> */}
    </View>
  );
};
const style = StyleSheet.create({
  recordDetail: {
    paddingBottom: size(160),
  },
  recordTop: {
    padding: size(32),
    minHeight: size(400),
    marginBottom: size(20),
  },
  top: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: size(32),
  },
  topLeft: {
    flexDirection: 'row',

    alignItems: 'center',
  },
  topIcon: {
    textAlign: 'center',
    lineHeight: size(60),
    fontSize: size(28),
    fontWeight: 'bold',
    width: size(60),
    height: size(60),
    borderRadius: size(30),
    marginRight: size(16),
  },
  topName: {
    fontSize: size(32),
    fontWeight: 'bold',
  },
  topRight: {
    fontSize: size(28),
  },
  center: {},
  centerText: {
    fontSize: size(28),
  },
  recordFeed: {
    marginTop: size(50),
  },
  title: {
    fontSize: size(32),
    fontWeight: 'bold',
    paddingVertical: size(32),
  },
  feed: {
    marginTop: size(20),
  },
  feedText: {
    fontSize: size(28),
  },
  recordDes: {
    marginBottom: size(20),
    paddingHorizontal: size(32),
  },
  listWrap: {},
  recordParent: {
    paddingHorizontal: size(32),
  },
  titleWrap: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  label: {
    fontSize: size(28),
  },
  sep: {
    width: '100%',
    height: size(20),
  },
});
