import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { useTheme } from '@react-navigation/native';
import { size, commonStyle } from '@/utils';
import { Touchable, Icon, Button } from 'ui';

export default (props) => {
  const { colors } = useTheme();
  let [showStep2, setShowStep2] = useState();
  let [imgUrl, setImgUrl] = useState(require('@/assets/images/service/4.png'));

  useEffect(() => {
    let { application_status } = props.item;
    let Stragety = {
      Confirmed: { step: 1, img: require('@/assets/images/service/1.png') },
      'Material Essay': {
        step: 2,
        img: require('@/assets/images/service/2.png'),
      },
      Submitted: { step: 3, img: require('@/assets/images/service/3.png') },
      'Decision Released': {
        step: 4,
        img: require('@/assets/images/service/4.png'),
      },
      Accpected: { step: 5, img: require('@/assets/images/service/1.png') },
      'Deposit Paid': {
        step: 6,
        img: require('@/assets/images/service/2.png'),
      },
      'I20 Issued': { step: 7, img: require('@/assets/images/service/3.png') },
      Enrolled: { step: 8, img: require('@/assets/images/service/4.png') },
    };
    let stepData = Stragety[application_status];
    if (stepData.step > 4) {
      setShowStep2(true);
      setImgUrl(stepData.img);
    } else {
      setShowStep2(false);
      setImgUrl(stepData.img);
    }
  }, []);

  let stepData_1 = ['选校确认', '材料/文书', '提交申请', '申请结果'];
  let stepData_2 = ['确认入学', '提交定金', '办理I20', '成功入学'];

  let { school, major } = props.item;
  let stepImg1 = showStep2 ? require('@/assets/images/service/4.png') : imgUrl;
  return (
    <View
      style={[
        style.wrap,
        {
          backgroundColor: colors.background,
          borderColor: colors.border,
        },
      ]}>
      <View style={style.header}>
        <View style={style.iconWrap}>
          <Icon name="university" size={size(40)} color={colors.text} />
        </View>

        <View style={style.headerCon}>
          <Text style={[style.title, { color: colors.text }]}>{school}</Text>
          <Text style={[style.label, { color: colors.text_p }]}>{major}</Text>
        </View>
      </View>
      <View style={style.con}>
        <Image source={stepImg1} style={style.img} />
        <View style={style.stepWrap}>
          {stepData_1.map((item, index) => {
            return (
              <View style={style.step} key={index}>
                <Text style={[style.text, { color: colors.text_p }]}>{item}</Text>
              </View>
            );
          })}
        </View>
      </View>
      {showStep2 ? (
        <View style={style.con}>
          <Image source={imgUrl} style={style.img} />
          <View style={style.stepWrap}>
            {stepData_2.map((item, index) => {
              return (
                <View style={style.step} key={index}>
                  <Text style={[style.text, { color: colors.text_p }]}>{item}</Text>
                </View>
              );
            })}
          </View>
        </View>
      ) : null}
    </View>
  );
};

const style = StyleSheet.create({
  wrap: {
    padding: size(30),
    overflow: 'hidden',

    borderWidth: size(1),

    borderRadius: size(10),
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerCon: {
    marginLeft: size(20),
  },
  iconWrap: {
    width: size(70),
    height: size(70),
    borderRadius: size(35),
    borderWidth: size(1),
    borderColor: '#666',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: size(28),
    width: size(520),
    fontWeight: 'bold',
  },
  label: {
    fontSize: size(24),
    fontWeight: 'bold',
  },
  con: {
    alignItems: 'center',
    marginTop: size(20),
  },

  img: {
    width: size(470),
    resizeMode: 'contain',
  },
  stepWrap: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  step: {
    flex: 1,
    alignItems: 'center',
  },

  text: {
    marginTop: size(20),
    fontSize: size(24),
  },
});
