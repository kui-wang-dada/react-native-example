import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {useTheme} from '@react-navigation/native';
import {useNavigation} from '@react-navigation/native';
import * as Progress from 'react-native-progress';

import {size, commonStyle} from '@/utils';
import {Touchable, Icon, Button} from 'ui';
export default (props) => {
  const {colors} = useTheme();
  const navigation = useNavigation();

  const goToSpDetail = () => {
    navigation.navigate('service', {name: props.item.name});
  };
  let {item} = props;
  let percent = Math.round(item.percent_complete);
  let proStragety = {
    Completed: (
      <Progress.Bar
        color={colors.primary}
        progress={percent}
        unfilledColor={colors.sep}
        width={null}
      />
    ),
    Hold: (
      <Progress.Bar
        color={colors.color_red}
        progress={percent}
        unfilledColor={colors.sep}
        width={null}
      />
    ),
    Cancelled: (
      <Progress.Bar
        color={colors.color_red}
        progress={percent}
        unfilledColor={colors.sep}
        width={null}
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
    <Touchable
      style={[
        style.serviceItem,
        {borderColor: colors.sep, backgroundColor: colors.background},
      ]}
      onPress={goToSpDetail}>
      <View style={style.topWrap}>
        <Text style={[style.topName, {color: colors.text}]}>
          {item.service_project_name}
        </Text>
        <View style={[style.topStatus, {backgroundColor: colors.sep}]}>
          <Text style={[style.topStatusText, {color: colors.text}]}>
            {statusStragety[item.status]}
          </Text>
        </View>
      </View>
      <View style={style.percentWrap}>
        <Text style={[style.serviceTitle, {color: colors.text}]}>服务进度</Text>
        <View style={style.barWrap}>
          <View style={style.progress}>
            {proStragety[item.status] || (
              <Progress.Bar
                color={colors.color_blue}
                progress={percent}
                unfilledColor={colors.sep}
                width={null}
              />
            )}
          </View>

          <Text style={[style.barText, {color: colors.text}]}>
            {percent + '%'}
          </Text>
        </View>
      </View>
    </Touchable>
  );
};
const style = StyleSheet.create({
  serviceItem: {
    padding: size(30),
    borderWidth: size(1),
    borderRadius: size(20),
  },
  topWrap: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  topName: {
    fontSize: size(32),
    fontWeight: 'bold',
  },
  topStatus: {
    marginLeft: size(40),
    width: size(140),
    height: size(50),

    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: size(25),
  },
  topStatusText: {
    fontSize: size(28),
  },
  percentWrap: {
    marginTop: size(20),
  },
  serviceTitle: {
    fontSize: size(28),
    marginBottom: size(20),
  },
  barWrap: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  progress: {
    flex: 1,
    marginRight: size(10),
  },
});
