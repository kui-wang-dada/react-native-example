import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, Image } from 'react-native';
import { useTheme, useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { getAuthorDetail } from '@/store/actions';
import { useOpenMini } from 'hook/wechat';
import { size, checkImg, Number10, NumberH, NumberK } from '@/utils';
import { Touchable, Icon, Button } from 'ui';
import { TopHeader } from 'common';
export default ({ route }) => {
  const { colors } = useTheme();
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const authorDetail = useSelector((state) => state.home.authorDetail);

  const openMini = useOpenMini();

  const { user } = route.params;
  let newUser = decodeURIComponent(user);
  const params = {
    user: newUser,
    post_limit: 1,
  };

  useEffect(() => {
    // Update the document title using the browser API

    dispatch(getAuthorDetail(params));
  }, []);

  const goToExpert = () => {
    let id = 'gh_54505723e513';
    let path = '/pageSub/authorDetail/index?name=' + authorDetail.name;
    openMini(id, path);
  };
  const goToExpertDetail = (post) => {
    let id = 'gh_54505723e513';
    let path = 'pageSub/blogDetail/index?name=' + post.name;
    openMini(id, path);
  };
  let posts = authorDetail.posts || [];
  let tipData = [
    {
      value: Number10(authorDetail.total_students),
      label: '位以上',
      name: '服务学生',
    },
    {
      value: NumberH(authorDetail.total_time),
      label: '小时以上',
      name: '沟通记录',
    },
    {
      value: NumberK(authorDetail.total_records),
      label: '次以上',
      name: '沟通频次',
    },
  ];
  console.log(checkImg(authorDetail.avatar), 'check');
  return (
    <ScrollView style={style.authorDetail}>
      <View style={style.top}>
        <Image style={style.avatar} source={{ uri: checkImg(authorDetail.avatar) }} />
        <View style={style.topCon}>
          <Text style={[style.topName, { color: colors.primary }]}>{authorDetail.pen_name}</Text>
          <Text style={[style.topLabel, { color: colors.text }]}>|</Text>
          <Text style={[style.topLabel, { color: colors.text }]}>咨询顾问</Text>
        </View>
      </View>
      <View style={style.tipWrap}>
        {tipData.map((item, index) => {
          return (
            <View style={style.tipItem} key={index}>
              <View style={style.tipTop}>
                <Text style={[style.tipValue, { color: colors.text }]}>{item.value}</Text>
                <Text style={[style.tipLabel, { color: colors.text_tag }]}>{item.label}</Text>
              </View>
              <Text style={[style.tipName, { color: colors.text_p }]}>{item.name}</Text>
            </View>
          );
        })}
      </View>
      <View style={style.des}>
        <Text style={[style.desText, { color: colors.text_p }]}>{authorDetail.description}</Text>
      </View>
      {posts.length ? (
        <View style={style.expertWrap}>
          <TopHeader title="专家专栏" />
          <View style={style.expert}>
            {posts.map((post) => {
              return (
                <Touchable key={post.name} style={style.expertItem} onPress={() => goToExpertDetail(post)}>
                  <Image style={style.bgImage} source={{ uri: post.attach_image }} />

                  <View style={[style.title, { color: colors.card }]}>
                    <Text style={[style.titleText, { color: colors.background }]}>{post.title}</Text>
                  </View>
                </Touchable>
              );
            })}
          </View>
          <Touchable style={style.expertMore} onPress={goToExpert}>
            <Text style={[style.expertMoreText, { color: colors.primary }]}>更多专家专栏 {'>'}</Text>
          </Touchable>
        </View>
      ) : null}
    </ScrollView>
  );
};
const style = StyleSheet.create({
  authorDetail: {
    paddingVertical: size(60),
    paddingHorizontal: size(32),
  },
  top: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: size(100),
    height: size(100),
    borderRadius: size(50),
    marginRight: size(20),
  },
  topCon: {
    flexDirection: 'row',
  },
  topName: {
    fontSize: size(32),
    fontWeight: 'bold',
  },
  topLabel: {
    marginLeft: size(10),
    fontSize: size(28),
  },
  tipWrap: {
    flexDirection: 'row',
    marginTop: size(60),
  },
  tipItem: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  tipTop: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  tipValue: {
    fontSize: size(32),
    fontWeight: 'bold',
    marginRight: size(10),
  },
  tipLabel: {
    fontSize: size(24),
  },
  tipName: {
    fontSize: size(28),
    fontWeight: 'bold',
    marginTop: size(20),
  },
  des: {
    marginTop: size(60),
  },
  desText: {
    fontSize: size(28),
    lineHeight: size(40),
  },
  expertWrap: {
    marginTop: size(60),
  },
  expert: {},
  expertItem: {
    width: '100%',
    height: size(300),
    position: 'relative',

    flexDirection: 'column',
    justifyContent: 'flex-end',
    marginTop: size(20),
    marginBottom: size(30),
    borderRadius: size(12),
  },
  bgImage: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    width: '100%',
    height: '100%',
  },
  title: {
    padding: size(20),

    margin: 0,
    borderBottomLeftRadius: size(12),
    borderBottomRightRadius: size(12),
  },
  titleText: {
    fontSize: size(32),
    fontWeight: 'bold',
    textAlign: 'left',
  },
  expertMore: {
    height: size(100),
    justifyContent: 'center',
    alignItems: 'center',
  },
  expertMoreText: {
    fontSize: size(28),
    fontWeight: 'bold',
  },
});
