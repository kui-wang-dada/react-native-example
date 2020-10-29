import React, {useState, useEffect, useCallback} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {useTheme} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {getHomeAuthor} from '@/store/actions';
import {AuthorItem} from 'common';
import {size, commonStyle, checkStaticImg} from '@/utils';
import {Touchable, Icon, Button, FlowList} from 'ui';
export default (props) => {
  const {colors} = useTheme();

  console.log('props', props);
  let name = props.name;

  let xueshuge = [
    {
      description:
        '美国拨打：+1 (412) 756-3137 \n中国拨打：+86 (010) 5387-5758',
      pen_name: '厚仁学术哥',
      myAvatar: checkStaticImg('xueshu1.png'),
    },
  ];

  return (
    <View style={[style.wrap, {backgroundColor: colors.card}]}>
      <FlowList
        style={style.flatlistWrap}
        contentContainerStyle={style.flatlist}
        request={getHomeAuthor}
        frontData={xueshuge}
        renderItem={({item}) => (
          <View
            style={[
              style.authorItem,
              {
                borderColor: colors.border,
                backgroundColor: colors.background,
              },
            ]}>
            <AuthorItem item={item} />
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
  flatlistWrap: {
    flex: 1,
    paddingHorizontal: size(32),
    paddingTop: size(32),
    paddingBottom: size(200),
  },
  authorItem: {
    marginBottom: size(30),
    borderWidth: size(1),
    paddingHorizontal: size(32),
    paddingVertical: size(20),
    borderRadius: size(20),
  },
});
