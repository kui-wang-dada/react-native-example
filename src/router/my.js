import My from '@/view/my';
import MySet from '@/view/my/MySet';
import Account from '@/view/my/Account';

export default {
  my: {
    screen: My,
    name: 'my',
    options: { headerShown: true, title: '我的' },
  },
  mySet: {
    screen: MySet,
    name: 'mySet',
    options: { headerShown: true, title: '个人中心' },
  },
  account: {
    screen: Account,
    name: 'account',
    options: { headerShown: true, title: '切换学号' },
  },
};
