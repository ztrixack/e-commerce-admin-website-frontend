import DashboardPage from 'containers/DashboardPage/Loadable';

const routes = [
  {
    path: '',
    menu: 'Dashboard',
    component: DashboardPage,
    hidden: true,
  },
  {
    path: 'dashboard',
    menu: 'Dashboard',
    component: DashboardPage,
    icon: 'dashboard',
  },
];

export default routes;
