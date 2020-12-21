import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, TextInput } from 'react-native';
import { useTheme, useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { getAccount, commitUserInfo } from '@/store/actions';

import { size, commonStyle, $api, modal } from '@/utils';
import { Touchable, Icon, Button, FlowList } from 'ui';
import AccountItem from './components/AccountItem';
import { useGetHomeData } from 'hook/useGetData';
export default () => {
  const { colors } = useTheme();
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const userInfo = useSelector((state) => state.my.userInfo);
  const listRef = useRef();
  const getHomeData = useGetHomeData();
  const [searchValue, setSearchValue] = useState('');
  let params = {};

  const searchConfirm = () => {
    let search = searchValue.replace(/(^\s*)|(\s*$)/g, '');

    if (!search) {
      delete params.search;
    } else {
      params.search = search;
    }
    listRef.current.refreshData();
  };
  const goToErpBind = () => {
    navigation.navigate('erpBind');
  };

  const switchStudent = async (item) => {
    let switchParams = { std: item.name };
    modal.showLoading();
    let res = await $api['my/switchAccount'](switchParams);
    modal.close();
    if (res.data.display) {
      await dispatch(commitUserInfo(res.data.display));
      await getHomeData();
      navigation.navigate('首页');
    }
  };
  return (
    <View style={[style.wrap, { backgroundColor: colors.background }]}>
      <View style={style.searchBar}>
        <View style={[style.inputWrap, { backgroundColor: colors.card }]}>
          <Icon name="search" color={colors.text_tag} size={size(40)} style={style.searchIcon} />
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
          <Button icon="close" iconColor={colors.text_tag} iconSize={size(40)} onPress={() => setSearchValue('')} style={style.iconClear} />
        </View>
      </View>

      <FlowList
        ref={listRef}
        style={style.flatlistWrap}
        contentContainerStyle={[style.flatlist]}
        request={getAccount}
        params={params}
        renderItem={({ item, index }) => <AccountItem switchStudent={switchStudent} item={item} keyIndex={index} />}
        keyExtractor={(item, index) => index.toString()}
      />

      <View style={[style.bottomWrap, { backgroundColor: colors.background }]}>
        <Button
          onPress={goToErpBind}
          style={[style.bottom, { backgroundColor: colors.background, borderColor: colors.primary }]}
          textStyle={[style.bottomBtn, { color: colors.primary }]}
          title="添加学生"
          icon="add"
          iconColor={colors.primary}
        />
      </View>
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
  bottomWrap: {
    position: 'absolute',
    paddingVertical: size(30),
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  bottom: {
    width: size(400),
    height: size(60),
    borderWidth: size(1),
    borderRadius: size(8),
  },
  bottomBtn: {
    fontSize: size(28),
    fontWeight: 'bold',
    textAlign: 'center',
    lineHeight: size(60),
  },
});
