import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, SafeAreaView } from 'react-native';
import { useTheme, useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { getContract } from '@/store/actions';
import { size } from '@/utils';
import ContractItem from './components/ContractItem';
import { Touchable, Icon, Button, FlowList } from 'ui';
export default () => {
  const { colors } = useTheme();
  const navigation = useNavigation();

  const renderItem = ({ item, index }) => {
    return (
      <View style={[style.itemWrap, { backgroundColor: colors.sep }]} key={index}>
        <ContractItem data={item} />
      </View>
    );
  };

  let params = { status: 'completed' };
  return (
    <SafeAreaView style={{ backgroundColor: colors.background, flex: 1 }}>
      <FlowList request={getContract} renderItem={renderItem} params={params} style={{ backgroundColor: colors.background }} />
    </SafeAreaView>
  );
};
const style = StyleSheet.create({
  wrap: {},
});
