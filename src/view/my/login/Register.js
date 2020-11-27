import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, KeyboardAvoidingView, Keyboard } from 'react-native';
import { useTheme } from '@react-navigation/native';
import { size, commonStyle } from '@/utils';
import { Touchable, Icon, Button, Fumi } from 'ui';
export default () => {
  const { colors } = useTheme();

  const [activeRole, setActiveRole] = useState(0);
  const [sendCoding, setSendCoding] = useState(false);
  const [second, setSecond] = useState(10);
  const [email, setEmail] = useState('');
  const [pwd, setPwd] = useState('');
  const [pwdConfirm, setPwdConfirm] = useState('');
  const [code, setCode] = useState('');
  const [invitation, setInvitation] = useState('');

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
          <View style={style.roleWrap}>
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
          </View>
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
                label={'邀请码'}
                keyboardType="numeric"
                style={[style.input, { backgroundColor: colors.card }]}
                value={invitation}
                clear={() => setInvitation('')}
                onChangeText={(text) => {
                  setInvitation(text);
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
              <Text style={style.invitationText}>{'(选填)'}</Text>
            </View>

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
              <Button style={style.code} onPress={() => this.getCode()} textStyle={style.codeText} title={sendCoding ? '再发送' + second + 's' : '发送验证码'} />
            </View>

            <Button textStyle={style.btnText} title={'注册'} style={[style.btn, { backgroundColor: colors.primary }]} onPress={() => this.submit()} />
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
