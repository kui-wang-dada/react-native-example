import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { useTheme, useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { size, modal, openReport, checkStaticImg } from '@/utils';
import { Touchable, Icon, Button } from 'ui';
export default (props) => {
  const { colors } = useTheme();
  const navigation = useNavigation();

  const openContract = () => {
    let { data } = props;
    if (!data.contract_file_url) {
      modal.showToast('无效合同地址');
      return;
    }

    openReport(data.contract_file_url, navigation);
  };

  let { data } = props;

  let fileFormat = checkStaticImg('pdf.png');
  if (data.contract_file_url) {
    fileFormat = data.contract_file_url.includes('.pdf') ? checkStaticImg('pdf.png') : data.contract_file_url;
  }
  return (
    <View
      style={[
        style.itemWrap,
        {
          backgroundColor: colors.background,
          borderBottomColor: colors.border,
        },
      ]}>
      <Touchable style={[style.topWrap, { borderBottomColor: colors.border }]} onPress={openContract}>
        <Image style={style.image} source={fileFormat} />
        <View style={style.conWrap}>
          <Text style={[style.title, { color: colors.text }]} numberOfLines={2}>
            {data.title}
          </Text>
          <View style={style.labelWrap}>
            <Text style={[style.label, { color: colors.text_P }]}>{data.creation && data.creation.split('.')[0]}</Text>
          </View>
        </View>
      </Touchable>
    </View>
  );
};
const style = StyleSheet.create({
  itemWrap: {
    paddingHorizontal: size(40),
  },
  topWrap: {
    borderBottomWidth: size(1),
    borderBottomColor: '#ccc',
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: size(40),
  },
  image: {
    width: size(120),
    height: size(144),
    resizeMode: 'cover',
    marginLeft: size(10),
  },
  conWrap: {
    flex: 1,
    marginLeft: size(60),
  },
  title: {
    fontSize: size(32),
    lineHeight: size(40),
    fontWeight: 'bold',
  },
  labelWrap: {
    marginTop: size(15),
  },
  label: {
    fontSize: size(24),

    marginTop: size(6),
  },
});
