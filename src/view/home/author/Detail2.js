import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { useTheme, useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { size, checkStaticImg } from '@/utils';
import { Touchable, Icon, Button } from 'ui';
export default () => {
  const { colors } = useTheme();
  const navigation = useNavigation();
  return (
    <View style={style.authorDetail2}>
      <View style={style.top}>
        <View style={style.topLeft}>
          <Image style={style.avatar} source={{ uri: checkStaticImg('xueshu1.png') }} />
          <Text style={[style.name, { color: colors.primary }]}>厚仁学术哥</Text>
        </View>

        <Button style={[style.contact, { borderColor: colors.primary }]} textStyle={[style.contactText, { color: colors.primary }]} title="在线咨询" />
      </View>
      <View style={style.conWrap}>
        <Text style={[style.conText, { color: colors.text }]}>美国拨打：+1 (412) 756-3137</Text>
        <Text style={[style.conText, { color: colors.text }]}>中国拨打：+86 (010) 5387-5758</Text>
        <Text style={[style.conText, { color: colors.text }]}>美国：匹兹堡 | 洛杉矶 | 奥兰治 | 旧金山 | 纽约</Text>
        <Text style={[style.conText, { color: colors.text }]}>中国：北京 | 武汉 | 广州</Text>
        <Text style={[style.conText, { color: colors.text }]}>北京市西城区 西直门外大街18号 金贸大厦A座 1901 邮编100044</Text>
      </View>
    </View>
  );
};
const style = StyleSheet.create({
  authorDetail2: {
    paddingHorizontal: size(32),
  },
  top: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: size(300),
  },
  topLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: size(100),
    height: size(100),
    borderRadius: size(50),
    marginRight: size(20),
  },
  name: {
    fontSize: size(32),
    fontWeight: 'bold',
  },
  contact: {
    margin: 0,
    width: size(240),
    height: size(60),
    borderRadius: size(30),
    borderWidth: size(1),
  },
  contactText: { lineHeight: size(60) },
  conWrap: {
    flexDirection: 'column',
  },
  conText: {
    marginBottom: size(20),
  },
});
