import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, ImageBackground, ScrollView } from 'react-native';

import { useTheme, useNavigation } from '@react-navigation/native';
import { useWechatLogin } from 'hook/wechat';
import { useDispatch, useSelector } from 'react-redux';
import { commitSessionId, getHomeSp, getHomeTp, getHomeCount, getUserInfo } from '@/store/actions';
import { useGetHomeData } from 'hook/useGetData';
import CheckBox from '@react-native-community/checkbox';
import { size, checkStaticImg, $api, modal, SCREEN_HEIGHT } from '@/utils';
import { Touchable, Icon, Button, TabBar } from 'ui';
import { SecurityInput } from 'common';
import LinearGradient from 'react-native-linear-gradient';

export default ({ route }) => {
  const { colors } = useTheme();
  const navigation = useNavigation();
  const getWechat = useWechatLogin();
  const getHomeData = useGetHomeData();
  const dispatch = useDispatch();
  const barHeight = useSelector((state) => state.common.barHeight);

  const [hasStd, setHasStd] = useState(false);
  const [tab, setTab] = useState(0);
  const [std, setStd] = useState('');
  const [invitation, setInvitation] = useState('');
  const [email, setEmail] = useState('');
  const [pwd, setPwd] = useState('');
  const [check, setCheck] = useState(false);

  const type = route.params && route.params.type;
  const title = type ? '绑定' : '登录';

  useEffect(() => {
    getData();
  }, []);
  const getData = async () => {
    let res = await $api['my/bindConfig']();
    if (res.data.display && !res.data.display.allow_bind_using_invitation_code) {
      setHasStd(true);
    }
  };
  const loginCode = () => {};
  const loginEmail = () => {};
  const goToProto = () => {};

  const login = async (params) => {
    try {
      let res = await $api['my/erpLogin'](params);
      console.log(res, 'erp');

      if (res.data && res.data.display && res.data.display.students_id) {
        dispatch(commitSessionId(res.data.display.uid));
        await getHomeData();

        navigation.navigate('首页');
      } else {
        modal.showToast(res.status.message);
      }
    } catch (error) {
      modal.showToast('绑定失败');
    }
  };

  return (
    <ScrollView contentContainerStyle={[style.loginWrap, { paddingTop: barHeight }]} keyboardShouldPersistTaps="always" bounces={false}>
      <Button icon="back" iconColor={'#fff'} iconSize={16} style={style.backWrap} onPress={navigation.goBack} />

      <View style={[style.pageTitleWrap]}>
        <Text style={[style.pageTitle, { color: colors.primary }]}>厚仁留学{title}</Text>
      </View>
      <View style={style.conWrap}>
        <Icon name="wholeren" />
        <View style={style.tabWrap}>
          <Button
            style={[style.tab, tab ? null : style.tabActive]}
            textStyle={[style.tabText, tab ? null : style.tabTextActive]}
            title={'邀请码' + title}
            onPress={() => {
              setTab(0);
            }}
          />
          <Button
            style={[style.tab, tab ? style.tabActive : null]}
            textStyle={[style.tabText, tab ? style.tabTextActive : null]}
            title={'账号密码' + title}
            onPress={() => {
              setTab(1);
            }}
          />
        </View>
        {!tab ? (
          <View style={style.tabLeftWrap}>
            {hasStd ? (
              <SecurityInput
                icon={'pwd'}
                style={style.account}
                value={std}
                changeText={(text) => {
                  setStd(text);
                }}
              />
            ) : null}
            <SecurityInput
              icon={'pwd'}
              secureTextEntry={true}
              style={style.pwd}
              value={invitation}
              changeText={(text) => {
                setInvitation(text);
              }}
            />
            <LinearGradient colors={['#475C78', '#203046']} style={style.linear} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}>
              <Button style={style.btnWrap} textStyle={style.btn} title="登录" onPress={loginCode} />
            </LinearGradient>
          </View>
        ) : (
          <View style={style.tabRightWrap}>
            <SecurityInput
              icon={'email'}
              style={style.phone}
              value={email}
              changeText={(text) => {
                setEmail(text);
              }}
            />
            <SecurityInput
              icon={'code'}
              style={style.code}
              value={pwd}
              changeText={(text) => {
                setPwd(text);
              }}
            />
            <LinearGradient colors={['#475C78', '#203046']} style={style.linear} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}>
              <Button style={style.btnWrap} textStyle={style.btn} title="登录" onPress={loginEmail} />
            </LinearGradient>
          </View>
        )}
        <View style={style.tipsWrap}>
          <Text style={style.tipsRegister} onPress={() => navigation.navigate('register')}>
            没有账号？立即注册
          </Text>
          <Text style={style.tipsPwd} onPress={() => navigation.navigate('password')}>
            忘记密码？
          </Text>
        </View>
        <View style={style.loginTipsWrap}>
          <View style={style.line} />
          <Text style={style.loginTips}>其他登录方式</Text>
          <View style={style.line} />
        </View>
        <View style={style.otherLoginWrap}>
          <Touchable style={style.wechatWrap} onPress={getWechat}>
            <Image style={style.wechat} source={require('@/assets/images/wechat.png')} />
          </Touchable>
        </View>
      </View>
      <View style={style.agreeWrap}>
        <CheckBox style={style.checkBox} boxType="square" value={check} onValueChange={() => setCheck(!check)} />
        <Text style={style.agree}>阅读并同意厚仁留学</Text>
        <Text style={style.proto} onPress={goToProto}>
          《用户协议》
        </Text>
      </View>
    </ScrollView>
  );
};
const style = StyleSheet.create({
  loginWrap: {
    flex: 1,
    backgroundColor: '#203046',
    paddingHorizontal: size(80),
    alignItems: 'center',
  },
  pageTitleWrap: {
    width: '100%',
    height: 65,
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
  },
  pageTitle: {
    fontSize: size(54),
    fontWeight: 'bold',
  },
  backWrap: {
    position: 'absolute',
    left: size(40),
    top: size(60),
    width: size(50),
    height: size(50),
  },
  conWrap: {
    width: '100%',
    height: SCREEN_HEIGHT * 0.7,
    marginTop: size(56),
    justifyContent: 'space-between',
    backgroundColor: '#fff',

    alignItems: 'center',
  },
  logo: {
    width: size(116),
    height: size(100),
    marginTop: size(66),
  },
  tabWrap: {
    flexDirection: 'row',
  },
  tab: {
    width: size(230),
    height: size(60),
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomColor: 'rgba(32,48,70,.5)',
    borderBottomWidth: size(4),

    // marginTop: size(64),
  },
  tabActive: {
    borderBottomColor: '#203046',
  },
  tabText: {
    color: 'rgba(32,48,70,.5)',
  },
  tabTextActive: {
    color: '#203046',
  },
  tabLeftWrap: {
    width: size(488),
    // marginTop: size(40),
  },
  account: {
    marginTop: size(16),
    marginBottom: size(10),
  },
  pwd: {
    marginTop: size(16),
    marginBottom: size(10),
  },
  tabRightWrap: {
    width: size(488),
    // marginTop: size(40),
  },
  phone: {
    marginTop: size(16),
    marginBottom: size(10),
  },
  code: {
    marginTop: size(16),
    marginBottom: size(10),
  },
  linear: {
    marginTop: size(88),
    width: size(488),
    height: size(80),
    borderRadius: size(4),
  },
  btnWrap: {
    width: size(488),
    height: size(80),
    borderRadius: size(4),
  },
  btn: {
    color: '#fff',
    fontSize: size(28),
    fontWeight: 'bold',
  },
  tipsWrap: {
    // marginTop: size(42),
    width: size(488),
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  tipsRegister: {
    fontSize: size(24),
    color: '#4B87E0',
  },
  tipsPwd: {
    fontSize: size(24),
    color: '#666',
  },
  loginTipsWrap: {
    // marginTop: size(114),
    width: size(488),
    flexDirection: 'row',
    alignItems: 'center',
  },
  line: {
    width: size(150),
    backgroundColor: '#B3B8D3',
    height: size(2),
  },
  loginTips: {
    fontSize: size(24),
    color: '#999',
  },
  otherLoginWrap: {
    // marginTop: size(64),
    marginBottom: size(80),
  },
  wechatWrap: {},
  wechat: {
    width: size(100),
    height: size(100),
  },
  agreeWrap: {
    position: 'absolute',
    bottom: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkBox: {
    width: size(26),
    height: size(26),
    marginRight: size(30),
  },
  agree: {
    color: '#fff',
    marginLeft: size(10),
  },
  proto: {
    color: '#007aff',
    marginLeft: size(10),
  },
});
