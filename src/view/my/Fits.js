import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, ScrollView } from 'react-native';
import { transformSize, commonStyle, openReport, size } from '@/utils';
import { Touchable, Icon } from 'ui';
import { SCREEN_WIDTH, checkStaticImg } from '@/utils';
export default class Main extends Component {
  constructor(props) {
    super(props);
  }
  static navigationOptions = ({ navigation, screenProps }) => ({
    title: '在线反馈',
  });
  render() {
    return (
      <ScrollView style={{ flex: 1 }}>
        <Touchable onPress={() => openReport(checkStaticImg('fits.jpeg'))} style={style.wrap}>
          <Image source={{ uri: checkStaticImg('fits.jpeg') }} style={style.img} />
        </Touchable>
      </ScrollView>
    );
  }
  componentDidMount = async () => {};
}
const style = StyleSheet.create({
  wrap: {
    height: size(2300),
    width: SCREEN_WIDTH,
  },
  img: {
    height: size(2300),
    width: SCREEN_WIDTH,
  },
});
