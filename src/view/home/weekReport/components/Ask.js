import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useTheme } from '@react-navigation/native';
import { size, commonStyle, SCREEN_WIDTH } from '@/utils';
import { Touchable, Icon, Button, Image } from 'ui';
import { SafeAreaInsetsContext } from 'react-native-safe-area-context';
export default (props) => {
  const { colors } = useTheme();

  let { item } = props;
  let hasData = item.label || item.img || item.con;
  return (
    <View style={[style.askWrap, { backgroundColor: colors.background, borderColor: colors.border }]}>
      <View style={[style.askTitleWrap, { borderBottomColor: colors.border }]}>
        <Icon name="ask" size={25} color={'#fc8300'} />
        <Text style={[style.itemTitle, { color: colors.text }]}>{item.title}</Text>
      </View>

      {item.tips ? <Text style={[style.itemTips, { color: colors.text_tag }]}>({item.tips})</Text> : null}
      {item.label ? (
        <View style={style.itemValue}>
          <Text style={[style.itemValueText, { color: colors.text }]}>{item.label}</Text>
        </View>
      ) : null}

      {item.img ? (
        <View style={style.listHtml} onClick={() => this.handleImg(item.img)}>
          {item.img.map((imgItem) => {
            return <Image source={{ uri: imgItem }} resizeMode="cover" style={[style.img]} />;
          })}
        </View>
      ) : null}

      {item.con && item.con.length ? (
        <View style={[style.listArray, { borderColor: colors.border }]}>
          {item.con.map((item) => {
            return (
              <View style={style.arrWrap}>
                <Text style={[style.arrTitle, { color: colors.text }]}>{item.label}</Text>

                <Text style={[style.arrLabel, { color: colors.text }]}>
                  {item.value}
                  <Text style={[style.arrTip, { color: colors.text_p }]}>{item.valueTip}</Text>
                </Text>
              </View>
            );
          })}
        </View>
      ) : item.nodata ? (
        <View style={style.itemValue}>
          <Text style={[style.nodata, { color: colors.text_p }]}> {item.nodata}</Text>
        </View>
      ) : null}
      {hasData ? null : <View style={style.itemValue} />}
    </View>
  );
};
const style = StyleSheet.create({
  askWrap: {
    flexDirection: 'column',
    marginVertical: size(20),
    paddingVertical: size(10),
    paddingHorizontal: size(20),
    borderWidth: size(1),
  },
  askTitleWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    borderBottomWidth: size(1),
    paddingVertical: size(15),
  },
  itemTitle: {
    fontWeight: 'bold',
    fontSize: size(32),
    marginLeft: size(10),
  },
  itemTips: {
    fontSize: size(24),
    marginTop: size(15),
  },
  itemValue: {
    marginVertical: size(20),
    paddingVertical: size(6),
    paddingHorizontal: size(14),
    minHeight: size(80),
  },
  itemValueText: {
    fontSize: size(30),
    lineHeight: size(40),
  },
  listHtml: {
    marginTop: size(20),
  },
  img: {
    width: '100%',
    height: size(100),
  },
  listArray: {
    borderWidth: size(1),
    width: '100%',
    minHeight: size(80),
    marginTop: size(20),
  },
  arrWrap: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: size(16),
    position: 'relative',
    top: size(20),
  },
  arrTitle: {
    fontSize: size(24),
  },
  arrLabel: {
    fontSize: size(24),
  },
  arrTip: {
    fontSize: size(24),
  },
  nodata: {},
});
