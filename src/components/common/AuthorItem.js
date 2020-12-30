import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { useTheme, useNavigation } from '@react-navigation/native';
import { size, commonStyle, checkStaticImg, checkImg } from '@/utils';
import { Touchable, Icon, Button } from 'ui';
export default (props) => {
  const { colors } = useTheme();
  const navigation = useNavigation();
  let author = props.item;

  const goToAuthor = () => {
    if (!author.user) {
      navigation.navigate('authorDetail2');
      return;
    }
    navigation.navigate('authorDetail', { user: author.user });
  };

  let { myAvatar } = author;

  return (
    <Touchable style={[style.authorItem]} onPress={() => goToAuthor()}>
      <View style={style.topWrap}>
        <View style={style.topLeftWrap}>
          {author.avatar ? (
            <Image source={{ uri: checkImg(author.avatar, '180') }} alt style={style.img} lazyLoad={true} />
          ) : (
            <Image source={{ uri: myAvatar ? myAvatar : checkStaticImg('female.jpg') }} alt style={style.img} />
          )}

          <View style={style.textWrap}>
            <View style={style.textTopWrap}>
              <Text style={[style.textName, { color: colors.primary }]}>{author.pen_name}</Text>
            </View>

            <View style={style.textBottomWrap}>
              <Text style={style.textBottomPost}>{author.role}</Text>
            </View>
          </View>
        </View>
      </View>
      <View style={style.label}>
        <Text numberOfLines={2} style={[style.labelText, { color: colors.text_p }]}>
          {author.description}
        </Text>
      </View>
    </Touchable>
  );
};
const style = StyleSheet.create({
  authorItem: {},
  topWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  topLeftWrap: {
    flexDirection: 'row',
    position: 'relative',
    alignItems: 'center',
  },
  img: {
    width: size(100),
    height: size(100),
    borderRadius: size(50),
  },
  textWrap: {
    marginLeft: size(32),

    flexDirection: 'column',
    position: 'relative',
    justifyContent: 'space-between',
  },
  textTopWrap: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  textName: {
    fontSize: size(32),
    fontWeight: 'bold',
  },
  textBottomWrap: {
    marginTop: size(10),
  },
  textBottomPost: {
    fontSize: size(24),
    textAlign: 'left',
  },
  label: {
    marginTop: size(20),
    textAlign: 'left',
  },
  labelText: {
    fontSize: size(28),
  },
});
