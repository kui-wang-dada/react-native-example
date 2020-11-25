import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, View, Text, Image } from 'react-native';

import { commonStyle, size, checkStaticImg } from '@/utils';
import { useTheme } from '@react-navigation/native';
import { Button } from 'ui';

export default class Message extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    let config;

    let presets = {
      'request-success': {
        image: checkStaticImg('emptyView/success'),
        content: '成功！',
      },
      'request-failed': {
        image: checkStaticImg('emptyView/failed'),
        content: '失败！',
      },
      'no-favorite': {
        image: checkStaticImg('emptyView/favoriteEmpty'),
        content: '收藏夹为空！',
      },
      'no-search-result': {
        image: checkStaticImg('emptyView/noSearchResult'),
        content: '未搜到您想要的内容！',
      },
      'no-network': {
        image: checkStaticImg('emptyView/noNetwork'),
        content: '没网',
        button: '重新加载',
      },
      'no-data': {
        image: checkStaticImg('emptyView/noData'),
        content: this.props.messageTitle || '暂无数据',
      },
      'no-page': {
        image: checkStaticImg('emptyView/notFound'),
        content: '页面错误！',
      },
      'please-wait': {
        image: checkStaticImg('emptyView/wait'),
        title: '正在搭建，敬请期待！',
        button: '知道了',
      },
    };

    if (this.props.preset) {
      config = presets[this.props.preset];

      if (!config) {
        throw new Error(`Cannot find a preset named "${this.props.preset}".`);
      }
    } else {
      config = {
        image: this.props.image,
        title: this.props.title,
        content: this.props.content,
        button: this.props.button,
      };
    }

    const image = config.image ? <Image source={{ uri: config.image }} style={s.image} /> : null;
    const title = config.title ? <Text style={[s.title, { color: commonStyle.colorTheme.title }]}>{config.title}</Text> : null;
    const textColor = this.props.textColor ? this.props.textColor : commonStyle.colorTheme.title;
    const content = config.content ? <Text style={[s.content, { color: textColor }]}>{config.content}</Text> : null;
    const btn = config.button ? <Button style={[s.btnWrap]} textStyle={s.btn} title={config.button} onPress={this.props.clickButton} /> : null;

    return (
      <View style={[s.main].concat([this.props.style])}>
        {image}
        {title}
        {content}
        {btn}
      </View>
    );
  }

  static defaultProps = {
    style: {
      paddingVertical: size(50),
    },
  };
}

// eslint-disable-next-line no-undef
propTypes = {
  style: PropTypes.style,
  preset: PropTypes.string,
  image: PropTypes.number,
  title: PropTypes.string,
  content: PropTypes.string,
  button: PropTypes.string,
  clickButton: PropTypes.func,
  textColor: PropTypes.string,
};

const s = StyleSheet.create({
  main: {
    alignItems: 'center',
    // backgroundColor: "#fff",
    paddingHorizontal: size(40),
  },
  image: {
    marginBottom: size(30),
  },
  title: {
    fontSize: size(36),
    color: '#333',
    marginBottom: size(30),
  },
  content: {
    fontSize: size(30),
    color: '#666',
  },

  btnWrap: {
    marginTop: size(30),
    paddingVertical: size(24),
    paddingHorizontal: size(40),
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FCFCFC',
    borderRadius: size(4),
    borderWidth: size(1),
    borderColor: '#ccc',
  },
  btn: {
    fontSize: size(32),
    color: '#333',
  },
});
