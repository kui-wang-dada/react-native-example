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

  const [activeRole, setActiveRole] = useState(0);

  let roles = ['student', 'parent'];
  return (
    <View style={style.roleWrap}>
      {roles.map((item, index) => {
        return (
          <View style={{ flexDirection: 'row', alignItems: 'center' }} key={index}>
            <Button
              key={index}
              style={style.roleItem}
              onPress={() => setActiveRole(index + 1)}
              icon={item}
              iconSize={25}
              iconColor={activeRole === index + 1 ? colors.primary : colors.text_p}
              textStyle={[
                style.roleText,
                { color: colors.text_p },
                activeRole === index + 1 && {
                  color: colors.primary,
                },
              ]}
              title={index ? '家长' : '学生'}
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
