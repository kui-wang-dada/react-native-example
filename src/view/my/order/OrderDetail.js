import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useTheme, useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { getOrderDetail } from '@/store/actions';
import { size, SCREEN_WIDTH } from '@/utils';
import { Touchable, Icon, Button, EndTip } from 'ui';
export default ({ route, navigation }) => {
  const { colors } = useTheme();
  const dispatch = useDispatch();
  const orderDetail = useSelector((state) => state.my.orderDetail);

  let name = route.params.name;

  useEffect(() => {
    dispatch(getOrderDetail({ name }));
  }, []);

  let { id, currency, amount } = orderDetail;

  const renderList = () => {
    let list = [
      {
        label: '支付说明',
        key: 'pay_method_cn',
      },
      {
        label: '交易时间',
        key: 'creation',
      },
      {
        label: '交易单号',
        key: 'pay_id',
      },
    ];

    return (
      <View style={[style.listWrap, { backgroundColor: colors.background }]}>
        {list.map((item, index) => {
          return (
            <View
              key={index}
              style={[style.itemWrap, index === list.length - 1 ? { borderBottomWidth: 0 } : { borderBottomColor: colors.border }]}>
              <Text style={[style.label, { color: colors.text_p }]}>{item.label}</Text>
              <Text style={[style.con, { color: colors.text }]}>{orderDetail[item.key]}</Text>
            </View>
          );
        })}
      </View>
    );
  };

  return orderDetail.name === name ? (
    <ScrollView style={{ backgroundColor: colors.card }}>
      <View style={[style.topWrap, { backgroundColor: colors.background }]}>
        <View
          style={[style.iconWrap, currency === 'USD' ? { backgroundColor: colors.color_blue } : { backgroundColor: colors.color_yellow }]}>
          <Icon name={'fuwu'} size={30} color={'#fff'} />
        </View>
        {/* <Image
            style={style.iconWrap}
            source={
              currency === 'USD'
                ? require('@/assets/images/my/usd.png')
                : require('@/assets/images/my/rmb.png')
            }
          ></Image> */}
        <View style={style.amountWrap}>
          <Text style={[style.amount, { color: colors.text }]}>{amount}</Text>
          <Text style={[style.amountTag, { color: colors.text_p }]}>{currency === 'USD' ? '美金' : '人民币'}</Text>
        </View>
        <Text style={[style.tips, { color: colors.text_p }]}>交易成功</Text>
      </View>
      {renderList()}
      <View style={[style.sep, { backgroundColor: colors.card }]} />
    </ScrollView>
  ) : (
    <EndTip />
  );
};
const style = StyleSheet.create({
  topWrap: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    height: size(400),
  },
  iconWrap: {
    width: size(100),
    height: size(100),
    borderRadius: size(50),
    justifyContent: 'center',
    alignItems: 'center',
  },
  amountWrap: {
    flexDirection: 'row',
    marginTop: size(20),
    alignItems: 'flex-end',
  },
  amount: {
    fontSize: size(56),
    fontWeight: 'bold',
    position: 'relative',
    top: size(6),
  },
  amountTag: {
    position: 'relative',
    top: -size(6),
    fontSize: size(24),
    marginLeft: size(20),
  },
  tips: {
    marginTop: size(20),
    fontSize: size(28),
  },
  sep: {
    width: SCREEN_WIDTH,
    height: size(15),
  },
  listWrap: {
    paddingHorizontal: size(36),
  },
  itemWrap: {
    borderBottomWidth: size(1),
    paddingVertical: size(30),
  },
  label: {
    fontSize: size(28),
  },
  con: {
    fontSize: size(28),
    marginTop: size(20),
  },
  cellWrap: {
    paddingHorizontal: size(38),
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: size(90),
    alignItems: 'center',
  },
});
