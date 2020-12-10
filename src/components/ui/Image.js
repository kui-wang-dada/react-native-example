import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { useTheme } from '@react-navigation/native';
import { size, commonStyle, SCREEN_WIDTH } from '@/utils';
import { Touchable, Icon, Button } from 'ui';
export default (props) => {
  const { colors } = useTheme();
  let [imgHeight, setImgHeight] = useState(0);
  console.log(props, 'authorDetail');
  useEffect(() => {
    // Update the document title using the browser API
    if (!props.source.uri) {
      return;
    }
    console.log(props.source.uri, 'tttt');
    Image.getSize(
      props.source.uri,
      (width, height) => {
        //width 图片的宽度
        //height 图片的高度
        console.log(width, height, 'ttttt');
        let myImgHeight = Math.floor((SCREEN_WIDTH / width) * height);
        console.log(width, height, myImgHeight, 'ttttt');
        if (props.style && props.style.height) {
          setImgHeight(props.style.height);
        } else {
          setImgHeight(myImgHeight);
        }
      },
      (e) => {
        console.log(e, 'tttt');
      },
    );
  }, []);

  let { source } = props;
  return <Image source={source} resizeMode="cover" style={[props.style, { height: imgHeight }]} />;
};
const style = StyleSheet.create({
  wrap: {},
});
