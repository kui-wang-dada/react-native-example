import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useTheme } from '@react-navigation/native';
import RNBottomActionSheet from 'react-native-bottom-action-sheet';
import { useColorScheme } from 'react-native-appearance';
import { useDispatch, useSelector } from 'react-redux';
import { size, commonStyle, modal, $api } from '@/utils';
import { Touchable, Icon, Button } from 'ui';
export default (props) => {
  const { colors } = useTheme();
  const scheme = useColorScheme();
  const dispatch = useDispatch();
  const userInfo = useSelector((state) => state.my.userInfo);

  const clickItem = () => {
    console.log('visible');

    let facebook = <Icon name={'facebook'} color={'#000000'} size={30} />;
    let instagram = <Icon name={'instagram'} color={'#000000'} size={30} />;
    let SheetView = RNBottomActionSheet.SheetView;

    SheetView.Show({
      title: '请选择语言!',
      items: [
        { title: '中文', value: 'fb', icon: facebook },
        { title: '英语', value: 'insta', icon: instagram },
        { title: '取消', value: 'insta', icon: instagram },
      ],
      theme: scheme,
      selection: 3,
      onSelection: (index, value) => {
        // value is optional
        console.log('selection: ' + index + ' ' + value);
      },
      onCancel: () => console.log('Closing the bottom SheetView!!!'),
    });
  };
  const _updateInfo = async (mes) => {
    if (!this.props.loginEmail) {
      this._setLanguage(mes);
      return;
    }

    let params = {};
    params[this.props.data.key] = mes;
    modal.showLoading();
    let res = await $api['user/updateInfo'](params, {
      url: `resource/User/${this.props.userInfo.email}`,
    });

    if (res.data.display) {
      let user = await this.props.getUserInfo();

      if (this.props.data.key === 'language_mobile') {
        this._setLanguage(user.language_mobile);
      }
    }

    modal.close();
  };
  const _setLanguage = (language) => {};

  let { data, language } = props;

  let facebook = <Icon name={'facebook'} color={'#000000'} size={30} />;
  return (
    <View style={{ backgroundColor: colors.background }}>
      <Touchable
        style={[
          style.content,
          data.border
            ? null
            : {
                borderBottomWidth: size(1),
                borderBottomColor: colors.border,
              },
        ]}
        onPress={() => clickItem()}>
        <Text style={[style.label, { color: colors.text }]}>{data.label}</Text>
        <Text style={[style.value, { color: colors.text }]}>{data.label}</Text>
        <Icon name="right" size={size(30)} color={colors.primary} style={style.icon} />
      </Touchable>
      {data.border ? <View style={[style.border, { backgroundColor: colors.border }]} /> : null}
    </View>
  );
};

const style = StyleSheet.create({
  content: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: size(40),
    alignItems: 'center',
    height: size(90),
  },

  label: { fontSize: size(28) },
  value: { flex: 1, textAlign: 'right', fontSize: size(28) },
  icon: { marginLeft: size(10) },
  border: {
    width: '100%',
    height: size(10),
  },
});
