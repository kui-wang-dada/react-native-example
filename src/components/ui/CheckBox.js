import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useTheme, useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import CheckBox from '@react-native-community/checkbox';
import { size } from '@/utils';
import { Touchable, Icon, Button } from 'ui';
export default (props) => {
  const { colors } = useTheme();
  const navigation = useNavigation();
  const [value1, setValue1] = useState(false);
  const [value2, setValue2] = useState(false);

  const handleValue1 = (newV) => {
    if (newV) {
      setValue2(false);
      setValue1(true);
    } else {
      setValue1(false);
    }
    props.handleChange && props.handleChange(1);
  };
  const handleValue2 = (newV) => {
    if (newV) {
      setValue1(false);
      setValue2(true);
    } else {
      setValue2(false);
    }
    props.handleChange && props.handleChange(2);
  };

  return (
    <View style={style.checkBoxWrap}>
      <View style={style.parentWrap}>
        <CheckBox
          tintColors={colors.primary}
          onCheckColor={colors.primary}
          onTintColor={colors.primary}
          style={style.checkBox}
          disabled={false}
          value={value1}
          onValueChange={handleValue1}
        />
        <Text style={[style.parentText, { color: colors.text }]}>家长</Text>
      </View>
      <View style={style.studentWrap}>
        <CheckBox
          tintColors={colors.primary}
          onCheckColor={colors.primary}
          onTintColor={colors.primary}
          style={style.checkBox}
          disabled={false}
          value={value2}
          onValueChange={handleValue2}
        />
        <Text style={[style.studentText, { color: colors.text }]}>学生</Text>
      </View>
    </View>
  );
};
const style = StyleSheet.create({
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
});
