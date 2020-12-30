import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useTheme } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { size, commonStyle, modal } from '@/utils';
import TouchID from 'react-native-touch-id';
import { Touchable, Icon, Button, Switch } from 'ui';
export default (props) => {
  const { colors } = useTheme();
  const dispatch = useDispatch();
  const finger = useSelector((state) => state.search.finger);

  const handleSwitch = (callback) => {
    const optionalConfigObject = {
      title: '指纹登录', // Android
      imageColor: '#e00606', // Android
      imageErrorColor: '#ff0000', // Android
      sensorDescription: '请输入指纹', // Android
      sensorErrorDescription: 'Failed', // Android
      cancelText: 'Cancel', // Android
      fallbackLabel: 'Show Passcode', // iOS (if empty, then label is hidden)
      unifiedErrors: false, // use unified error messages (default false)
      passcodeFallback: false, // iOS - allows the device to fall back to using the passcode, if faceid/touch is not available. this does not mean that if touchid/faceid fails the first few times it will revert to passcode, rather that if the former are not enrolled, then it will use the passcode.
    };
    TouchID.authenticate('Set up fingerprint login', optionalConfigObject)
      .then((success) => {
        if (!finger) {
          // track.logEvent('openFinger');
          callback(true);
          this.props.commitFinger(true);
          modal.showToast('成功开启指纹登录');
        } else {
          // track.logEvent('closeFinger');
          callback(false);
          this.props.commitFinger(false);
          modal.showToast('成功关闭指纹登录');
        }
      })
      .catch((error) => {
        modal.showToast('指纹设置失败，请重试');
      });
  };
  return (
    <View style={[style.wrap, { backgroundColor: colors.background }]}>
      {/* <View style={style.topWrap}>
      <Icon
        name="finger"
        size={size(300)}
        color={commonStyle.color_theme}
      ></Icon>
      <Text style={style.topText}>指纹密码仅对本机有效</Text>
    </View> */}
      <View style={[style.centerWrap, { backgroundColor: colors.background }]}>
        <Text style={{ color: colors.text }}> 指纹识别</Text>
        <Switch value={finger} onAsyncPress={handleSwitch} width={size(100)} height={size(50)} backgroundActive={colors.primary} />
      </View>
      <View style={style.tipsWrap}>
        <Text style={[style.tips, { color: colors.text_p }]}>温馨提示：</Text>

        <Text style={[style.tips, { color: colors.text_p }]}>1、生物识别登录仅适用于具备标准生物识别功能的手机。</Text>
        <Text style={[style.tips, { color: colors.text_p }]}>2、打开生物识别登录开关时，会记录当前登录信息，下次登录时，可通过该生物识别登录当前账户。</Text>
        <Text style={[style.tips, { color: colors.text_p }]}>3、若有多个APP账户来回切换，生物识别登录只能记录最近一次的登录信息。</Text>
      </View>
    </View>
  );
};
const style = StyleSheet.create({
  wrap: {
    flex: 1,
    backgroundColor: '#f1f1f1',
  },
  topWrap: {
    flexDirection: 'column',
    alignItems: 'center',
    paddingTop: size(50),
  },
  topText: {
    marginVertical: size(60),
    fontSize: size(32),
    color: '#666',
  },
  centerWrap: {
    height: size(100),
    paddingHorizontal: size(40),
    flexDirection: 'row',

    justifyContent: 'space-between',
    alignItems: 'center',
  },
  tipsWrap: {
    padding: size(40),
  },
  tips: {
    fontSize: size(24),
    lineHeight: size(30),
    marginBottom: size(10),
  },
});
