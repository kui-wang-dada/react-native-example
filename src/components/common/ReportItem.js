import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { useTheme } from '@react-navigation/native';
import { useNavigation } from '@react-navigation/native';
import ImageViewer from 'react-native-image-zoom-viewer';
import { size, commonStyle, checkStaticImg, formatTime, openReport } from '@/utils';
import { Touchable, Icon, Button } from 'ui';
export default (props) => {
  const { colors } = useTheme();
  const navigation = useNavigation();

  let item = props.item;
  let att = item.attachment || {};
  let url = att.file_url;
  if (url.includes('https://erp-cdn.wholeren.cn')) {
    url = url.replace('/privatehttps://erp-cdn.wholeren.cn', 'https://erpapi.wholeren.cn/private');
    url = url.replace('https://erp-cdn.wholeren.cn', 'https://erpapi.wholeren.cn');
    console.log(url, 'url');
  }
  let isPdf = /(.*)\.(pdf|doc|docx|xls|xlsx|ppt|pptx)$/.test(url);
  let isImage = /(.*)\.(jpg|bmp|gif|ico|pcx|jpeg|tif|png|raw|tga)$/.test(url);

  const openPdf = () => {
    openReport(url, navigation);
  };
  let imageSource = { uri: isImage ? url : checkStaticImg('pdf.png') };
  return (
    <Touchable style={[style.reportItem, { backgroundColor: colors.background }]} onPress={openPdf}>
      <Image style={style.image} source={imageSource} />
      <View style={style.conWrap}>
        <Text style={[style.title, { color: colors.text }]}>{att.file_name}</Text>
        <Text style={[style.time, { color: colors.text_tag }]}>{formatTime(att.creation)}</Text>
      </View>
    </Touchable>
  );
};
const style = StyleSheet.create({
  reportItem: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: size(10),
    padding: size(30),
  },
  image: {
    width: size(80),
    height: size(110),
    marginRight: size(30),
  },
  conWrap: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-around',
  },
  title: {
    fontSize: size(32),
    fontWeight: 'bold',
  },
  time: {
    fontSize: size(28),
    marginTop: size(20),
  },
});
