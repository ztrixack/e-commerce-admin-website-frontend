import DashboardPage from 'containers/DashboardPage/Loadable';
import ProductPage from 'containers/ProductPage/Loadable';
import UserPage from 'containers/UserPage/Loadable';

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
  {
    path: 'product',
    menu: 'Product',
    component: ProductPage,
    icon: 'database',
  },
  {
    path: 'user',
    menu: 'User',
    component: UserPage,
    icon: 'user',
  },
];

export default routes;
