import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useTheme, useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { size } from '@/utils';
import { Touchable, Icon, Button } from 'ui';
import { getOppBlogList } from '@/store/actions';
export default (props) => {
  const { colors } = useTheme();
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const oppBlogList = useSelector((state) => state.blog.oppBlogList);
  useEffect(() => {
    let { content } = props;
    let params = {
      content,
    };
    dispatch(getOppBlogList(params));
  }, []);

  const goToDetail = (item) => {
    navigation.navigate('blogDetail', { name: item.post_id });
  };

  console.log(oppBlogList, 'oppBLogList');
  let list = oppBlogList.slice(0, 8);
  return list.length ? (
    <View style={style.recommendRead}>
      <Text style={style.title}>推荐阅读</Text>
      <View style={style.listWrap}>
        {list.map((item) => {
          return (
            <Touchable style={style.listItem} onPress={() => goToDetail(item)}>
              <Text style={style.itemTitle}>{item.post_title}</Text>
            </Touchable>
          );
        })}
      </View>
    </View>
  ) : null;
};
const style = StyleSheet.create({
  recommendRead: {
    paddingHorizontal: size(30),
    paddingVertical: size(30),
  },
  title: {
    fontSize: size(32),
    fontWeight: 'bold',
    color: '#333',
  },
  listWrap: {},
  listItem: {
    marginTop: size(30),
  },
  itemTitle: {
    fontSize: size(28),
    color: '#666',
    textDecorationLine: 'underline',
  },
});
