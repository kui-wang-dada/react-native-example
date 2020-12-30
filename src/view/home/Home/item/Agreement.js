import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useTheme, useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { commitAgreementFlag } from '@/store/actions';
import { size, modal, SCREEN_HEIGHT } from '@/utils';
import { Touchable, Icon, Button } from 'ui';
import privacy from 'common/wenshu/privacy';
import terms from 'common/wenshu/terms';
export default () => {
  const { colors } = useTheme();
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const agreementFlag = useSelector((state) => state.search.agreementFlag);

  useEffect(() => {
    getAgreement();
  }, []);

  const getAgreement = () => {
    if (agreementFlag) {
      return;
    }
    console.log('modal', modal);
    modal.show(renderModal(), 'centerNo');
  };

  const showTerms = () => {
    let Components = (
      <View style={[style.modalConWrap, { backgroundColor: colors.background }]}>
        <Text style={style.title}>{terms.title}</Text>
        <ScrollView style={style.desWrap}>
          <View>
            {terms.content.map((item, index) => {
              return (
                <View key={index}>
                  {item.title ? <Text style={style.titleCon}>{item.title}</Text> : null}
                  {item.label.map((labelItem, labelIndex) => {
                    return (
                      <Text key={labelIndex} style={style.des}>
                        {labelItem}
                      </Text>
                    );
                  })}
                </View>
              );
            })}
          </View>
        </ScrollView>
        <View style={style.btnWrap}>
          <Button style={[style.btn2Wrap, { backgroundColor: colors.primary }]} textStyle={style.btn2} title="返回" onPress={handleBack} />
        </View>
      </View>
    );
    modal.show(Components, 'centerNo');
  };
  const showPrivacy = () => {
    let Components = (
      <View style={[style.modalConWrap, { backgroundColor: colors.background }]}>
        <Text style={style.title}>{privacy.title}</Text>
        <ScrollView style={style.desWrap}>
          <View>
            {privacy.content.map((item, index) => {
              return (
                <View key={index}>
                  {item.title ? <Text style={style.titleCon}>{item.title}</Text> : null}
                  {item.label.map((labelItem, labelIndex) => {
                    return (
                      <Text key={labelIndex} style={style.des}>
                        {labelItem}
                      </Text>
                    );
                  })}
                </View>
              );
            })}
          </View>
        </ScrollView>
        <View style={style.btnWrap}>
          <Button style={[style.btn2Wrap, { backgroundColor: colors.primary }]} textStyle={style.btn2} title="返回" onPress={handleBack} />
        </View>
      </View>
    );
    modal.show(Components, 'centerNo');
  };
  const handleBack = () => {
    getAgreement();
  };
  const handleAgree = () => {
    dispatch(commitAgreementFlag(true));
    modal.close();
  };
  const renderModal = () => {
    let des1 = '感谢您对厚仁教育的信任！为了更好的保护您的个人隐私信息，我方根据最新的国家相关法律规定更新了';
    let desTitle1 = '《用户隐私政策》';
    let desTitle2 = '《服务条款说明》';
    let des2 = '在此，我们郑重地提醒您，请务必仔细阅读并理解用户隐私政策，当您同意并接受全部条款后，即可开始使用厚仁留学APP提供的相关服务。';
    return (
      <View style={[style.modalWrap, { backgroundColor: colors.background }]}>
        <Text style={style.title}>温馨提示</Text>
        <View style={style.desWrap}>
          <Text style={style.des}>
            <Text>{des1}</Text>
            <Text style={[style.desActive, { color: colors.primary }]} onPress={showPrivacy}>
              {desTitle1}
            </Text>
            和
            <Text style={[style.desActive, { color: colors.primary }]} onPress={showTerms}>
              {desTitle2}
            </Text>
          </Text>
          <Text style={style.des}>{des2}</Text>
        </View>
        <View style={style.btnWrap}>
          <Button style={[style.btn2Wrap, { backgroundColor: colors.primary }]} textStyle={style.btn2} title="同意并继续使用App" onPress={handleAgree} />
        </View>
      </View>
    );
  };
  return <View />;
};
const style = StyleSheet.create({
  modalWrap: {
    width: size(600),
    paddingHorizontal: size(40),
    borderRadius: size(6),

    alignItems: 'center',
  },
  title: {
    fontSize: size(36),
    fontWeight: 'bold',
    marginTop: size(40),
    marginBottom: size(20),
    color: '#333',
  },
  desWrap: {
    paddingBottom: size(30),
    borderBottomColor: '#ccc',
    borderBottomWidth: size(1),
  },
  des: {
    fontSize: size(24),
    color: '#333',

    lineHeight: size(30),
  },
  desActive: {
    fontSize: size(28),
    fontWeight: 'bold',
  },
  btnWrap: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    width: '100%',
    paddingVertical: size(30),
  },

  btn2Wrap: {
    padding: size(15),

    minWidth: size(200),
    borderRadius: size(4),
  },
  btn2: {
    fontSize: size(28),
    fontWeight: 'bold',
    color: '#fff',
  },
  modalConWrap: {
    width: size(700),
    paddingHorizontal: size(40),
    borderRadius: size(6),

    alignItems: 'center',
    height: SCREEN_HEIGHT * 0.8,
  },
  titleCon: {
    fontSize: size(28),
    fontWeight: 'bold',
    marginTop: size(20),
    color: '#333',
  },
});
