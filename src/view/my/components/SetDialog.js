import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, KeyboardAvoidingView, TextInput } from 'react-native';
import { useTheme } from '@react-navigation/native';
import { size, commonStyle } from '@/utils';
import { Touchable, Icon, Button } from 'ui';
export default (props) => {
  const { colors } = useTheme();
  const [content, setContent] = useState('');
  let { type } = props;

  let keyboardType = type === 'number' ? 'phone-pad' : 'default';
  return (
    <KeyboardAvoidingView style={style.keyboard} enabled behavior="position" keyboardVerticalOffset={300}>
      <View style={[style.wrap, { backgroundColor: colors.background }]}>
        <Text style={[style.title, { color: colors.text }]}>{this.props.title}</Text>

        <TextInput
          onChangeText={(text) => {
            setContent(text);
          }}
          placeholderTextColor={colors.text_tag}
          placeholder={props.placeholder}
          maxLength={300}
          keyboardType={keyboardType}
          //   multiline={true}
          // underlineColorAndroid="transparent"
          style={[
            style.textInputStyle,
            {
              borderBottomColor: colors.border,
              color: colors.text,
            },
          ]}
        />
        <View style={style.btnWrap}>
          <Button title={'取消'} style={[style.cancelWrap, { borderColor: colors.border }]} textStyle={[style.cancel, { color: colors.text_p }]} onPress={props.cancel} />
          <Button title={'确认'} style={style.confirmWrap} textStyle={style.confirm} onPress={() => props.confirm(content)} />
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

const style = StyleSheet.create({
  wrap: {
    width: size(630),
    height: size(380),
    paddingHorizontal: size(40),
    justifyContent: 'space-around',
    alignItems: 'center',
  },

  title: {
    fontSize: size(36),
    color: '#333',
    fontWeight: 'bold',
  },

  textInputStyle: {
    height: size(80),
    width: '100%',
    borderBottomWidth: size(1),
  },
  btnWrap: {
    flexDirection: 'row',
  },
  cancelWrap: {
    borderWidth: size(1),

    borderRadius: size(4),
    width: size(240),
    height: size(70),
    justifyContent: 'center',
    alignItems: 'center',
  },
  cancel: {
    fontSize: size(28),
  },
  confirmWrap: {
    borderRadius: size(4),
    width: size(240),
    height: size(70),
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: size(20),
    backgroundColor: commonStyle.color_theme,
  },
  confirm: {
    fontSize: size(28),
    color: '#fff',
  },
});
