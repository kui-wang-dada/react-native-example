import React, {Component} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {size, commonStyle} from '@/utils';
import {Touchable, Icon} from 'ui';
export default class Main extends Component {
  constructor(props) {
    super(props);
  }
  static navigationOptions = ({navigation, screenProps}) => ({
    title: '在线反馈',
  });
  render() {
    return (
      <View style={style.wrap}>
        <Text>123</Text>
      </View>
    );
  }
  componentDidMount = async () => {};
}
const style = StyleSheet.create({
  wrap: {},
});
