import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { useTheme } from '@react-navigation/native';
import { size, commonStyle, checkImg, checkStaticImg, messageTime } from '@/utils';
import { Touchable, Icon, Button } from 'ui';
export default (props) => {
  const { colors } = useTheme();

  const goToDetail = () => {};
  let { item } = props;

  let imgUrl = checkImg(item.contact_by_img, '180');
  imgUrl = imgUrl ? imgUrl : checkStaticImg('female.png');
  let name = item.contact_by_full_name || item.contact_by || '厚仁学术哥';
  return (
    <Touchable style={[style.messageItem, { backgroundColor: colors.background }]} onPress={goToDetail}>
      <View style={style.top}>
        <View style={style.topLeft}>
          <Image style={style.topImg} source={{ uri: imgUrl }} />

          <View style={style.topTitleCon}>
            <Text style={[style.topName, { color: colors.text }]}>{name}</Text>
          </View>
        </View>
        <Text style={[style.topRight, { color: colors.text_p }]}>{messageTime(item.contact_date)}</Text>
      </View>
      <View style={[style.center]}>
        <Text numberOfLines={3} style={[style.centerText, { color: colors.text_p }]}>
          {item.to_discuss}
        </Text>
      </View>
      {item.to_discuss_with_parent ? (
        <View style={[style.tipsWrap, { backgroundColor: colors.card }]}>
          <Text style={[style.tipsText, { color: colors.text_p }]}>家长秘语</Text>
        </View>
      ) : null}
    </Touchable>
  );
};
const style = StyleSheet.create({
  messageItem: {
    borderRadius: size(10),
    padding: size(30),
  },
  top: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: size(20),
  },
  topLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  topImg: {
    width: size(80),
    height: size(80),
    borderRadius: size(40),
    marginRight: size(20),
  },
  topTitleCon: {
    flexDirection: 'column',
    justifyContent: 'space-evenly',
  },
  topName: {
    fontSize: size(28),
    fontWeight: 'bold',
  },
  topRight: {
    fontSize: size(28),
  },
  centerText: {
    fontSize: size(28),
    lineHeight: size(40),
  },
  tipsWrap: {
    borderRadius: size(6),
    width: size(120),
    justifyContent: 'center',
    alignItems: 'center',
    height: size(40),

    marginRight: size(10),

    marginTop: size(20),
  },
  tipsText: {
    fontSize: size(24),
  },
});
