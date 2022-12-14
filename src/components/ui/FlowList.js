import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, FlatList, RefreshControl, Animated, Text } from 'react-native';
import store from '@/store/store';
import Message from './Message';
import EndTip from './EndTip';
import { isObjEqual } from '@/utils';

const AnimatedFlatList = Animated.createAnimatedComponent(FlatList);

class FlowList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      refreshing: false,
      data: null,
      limit_start: 0,
      noMoreData: false,
      hasLoadData: false,
    };
  }

  static defaultProps = {
    limit_page_length: 10,
    disabledPage: false,
    disabledRefresh: false,

    emptyComponent: <Message preset="no-data" />,
    renderItem: ({ item }) => {
      return (
        <View style={{ height: 50, justifyContent: 'center', alignItems: 'center' }}>
          <Text>没有定义renderItem</Text>
        </View>
      );
    },
  };

  componentDidMount() {
    this._isMounted = true;
    this.handleRefresh();
  }
  componentWillUnmount() {
    this._isMounted = false;
  }

  // componentWillReceiveProps(nextProps) {
  //   console.log(nextProps, this.props.params, 'params');
  //   if (nextProps.request !== this.props.request) {
  //     this.handleRefresh();
  //   }
  //   if (!isObjEqual(nextProps.params, this.props.params)) {
  //     console.log(nextProps);
  //     this.handleRefresh();
  //   }
  //   return false;
  // }
  _parseRes = (res) => {
    if (!res) {
      console.log(124335345, res);
      return [];
    }
    if (Array.isArray(res)) {
      console.log(124335346, res);
      return res;
    }

    if (typeof res === 'object') {
      return res.list;
    }

    console.warn('数据无法识别', res);
  };

  _afterFetchData = (res) => {
    let results = this._parseRes(res);
    let { data } = this.state;
    let { limit_page_length, disabledPage, onFetchedData, frontData } = this.props;
    let { limit_start } = this.state;
    if (limit_start === 0) {
      if (frontData) {
        data = [].concat(frontData, results);
      } else {
        data = results;
      }
    } else {
      data = [...data, ...results];
    }
    limit_start += limit_page_length;
    let noMoreData = disabledPage || results.length < limit_page_length;
    this.isLoading = false;
    this._isMounted &&
      this.setState(
        {
          data,
          refreshing: false,
          limit_start,
          noMoreData,
          hasLoadData: true,
        },
        () => {
          this.finishRefresh();
          onFetchedData && onFetchedData(data, res);
        },
      );
  };
  _fetchData = async () => {
    if (this.isLoading) {
      return;
    }
    this.isLoading = true;
    let { request, limit_page_length, params } = this.props;
    let { data, refreshing, limit_start, noMoreData } = this.state;
    if (!request) {
      this.setState({ refreshing: false });
      this.isLoading = false;
      return;
    }

    if (typeof request === 'function') {
      try {
        let res = await store.dispatch(
          request({
            limit_start,
            limit_page_length,
            ...params,
          }),
        );
        console.log(res, 'resres');
        this._afterFetchData(res);
      } catch (e) {
        console.log('fetch', e);
      }

      return;
    }
    if (Array.isArray(request)) {
      console.log('flowlist123');
      this._afterFetchData(request);
    }
  };
  refreshData = () => {
    this.setState(
      {
        data: null,
      },
      () => {
        this.handleRefresh();
      },
    );
  };
  handleOtherData = (data) => {
    this.setState({ data });
  };
  handleRefresh = () => {
    if (this.isLoading) {
      return;
    }
    let newState = {
      refreshing: true,
      limit_start: 0,
      noMoreData: false,
    };
    this._timetick = new Date();

    this.setState(newState, () => {
      this.startRefresh();
      this._fetchData();
    });
    this.props.onRefresh && this.props.onRefresh();
  };

  handleLoadMore = () => {
    if (this.isLoading) {
      return;
    }

    if (!this.state.noMoreData) {
      this._fetchData();
    }
  };
  keyExtractor = (item, i) => {
    return this._timetick + i;
  };
  setNativeProps(props) {
    this._root.setNativeProps(props);
  }
  finishRefresh = () => {
    this._root && this._root.finishRefresh && this._root.finishRefresh();
  };
  startRefresh = () => {
    this._root && this._root.startRefresh && this._root.startRefresh();
  };
  // onEndReachedThreshold 没有作用，自行根据可见元素的变化加载更多
  handleViewableItemsChanged = (e) => {
    let { viewableItems = [] } = e;
    if (viewableItems.length === 0) {
      return;
    }

    let lastVisibleItem = viewableItems[viewableItems.length - 1];
    // console.log('viewableItems',viewableItems,lastVisibleItem,this.state.data.length)
    if (lastVisibleItem.index + 2 > this.state.data.length) {
      // console.log(34)
      this.handleLoadMore();
    }
  };

  render() {
    let { data, refreshing, extraData } = this.state;
    let { limit_page_length, disabledRefresh, onRefresh, useAnimated, request, onEndReachedThreshold, frontData, ...otherProps } = this.props;

    if (!request && this.props.data) {
      data = this.props.data;
    }

    let FlatListComponent = useAnimated ? AnimatedFlatList : FlatList;
    // let FlatListComponent = useAnimated ? AnimatedFlatList : PullFlatList
    return data ? (
      <FlatListComponent
        {...otherProps}
        onRefresh={this.handleRefresh}
        ref={(e) => (this._root = e)}
        data={data}
        extraData={extraData}
        keyExtractor={this.keyExtractor}
        ListFooterComponent={this.renderListFooterComponent}
        // onEndReached={this.handleLoadMore}
        onViewableItemsChanged={this.handleViewableItemsChanged}
        // onEndReachedThreshold={-0.1}
        refreshing={refreshing}
        refreshControl={this.renderRefreshControl()}
      />
    ) : (
      <EndTip />
    );
  }
  renderRefreshControl = () => {
    if (this.props.disabledRefresh) {
      return null;
    }

    let {
      refreshControlOptions = {
        title: this.state.data ? '下拉加载更多' : '加载中',
      },
    } = this.props;
    let { refreshing } = this.state;

    return <RefreshControl {...refreshControlOptions} refreshing={refreshing} onRefresh={this.handleRefresh} />;
  };
  renderListFooterComponent = () => {
    if (this.props.horizontal) {
      return <View />;
    }
    let { noMoreData, hasLoadData, data } = this.state;
    let { request, emptyComponent } = this.props;
    if (!request || !hasLoadData) {
      return null;
    }
    if (data.length === 0) {
      return emptyComponent;
    }
    if (data.length < 10) {
      return <View />;
    }
    return <EndTip visible={noMoreData} />;
  };
}

export default FlowList;
