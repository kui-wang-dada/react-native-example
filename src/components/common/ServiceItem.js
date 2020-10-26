import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {useTheme} from '@react-navigation/native';
import * as Progress from 'react-native-progress';
import {transformSize, commonStyle} from '@/utils';
import {Touchable, Icon, Button} from 'ui';
export default () => {
  const {colors} = useTheme();

  const goToSpDetail = () => {};
  let {item, style} = this.props;
  let percent = Math.round(item.percent_complete);
  let proStragety = {
    Completed: (
      <Progress.Bar
        color={colors.primary}
        percent={percent}
        className="progress"
      />
    ),
    Hold: (
      <Progress.Bar
        color={colors.color_red}
        percent={percent}
        className="progress"
      />
    ),
    Cancelled: (
      <Progress.Bar
        color={colors.color_red}
        percent={percent}
        className="progress"
      />
    ),
  };
  let statusStragety = {
    Completed: '已完结',
    Cancelled: '已取消',
    Open: '服务中',
    Hold: '暂停中',
  };
  return (
    <View style={[style.serviceItem, style]} onClick={this.goToSpDetail}>
      <View style={style.topWrap}>
        <Text style={style.topName}>{item.service_project_name}</Text>
        <Text style={style.topStatus}>{statusStragety[item.status]}</Text>
      </View>
      <View style={style.percentWrap}>
        <Text style={style.serviceTitle}>服务进度</Text>
        {proStragety[item.status] || (
          <Progress.Bar
            color={colors.color_blue}
            percent={percent}
            className="progress"
          />
        )}
      </View>
    </View>
  );
};
const style = StyleSheet.create({
  wrap: {},
});
