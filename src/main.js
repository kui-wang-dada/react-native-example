import React, {Component} from 'react';

import store, {StoreProvider} from './store/store';
import {SafeAreaView, View, Text} from 'react-native';
import {modal, commonStyle} from '@/utils';
import {WModal} from 'ui';
import Root from './root';

export default class Main extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    console.log(432);
    return (
      <StoreProvider store={store}>
        <WModal ref={(ref) => modal.setInstance(ref)} />
        {/* <YModal ref={(ref) => ymodal.setInstance(ref)} /> */}

        <Root />
      </StoreProvider>
    );
  }
  componentDidMount = () => {};
}
