import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useTheme } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { size, commonStyle } from '@/utils';
import { Touchable, Icon, Button } from 'ui';
import terms from 'common/wenshu/terms';
export default () => {
  const { colors } = useTheme();
  const dispatch = useDispatch();
  const agreementFlag = useSelector((state) => state.search.agreementFlag);
  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      <ScrollView
        style={style.desWrap}
        contentContainerStyle={{
          paddingBottom: size(80),
          paddingTop: size(40),
        }}>
        <View>
          {terms.content.map((item, index) => {
            return (
              <View key={index}>
                {item.title ? <Text style={[style.titleCon, { color: colors.text }]}>{item.title}</Text> : null}
                {item.label.map((labelItem, labelIndex) => {
                  return (
                    <Text key={labelIndex} style={[style.des, { color: colors.text_p }]}>
                      {labelItem}
                    </Text>
                  );
                })}
              </View>
            );
          })}
        </View>
      </ScrollView>
      {agreementFlag ? (
        <View
          style={{
            height: size(100),
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: size(30),
          }}>
          <Icon name="task-over" size={20} color={colors.color_yellow} />
          <Text style={{ color: colors.title }}>您已同意服务条款说明</Text>
        </View>
      ) : null}
    </View>
  );
};

const style = StyleSheet.create({
  desWrap: {
    paddingHorizontal: size(40),
  },
  des: {
    fontSize: size(24),
    color: '#333',
    marginTop: size(30),
    lineHeight: size(30),
  },

  titleCon: {
    fontSize: size(28),
    fontWeight: 'bold',
    marginTop: size(20),
    color: '#333',
  },
});
