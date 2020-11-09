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
      icon: 'biaoxian',
    },
    {
      label: '辅导老师',
      value: detail.tutor_name || detail.tutoring_teacher,
      icon: 'biaoxian',
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
      <View class="list-1">
        <View class="list-title-wrap">
          <Text class="list-title">学生在学校的情况反馈</Text>
        </View>

        <View class="list-wrap">
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
      <View class="list-2">
        <View class="list-title-wrap">
          <Text class="list-title">学生的辅导情况反馈</Text>
        </View>
        <View class="list-wrap">
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
      <View class="list-3">
        <View class="list-title-wrap">
          <Text class="list-title">辅导老师反馈</Text>
        </View>
        <View class="list-wrap">
          <ListItem item={list[0]} style={{ height: '50PX', background: '#fff' }} />
          <ListItem item={list[1]} style={{ height: '50PX', background: '#fff' }} />
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
      <View class="list-4">
        <View class="list-title-wrap">
          <Text class="list-title">下学期预选课程</Text>
        </View>
        <View class="list-wrap">
          <Ask item={list[0]} />
          {detail.next_semester_report ? detail.next_semester_report.length ? <Ask item={list[1]} /> : null : null}
        </View>
      </View>
    );
  };
  return (
    <ScrollView>
      <View class="scroll-wrap">
        <View className="title-wrap">
          <Text className="title">{detail.report_title}</Text>
          <Text className="title-time">{messageTime(detail.modified)}</Text>
        </View>
        {renderList1()}
        {renderList2()}
        {renderList3()}
        {renderList4()}

        <View className="bottom-list-wrap">
          {listData.map((item, index) => {
            return <ListItem item={item} key={index} style={{ height: '50PX' }} />;
          })}
        </View>
      </View>
    </ScrollView>
  );
};
const style = StyleSheet.create({
  wrap: {},
});
