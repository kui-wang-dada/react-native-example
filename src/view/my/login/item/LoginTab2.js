import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';

import { useTheme, useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import CheckBox from '@react-native-community/checkbox';
import { size, $api, modal } from '@/utils';
import { commitSessionId, getHomeSp, getHomeTp, getHomeCount, getUserInfo } from '@/store/actions';

import { Touchable, Icon, Button, Fumi } from 'ui';
export default (props) => {
  const { colors } = useTheme();
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const [email, setEmail] = useState('');
  const [pwd, setPwd] = useState('');

  const login = async () => {
    if (!email) {
      modal.showToast('请输入账号');
      return;
    }
    if (!pwd) {
      modal.showToast('请输入密码');
      return;
    }
    let params = {
      usr: email,
      pwd: pwd,
    };

    props.login && props.login(params);
  };

  const goToRegister = () => {
    navigation.navigate('register');
  };
  const goToPassword = () => {
    navigation.navigate('password');
  };
  return (
    <View style={[style.wrap, { backgroundColor: colors.background }]}>
      <View style={style.fieldWrap}>
        <Fumi
          label={'邮箱'}
          textContentType="emailAddress"
          style={[style.input, { backgroundColor: colors.card }]}
          value={email}
          clear={() => setEmail('')}
          onChangeText={(text) => {
            setEmail(text.replace(/\s+/g, ''));
          }}
          iconClass={Icon}
          iconName={'email'}
          iconColor={colors.primary}
          iconSize={25}
          iconWidth={40}
          inputPadding={13}
          returnKeyType="done"
        />
        <Fumi
          label={'密码'}
          textContentType="password"
          secureTextEntry={true}
          style={[style.input, { backgroundColor: colors.card }]}
          value={pwd}
          clear={() => setPwd('')}
          onChangeText={(text) => {
            setPwd(text);
          }}
          iconClass={Icon}
          iconName={'password'}
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
      {props.type ? null : (
        <View style={style.tipWrap}>
          <Button title="忘记密码" style={style.passwordWrap} textStyle={[style.passwordText, { color: colors.text_p }]} onPress={goToPassword} />
          <Button title="注册" style={style.registerWrap} textStyle={[style.registerText, { color: colors.text_p }]} onPress={goToRegister} />
        </View>
      )}
    </View>
  );
};
const style = StyleSheet.create({
  wrap: {
    paddingHorizontal: size(32),
  },
  fieldWrap: {
    marginTop: size(60),
  },
  input: {
    marginBottom: size(40),
    borderRadius: size(70),
    borderWidth: size(1),
    borderColor: '#ccc',
  },
  btnLogin: {
    marginTop: size(30),
    height: size(80),
    borderRadius: size(40),
    width: '100%',
  },
  btnLoginText: {
    fontSize: size(32),
    fontWeight: 'bold',
  },
  tipWrap: {
    marginTop: size(40),
    paddingHorizontal: size(40),
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  passwordText: {
    fontSize: size(28),
  },

  registerText: {
    fontSize: size(28),
  },
});
