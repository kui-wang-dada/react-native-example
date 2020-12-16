import React, { useState, useEffect } from 'react';
import { StyleSheet, Dimensions, View } from 'react-native';
import { useTheme, useNavigation } from '@react-navigation/native';
import Pdf from 'react-native-pdf';
import { modal } from '@/utils';

export default ({ route }) => {
  const { colors } = useTheme();
  const navigation = useNavigation();
  const loadComplete = (numberOfPages, filePath) => {};
  const pageChange = (page, numberOfPages) => {};
  const onError = (error) => {
    modal.showToast('无效地址');
    navigation.goBack();
  };

  const source = {
    // uri: "http://samples.leanpub.com/thereactnativebook-sample.pdf",
    uri: route.params.url,
    cache: true,
  };
  return (
    <View style={styles.container}>
      <Pdf source={source} onLoadComplete={loadComplete} onPageChanged={pageChange} onError={onError} style={styles.pdf} />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  pdf: {
    flex: 1,
    width: Dimensions.get('window').width,
  },
});
