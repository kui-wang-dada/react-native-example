import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useTheme } from '@react-navigation/native';
import RNBottomActionSheet from 'react-native-bottom-action-sheet';
import { useColorScheme } from 'react-native-appearance';
import { useDispatch, useSelector } from 'react-redux';
import { size, commonStyle, modal, $api } from '@/utils';
import { Touchable, Icon, Button, ActionSheet } from 'ui';
export default (props) => {
  const { colors } = useTheme();
  const scheme = useColorScheme();
  const dispatch = useDispatch();
  const userInfo = useSelector((state) => state.my.userInfo);

  const actionRef = useRef();
  let actionOptions = ['取消', '中文', '英文'];

  const clickItem = () => {
    actionRef.current.show();
  };
  const handleActionPress = async (v) => {
    let mes = actionOptions[v];
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
      <ActionSheet
        ref={actionRef}
        title={'请选择语言!'}
        options={actionOptions}
        cancelButtonIndex={0}
        destructiveButtonIndex={3}
        tintColor={colors.primary}
        onPress={handleActionPress}
      />
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
