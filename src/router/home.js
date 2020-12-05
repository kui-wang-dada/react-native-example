import Home from '@/view/home/home/Home';
import Tutor from '@/view/home/tutor/Tutor';
import Service from '@/view/home/service/Service';
import Message from '@/view/home/message';
import Report from '@/view/home/report';
import Author from '@/view/home/author';
import AuthorDetail from '@/view/home/author/Detail';
import AuthorDetail2 from '@/view/home/author/Detail2';
import MessageDetail from '@/view/home/message/Detail';
import RecordDetail from '@/view/home/record';
import CourseDetail from '@/view/home/course';
import WeekReport from '@/view/home/weekReport';
import MonthReport from '@/view/home/weekReport/MonthReport';
import TermReport from '@/view/home/weekReport/TermReport';

const HomeRoute = {
  home: {
    screen: Home,
    name: 'home',

    options: { headerShown: false, title: '首页' },
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
    options: { headerShown: true, title: '项目详情' },
  },
  message: {
    screen: Message,
    name: 'message',
    options: { headerShown: true, title: '沟通记录' },
  },
  report: {
    screen: Report,
    name: 'report',
    options: { headerShown: true, title: '文档报告' },
  },
  author: {
    screen: Author,
    name: 'author',
    options: { headerShown: true, title: '服务团队' },
  },
  authorDetail: {
    screen: AuthorDetail,
    name: 'authorDetail',
    options: { headerShown: true, title: '顾问详情' },
  },
  authorDetail2: {
    screen: AuthorDetail2,
    name: 'authorDetail2',
    options: { headerShown: true, title: '顾问详情' },
  },
  messageDetail: {
    screen: MessageDetail,
    name: 'messageDetail',
    options: { headerShown: true, title: '沟通记录详情' },
  },
  recordDetail: {
    screen: RecordDetail,
    name: 'recordDetail',
    options: { headerShown: true, title: '辅导记录详情' },
  },
  courseDetail: {
    screen: CourseDetail,
    name: 'courseDetail',
    options: { headerShown: true, title: '课程详情' },
  },
  weekReport: {
    screen: WeekReport,
    name: 'weekReport',
    options: { headerShown: true, title: '周报告详情' },
  },
  monthReport: {
    screen: MonthReport,
    name: 'monthReport',
    options: { headerShown: true, title: '月报告详情' },
  },
  termReport: {
    screen: TermReport,
    name: 'termReport',
    options: { headerShown: true, title: '学期报告详情' },
  },
};
export default HomeRoute;
