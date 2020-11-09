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
        title: '学生在学校的课程出勤情况',
        tips: '是否有旷课、迟到、早退，原因',
        label: detail.school_attendance,
      },
      {
        title: '学生与学校老师沟通情况',
        tips: '是否和教授/助教有课堂/课下沟通',
        label: detail.professor_relations,
      },
      {
        title: '学校成绩是否有更新',
        tips: '近期作业、考试成绩',
        label: detail.grade_updates,
      },
      {
        title: '学生与同学相处情况',
        tips: '是否与同学有冲突矛盾，相处是否融洽',
        label: detail.classmate_relations,
      },
      {
        title: '学生使用学校资源情况',
        tips: '是否在图书馆学习，是否会查找资料、扫描复印、writing center等',
        label: detail.school_resource,
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
        label: '本月辅导所用课时数',
        value: detail.used_hours,
        valueTip: '小时',
      },
      {
        label: '当前剩余课时数量',
        value: detail.unused_hours,
        valueTip: '小时',
      },
      {
        title: '本月辅导科目及用时',
        conType: 'bar',
        nodata: '本月没有进行学术辅导',
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
      {
        title: '学生上课情况本月综合评分',
        conType: 'radar',
        con: [
          {
            label: '上课注意力',
            value: detail.concentrations_score,
            valueTip: '分',
          },
          {
            label: '与老师互动',
            value: detail.interactions_score,
            valueTip: '分',
          },
          {
            label: '作业完成情况',
            value: detail.homeworks_score,
            valueTip: '分',
          },
        ],
      },
    ];
    return (
      <View class="list-2">
        <View class="list-title-wrap">
          <Text class="list-title">学生的辅导情况反馈</Text>
        </View>
        <View class="list-wrap">
          <ListItem item={list[0]} style={{ height: '50PX', background: '#fff' }} />
          <ListItem item={list[1]} style={{ height: '50PX', background: '#fff' }} />
          <Ask item={list[2]} />
          {detail.tutoring_summary ? detail.tutoring_summary.length ? <Ask item={list[3]} /> : null : null}
        </View>
      </View>
    );
  };
  const renderList3 = () => {
    let list = [
      {
        title: '科目老师反馈总结',
        label: detail.tutoring_summary_notes,
      },
      {
        title: '厚仁学术导师反馈',
        tips: '进步方面和需要提高的方面分别是什么',
        label: detail.stakeholder_feedback,
      },
      {
        title: '特殊情况反馈',
        tips: '如情绪异常低落，辅导多次不出勤等',
        label: detail.warning_notes,
      },
    ];
    return (
      <View class="list-3">
        <View class="list-title-wrap">
          <Text class="list-title">辅导老师反馈</Text>
        </View>
        <View class="list-wrap">
          {list.map((item) => {
            return <Ask item={item} key={item.name} />;
          })}
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
