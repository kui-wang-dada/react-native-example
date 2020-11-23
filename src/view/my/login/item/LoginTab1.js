import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useTheme } from '@react-navigation/native';
import { size, commonStyle } from '@/utils';
import { Touchable, Icon, Button, Fumi } from 'ui';
export default () => {
  const { colors } = useTheme();
  const [invitation, setInvitation] = useState('');
  console.log(543);
  const login = () => {};
  const reset = () => {};
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
