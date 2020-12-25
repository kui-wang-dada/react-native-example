import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useTheme } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { WebView } from 'react-native-webview';
import { size, commonStyle } from '@/utils';
import { Touchable, Icon, Button } from 'ui';
export default ({ route, navigation }) => {
  const { colors } = useTheme();
  const dispatch = useDispatch();
  const userInfo = useSelector((state) => state.my.userInfo);
  const sessionId = useSelector((state) => state.search.sessionId);
  let { url } = route.params;

  useEffect(() => {
    navigation.setOptions({ title: 'Updated!' });
  }, []);

  let source = {
    uri: url,
    headers: {
      cookie: `system_user=yes;user_id=${userInfo.name};sid=${sessionId}`,
    },
  };
  console.log('source,', source);

  return (
    <View style={style.wrap}>
      <WebView
        style={{ flex: 1 }}
        source={source}
        // onLoadStart={this.handleLoadStart}
        // onNavigationStateChange={this.handleNavigationStateChange}
        // ref={(ref) => {
        //   this._webView = ref;
        // }}
        javaScriptEnabled={true}
        // onLoadProgress={({nativeEvent}) => {
        //   this.setState({
        //     progress: nativeEvent.progress,
        //   });
        // }}
        allowUniversalAccessFromFileURLs
        allowFileAccess
        useWebKit={true}
        domStorageEnabled={true}
        // onMessage={this.handleMessage}
        // renderError={this._renderError}
        startInLoadingState={true}
        // renderLoading={this.renderLoading}
        // onLoadEnd={this.handleLoadEnd}
        // onLoad={this.handleLoadEnd}
        // for android: WebView应该允许https页面中加载非安全http的内容
        mixedContentMode={'always'}
        // nativeConfig={{ props: { backgroundColor: commonStyle.colorTheme.pageBg, flex: 1 } }}
      />
    </View>
  );
};
const style = StyleSheet.create({
  wrap: {
    flex: 1,
  },
});
