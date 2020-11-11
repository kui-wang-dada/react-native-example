import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { useTheme } from '@react-navigation/native';
import { size, commonStyle, checkStaticImg, moment } from '@/utils';
import { Touchable, Icon, Button } from 'ui';
export default (props) => {
  const { colors } = useTheme();

  const handleLongComment = () => {
    let name = this.props.userInfo.user;
    let from = this.props.data.from;
    if (name === from) {
      handleDeleteComment();
      return;
    }
  };
  const handleComment = () => {
    let name = this.props.userInfo.user;
    let from = this.props.data.from;
    let fromName = this.props.data.from_full_name;
    let nameId = this.props.data.name;

    console.log('sender', from, name);
    if (name !== from) {
      this.props.getInput({ from, fromName, nameId });
      return;
    }
  };

  const handleDeleteComment = () => {
    this.content = '删除该条留言？';

    this.setState({
      isOpened: true,
    });
  };

  let { from_full_name, to_full_name, from_user_image, content, comment_on } = props.data;
  let flag = from_user_image && from_user_image.includes('private');
  let source = flag ? checkStaticImg('female.png') : from_user_image;
  return (
    <Touchable
      style={[style.commentItem, { borderBottomColor: colors.border }]}
      hoverClass="active"
      onLongPress={() => this.handleLongComment()}
      onClick={() => this.handleComment()}>
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
        <Text style={[style.topRight, { color: colors.text_tag }]}>{comment_on && moment(comment_on).format('YYYY-MM-DD HH:mm')}</Text>
      </View>
      <View style={style.conWrap}>
        <Text style={[style.conText, { color: colors.text }]}>{content}</Text>
      </View>
    </Touchable>
  );
};
const style = StyleSheet.create({
  commentItem: {
    paddingHorizontal: size(20),
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
    marginLeft: size(10),
  },
  labelText: {
    marginLeft: size(10),
    fontSize: size(24),
  },
  nameToText: {
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
