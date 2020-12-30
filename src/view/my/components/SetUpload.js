import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useTheme } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
// import ImagePicker from 'react-native-image-crop-picker';
import { size, checkImg, modal, commonStyle, $api, checkStaticImg } from '@/utils';
import { Icon, Touchable, Image, Loading } from 'ui';
export default (props) => {
  const { colors } = useTheme();
  const dispatch = useDispatch();
  const userInfo = useSelector((state) => state.my.userInfo);
  const chooseImg = () => {
    // ImagePicker.openPicker({
    //   includeBase64: true,
    // }).then((image) => {
    //   let fileData = 'data:image/jpeg;base64,' + image.data;
    //   let fileName = image.filename || image.modificationDate;
    //   this.uploadImg(fileData, fileName);
    // });
  };
  const uploadImg = async (fileData, fileName) => {
    let params = {
      doctype: 'User',
      docname: this.props.userInfo.email,
      is_private: 1,
      from_form: 1,
      filedata: fileData,
      filename: fileName,
    };
    modal.show(<Loading />, 'loading');
    let res = await $api['user/updateImage'](params);
    if (res.data.display) {
      this._updateUserInfo(res.data.display.file_url);
    }
  };
  const _updateUserInfo = async (mes) => {
    let params = {};
    params[this.props.data.key] = mes;
    let res = await $api['user/updateInfo'](params, {
      url: `resource/User/${this.props.userInfo.email}`,
    });
    if (res.data.display) {
      await this.props.getUserInfo();
      modal.showToast(res.status.message);
    } else {
      modal.showToast('更新失败');
    }
  };

  let { data } = props;
  return (
    <View style={{ backgroundColor: colors.background }}>
      <Touchable
        style={[
          style.content,
          data.border
            ? null
            : {
                borderBottomWidth: size(1),
                borderBottomColor: colors.border,
              },
        ]}
        onPress={() => {
          this.chooseImg();
        }}>
        <Text style={[style.label, { color: colors.text }]}>{data.label}</Text>
        <View style={[style.value, { color: colors.text }]}>
          <Image defaultSource={{ uri: checkStaticImg('avatar.png') }} source={{ uri: checkImg(userInfo[data.key]) }} style={style.img} />
        </View>

        <Icon name="right" size={size(30)} color={colors.primary} style={style.icon} />
      </Touchable>

      {data.border ? <View style={[style.border, { backgroundColor: colors.border }]} /> : null}
    </View>
  );
};

const style = StyleSheet.create({
  content: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: size(40),
    alignItems: 'center',
    height: size(150),
  },

  label: { color: '#333', fontSize: size(28) },
  value: { flex: 1, flexDirection: 'row', justifyContent: 'flex-end' },
  img: {
    width: size(100),
    height: size(100),
    borderRadius: size(50),
  },
  icon: { marginLeft: size(10) },
  border: {
    width: '100%',
    height: size(10),
  },
});
