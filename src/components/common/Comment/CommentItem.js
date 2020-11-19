import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, Alert } from 'react-native';
import { useTheme } from '@react-navigation/native';
import { size, commonStyle, checkStaticImg, formatTime, $api } from '@/utils';
import { Touchable, Icon, Button } from 'ui';

export default (props) => {
  const { colors } = useTheme();

  const handleLongComment = () => {
    let name = props.userInfo.user;
    let from = props.data.from;
    if (name === from) {
      handleDeleteComment();
      return;
    }
  };
  const handleComment = () => {
    let name = props.userInfo.user;
    let from = props.data.from;
    let fromName = props.data.from_full_name;
    let nameId = props.data.name;

    console.log('sender', from, name);
    if (name !== from) {
      props.getInput({ from, fromName, nameId });
      return;
    }
  };

  const handleDeleteComment = () => {
    Alert.alert(
      '删除该条留言？',

      [
        {
          text: '取消',
          onPress: () => console.log('Ask me later pressed'),
        },
        {
          text: '确定',
          onPress: () => {
            deleteComment();
          },
          style: 'cancel',
        },
      ],
      { cancelable: false },
    );
  };
  const deleteComment = async () => {
    let { to_full_name } = props.data;
    let apiUrl = 'home/delComment';
    if (to_full_name) {
      apiUrl = 'home/delReply';
    }
    let params = {
      name: props.data.name,
    };

    let res = await $api[apiUrl](params);
    if (res.status.code === 200) {
      await props.afterDeleteComment();
    }
  };

  let { from_full_name, to_full_name, from_user_image, content, comment_on } = props.data;
  let flag = from_user_image && from_user_image.includes('private');
  let source = flag ? checkStaticImg('female.png') : from_user_image;
  return (
    <Touchable
      style={[style.commentItem, { borderBottomColor: colors.border }]}
      hoverClass="active"
      onLongPress={() => handleLongComment()}
      onPress={() => handleComment()}>
      <View style={style.topWrap}>
        <View style={style.topLeft}>
          <Image style={style.avatar} source={{ uri: source }} />

          <View style={style.nameWrap}>
            <Text style={[style.nameText, { color: colors.text_p }]}>{from_full_name}</Text>
            {to_full_name ? (
              <View style={style.nameToWrap}>
                <Text style={[style.labelText, { color: colors.text_tag }]}>回复</Text>
                <Text style={[style.nameToText, { color: colors.text_p }]}>{to_full_name}</Text>
              </View>
            ) : null}
          </View>
        </View>
        <Text style={[style.topRight, { color: colors.text_tag }]}>{comment_on && formatTime(comment_on, 'YYYY-MM-DD HH:mm')}</Text>
      </View>
      <View style={style.conWrap}>
        <Text style={[style.conText, { color: colors.text }]}>{content}</Text>
      </View>
    </Touchable>
  );
};
const style = StyleSheet.create({
  commentItem: {
    paddingVertical: size(20),
    borderBottomWidth: size(1),
  },
  topWrap: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  topLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: size(48),
    height: size(48),
    borderRadius: size(24),
    marginRight: size(20),
  },
  nameWrap: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  nameText: {
    fontSize: size(24),
  },
  nameToWrap: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  labelText: {
    marginLeft: size(10),
    fontSize: size(24),
  },
  nameToText: {
    marginLeft: size(10),
    fontSize: size(24),
  },
  topRight: {
    fontSize: size(24),
  },
  conWrap: {
    paddingTop: size(10),
    paddingLeft: size(70),
    lineHeight: size(40),
  },
  conText: {
    fontSize: size(28),
  },
});
