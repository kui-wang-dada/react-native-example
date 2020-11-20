import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput } from 'react-native';
import { useTheme } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { getAccount } from '@/store/actions';
import { size, commonStyle } from '@/utils';
import { Touchable, Icon, Button, FlowList } from 'ui';
import AccountItem from './components/AccountItem';
export default () => {
  const { colors } = useTheme();
  const dispatch = useDispatch();
  const userInfo = useSelector((state) => state.my.userInfo);
  const [searchValue, setSearchValue] = useState('');

  const searchConfirm = () => {};
  return (
    <View style={[style.wrap, { backgroundColor: colors.background }]}>
      <View style={style.searchBar}>
        <View style={[style.inputWrap, { backgroundColor: colors.card }]}>
          <Icon name="back" color={colors.text_tag} size={size(40)} style={style.searchIcon} />
          <TextInput
            placeholderTextColor={colors.text_tag}
            placeholder={'搜索学生姓名或学号'}
            style={{
              flex: 1,
              height: '100%',
              color: colors.text,
            }}
            onChangeText={(text) => {
              setSearchValue(text);
            }}
            value={searchValue}
            returnKeyType="search"
            onSubmitEditing={searchConfirm}
          />
          <Button icon="back" iconColor={colors.text_tag} iconSize={size(40)} onPress={() => setSearchValue('')} style={style.iconClear} />
        </View>
      </View>

      <FlowList
        style={style.flatlistWrap}
        contentContainerStyle={[style.flatlist]}
        request={getAccount}
        renderItem={({ item, index }) => <AccountItem item={item} keyIndex={index} />}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
};
const style = StyleSheet.create({
  wrap: {
    flex: 1,
  },
  flatlistWrap: {
    flex: 1,
    paddingHorizontal: size(32),
    paddingBottom: size(200),
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: size(40),
    paddingHorizontal: size(32),
  },
  inputWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    position: 'relative',

    height: size(70),
    borderRadius: size(35),
    flex: 1,
  },
  searchIcon: {
    marginHorizontal: size(30),
  },
  iconClear: {
    position: 'absolute',
    right: size(30),
    top: size(15),
  },
});
