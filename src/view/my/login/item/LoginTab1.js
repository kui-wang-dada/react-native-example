import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';

import { useTheme } from '@react-navigation/native';
import CheckBox from '@react-native-community/checkbox';
import { size, commonStyle } from '@/utils';
import { Touchable, Icon, Button, Fumi } from 'ui';
export default () => {
  const { colors } = useTheme();
  const [invitation, setInvitation] = useState('');
  const [value1, setValue1] = useState(false);
  const [value2, setValue2] = useState(false);
  console.log(543);
  const login = () => {};
  const reset = () => {};
  const handleValue1 = (newV) => {
    if (newV) {
      setValue2(false);
      setValue1(true);
    } else {
      setValue1(false);
    }
  };
  const handleValue2 = (newV) => {
    if (newV) {
      setValue1(false);
      setValue2(true);
    } else {
      setValue2(false);
    }
  };
  return (
    <View style={style.wrap}>
      <View style={style.fieldWrap}>
        <Fumi
          label={'邀请码'}
          style={[style.input, { backgroundColor: colors.card }]}
          value={invitation}
          clear={() => setInvitation('')}
          onChangeText={(text) => {
            setInvitation(text);
          }}
          iconClass={Icon}
          iconName={'code'}
          iconColor={colors.primary}
          iconSize={25}
          iconWidth={40}
          inputPadding={13}
          returnKeyType="done"
        />
      </View>
      <View style={style.checkBoxWrap}>
        <View style={style.parentWrap}>
          <CheckBox style={style.checkBox} disabled={false} value={value1} onValueChange={handleValue1} />
          <Text style={style.parentText}>家长</Text>
        </View>
        <View style={style.studentWrap}>
          <CheckBox style={style.checkBox} disabled={false} value={value2} onValueChange={handleValue2} />
          <Text style={style.studentText}>学生</Text>
        </View>
      </View>
      <Text className="tips">为保护学员的信息，「厚仁留学」小程序仅对服务内用户开放。您可以询问服务老师或 在线客服 获取厚仁学号和邀请码</Text>
      <Button
        style={[style.btnLogin, { backgroundColor: colors.primary }]}
        onPress={login}
        textStyle={[style.btnLoginText, { color: colors.background }]}
        title={'提交'}
      />
      <Button style={[style.btnReset, { borderColor: colors.primary }]} onPress={reset} textStyle={[style.btnResetText, { color: colors.primary }]} title={'重置'} />
    </View>
  );
};
const style = StyleSheet.create({
  wrap: {
    flex: 1,
    paddingHorizontal: size(32),
  },
  fieldWrap: {
    marginTop: size(100),
  },
  input: {
    marginBottom: size(20),
  },
  checkBoxWrap: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    height: size(100),
  },
  parentWrap: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkBox: {
    width: size(36),
    height: size(36),
  },
  parentText: {
    marginLeft: size(20),
    fontSize: size(28),
  },
  studentWrap: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  studentText: {
    marginLeft: size(20),
    fontSize: size(28),
  },
  btnLogin: {
    marginTop: size(30),
    height: size(80),
    borderRadius: size(4),
    width: '100%',
  },
  btnLoginText: {
    fontSize: size(28),
    fontWeight: 'bold',
  },
  btnReset: {
    marginTop: size(30),
    height: size(80),
    borderRadius: size(4),
    width: '100%',
    borderWidth: size(1),
  },
  btnResetText: {
    fontSize: size(28),
    fontWeight: 'bold',
  },
});
