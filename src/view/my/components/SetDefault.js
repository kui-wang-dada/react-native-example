import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useTheme, useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import SetDialog from './SetDialog';

import { getUserInfo } from '@/store/actions';
import { size, modal, commonStyle, $api } from '@/utils';
import { Icon, Touchable, Loading } from 'ui';

export default (props) => {
  const { colors } = useTheme();
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const userInfo = useSelector((state) => state.my.userInfo);

  const clickItem = () => {
    let { type, route, params, label, key } = props.data;
    if (type === 'to' || type === 'to_profile') {
      navigation.navigate(route, params);
      return;
    }

    if (type === 'input') {
      let inputType = key.indexOf('phone') > -1 ? 'number' : 'none';
      modal.show(
        <SetDialog title={'请设置' + label} placeholder={userInfo[key]} type={inputType} cancel={() => closeDialog()} confirm={(mes) => confirmDialog(mes)} />,
        'center',
      );
      return;
    }
  };
  const closeDialog = () => {
    modal.close();
  };
  const confirmDialog = (mes) => {
    closeDialog();
    _updateInfo(mes);
  };

  const _updateInfo = async (mes) => {
    let params = {};
    params[this.props.data.key] = mes;
    modal.show(<Loading />, 'loading');
    let res = await $api['user/updateInfo'](params, {
      url: `resource/User/${userInfo.email}`,
    });

    if (res.data.display) {
      await dispatch(getUserInfo());
      modal.close();
    }
  };
  let { data } = props;
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
        onPress={() => {
          clickItem();
        }}>
        <Text style={[style.label, { color: colors.text }]}>{data.label}</Text>
        <Text style={[style.value, { color: colors.text }]}>{userInfo[data.key]}</Text>
        {data.type !== 'nothing' && <Icon name="right" size={size(30)} color={colors.primary} style={style.icon} />}
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

  label: { color: '#333', fontSize: size(28) },
  value: { flex: 1, textAlign: 'right', fontSize: size(28) },
  icon: { marginLeft: size(10) },
  border: {
    width: '100%',
    height: size(10),
  },
  textInputStyle: {
    flex: 1,
    textAlign: 'justify',
    height: size(98),
    fontSize: size(28),
  },
});
