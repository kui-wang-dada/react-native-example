import React, {useEffect} from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import {useTheme} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {getUserInfo, getHomeSp, getHomeTp, getHomeCount} from '@/store/actions';
import Avatar from './item/Avatar';
import {transformSize, commonStyle, checkStaticImg} from '@/utils';
import {Touchable, Icon} from 'ui';

export default () => {
  const {colors} = useTheme();
  const dispatch = useDispatch();
  useEffect(() => {
    // Update the document title using the browser API

    let params = {
      limit_start: 0,
      limit_page_length: 10,
    };
    let paramsTp = {
      limit_start: 0,
      limit_page_length: 10,
    };
    dispatch(getHomeSp(params));
    dispatch(getHomeTp(paramsTp));
  }, [dispatch]);

  const renderGrid = () => {
    let data = [
      {
        image: checkStaticImg('message.png'),
        value: '沟通记录',
        route: 'message',
      },
      {
        image: checkStaticImg('report.png'),
        value: '文档报告',
        route: 'report',
      },
      {
        image: checkStaticImg('team.png'),
        value: '服务团队',
        route: 'author',
      },
    ];
    return (
      <View style={style.gridList}>
        {data.map((item, index) => {
          return (
            <Touchable style={style.gridItem}>
              <Image source={{uri: item.image}} style={style.gridImage} />
              <Text style={[style.gridText, {color: colors.text}]}>
                {item.value}
              </Text>
            </Touchable>
          );
        })}
      </View>
    );
  };

  return (
    <View style={[style.wrap, {backgroundColor: colors.card}]}>
      <Avatar />
      <View style={style.gridWrap}>{renderGrid()}</View>
    </View>
  );
};

const style = StyleSheet.create({
  gridWrap: {
    backgroundColor: '#fff',
    position: 'relative',
    bottom: transformSize(80),
    borderRadius: transformSize(20),
    marginHorizontal: transformSize(32),
  },
  gridList: {
    flexDirection: 'row',
  },
  gridItem: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: transformSize(200),
  },
  gridImage: {
    width: transformSize(80),
    height: transformSize(80),
    marginBottom: transformSize(22),
  },
  gridText: {
    fontSize: transformSize(28),
  },
});
