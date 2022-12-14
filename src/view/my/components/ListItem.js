import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { useTheme, useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { useOpenMini } from 'hook/wechat';
import { commitShowErp } from '@/store/actions';
import { size, commonStyle, checkStaticImg } from '@/utils';
import { Touchable, Icon, Button } from 'ui';

export default (props) => {
  const { colors } = useTheme();
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const loginEmail = useSelector((state) => state.my.loginEmail);
  const openMini = useOpenMini();

  const goToPages = () => {
    let { route, params, icon, type } = props.data;

    // if (!loginEmail && icon !== 'chat') {
    //   navigation.navigate('login');
    //   return;
    // }

    if (type === 'mini') {
      openMini(params.id, params.path);
      return;
    }
    if (type === 'erp') {
      dispatch(commitShowErp('show'));
      return;
    }
    navigation.navigate(route, params);
  };

  let { title, icon, label, image } = props.data;
  console.log(123456);
  return (
    <Touchable style={style.listItem} onPress={() => goToPages()}>
      <View style={[style.listWrap, { borderBottomColor: colors.border }]}>
        <View style={style.left}>
          {image ? (
            <Image style={style.img} source={{ uri: checkStaticImg(image) }} />
          ) : (
            <Icon name={icon} size={size(60)} color={colors.primary} />
          )}
          <Text style={[style.title, { color: colors.text }]}>{title || '--'}</Text>
        </View>
        <View style={[style.right]}>
          {label ? <Text style={[style.label, { color: colors.text_tag }]}>{label}</Text> : null}
          <Icon name="right" size={size(18)} color={colors.text_tag} />
        </View>
      </View>
    </Touchable>
  );
};

const style = StyleSheet.create({
  listItem: {
    paddingLeft: size(40),
    paddingRight: size(40),
  },
  listWrap: {
    height: size(100),
    borderBottomWidth: size(1),

    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  left: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  img: {
    width: size(60),
    height: size(60),
  },
  title: {
    marginLeft: size(20),
    fontSize: size(32),
  },
  right: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  label: {
    marginLeft: size(20),
    fontSize: size(32),
  },
});
