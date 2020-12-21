import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, ImageBackground, ScrollView, Keyboard } from 'react-native';
import { useTheme, useNavigation } from '@react-navigation/native';
import { useWechatLogin } from 'hook/wechat';
import { useDispatch, useSelector } from 'react-redux';
import { commitSessionId, getHomeSp, getHomeTp, getHomeCount, getUserInfo } from '@/store/actions';
import { useGetHomeData } from 'hook/useGetData';
import CheckBox from '@react-native-community/checkbox';
import { size, checkStaticImg, $api, modal, SCREEN_HEIGHT } from '@/utils';
import { Touchable, Icon, Button } from 'ui';
import { SecurityInput } from 'common';
import LinearGradient from 'react-native-linear-gradient';

export default ({ route }) => {
  const { colors } = useTheme();
  const navigation = useNavigation();
  const getWechat = useWechatLogin();
  const getHomeData = useGetHomeData();
  const dispatch = useDispatch();
  const barHeight = useSelector((state) => state.common.barHeight);

  const [tab, setTab] = useState(0);
  const [invitation, setInvitation] = useState('');

  const [email, setEmail] = useState('');
  const [pwd, setPwd] = useState('');
  const [check, setCheck] = useState(true);

  const title = '登录';

  const handleLogin = () => {
    if (tab) {
      loginEmail();
    } else {
      loginCode();
    }
  };
  const loginCode = () => {
    if (!invitation) {
      modal.showToast('请输入邀请码');
      return;
    }
    let params = {
      ivcode: invitation,
    };
    login(params);
  };
  const loginEmail = () => {
    if (!email) {
      modal.showToast('请输入账号');
      return;
    }
    if (!pwd) {
      modal.showToast('请输入密码');
      return;
    }
    let params = {
      account: email,
      password: pwd,
    };
    login(params);
  };
  const goToPrivacy = () => {
    navigation.navigate('privacy');
  };
  const goToTerms = () => {
    navigation.navigate('terms');
  };

  const login = async (params) => {
    try {
      modal.showLoading();
      let res = await $api['my/login'](params);
      console.log(res, 'login');
      modal.close();
      if (res.data && res.data.display) {
        let deviceId = res.data.display.uid;
        dispatch(commitSessionId(deviceId));
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
    <Touchable type="withoutFeedback" onPress={() => Keyboard.dismiss()}>
      <ScrollView contentContainerStyle={[style.loginWrap, { paddingTop: barHeight }]} bounces={false}>
        <View style={[style.pageTitleWrap]}>
          <Button icon="back" iconColor={'#fff'} iconSize={16} style={style.backWrap} onPress={navigation.goBack} />
          <Text style={[style.pageTitle, { color: '#fff' }]}>厚仁留学{title}</Text>
        </View>
        <View style={[style.conWrap, { backgroundColor: '#f1f1f1' }]}>
          <Icon style={style.logo} name="wholeren" size={50} color={colors.primary} />
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
              <SecurityInput
                icon={'code'}
                style={style.pwd}
                value={invitation}
                changeText={(text) => {
                  setInvitation(text);
                }}
              />
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
                secureTextEntry={true}
                style={style.code}
                value={pwd}
                changeText={(text) => {
                  setPwd(text);
                }}
              />
            </View>
          )}

          {/* <View style={style.tipsWrap}>
          <Text style={style.tipsRegister} onPress={() => navigation.navigate('register')}>
            没有账号？立即注册
          </Text>
          <Text style={style.tipsPwd} onPress={() => navigation.navigate('password')}>
            忘记密码？
          </Text>
        </View> */}
          <View style={style.otherLoginWrap}>
            <LinearGradient colors={['#475C78', '#203046']} style={style.linear} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}>
              <Button style={style.btnWrap} textStyle={style.btn} title={title} onPress={handleLogin} />
            </LinearGradient>
            <View style={style.loginTipsWrap}>
              <View style={style.line} />
              <Text style={style.loginTips}>推荐使用微信登录</Text>
              <View style={style.line} />
            </View>
            <View>
              <Touchable style={style.wechatWrap} onPress={getWechat}>
                <Image style={style.wechat} source={require('@/assets/images/wechat.png')} />
              </Touchable>
            </View>
          </View>
        </View>

        <View style={style.agreeWrap}>
          <CheckBox
            tintColors={colors.primary}
            onCheckColor={colors.primary}
            onTintColor={colors.primary}
            style={style.checkBoxBottom}
            boxType="square"
            value={check}
            onValueChange={() => setCheck(!check)}
          />
          <Text style={style.agree}>阅读并同意</Text>
          <Text style={[style.proto, { color: colors.primary }]} onPress={goToPrivacy}>
            《隐私权政策》
          </Text>
          <Text style={[style.proto, { color: colors.primary }]} onPress={goToTerms}>
            《服务条款说明》
          </Text>
        </View>
      </ScrollView>
    </Touchable>
  );
};
const style = StyleSheet.create({
  loginWrap: {
    flex: 1,
    height: '100%',
    backgroundColor: '#203046',
    paddingHorizontal: size(80),
    alignItems: 'center',
    position: 'relative',
  },

  pageTitleWrap: {
    width: '100%',
    height: 65,
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
  },
  backWrap: {
    position: 'absolute',
    left: -size(40),

    width: size(50),
    height: size(50),
  },
  pageTitle: {
    fontSize: size(40),
    fontWeight: 'bold',
  },

  conWrap: {
    width: '100%',
    height: SCREEN_HEIGHT * 0.7,
    marginTop: size(56),

    alignItems: 'center',
  },
  logo: {
    marginTop: size(66),
  },
  tabWrap: {
    flexDirection: 'row',
  },
  tab: {
    width: size(230),
    height: size(60),
    marginVertical: size(40),
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomColor: 'rgba(32,48,70,.5)',
    borderBottomWidth: size(4),

    // marginTop: size(64),
  },
  tabActive: {
    borderBottomColor: '#4bc694',
  },
  tabText: {
    color: 'rgba(32,48,70,.5)',
  },
  tabTextActive: {
    color: '#4bc694',
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
    marginBottom: size(60),
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
    marginTop: size(42),
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
    justifyContent: 'center',
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
    marginHorizontal: size(20),
  },
  otherLoginWrap: {
    // marginTop: size(64),

    position: 'absolute',
    bottom: 0,
  },
  wechatWrap: {
    marginVertical: size(30),
    textAlign: 'center',
    alignItems: 'center',
  },
  wechat: {
    width: size(80),
    height: size(80),
  },
  agreeWrap: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
  },
  checkBoxBottom: {
    width: size(26),
    height: size(26),
    marginRight: size(30),
  },
  agree: {
    color: '#fff',
    marginLeft: size(10),
  },
  proto: {
    marginLeft: size(10),
  },
});
