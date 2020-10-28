import Home from '@/view/home/Home/Home';
import Tutor from '@/view/home/Tutor/Tutor';
import Service from '@/view/home/Service/Service';

const HomeRoute = {
  home: {
    screen: Home,
    name: 'home',

    options: {headerShown: false, title: '首页'},
  },
  tutor: {
    screen: Tutor,
    name: 'tutor',
    options: {
      headerShown: true,
      title: '辅导详情',
    },
  },
  service: {
    screen: Service,
    name: 'service',
    options: {headerShown: true, title: '项目详情'},
  },
};
export default HomeRoute;
