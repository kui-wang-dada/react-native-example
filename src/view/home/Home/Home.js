import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Image, ScrollView } from 'react-native';
import { useTheme } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { getUserInfo, getHomeSp, getHomeTp, getHomeCount } from '@/store/actions';
import { TutorItem, ServiceItem, TopHeader } from 'common';
import Avatar from './item/Avatar';
import ServiceStep from './item/ServiceStep';
import { size, commonStyle, checkStaticImg } from '@/utils';
import { Touchable, Icon } from 'ui';

export default ({ route, navigation }) => {
  const { colors } = useTheme();
  const dispatch = useDispatch();
  const userInfo = useSelector((state) => state.my.userInfo);
  const homeTp = useSelector((state) => state.home.homeTp);
  const homeSp = useSelector((state) => state.home.homeSp);
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
    dispatch(getUserInfo());
    dispatch(getHomeCount());
    dispatch(getHomeSp(params));
    dispatch(getHomeTp(paramsTp));
  }, []);

  const goToProject = () => {};
  const goToGridItem = (item) => {
    navigation.navigate(item.route);
  };
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
      <View style={[style.gridList, { backgroundColor: colors.background }]}>
        {data.map((item, index) => {
          return (
            <Touchable style={style.gridItem} key={index} onPress={() => goToGridItem(item)}>
              <Image source={{ uri: item.image }} style={style.gridImage} />
              <Text style={[style.gridText, { color: colors.text }]}>{item.value}</Text>
            </Touchable>
          );
        })}
      </View>
    );
  };
  let tpData = homeTp[0];
  let services = Array.isArray(homeSp) && homeSp.slice(0, 3) || [];
  return (
    <ScrollView style={[style.wrap, { backgroundColor: colors.card }]}>
      <Avatar />
      {userInfo.students_id ? (
        <View style={style.centerWrap}>
          <View style={style.gridWrap}>{renderGrid()}</View>
          {tpData ? (
            <View style={style.tpWrap}>
              <TutorItem item={tpData} />
            </View>
          ) : null}
          {services.length ? (
            <View style={style.serviceWrap}>
              <TopHeader title="服务项目" hasRight handleRight={goToProject} />
              <View style={style.serviceList}>
                {services.map((item, index) => {
                  return (
                    <View key={index} style={style.serviceItem}>
                      <ServiceItem item={item} />
                    </View>
                  );
                })}
              </View>
            </View>
          ) : null}
        </View>
      ) : (
        <View style={[style.recordWrap, { backgroundColor: colors.background }]}>
          <ServiceStep />
        </View>
      )}
    </ScrollView>
  );
};

const style = StyleSheet.create({
  gridWrap: {
    backgroundColor: '#fff',
    position: 'relative',
    bottom: size(80),
    borderRadius: size(20),
    marginHorizontal: size(32),
  },
  gridList: {
    flexDirection: 'row',
    borderRadius: size(6),
  },
  gridItem: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: size(200),
  },
  gridImage: {
    width: size(80),
    height: size(80),
    marginBottom: size(22),
  },
  gridText: {
    fontSize: size(28),
  },
  tpWrap: {
    paddingHorizontal: size(32),
    position: 'relative',
    bottom: size(30),
    marginBottom: size(40),
  },
  serviceWrap: {
    paddingHorizontal: size(32),
    position: 'relative',
    bottom: size(40),
    minHeight: size(800),
  },
  serviceList: {
    marginTop: size(20),
  },
  serviceItem: {
    marginBottom: size(30),
  },
  recordWrap: {
    position: 'relative',
    bottom: size(40),
    borderTopLeftRadius: size(40),
    borderTopRightRadius: size(40),
    padding: size(32),
  },
});
