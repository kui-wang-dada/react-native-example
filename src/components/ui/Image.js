import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { useTheme } from '@react-navigation/native';
import { size, commonStyle, SCREEN_WIDTH } from '@/utils';
import { Touchable, Icon, Button } from 'ui';
export default (props) => {
  const { colors } = useTheme();
  let [imgHeight, setImgHeight] = useState(0);

  useEffect(() => {
    // Update the document title using the browser API

    Image.getSize(props.source.uri, (width, height) => {
      //width 图片的宽度
      //height 图片的高度
      let myImgHeight = Math.floor((SCREEN_WIDTH / width) * height);
      console.log(width, height, myImgHeight, 'tt');
      setImgHeight(myImgHeight);
    });
  }, []);

  let { source } = props;
  return <Image source={source} resizeMode="cover" style={[props.style, { height: imgHeight }]} />;
};
const style = StyleSheet.create({
  wrap: {},
});
