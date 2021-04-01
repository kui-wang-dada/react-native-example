import My from '@/view/my';
import MySet from '@/view/my/MySet';
import Account from '@/view/my/Account';
import Login from '@/view/my/login/Login';
import ErpBind from '@/view/my/login/ErpBind';
import SystemSet from '@/view/my/systemSet';
import About from '@/view/my/systemSet/About';
import Privacy from '@/view/my/systemSet/Privacy';
import Terms from '@/view/my/systemSet/Terms';
import Finger from '@/view/my/Finger';
import Register from '@/view/my/login/Register';
import Password from '@/view/my/login/Password';
import Contract from '@/view/my/Contract';
import Order from '@/view/my/order';
import OrderDetail from '@/view/my/order/OrderDetail';
import Fits from '@/view/my/Fits';

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
  erpBind: {
    screen: ErpBind,
    name: 'erpBind',
    options: { headerShown: false, title: '绑定' },
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

  finger: {
    screen: Finger,
    name: 'finger',
    options: { headerShown: true, title: '生物识别登录' },
  },
  systemSet: {
    screen: SystemSet,
    name: 'systemSet',
    options: { headerShown: true, title: '系统设置' },
  },
  about: {
    screen: About,
    name: 'about',
    options: { headerShown: true, title: '关于' },
  },
  privacy: {
    screen: Privacy,
    name: 'privacy',
    options: { headerShown: true, title: '隐私权政策' },
  },
  terms: {
    screen: Terms,
    name: 'terms',
    options: { headerShown: true, title: '服务条款说明' },
  },
  contract: {
    screen: Contract,
    name: 'contract',
    options: { headerShown: true, title: '我的合同' },
  },
  order: {
    screen: Order,
    name: 'order',
    options: { headerShown: true, title: '我的订单' },
  },
  orderDetail: {
    screen: OrderDetail,
    name: 'orderDetail',
    options: { headerShown: true, title: '订单详情' },
  },
  fits: {
    screen: Fits,
    name: 'fits',
    options: { headerShown: true, title: '厚仁方法论' },
  },
};
