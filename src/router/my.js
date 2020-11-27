import My from '@/view/my';
import MySet from '@/view/my/MySet';
import Account from '@/view/my/Account';
import Login from '@/view/my/login/Login';
import SystemSet from '@/view/my/SystemSet';
import Finger from '@/view/my/Finger';
import Register from '@/view/my/login/Register';
import Password from '@/view/my/login/Password';

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
  login: {
    screen: Login,
    name: 'login',
    options: { headerShown: false, title: '登录' },
  },
  register: {
    screen: Register,
    name: 'register',
    options: { headerShown: true, title: '注册' },
  },
  password: {
    screen: Password,
    name: 'password',
    options: { headerShown: true, title: '忘记密码' },
  },
  systemSet: {
    screen: SystemSet,
    name: 'systemSet',
    options: { headerShown: true, title: '系统设置' },
  },
  finger: {
    screen: Finger,
    name: 'finger',
    options: { headerShown: true, title: '指纹登录' },
  },
};
