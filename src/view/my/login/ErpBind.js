import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, ImageBackground, ScrollView, Keyboard } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import { useTheme, useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { commitSessionId } from '@/store/actions';
import { useGetHomeData } from 'hook/useGetData';
import { size, checkStaticImg, $api, modal, SCREEN_HEIGHT } from '@/utils';
import { Touchable, Icon, Button, CheckBox } from 'ui';
import { SecurityInput } from 'common';
import LinearGradient from 'react-native-linear-gradient';

export default ({ route }) => {
  const { colors } = useTheme();
  const navigation = useNavigation();
  const getHomeData = useGetHomeData();
  const dispatch = useDispatch();
  const barHeight = useSelector((state) => state.common.barHeight);

  const [hasStd, setHasStd] = useState(false);
  const [tab, setTab] = useState(0);
  const [std, setStd] = useState('');
  const [invitation, setInvitation] = useState('');
  const [role, setRole] = useState('');

  const [email, setEmail] = useState('');
  const [pwd, setPwd] = useState('');

  const title = '绑定';

  useEffect(() => {
    getData();
  }, []);
  const getData = async () => {
    let res = await $api['my/bindConfig']();
    if (res.data.display && !res.data.display.allow_bind_using_invitation_code) {
      setHasStd(true);
    }
  };
  const changeBox = (value) => {
    if (value === 1) {
      setRole('Students');
    } else {
      setRole('Parent');
    }
  };

  const handleBind = () => {
    if (tab) {
      bindEmail();
    } else {
      bindCode();
    }
  };
  const bindCode = () => {
    if (!invitation) {
      modal.showToast('请输入邀请码');
      return;
    }
    let params = {
      code: invitation,
      role: role,
    };
    if (hasStd) {
      params.std = std;
    }
    login(params);
  };
  const bindEmail = () => {
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
    login(params);
  };

  const login = async (params) => {
    modal.showLoading();
    try {
      let res = await $api['my/erpBind'](params);
      console.log(res, 'erp');
      modal.close();
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
                icon={'code'}
                style={style.pwd}
                value={invitation}
                changeText={(text) => {
                  setInvitation(text);
                }}
              />
              <CheckBox role={role} handleChange={changeBox} />
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
          <LinearGradient colors={['#475C78', '#203046']} style={style.linear} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}>
            <Button style={style.btnWrap} textStyle={style.btn} title={title} onPress={handleBind} />
          </LinearGradient>
        </View>
      </ScrollView>
    </Touchable>
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
    fontSize: size(40),
    fontWeight: 'bold',
  },
  backWrap: {
    position: 'absolute',
    left: -size(40),

    width: size(50),
    height: size(50),
  },
  conWrap: {
    width: '100%',
    height: SCREEN_HEIGHT * 0.7,
    marginTop: size(56),

    backgroundColor: '#fff',

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
    marginTop: size(44),
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
});
