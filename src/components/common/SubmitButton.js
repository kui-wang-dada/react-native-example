import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { useTheme } from '@react-navigation/native';
import { size, commonStyle, modal } from '@/utils';
import { Touchable, Icon, Button } from 'ui';
export default () => {
  const { colors } = useTheme();
  const [loading, setLoading] = useState(false);

  const submit = async () => {
    this.setState({ loading: true });
    let res = await this.props.submit();
    setLoading(false);
    if (res) {
      modal.showToast(res.status.message);
    }
  };
  return (
    <Touchable style={[style.btnWrap, { backgroundColor: colors.primary }]} onPress={submit}>
      {loading ? <ActivityIndicator style={style.indicator} animating={true} size="small" color="#fff" /> : null}
      <Text style={style.btn}>提交</Text>
    </Touchable>
  );
};

const style = StyleSheet.create({
  btnWrap: {
    marginTop: size(20),

    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: size(6),
    width: size(300),
    height: size(60),
  },
  indicator: {
    marginRight: size(10),
  },
  btn: {
    color: '#fff',
    fontSize: size(28),
    fontWeight: 'bold',
  },
});
