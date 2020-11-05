import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useTheme } from '@react-navigation/native';
import HTMLView from 'react-native-htmlview';
import { size, commonStyle } from '@/utils';
import { Touchable, Icon, Button } from 'ui';
export default (props) => {
  const { colors } = useTheme();

  const [list, setList] = useState([]);
  const [showAll, setShowAll] = useState(true);

  useEffect(() => {
    let labelConfig = [
      {
        key: ['Open'],
        icon: 'task-wait',
        color: '#e69a40',
        tag: (
          <View style={[style.tagWrap, { backgroundColor: '#F6EFE6' }]}>
            <Text style={{ color: '#E6A53D' }}>待开启</Text>
          </View>
        ),
      },
      {
        key: ['Working'],
        icon: 'task-doing',
        color: '#6ca5e4',
        tag: (
          <View style={[style.tagWrap, { backgroundColor: '#E9F0F8' }]}>
            <Text style={{ color: '#7CAFEA' }}>服务中</Text>
          </View>
        ),
      },
      {
        key: ['Closed'],
        icon: 'task-over',
        color: '#4bc694',
        tag: (
          <View style={[style.tagWrap, { backgroundColor: '#E4F7EF' }]}>
            <Text style={{ color: '#4BC69A' }}>已完成</Text>
          </View>
        ),
      },
      {
        key: ['Cancelled'],
        icon: 'task-wait',
        color: '#d83f42',
        tag: (
          <View style={[style.tagWrap, { backgroundColor: '#F2F2F2' }]}>
            <Text style={{ color: '#AAAAAA' }}>已取消</Text>
          </View>
        ),
      },
    ];
    let items = props.list.map((item) => {
      let labCon = labelConfig.filter((lab) => {
        return lab.key.includes(item.status);
      });
      console.log(labCon, 'la');
      return {
        title: item.title,
        content: item.description,
        startDate: item.start_date || '--',
        endDate: item.end_date || '--',
        showDate: item.start_date || item.end_date,
        icon: labCon[0].icon,
        color: labCon[0].color,
        tag: labCon[0].tag,
        showCon: true,
      };
    });
    setList(items);
  }, []);

  const clickItem = (item, index) => {
    list[index].showCon = !list[index].showCon;
    setList({ list });
  };
  const toggleAllTask = () => {
    let flag = !showAll;
    let newList = list.map((item) => {
      return {
        ...item,
        showCon: flag,
      };
    });
    setList(newList);
    setShowAll(flag);
  };
  return (
    <View style={style.tab2Wrap}>
      <ScrollView>
        <View style={style.mainWrap}>
          {list.map((item, index) => {
            let { showCon } = item;
            return (
              <View style={style.timeItem}>
                <View style={style.tail} />
                <View style={style.icon}>
                  <Icon name={item.icon} size={16} color={item.color} />
                </View>
                <View
                  style={style.content}
                  onClick={() => {
                    this.clickItem(item, index);
                  }}>
                  <View style={[style.titleWrap, showCon ? style.active : null]}>
                    <View style={style.title}>
                      <Text style={style.titleText}>{item.title}</Text>
                      <View style={style.iconRight}>{showCon ? <Icon name="down" size={16} color={'#4bc694'} /> : <Icon name="up" size={16} color={'#666'} />}</View>
                    </View>
                    {item.showDate ? (
                      <Text style={style.date}>
                        {item.startDate} 至 {item.endDate}
                      </Text>
                    ) : null}
                  </View>

                  {showCon ? (
                    <View style={style.labelWrap}>
                      <HTMLView value={`<p>${item.content}</p>`} stylesheet={styleHtml} paragraphBreak="" addLineBreaks={true} />

                      {item.tag}
                    </View>
                  ) : null}
                </View>
              </View>
            );
          })}
        </View>
      </ScrollView>

      <Button
        style={[style.btnFix, { backgroundColor: colors.color_blue }]}
        title={showAll ? '全部收起' : '全部展开'}
        textStyle={style.btn}
        onPress={() => toggleAllTask()}
      />
    </View>
  );
};
const styleHtml = StyleSheet.create({
  p: {
    lineHeight: size(40),
    fontSize: size(28),
    color: '#666',
  },
});
const style = StyleSheet.create({
  tab2Wrap: {
    position: 'relative',
    flex: 1,
  },
  mainWrap: {
    paddingVertical: size(40),
    paddingHorizontal: size(32),
  },
  timeItem: {
    position: 'relative',
    paddingBottom: size(20),
  },
  tail: {
    position: 'absolute',
    top: size(12),
    bottom: -size(12),
    left: size(16),
    borderLeftWidth: size(2),
    borderLeftColor: '#e2ecf4',
  },
  icon: {
    position: 'absolute',
    left: 0,
    top: size(12),
    width: size(32),
    height: size(32),
    textAlign: 'center',
    borderRadius: size(16),
    backgroundColor: '#fff',

    zIndex: 1,
  },
  content: {
    marginLeft: size(50),
    minHeight: size(56),
    color: '#333',
    fontSize: size(28),
    lineHeight: 1.5,
    textAlign: 'left',
  },
  titleWrap: {
    marginLeft: -size(60),
    paddingVertical: size(10),
    paddingLeft: size(60),
    marginBottom: size(10),
  },
  active: {
    backgroundColor: 'rgba(242,242,242,1)',
  },
  title: {
    position: 'relative',
  },
  titleText: {
    fontSize: size(28),
    fontWeight: '500',
  },
  iconRight: {
    position: 'absolute',
    width: size(80),
    height: size(80),
    justifyContent: 'center',
    alignItems: 'center',
    right: size(40),
    top: '50%',
    transform: [
      {
        translateY: -size(40),
      },
    ],
  },
  date: {
    fontSize: size(24),
    color: '#999',
  },
  labelWrap: {
    marginBottom: size(20),
  },
  tagWrap: {
    flexDirection: 'row',
    width: size(120),
    height: size(50),
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: size(24),
    marginTop: size(10),
    borderRadius: size(5),
  },
  btnFix: {
    position: 'absolute',
    bottom: size(80),
    right: size(40),
    width: size(100),
    height: size(100),
    borderRadius: size(50),

    justifyContent: 'center',
    alignItems: 'center',

    padding: size(10),
    lineHeight: size(40),
    textAlign: 'center',
  },
  btn: {
    fontWeight: 'bold',
    fontSize: size(28),

    color: '#fff',
  },
});
