import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, SafeAreaView } from 'react-native';
import { useTheme, useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { getOrder } from '@/store/actions';
import { size } from '@/utils';
import { Touchable, Icon, Button, FlowList } from 'ui';
export default () => {
  const { colors } = useTheme();
  const navigation = useNavigation();

  const goToDetail = (id) => {
    navigation.navigate('orderDetail', { id });
  };

  const renderItem = ({ item, index }) => {
    let { amount, creation, currency, pay_method_cn, pay_method_en, id } = item;
    return (
      <Touchable key={index} style={[style.itemWrap, { borderBottomColor: colors.border }]} onPress={() => goToDetail(id)}>
        <View style={style.left}>
          <View
            style={[
              style.iconWrap,
              currency === 'USD' ? { backgroundColor: colors.color_blue } : { backgroundColor: colors.color_yellow },
            ]}>
            <Icon name={'fuwu'} size={25} color={'#fff'} />
          </View>

          <View style={style.conWrap}>
            <Text numberOfLines={1} style={[style.conTitle, { color: colors.text }]}>
              {pay_method_cn}
            </Text>
            <Text style={[style.conTime, { color: colors.text_p }]}>{creation && creation.split('.')[0]}</Text>
          </View>
        </View>
        <View style={style.right}>
          <Text style={[style.amount, { color: colors.color_blue }]}>{amount}</Text>
          <Text style={[style.currency, { color: colors.text_p }]}>{currency === 'USD' ? '美金' : '人民币'}</Text>
        </View>
      </Touchable>
    );
  };

  return (
    <SafeAreaView style={{ backgroundColor: colors.background, flex: 1 }}>
      <FlowList
        renderItem={renderItem}
        request={getOrder}
        contentContainerStyle={[style.flowlist, { backgroundColor: colors.background }]}
      />
    </SafeAreaView>
  );
};
const style = StyleSheet.create({
  flowlist: {
    paddingHorizontal: size(36),
  },
  itemWrap: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: size(30),
    borderBottomWidth: size(1),
  },
  left: {
    flexDirection: 'row',
    flex: 1,
    marginRight: size(30),
  },
  iconWrap: {
    width: size(70),
    height: size(70),
    borderRadius: size(35),
    justifyContent: 'center',
    alignItems: 'center',
  },
  conWrap: {
    flex: 1,
    justifyContent: 'space-evenly',
    marginLeft: size(30),
  },
  conTitle: {
    fontSize: size(28),
  },
  conTime: {
    fontSize: size(24),
    marginTop: size(20),
  },
  right: {
    alignItems: 'flex-end',
  },
  amount: {
    fontSize: size(32),
    fontWeight: 'bold',
  },
  currency: {
    fontSize: size(24),
    marginTop: size(20),
  },
});
