import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Image, ScrollView } from 'react-native';
import { useTheme } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { getMessageDetail, getOppBlogList, commitOppBlogList } from '@/store/actions';
import { size, commonStyle, checkImg, messageTime, checkStaticImg, modal } from '@/utils';
import { Touchable, Icon, Button } from 'ui';
import { Comment } from 'common';
import RecommendRead from './item/RecommendRead';
export default ({ route, navigation }) => {
  const { colors } = useTheme();
  const dispatch = useDispatch();
  const messageDetail = useSelector((state) => state.home.messageDetail);
  const oppBlogList = useSelector((state) => state.blog.oppBlogList);
  const commentRef = useRef();
  console.log(messageDetail, 'params');

  const { name } = route.params;
  const params = {
    name: name,
  };
  useEffect(() => {
    // Update the document title using the browser API
    modal.showLoading();
    dispatch(getMessageDetail(params));

    console.log(commentRef, 'commentRef');
    return componentWillUnmount;
  }, []);
  useEffect(() => {
    let content = messageDetail.to_discuss;
    console.log(content, 'content');
    if (messageDetail.name === name) {
      let paramsRecommendRead = {
        content,
      };

      dispatch(getOppBlogList(paramsRecommendRead));
      modal.close();
    }
  }, [messageDetail]);
  const componentWillUnmount = () => {
    dispatch(commitOppBlogList());
  };

  const afterSubmit = async () => {
    await dispatch(getMessageDetail(params));
  };
  const getInput = () => {
    console.log(commentRef, 'commentRef');
    commentRef.current.getInput();
  };

  const renderHeader = () => {
    let data = messageDetail;
    let [name, avatar, time] = [data.contact_by_full_name, data.contact_by_img, data.creation];
    let imgUrl = checkImg(data.contact_by_img, '180') ? checkImg(data.contact_by_img, '180') : checkStaticImg('female.jpg');
    return (
      <View style={style.headerWrap}>
        <View style={style.headerLeft}>
          <Image style={style.avatar} source={{ uri: imgUrl }} />
          <Text style={[style.headerName, { color: colors.text }]}>{name}</Text>
        </View>
        <View style={style.headerRight}>
          <Text style={[style.headerTime, { color: colors.text_p }]}>{messageTime(time)}</Text>
        </View>
      </View>
    );
  };
  const renderDes = () => {
    let data = messageDetail;
    let [title, parentDiscuss, discuss] = [data.service_project_title, data.to_discuss_with_parent, data.to_discuss];

    return (
      <View style={style.desWrap}>
        <Text style={[style.desText, { color: colors.text_p }]} selectable={true}>
          {discuss}
        </Text>
        {parentDiscuss ? (
          <View style={[style.desParent, discuss ? style.hasMargin : null]}>
            <View style={style.desTop}>
              <View style={[style.desLabelWrap, { backgroundColor: colors.card }]}>
                <Text style={[style.desLabel, { color: colors.text_p }]}>家长秘语</Text>
              </View>

              {/* <AtIcon prefixClass="iconfont" value={"task"} size="16" color={"#999"} style={["iconfont", "icon-task"]}></AtIcon> */}
              <Text style={[style.desTips, { color: colors.text_tag }]}> 以下内容仅家长可见</Text>
            </View>
            <View style={[style.desCon, { backgroundColor: colors.card, borderColor: colors.border }]}>
              <Text style={[style.desConText, { color: colors.text_p }]}>{parentDiscuss}</Text>
            </View>
          </View>
        ) : null}
      </View>
    );
  };
  const renderInput = () => {
    return (
      <View style={[style.inputComment, { backgroundColor: colors.background, borderTopColor: colors.border }]}>
        <Touchable style={[style.inputWrap, { backgroundColor: colors.card }]} onPress={() => getInput()}>
          <Icon name="edit" size={20} color="#666" />
          <View style={style.inputPlaceholder}>
            <Text style={[style.inputText, { color: colors.text_tag }]}>添加留言</Text>
          </View>
        </Touchable>
      </View>
    );
  };
  let data = messageDetail;
  let title = data.service_project_title;
  title = title && title.includes('TP-') ? '学术辅导' : title;
  title = title && title.includes('LEAD-') ? '初步了解和规划' : title;
  title = title || '学术辅导';
  return (
    <View style={style.messageDetailWrap}>
      <ScrollView style={style.scrollView}>
        <View style={style.messageDetail}>
          <View style={style.messageMain}>
            {renderHeader()}
            {renderDes()}
            <View style={[style.desTask, { backgroundColor: colors.border }]}>
              <Text style={[style.desTaskText, { color: colors.text_p }]}>{title}</Text>
            </View>
          </View>
          <View style={[style.sep, { backgroundColor: colors.sep }]} />
          {oppBlogList.length ? (
            <View>
              <RecommendRead content={data.to_discuss} />
              <View style={[style.sep, { backgroundColor: colors.sep }]} />
            </View>
          ) : null}
          <Comment data={messageDetail} ref={commentRef} type="Opportunity" afterSubmit={afterSubmit} />
        </View>
      </ScrollView>
      {renderInput()}
    </View>
  );
};

const style = StyleSheet.create({
  messageDetailWrap: {
    flex: 1,
    position: 'relative',
  },
  scrollView: {},
  messageDetail: {
    paddingBottom: size(300),
  },
  messageMain: {
    minHeight: size(440),
    paddingHorizontal: size(32),
    paddingBottom: size(120),
    position: 'relative',
  },
  sep: {
    width: '100%',
    height: size(20),
  },
  headerWrap: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: size(30),
    paddingBottom: size(30),
  },
  headerLeft: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  avatar: {
    width: size(100),
    height: size(100),
    borderRadius: size(50),
    marginRight: size(20),
  },
  headerName: {
    fontSize: size(28),
    fontWeight: 'bold',
  },
  headerRight: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerTime: {
    fontSize: size(28),
  },
  desWrap: {},
  desText: {
    fontSize: size(28),
    lineHeight: size(40),
  },
  desParent: {},
  hasMargin: {
    marginTop: size(30),
  },
  desTop: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: size(20),
  },
  desLabelWrap: {
    borderRadius: size(6),
    paddingVertical: size(6),
    paddingHorizontal: size(16),
  },
  desLabel: {
    fontSize: size(24),

    marginRight: size(10),
  },
  desTips: {
    marginLeft: size(10),
  },
  desCon: {
    paddingVertical: size(10),
    paddingHorizontal: size(16),
    minHeight: size(120),

    borderRadius: size(10),
    borderWidth: size(1),
  },
  desConText: {
    fontSize: size(28),
  },
  desTask: {
    position: 'absolute',
    bottom: size(40),
    left: size(32),
  },
  desTaskText: {
    fontSize: size(28),
    paddingVertical: size(6),
    paddingHorizontal: size(16),
    borderRadius: size(10),
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
