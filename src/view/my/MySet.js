import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useTheme, useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { commitSessionId, commitUserInfo } from '@/store/actions';
import { size, commonStyle } from '@/utils';
import { Touchable, Icon, Button, Cell } from 'ui';
export default () => {
  const { colors } = useTheme();
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const userInfo = useSelector((state) => state.my.userInfo);

  const logout = () => {
    // Taro.setStorageSync('deviceId', '');
    // Taro.setStorageSync('studentId', '');
    dispatch(commitUserInfo({}));
    dispatch(commitSessionId(''));
    navigation.goBack();
    // Taro.navigateBack();
  };
  const goToAccount = () => {
    navigation.navigate('account');
  };

  const location = userInfo.province + userInfo.city;
  return (
    <View style={style.mysetWrap}>
      <View style={style.cellWrap}>
        <Cell label="昵称" style={style.cell} title={userInfo.username} />
      </View>
      <View style={style.cellWrap}>
        <Cell label="地址" style={style.cell} title={location} />
      </View>
      <View style={style.cellWrap}>
        <Cell label="绑定学号" style={style.cell} title={userInfo.students_id} onPress={goToAccount} islink={true} />
      </View>
      <View style={style.cellWrap}>
        <Cell label="学生" style={style.cell} title={userInfo.students_name} />
      </View>

      <Button style={[style.logout, { backgroundColor: colors.primary }]} textStyle={[style.logoutText, { color: colors.background }]} onPress={logout} title="退出" />
    </View>
  );
};
const style = StyleSheet.create({
  mysetWrap: {
    flexDirection: 'column',
    alignItems: 'center',
  },
  cellWrap: {
    width: '100%',
    paddingHorizontal: size(32),
  },
  cell: {
    height: size(100),
  },
  logout: {
    marginTop: size(100),
    borderRadius: size(10),
    width: size(600),
    height: size(80),
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoutText: {
    fontWeight: 'bold',
    fontSize: size(32),
  },
});
