import DashboardPage from 'containers/DashboardPage/Loadable';
import ProductPage from 'containers/ProductPage/Loadable';
import UserPage from 'containers/UserPage/Loadable';
import UserCreatorPage from 'containers/UserCreatorPage/Loadable';
import UserEditorPage from 'containers/UserEditorPage/Loadable';
import UserViewerPage from 'containers/UserViewerPage/Loadable';

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
    path: 'products',
    menu: 'Product',
    component: ProductPage,
    icon: 'database',
  },
  {
    path: 'users',
    menu: 'User',
    component: UserPage,
    icon: 'user',
  },
  {
    path: 'users/new',
    title: 'New User',
    menu: 'New User',
    component: UserCreatorPage,
    hidden: true,
  },
  {
    path: 'users/edit/:id',
    title: 'Edit User',
    menu: 'Edit User',
    component: UserEditorPage,
    hidden: true,
  },
  {
    path: 'users/:id',
    title: 'User',
    menu: 'User',
    component: UserViewerPage,
    hidden: true,
  },
];

export default routes;
