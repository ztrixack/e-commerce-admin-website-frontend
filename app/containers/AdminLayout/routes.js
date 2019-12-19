import NotFoundPage from 'containers/NotFoundPage/Loadable';

const routes = [
  {
    path: '',
    menu: 'Dashboard',
    component: NotFoundPage,
    hidden: true,
  },
  {
    path: 'dashboard',
    menu: 'Dashboard',
    component: NotFoundPage,
    icon: 'dashboard',
  },
];

export default routes;
