import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useTheme } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { getWeekReportDetail } from '@/store/actions';
import { size, commonStyle, messageTime } from '@/utils';
import { Touchable, Icon, Button } from 'ui';
import { ListItem } from 'common';
import Ask from './components/Ask';
export default ({ route, navigation }) => {
  const { colors } = useTheme();
  const dispatch = useDispatch();
  const weekReportDetail = useSelector((state) => state.home.weekReportDetail);
  console.log(weekReportDetail, 'params');
  useEffect(() => {
    // Update the document title using the browser API
    const { name } = route.params;
    let params = {
      name: name,
    };
    console.log(params, 'params');
    dispatch(getWeekReportDetail(params));
  }, []);

  let detail = weekReportDetail;
  let listData = [
    {
      label: '报告日期',
      value: messageTime(detail.modified),
      icon: 'fudao',
    },
    {
      label: '辅导老师',
      value: detail.tutor_name || detail.tutoring_teacher,
      icon: 'fudao',
    },
  ];

  const renderList1 = () => {
    let list = [
      {
        title: '本学期完成课程',
        label: detail.this_semester_classes,
      },
      {
        title: '成绩单详情及截图',
        img: detail.semester_report,
      },
    ];
    return (
      <View style={style.list1}>
        <View style={[style.listTitleWrap, { backgroundColor: colors.assist, borderBottomColor: colors.color_yellow }]}>
          <Text style={[style.listTitle, { backgroundColor: colors.assist, color: colors.background }]}>学生在学校的情况反馈</Text>
        </View>

        <View style={[style.listWrap, { backgroundColor: colors.card }]}>
          {list.map((item) => {
            return <Ask item={item} key={item.name} />;
          })}
        </View>
      </View>
    );
  };
  const renderList2 = () => {
    let list = [
      {
        title: '厚仁学术导师反馈',

        label: detail.tutoring_summary_notes,
      },
      {
        title: '下一阶段建议',

        label: detail.recommendations,
      },
    ];
    return (
      <View style={style.list2}>
        <View style={[style.listTitleWrap, { backgroundColor: colors.assist, borderBottomColor: colors.color_yellow }]}>
          <Text style={[style.listTitle, { backgroundColor: colors.assist, color: colors.background }]}>学生的辅导情况反馈</Text>
        </View>
        <View style={[style.listWrap, { backgroundColor: colors.card }]}>
          {list.map((item) => {
            return <Ask item={item} key={item.name} />;
          })}
        </View>
      </View>
    );
  };
  const renderList3 = () => {
    let list = [
      {
        label: '本学期辅导所用课时数',
        value: detail.used_hours,
        valueTip: '小时',
      },
      {
        label: '当前剩余课时数量',
        value: detail.unused_hours,
        valueTip: '小时',
      },
      {
        title: '本学期辅导科目及用时',
        nodata: '本学期没有进行学术辅导',
        con:
          detail.tutoring_summary &&
          detail.tutoring_summary.map((item) => {
            return {
              label: item.tutoring_class_name,
              value: item.used_hours,
              valueTip: '小时',
            };
          }),
      },
    ];
    return (
      <View style={style.list3}>
        <View style={[style.listTitleWrap, { backgroundColor: colors.assist, borderBottomColor: colors.color_yellow }]}>
          <Text style={[style.listTitle, { backgroundColor: colors.assist, color: colors.background }]}>辅导老师反馈</Text>
        </View>
        <View style={[style.listWrap, { backgroundColor: colors.card }]}>
          <ListItem item={list[0]} style={{ height: size(100), backgroundColor: colors.background }} />
          <ListItem item={list[1]} style={{ height: size(100), backgroundColor: colors.background }} />
          <Ask item={list[2]} />
        </View>
      </View>
    );
  };
  const renderList4 = () => {
    let list = [
      {
        title: '下学期预选课程',
        label: detail.next_semester_classes,
      },
      {
        title: '课程截图',
        img: detail.next_semester_report,
      },
    ];
    return (
      <View style={style.list4}>
        <View style={[style.listTitleWrap, { backgroundColor: colors.assist, borderBottomColor: colors.color_yellow }]}>
          <Text style={[style.listTitle, { backgroundColor: colors.assist, color: colors.background }]}>下学期预选课程</Text>
        </View>
        <View style={[style.listWrap, { backgroundColor: colors.card }]}>
          <Ask item={list[0]} />
          {detail.next_semester_report ? detail.next_semester_report.length ? <Ask item={list[1]} /> : null : null}
        </View>
      </View>
    );
  };
  return (
    <ScrollView>
      <View style={style.scrollWrap}>
        <View style={style.titleWrap}>
          <Text style={[style.title, { color: colors.primary }]}>{detail.report_title}</Text>
          <Text style={[style.titleTime, { color: colors.text_tag }]}>{messageTime(detail.modified)}</Text>
        </View>
        {renderList1()}
        {renderList2()}
        {renderList3()}
        {renderList4()}

        <View style={style.bottomListWrap}>
          {listData.map((item, index) => {
            return <ListItem item={item} key={index} style={{ height: size(100) }} />;
          })}
        </View>
      </View>
    </ScrollView>
  );
};
const style = StyleSheet.create({
  scrollWrap: {
    paddingBottom: size(60),
  },
  titleWrap: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: size(32),
  },
  title: {
    fontSize: size(48),
  },
  titleTime: {
    fontSize: size(24),
  },
  bottomListWrap: {
    paddingHorizontal: size(32),
  },
  list1: {},
  list2: {},
  list3: {},
  listTitleWrap: {
    height: size(120),
    flexDirection: 'row',
    alignItems: 'flex-end',
    paddingHorizontal: size(32),
    borderBottomWidth: size(2),
  },
  listTitle: {
    height: size(80),
    lineHeight: size(80),
    paddingHorizontal: size(20),
    fontWeight: 'bold',
    fontSize: size(36),
  },
  listWrap: {
    padding: size(20),
  },
});
