import React, {useState, useEffect, useCallback} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {useTheme} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {getTpRecord} from '@/store/actions';
import {RecordItem} from 'common';
import {size, commonStyle} from '@/utils';
import {Touchable, Icon, Button, FlowList} from 'ui';
export default (props) => {
  const {colors} = useTheme();
  const dispatch = useDispatch();
  const tpDetail = useSelector((state) => state.home.tpDetail);
  console.log('props', props);
  let name = props.name;

  let params = {
    tutoring_plan: name,
  };
  const getData = async (myParams) => {
    return await dispatch(getTpRecord(myParams));
  };
  getData();
  return (
    <View style={[style.wrap, {backgroundColor: colors.card}]}>
      <FlowList
        style={style.flatlistWrap}
        contentContainerStyle={style.flatlist}
        request={getData}
        params={params}
        renderItem={({item}) => (
          <View>
            <RecordItem item={item} />
          </View>
        )}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
};
const style = StyleSheet.create({
  wrap: {
    flex: 1,
  },
});
