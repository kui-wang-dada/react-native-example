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

  const [activeRole, setActiveRole] = useState(1);

  let roles = ['parent', 'student'];
  const handleChange = (index) => {
    setActiveRole(index);
    props.handleChange && props.handleChange(index);
  };
  return (
    <View style={style.roleWrap}>
      {roles.map((item, index) => {
        return (
          <View style={{ flexDirection: 'row', alignItems: 'center' }} key={index}>
            <Button
              key={index}
              style={style.roleItem}
              onPress={() => handleChange(index)}
              icon={item}
              iconSize={25}
              iconColor={activeRole === index ? colors.primary : '#666'}
              textStyle={[
                style.roleText,
                { color: '#666' },
                activeRole === index && {
                  color: colors.primary,
                },
              ]}
              title={index ? '学生' : '家长'}
            />
          </View>
        );
      })}
    </View>
  );
};
const style = StyleSheet.create({
  roleWrap: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    height: size(100),
  },
  roleItem: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  roleText: {
    fontSize: size(32),
    fontWeight: 'bold',

    marginLeft: size(20),
  },
});
