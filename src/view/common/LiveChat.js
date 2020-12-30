import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useTheme, useNavigation } from '@react-navigation/native';
import WebView from 'react-native-webview';
import { AuthWebView } from '@livechat/customer-auth';
import { init } from '@livechat/customer-sdk';
import { useDispatch, useSelector } from 'react-redux';
import { size, checkImg } from '@/utils';
import { Touchable, Icon, Button, Progress, Message } from 'ui';
export default ({ route }) => {
  const { colors } = useTheme();
  const navigation = useNavigation();
  const userInfo = useSelector((state) => state.my.userInfo);
  const [progress, setProgress] = useState(0);

  let { title } = route.params;

  useEffect(() => {
    // LC_API.open_chat_window()
    if (title) {
      initData();
    }
  }, []);

  const initData = async () => {
    let text = '';
    if (userInfo && userInfo.name) {
      let role = userInfo.roles.includes('Parent') ? '家长' : userInfo.roles.includes('Students') ? '学生' : '老师或者其他';
      text += `（${userInfo.username},${role},${userInfo.email}）`;
    }
    text += ` 在App浏览：${title}`;

    const customerSDK = init({
      licenseId: 9055235,
      clientId: '593d4e1deede71888e49d81f03ef4d61',
      redirectUri: 'https://erp.wholerengroup.com',
    });

    console.log('custormerDSK', customerSDK);
    let a = await customerSDK.auth.getToken();
    console.log('token', a);

    customerSDK.on('connected', (payload) => {
      console.log('connected', payload);

      customerSDK
        .listChats({})
        .then(({ chatsSummary, totalChats }) => {
          console.log(chatsSummary, totalChats);
          let chatRoom = chatsSummary[0];
          let chatId = chatRoom && chatRoom.id;
          customerSDK
            .sendEvent({
              chatId,
              event: {
                type: 'message',
                text: text,
              },
            })
            .then((response) => {
              console.log(response);
            })
            .catch((error) => {
              console.log(error);
            });

          // customerSDK.sendFile(chatId, {
          //   file: {
          //     uri: checkImg(data.cover_image),
          //     type: 'image/jpeg', // optional
          //     name: 'photo.jpg', // optional
          //   },
          // });
        })
        .catch((error) => {
          console.log(error);
        });
    });
  };
  const renderLoading = () => {
    let percent = Math.round(progress * 100);

    return (
      <View style={style.loadWrap}>
        <Progress percent={percent} height={5} />
      </View>
    );
  };
  const _renderError = () => {
    return (
      <View style={{ flex: 1 }}>
        <Message preset="no-page" />;
      </View>
    );
  };
  return (
    <View style={{ flex: 1 }}>
      <WebView
        source={{ uri: 'https://lc.chat/now/9055235/1' }}
        onLoadProgress={({ nativeEvent }) => {
          setProgress(nativeEvent.progress);
        }}
        style={{ flex: 1 }}
        startInLoadingState={true}
        renderLoading={renderLoading}
        renderError={_renderError}
        useWebKit={true}
      />
      <AuthWebView style={{ height: 0 }} />
    </View>
  );
};
const style = StyleSheet.create({
  loadWrap: {
    position: 'absolute',
    width: size(750),
    top: 0,
    left: 0,
  },
});
