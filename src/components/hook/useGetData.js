import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useTheme, useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { commitSessionId, getHomeSp, getHomeTp, getHomeCount, getUserInfo } from '@/store/actions';
import { size } from '@/utils';
import { Touchable, Icon, Button } from 'ui';
export const useGetHomeData = () => {
  const { colors } = useTheme();
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const userInfo = useSelector((state) => state.my.userInfo);

  const getHomeData = async () => {
    let params = {
      limit_start: 0,
      limit_page_length: 10,
    };

    dispatch(getHomeSp(params));
    dispatch(getHomeTp(params));
    dispatch(getHomeCount());
    await dispatch(getUserInfo());
  };
  return getHomeData;
};
