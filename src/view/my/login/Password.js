import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Keyboard, ScrollView } from 'react-native';
import { useTheme, useNavigation } from '@react-navigation/native';
import { size, regex, commonStyle, modal, $api } from '@/utils';
import { Touchable, Icon, Button, Fumi } from 'ui';
export default () => {
  const { colors } = useTheme();
  const navigation = useNavigation();
  const [sendCoding, setSendCoding] = useState(false);
  const [second, setSecond] = useState(60);
  const [email, setEmail] = useState('');
  const [pwd, setPwd] = useState('');
  const [pwdConfirm, setPwdConfirm] = useState('');
  const [code, setCode] = useState('');
  let timer = useRef(null);

  const submit = async () => {
    Keyboard.dismiss();

    if (!regex.email.test(email)) {
      modal.showToast('邮箱格式错误');
      return;
    }

    if (pwd !== pwdConfirm) {
      modal.showToast('两次密码不一致');
      return;
    }
    if (!code) {
      modal.showToast('请输入验证码');
      return;
    }

    let params = {
      account: email,
      newpwd: pwd,
      code: code,
    };
    modal.showLoading();
    try {
      let res = await $api['my/password'](params);
      modal.showToast('密码修改成功');

      if (res.status.code === 200) {
        navigation.goBack();
      }
    } catch (err) {
      modal.showToast(err.message);
    }
  };

  const getCode = async () => {
    if (!email) {
      modal.showToast('请输入邮箱');
      return;
    }
    modal.showLoading();
    let params = {
      account: email,
    };

    try {
      let res = await $api['my/sendCode'](params);
      if (res.status.code === 200) {
        // modal.showToast(res.status.message);
        setSendCoding(true);
        setSecond(60);

        getCount();
      } else {
        modal.showToast(res.status.message);
      }
    } catch (err) {
      modal.showToast(err.message);
    }
  };
  const getCount = () => {
    timer.current = setInterval(() => {
      setSecond((second) => second - 1);
    }, 1000);
  };
  useEffect(() => {
    if (second <= 0) {
      setSendCoding(false);
      setSecond(60);
      clearInterval(timer.current);

      return;
    }
  }, [second]);

  let roles = ['student', 'parent'];
  return (
    <ScrollView style={{ flex: 1, backgroundColor: colors.background }} keyboardShouldPersistTaps="always">
      <Touchable type="withoutFeedback" onPress={() => Keyboard.dismiss()} style={{ flex: 1, backgroundColor: colors.background }}>
        <View style={style.password}>
          <View style={style.inputWrap}>
            <Fumi
              label={'邮箱'}
              textContentType="emailAddress"
              style={[style.input, { backgroundColor: colors.card }]}
              iconClass={Icon}
              value={email}
              clear={() => {
                setEmail('');
              }}
              onChangeText={(text) => {
                setEmail(text.replace(/\s+/g, ''));
              }}
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
              iconSize={20}
              iconWidth={40}
              inputPadding={16}
              returnKeyType="done"
            />
            <Fumi
              label={'确认密码'}
              textContentType="newPassword"
              secureTextEntry={true}
              style={[style.input, { backgroundColor: colors.card }]}
              value={pwdConfirm}
              clear={() => setPwdConfirm('')}
              onChangeText={(text) => {
                setPwdConfirm(text);
              }}
              iconClass={Icon}
              iconName={'password'}
              iconColor={colors.primary}
              iconSize={25}
              iconWidth={40}
              inputPadding={13}
              returnKeyType="done"
            />
            <View style={style.codeWrap}>
              <Fumi
                label={'邀请码'}
                // textContentType=""
                style={[style.input, { backgroundColor: colors.card }]}
                value={code}
                clear={() => setCode('')}
                onChangeText={(text) => {
                  setCode(text);
                }}
                showClose={false}
                iconClass={Icon}
                iconName={'code'}
                iconColor={colors.primary}
                iconSize={25}
                iconWidth={40}
                inputPadding={13}
                returnKeyType="done"
              />
              <Button
                style={style.code}
                onPress={getCode}
                textStyle={style.codeText}
                title={sendCoding ? '再发送' + second + 's' : '发送验证码'}
              />
            </View>

            <Button textStyle={style.btnText} style={style.btn} onPress={submit} title={'提交'} />
          </View>
        </View>
      </Touchable>
    </ScrollView>
  );
};
const style = StyleSheet.create({
  password: {
    paddingHorizontal: size(55),
    paddingTop: size(40),
  },

  input: {
    backgroundColor: '#f9f5ed',
    marginBottom: size(20),
  },
  codeWrap: {
    position: 'relative',
  },
  code: {
    width: size(180),
    height: size(60),
    position: 'absolute',
    right: 10,
    bottom: size(40),
  },
  codeText: {
    color: commonStyle.color_theme,
    textAlign: 'right',
  },
  btn: {
    marginTop: size(30),
    backgroundColor: commonStyle.color_theme,
    height: size(80),
    borderRadius: size(4),
  },
  btnText: { color: '#fff', fontSize: size(28), fontWeight: 'bold' },
});
