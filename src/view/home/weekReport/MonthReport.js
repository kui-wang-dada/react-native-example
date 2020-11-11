import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useTheme } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { getWeekReportDetail } from '@/store/actions';
import { size, commonStyle, messageTime } from '@/utils';
import { Touchable, Icon, Button } from 'ui';
import { ListItem } from 'common';
import Ask from './components/Ask';
import { color } from 'react-native-reanimated';
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
      <View style={style.list2}>
        <View style={[style.listTitleWrap, { backgroundColor: colors.assist, borderBottomColor: colors.color_yellow }]}>
          <Text style={[style.listTitle, { backgroundColor: colors.assist, color: colors.background }]}>学生的辅导情况反馈</Text>
        </View>
        <View style={[style.listWrap, { backgroundColor: colors.card }]}>
          <ListItem item={list[0]} style={{ height: size(100), backgroundColor: colors.background }} />
          <ListItem item={list[1]} style={{ height: size(100), backgroundColor: colors.background }} />
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
      <View style={style.list3}>
        <View style={[style.listTitleWrap, { backgroundColor: colors.assist, borderBottomColor: colors.color_yellow }]}>
          <Text style={[style.listTitle, { backgroundColor: colors.assist, color: colors.background }]}>辅导老师反馈</Text>
        </View>
        <View style={[style.listWrap, { backgroundColor: colors.card }]}>
          {list.map((item) => {
            return <Ask item={item} key={item.name} />;
          })}
        </View>
      </View>
    );
  };

  return (
    <ScrollView>
      <View style={style.scrollWrap}>
        <View style={style.titleWrap}>
          <Text style={[style.title, { color: colors.assist }]}>{detail.report_title}</Text>
          <Text style={[style.titleTime, { color: colors.text_tag }]}>{messageTime(detail.modified)}</Text>
        </View>
        {renderList1()}
        {renderList2()}
        {renderList3()}

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
