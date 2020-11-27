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

  const [invitation, setInvitation] = useState('');
  const [std, setStd] = useState('');

  const [value1, setValue1] = useState(false);
  const [value2, setValue2] = useState(false);

  const getHomeData = async () => {
    let params = {
      limit_start: 0,
      limit_page_length: 10,
    };
    dispatch(getHomeSp(params));
    dispatch(getHomeTp(params));

    dispatch(getHomeCount());
    await dispatch(getUserInfo());
  };
  const login = async () => {
    if (!invitation) {
      modal.showToast('请输入邀请码');
      return;
    }
    let role = value1 ? 'Parent' : value2 ? 'Students' : null;
    let params = {
      code: invitation,
      role: role,
    };
    if (props.hasStd) {
      params.std = std;
    }
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
  const goToRegister = () => {
    navigation.navigate('register');
  };
  return (
    <View style={style.wrap}>
      <View style={style.fieldWrap}>
        {props.hasStd ? (
          <Fumi
            label={'学号'}
            style={[style.input, { backgroundColor: colors.card }]}
            value={std}
            clear={() => setStd('')}
            onChangeText={(text) => {
              setStd(text);
            }}
            iconClass={Icon}
            iconName={'pwd'}
            iconColor={colors.primary}
            iconSize={25}
            iconWidth={40}
            inputPadding={13}
            returnKeyType="done"
          />
        ) : null}
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
      <Button
        style={[style.btnLogin, { backgroundColor: colors.primary }]}
        onPress={login}
        textStyle={[style.btnLoginText, { color: colors.background }]}
        title={'提交'}
      />
      <Button title="注册" style={style.registerWrap} textStyle={[style.registerText, { color: colors.text_p }]} onPress={goToRegister} />
    </View>
  );
};
const style = StyleSheet.create({
  wrap: {
    flex: 1,
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
    borderRadius: size(40),
    width: '100%',
  },
  btnLoginText: {
    fontSize: size(32),
    fontWeight: 'bold',
  },
  registerWrap: {
    marginTop: size(40),
    flexDirection: 'row',
    justifyContent: 'flex-end',
    paddingHorizontal: size(20),
  },
  registerText: {
    fontSize: size(28),
  },
});
