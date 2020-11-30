import React, { Component } from 'react';
import { View, Text, StyleSheet, Platform } from 'react-native';
import { connect } from 'react-redux';
import { getAboutData } from '@/store/actions/my';
import lang from '@/assets/lang';
import { commonStyle, size } from '@/utils';
import { Icon } from 'ui';
const mapStateToProps = (state) => {
  return {
    aboutData: state.my.aboutData,
    version: state.common.version,
  };
};

const mapDispatchToProps = {
  getAboutData,
};
class About extends Component {
  constructor(props) {
    super(props);
  }
  static navigationOptions = ({ navigation, screenProps }) => ({
    title: lang.t('common.head.about'),
  });
  render() {
    let { color_theme } = commonStyle;
    return (
      <View style={[style.about, { backgroundColor: commonStyle.colorTheme.pageBg }]}>
        <View style={style.topWrap}>
          <Icon name="about" size={60} color={color_theme} />
          <Text style={[style.title, { color: commonStyle.colorTheme.title }]}>{lang.t('my.about.title')}</Text>
          <Text style={[style.des, { color: commonStyle.colorTheme.label }]}>
            {lang.t('my.about.version')}
            <Text> {this.props.version}</Text>
          </Text>
        </View>
        <View style={style.bottomWrap}>
          <Text style={[style.label, { color: commonStyle.colorTheme.label }]}>{lang.t('my.about.website')}：www.wholeren.com</Text>
          <Text style={[style.label, { color: commonStyle.colorTheme.label }]}>Copyright ©2020 {lang.t('my.about.group')} All Rights Reserved</Text>
        </View>
      </View>
    );
  }
  componentDidMount = async () => {
    // let res = await this.props.getAboutData();
  };
}
const style = StyleSheet.create({
  about: {
    position: 'relative',
    height: '100%',
  },
  topWrap: {
    paddingTop: size(100),
    alignItems: 'center',
  },
  title: {
    marginTop: size(20),
    fontSize: size(32),
    fontWeight: 'bold',
    color: '#333',
  },
  des: {
    marginTop: size(20),
    fontSize: size(28),
    color: '#666',
  },
  bottomWrap: {
    position: 'absolute',
    bottom: size(100),
    left: 0,
    right: 0,
    alignItems: 'center',
  },
  label: {
    fontSize: size(24),
    color: '#999',
  },
});
export default connect(mapStateToProps, mapDispatchToProps)(About);
