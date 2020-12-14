import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, KeyboardAvoidingView, Keyboard } from 'react-native';
import { useTheme } from '@react-navigation/native';
import { useGetHomeData } from 'hook/useGetData';
import { useDispatch, useSelector } from 'react-redux';
import { size, commonStyle, modal, $api, regex } from '@/utils';
import { Touchable, Icon, Button, Fumi } from 'ui';
export default () => {
  const { colors } = useTheme();
  const getHomeData = useGetHomeData();
  const dispatch = useDispatch();
  // const [activeRole, setActiveRole] = useState(0);
  const [sendCoding, setSendCoding] = useState(false);
  const [second, setSecond] = useState(10);
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
      password: pwd,
      code: code,
    };
    modal.showLoading();
    try {
      let res = await $api['my/register'](params);
      modal.showToast('注册成功');

      if (res.status.code === 200) {
        let deviceId = res.data.display.unionid || res.data.display.uid;
        dispatch(commitSessionId(deviceId));
        await getHomeData();
        navigation.navigate('首页');
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
        modal.showToast(res.status.message);
        setSendCoding(true);
        setSecond(10);

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
      setSecond(10);
      clearInterval(timer.current);

      return;
    }
  }, [second]);

  let roles = ['student', 'parent'];
  return (
    <KeyboardAvoidingView
      keyboardShouldPersistTaps="always"
      style={{ flex: 1, backgroundColor: colors.background }}
      // behavior="padding"
      // enabled
      // keyboardVerticalOffset={keyboardVerticalOffset}
      // contentContainerStyle={{ backgroundColor: "transparent" }}
    >
      <Touchable type="withoutFeedback" onPress={() => Keyboard.dismiss()}>
        <View style={style.register}>
          <View style={style.titleWrap}>
            <Text style={[style.title, { color: colors.text }]}>欢迎来到厚仁留学！</Text>
            <Text style={[style.label, { color: colors.text_p }]}>为您提供扎根美国的留学全服务</Text>
          </View>
          {/* <View style={style.roleWrap}>
            {roles.map((item, index) => {
              return (
                <View style={{ flexDirection: 'row', alignItems: 'center' }} key={index}>
                  <Button
                    key={index}
                    style={style.roleItem}
                    onPress={() => setActiveRole(index)}
                    icon={item}
                    iconSize={25}
                    iconColor={activeRole === index ? colors.primary : colors.text_p}
                    textStyle={[
                      style.roleText,
                      { color: colors.text_p },
                      activeRole === index && {
                        color: colors.primary,
                      },
                    ]}
                    title={index ? '家长' : '学生'}
                  />
                </View>
              );
            })}
          </View> */}
          <View style={style.inputWrap}>
            <Fumi
              label={'邮箱'}
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
            <Fumi
              label={'密码确认'}
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
                label={'验证码'}
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
              <Button style={style.code} onPress={getCode} textStyle={style.codeText} title={sendCoding ? '再发送' + second + 's' : '发送验证码'} />
            </View>

            <Button textStyle={style.btnText} title={'注册'} style={[style.btn, { backgroundColor: colors.primary }]} onPress={submit} />
          </View>
        </View>
      </Touchable>
    </KeyboardAvoidingView>
  );
};
const style = StyleSheet.create({
  register: {
    paddingHorizontal: size(55),
  },
  titleWrap: {
    height: size(220),
    justifyContent: 'center',
  },
  title: {
    fontSize: size(36),
    fontWeight: 'bold',
  },
  label: {
    marginTop: size(30),
    fontSize: size(28),
  },
  roleWrap: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginBottom: size(40),
  },
  roleItem: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginLeft: size(30),
  },
  roleText: {
    fontSize: size(32),
    fontWeight: 'bold',

    marginLeft: size(20),
  },
  input: {
    backgroundColor: '#f9f5ed',
    marginBottom: size(20),
  },
  codeWrap: {
    position: 'relative',
  },
  invitationText: {
    position: 'absolute',
    right: 10,
    bottom: size(50),
    fontSize: size(28),
    color: '#999',
    fontWeight: 'bold',
  },
  code: {
    width: size(180),
    height: size(60),
    position: 'absolute',
    right: 10,
    bottom: size(40),
  },
  codeText: {
    textAlign: 'right',
  },
  btn: {
    marginTop: size(30),
    height: size(80),
    borderRadius: size(4),
  },
  btnText: { color: '#fff', fontSize: size(28), fontWeight: 'bold' },
});
