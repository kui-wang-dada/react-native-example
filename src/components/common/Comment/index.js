import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useTheme } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { size, commonStyle, modal, ymodal } from '@/utils';
import { Touchable, Icon, Button } from 'ui';

import CommentItem from './CommentItem.js';
import CommentInput from './CommentInput.js';
export default (props) => {
  const { colors } = useTheme();
  const dispatch = useDispatch();
  const userInfo = useSelector((state) => state.my.userInfo);

  let type, replyData;
  let inputPlaceholder = '添加留言';
  const getInput = (item, index) => {
    console.log(item, 'item');

    if (item) {
      type = 'reply';
      replyData = {
        name: item.nameId,
        to: item.from,
      };
      inputPlaceholder = `回复 ${item.fromName}`;
    } else {
      type = 'comment';
      replyData = {};
      inputPlaceholder = '添加留言';
    }
    ymodal.show(<CommentInput from={props.type} inputPlaceholder={inputPlaceholder} replyData={replyData} type={type} afterSubmit={afterSubmit} data={props.data} />);
  };

  const afterSubmit = async () => {
    props.afterSubmit && (await props.afterSubmit());
  };
  const afterDeleteComment = async () => {
    props.afterSubmit && (await props.afterSubmit());

    modal.showToast('删除成功');
  };

  const renderComment = () => {
    let data = props.data;
    return (
      <View style={style.commentAllWrap}>
        <View style={style.commentTitleWrap}>
          <Text style={[style.title, { color: colors.text }]}>留言板</Text>
          {data.feedbacks && data.feedbacks.length ? (
            <View style={style.titleIcon}>
              <Icon name="feedback" size={14} color={'#fff'} style={[style.iconfont]} />
            </View>
          ) : null}
        </View>

        {data.feedbacks && data.feedbacks.length ? (
          <View style={style.listWrap}>
            {data.feedbacks.map((item, index) => {
              return (
                <View style={style.commentItem} hoverClass="active" key={index}>
                  <CommentItem
                    userInfo={userInfo}
                    afterDeleteComment={() => afterDeleteComment(index)}
                    getInput={(item) => getInput(item, index)}
                    data={item}
                    key={index}
                  />
                </View>
              );
            })}
          </View>
        ) : (
          renderEmptyComment()
        )}
      </View>
    );
  };

  const renderEmptyComment = () => {
    return (
      <View style={style.emptyWrap}>
        <Text style={[style.emptyText, { color: colors.text_tag }]}>快来添加你的留言吧</Text>
      </View>
    );
  };
  const renderInput = () => {
    return (
      <View style={[style.inputComment, { backgroundColor: colors.background, borderTopColor: colors.border }]}>
        <View style={[style.inputWrap, { backgroundColor: colors.card }]}>
          <Icon name="edit" size={20} color="#666" />
          <Touchable style={style.inputPlaceholder} onPress={() => getInput()}>
            <Text style={[style.inputText, { color: colors.text_tag }]}>添加留言</Text>
          </Touchable>
        </View>
      </View>
    );
  };
  return (
    <View style={[style.myCommentWrap, { backgroundColor: colors.background }]}>
      {renderComment()}
      {renderInput()}
    </View>
  );
};
const style = StyleSheet.create({
  myCommentWrap: {
    flex: 1,
  },
  commentAllWrap: {
    paddingTop: size(32),
  },
  commentTitleWrap: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: size(32),
  },
  title: {
    fontSize: size(32),
    fontWeight: 'bold',
  },
  titleIcon: {},
  listWrap: {},
  commentItem: {
    paddingHorizontal: size(32),
  },
  emptyWrap: {
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: size(30),
    padding: size(32),
    paddingBottom: size(80),
  },
  emptyText: {
    fontSize: size(24),
    textAlign: 'center',
    fontWeight: 'bold',
  },
  inputComment: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    borderTopWidth: size(1),
    paddingTop: size(20),
    paddingBottom: size(40),
    paddingHorizontal: size(32),
    flexDirection: 'column',
  },
  inputWrap: {
    borderRadius: size(40),
    flexDirection: 'row',
    alignItems: 'center',
    minHeight: size(80),
    paddingHorizontal: size(20),
  },
  inputPlaceholder: {
    flex: 1,
    marginLeft: size(20),
  },
  inputText: {
    fontSize: size(28),
  },
});
