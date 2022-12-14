import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, SafeAreaView, Platform } from 'react-native';
import { useTheme } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { WebView } from 'react-native-webview';
import { commitShowErp } from '@/store/actions';
import { size, commonStyle } from '@/utils';
import { Touchable, Icon, Button, Message, Progress } from 'ui';
export default () => {
  const { colors } = useTheme();
  const dispatch = useDispatch();
  const userInfo = useSelector((state) => state.my.userInfo);
  const deviceId = useSelector((state) => state.search.deviceId);
  const barHeight = useSelector((state) => state.common.barHeight);
  const showErp = useSelector((state) => state.common.showErp);

  const [progress, setProgress] = useState(0);

  let source = {
    uri: `https://erp.wholerengroup.com/desk?sid=${deviceId}`,
    headers: {
      cookie: `system_user=yes;user_id=${userInfo.name};sid=${deviceId}`,
    },
    method: 'GET',
  };
  console.log('source,', source);

  let showStrategy = {
    show: 0,
    hide: '100%',
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
  const hide = () => {
    dispatch(commitShowErp('hide'));
  };
  const close = () => {
    dispatch(commitShowErp('out'));
  };
  return showErp === 'out' ? null : (
    <View
      style={{
        position: 'absolute',
        top: 0,
        bottom: showStrategy[showErp],
        left: 0,
        right: 0,
        backgroundColor: '#4bc694',
      }}>
      <View
        style={{
          // marginTop: size(30),
          height: showErp === 'show' ? size(80) : 0,
          alignItems: 'center',
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginTop: barHeight,
          paddingHorizontal: size(40),
        }}>
        <Button style={{ height: '100%', width: size(150) }} textStyle={{ color: colors.background, fontWeight: 'bold' }} title="??????" onPress={hide} />
        {showErp === 'hide' ? null : (
          <Text
            style={{
              fontSize: 24,
              fontWeight: 'bold',
              color: colors.background,
            }}>
            Erp
          </Text>
        )}
        <Button style={{ height: '100%', width: size(150) }} title="??????" onPress={close} textStyle={{ color: colors.background, fontWeight: 'bold' }} />
      </View>
      <WebView
        style={{ flex: 1 }}
        source={source}
        // onLoadStart={this.handleLoadStart}

        javaScriptEnabled={true}
        onLoadProgress={({ nativeEvent }) => {
          setProgress(nativeEvent.progress);
        }}
        useWebKit={true}
        domStorageEnabled={true}
        renderError={_renderError}
        startInLoadingState={true}
        renderLoading={renderLoading}
        // onLoadEnd={this.handleLoadEnd}
        // onLoad={this.handleLoadEnd}
        // for android: WebView????????????https????????????????????????http?????????
        mixedContentMode={'always'}
        // nativeConfig={{ props: { backgroundColor:colors.pageBg, flex: 1 } }}
      />
    </View>
  );
};
const style = StyleSheet.create({
  indicator: {
    marginTop: size(100),
  },
  loadWrap: {
    position: 'absolute',
    width: size(750),
    top: 0,
    left: 0,
  },
  loadText: {
    fontSize: size(28),
    color: commonStyle.color_blue,
    marginTop: size(40),
    alignSelf: 'center',
  },
});
