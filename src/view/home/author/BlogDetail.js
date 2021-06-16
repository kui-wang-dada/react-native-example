import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useTheme, useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { size, modal } from '@/utils';
import { Touchable, Icon, Button } from 'ui';
import { getBlogDetail } from '@/store/actions';
import HTMLView from 'react-native-htmlview';
import { RichEditor } from 'react-native-pell-rich-editor';
export default ({ route }) => {
  const { colors } = useTheme();
  const navigation = useNavigation();

  const dispatch = useDispatch();
  const blogDetail = useSelector((state) => state.blog.blogDetail);
  const richText = useRef();

  let name = route.params.name;
  useEffect(() => {
    let params = {
      post_id: name,
    };
    modal.showLoading();
    dispatch(getBlogDetail(params));
  }, []);

  const goToWeb = () => {
    let url = `https://www.wholeren.com/?p=${name}`;

    navigation.navigate('webview', { url: url });
  };

  let htmlCon = blogDetail.post_content;
  // console.log(htmlCon, "htmlCon");
  htmlCon =
    htmlCon &&
    htmlCon
      .replace(/!important/gi, '')
      .replace(/height:[^"]+;/gi, '')
      .replace(/width:[^"]+;/gi, '')
      // .replace(/<img([\u4e00-\u9fa5\s\w"-=\/\.:;]+)((?:(style="[^"]+")))/gi, "<img$1")
      .replace(/<a([\u4e00-\u9fa5\s\w"-=\/\.:;]+)((?:(style="[^"]+")))/gi, '<a$1')
      .replace(/<table([\u4e00-\u9fa5\s\w"-=\/\.:;]+)((?:(style="[^"]+")))/gi, '<table$1')
      .replace(/line-height:[^"]+;/gi, '')
      // .replace(/<img([\u4e00-\u9fa5\s\w"-=\/\.:;]+)/gi, '<img$1 style=" border-radius: 8PX;"')
      .replace(/<a([\u4e00-\u9fa5\s\w"-=\/\.:;）]+)/gi, '<a$1 style="word-break:break-all;"')
      .replace(/<table([\u4e00-\u9fa5\s\w"-=\/\.:;]+)/gi, '<table$1 style="width: 100%;"')
      .replace(/<p><\/p>/gi, '')
      .trim();

  console.log(htmlCon, 'htmlCon');

  return blogDetail.post_id ? (
    <ScrollView style={style.expertDetail}>
      <View style={style.itemWrap}>
        <View style={style.itemTitleWrap}>
          <Text style={style.itemTitle}>{blogDetail.post_title}</Text>
        </View>
        <Button
          style={[style.link, { backgroundColor: colors.assist }]}
          textStyle={[style.linkText, { color: colors.bg }]}
          onPress={goToWeb}
          title="原文链接"
        />
        {/* <HTMLView value={htmlCon} stylesheet={styleHtml} paragraphBreak="" addLineBreaks={true} /> */}
        <RichEditor containerStyle={style.rich} ref={richText} initialContentHTML={htmlCon} />
      </View>
    </ScrollView>
  ) : null;
};
const styleHtml = StyleSheet.create({
  p: {
    lineHeight: size(40),
    fontSize: size(28),
    color: '#666',
  },
});
const style = StyleSheet.create({
  expertDetail: {
    paddingBottom: size(140),
    flex: 1,
  },
  itemWrap: {
    padding: size(36),
  },
  itemTitleWrap: {
    marginBottom: size(30),
  },
  itemTitle: {
    fontSize: size(44),
    fontWeight: 'bold',
    color: '#333',
  },
  link: {
    width: size(200),
    height: size(60),
    borderRadius: size(8),
    alignSelf: 'flex-end',
  },
  linkText: {
    fontWeight: 'bold',
  },
  rich: {
    lineHeight: size(60),
    flexShrink: 1,
  },
});
