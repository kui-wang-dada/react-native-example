import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useTheme, useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { size, checkImg, Number10, NumberH, NumberK } from '@/utils';
import { Touchable, Icon, Button, Image } from 'ui';
import { TopHeader } from 'common';
export default () => {
  const { colors } = useTheme();
  const navigation = useNavigation();
  const authorDetail = useSelector((state) => state.home.authorDetail);

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
  return (
    <View className="author-detail">
      <View className="top">
        <Image className="avatar" src={checkImg(authorDetail.avatar)} />
        <View className="top-con">
          <Text className="top-name">{authorDetail.pen_name}</Text>
          <Text className="top-label">|</Text>
          <Text className="top-label">咨询顾问</Text>
        </View>
      </View>
      <View className="tip-wrap">
        {tipData.map((item, index) => {
          return (
            <View className="tip-item" key={index}>
              <View className="tip-top">
                <Text className="tip-value">{item.value}</Text>
                <Text className="tip-label">{item.label}</Text>
              </View>
              <Text className="tip-name">{item.name}</Text>
            </View>
          );
        })}
      </View>
      <View className="des">{authorDetail.description}</View>
      {posts.length ? (
        <View className="expert-wrap">
          <TopHeader title="专家专栏" />
          <View className="expert">
            {posts.map((post) => {
              return (
                <View key={post.name} class="expert-item" onClick={() => this.goToExpertDetail(post)}>
                  <Image class="bgImage" item={post.attach_image} />

                  <View class="title">{post.title}</View>
                </View>
              );
            })}
          </View>
          <View className="expert-more" onClick={this.goToExpert}>
            更多专家专栏 {'>'}
          </View>
        </View>
      ) : null}
    </View>
  );
};
const style = StyleSheet.create({
  wrap: {},
});
