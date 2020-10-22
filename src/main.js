import React, { Component } from 'react'

import store, { StoreProvider } from './store/store'
import { SafeAreaView, View } from 'react-native'
// import { modal, ymodal, commonStyle } from '@/utils'
// import { WModal, YModal } from 'ui'
// import Root from './Root'



export default class Main extends Component {
  constructor(props) {
    super(props)
  }
  render() {
    return (
      <StoreProvider store={store}>
        {/* <WModal ref={(ref) => modal.setInstance(ref)} />
        <YModal ref={(ref) => ymodal.setInstance(ref)}></YModal> */}

        {/* <Root></Root> */}
        <Text>HAHA </Text>

     
      </StoreProvider>
    )
  }
  componentDidMount = () => {
  
  }


 
}
