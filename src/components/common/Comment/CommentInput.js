import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Keyboard, KeyboardAvoidingView, TextInput, Platform } from 'react-native';
import { useTheme } from '@react-navigation/native';
import { size, commonStyle, $api, ymodal, modal, SCREEN_HEIGHT } from '@/utils';
import { Touchable, Icon, Button } from 'ui';
import { SubmitButton } from 'common';

export default (props) => {
  const { colors } = useTheme();

  const [inputValue, setInputValue] = useState('');

  const submit = async () => {
    Keyboard.dismiss();

    let params, url;

    if (props.type === 'comment') {
      url = 'home/comment';
      params = {
        reference_doctype: props.from,
        reference_name: props.data.name,
        detail: inputValue,
      };
    } else {
      url = 'home/reply';
      params = {
        name: props.replyData.name,
        to: props.replyData.to,
        content: inputValue,
      };
    }

    try {
      let res = await $api[url](params);

      ymodal.close();
      if (res.status.code === 200) {
        props.afterSubmit && (await props.afterSubmit());
        modal.showToast(res.status.message);
      } else {
        modal.showToast(res.status.message);
      }
    } catch (err) {
      ymodal.close();

      modal.showToast(err.message);
    }
  };
  let keyboardOffset = Platform.select({
    ios: 0.7 * SCREEN_HEIGHT,
    android: 0,
  });
  return (
    <KeyboardAvoidingView enabled behavior="position" keyboardVerticalOffset={keyboardOffset}>
      <Touchable type="withoutFeedback" onPress={() => Keyboard.dismiss()} style={{ backgroundColor: colors.background }}>
        <View style={[style.wrap, { backgroundColor: colors.background }]}>
          <View style={style.uploadWrap}>
            <View style={style.titleWrap}>
              <Text style={[style.title, { color: colors.text }]}>评论</Text>
            </View>
            <TextInput
              style={[
                style.input,
                {
                  color: colors.text,
                  backgroundColor: colors.card,
                  borderColor: colors.border,
                },
              ]}
              underlineColorAndroid="transparent"
              multiline
              placeholder={props.inputPlaceholder}
              placeholderTextColor={colors.text_tag}
              onChangeText={(text) => {
                setInputValue(text);
              }}
              value={inputValue}
            />
          </View>
          <View style={style.submit}>
            {inputValue ? (
              <SubmitButton submit={submit} />
            ) : (
              <View style={[style.btnWrap, { backgroundColor: colors.card }]}>
                <Text style={[style.btn, { color: colors.text_tag }]}>提交</Text>
              </View>
            )}
          </View>
        </View>
      </Touchable>
    </KeyboardAvoidingView>
  );
};
const style = StyleSheet.create({
  wrap: {
    padding: size(30),

    // width: '70%',
    borderRadius: size(8),
  },
  label2Wrap: {},
  starWrap: {
    paddingHorizontal: size(60),

    marginLeft: size(60),
  },
  label: {
    fontSize: size(28),

    color: '#333',
  },
  uploadWrap: {
    position: 'relative',
  },
  titleWrap: {
    paddingVertical: size(20),
  },
  title: {
    fontSize: size(32),
    fontWeight: 'bold',
    color: '#333',
  },
  input: {
    padding: size(40),
    paddingTop: size(20),
    marginVertical: size(10),
    height: size(150),

    borderWidth: size(1),

    // position: "absolute",
    // bottom: 0
  },
  submit: {
    marginTop: size(40),
    marginBottom: size(60),
    alignItems: 'center',
  },

  btn: {
    fontSize: size(28),
    fontWeight: 'bold',
    color: '#999',
  },
  btnWrap: {
    marginTop: size(20),
    backgroundColor: '#f1f1f1',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: size(6),
    width: size(300),
    height: size(60),
  },
});
